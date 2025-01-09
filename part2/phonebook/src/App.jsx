import { useEffect, useState } from "react";
import Contacts from "./components/Contacts";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import contactService from "./services/contacts";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    contactService
      .getAll()
      .then((data) => {
        setPersons(data);
      })
      .catch((error) => {
        alert("Failed to fetch contacts: " + error.message);
      });
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = (id) => {
    const contact = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${contact.name}?`)) {
      contactService
        .deleteContact(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          alert(`Failed to delete ${contact.name}: ${error.message}`);
        });
    }
  };

  const addContact = (e) => {
    e.preventDefault();
    const isExistingContact = persons.find((person) => person.name === newName);
    const clearInputs = () => {
      setNewName("");
      setNewNumber("");
    };

    if (isExistingContact) {
      const confirmUpdate = window.confirm(
        `${newName} is already in the phonebook, replace the old number with the new one?`
      );

      if (!confirmUpdate) {
        console.log(`Update canceled, ${isExistingContact.name} not updated.`);
        clearInputs();
        return;
      }

      const updatedContact = { ...isExistingContact, number: newNumber };

      contactService
        .update(isExistingContact.id, updatedContact)
        .then((data) => {
          setPersons(
            persons.map((person) =>
              person.id === isExistingContact.id ? data : person
            )
          );
        })
        .catch((error) => {
          alert(`Failed to update ${newName}: ${error.message}`);
        });
    } else {
      const newContact = {
        name: newName,
        number: newNumber,
      };

      contactService
        .create(newContact)
        .then((data) => {
          setPersons(persons.concat(data));
        })
        .catch((error) => {
          alert(error);
        });
    }

    clearInputs();
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchQuery={searchQuery} handleQueryChange={handleQueryChange} />

      <h2>Add new contact</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addContact={addContact}
      />
      <h2>Numbers</h2>
      <Contacts
        persons={persons}
        searchQuery={searchQuery}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
