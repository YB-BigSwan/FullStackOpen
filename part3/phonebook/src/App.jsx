import { useEffect, useState } from "react";
import Contacts from "./components/Contacts";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import contactService from "./services/contacts";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState(null);
  const [notificationType, setNotificationType] = useState(null);

  const clearInputs = () => {
    setNewName("");
    setNewNumber("");
  };

  useEffect(() => {
    contactService
      .getAll()
      .then((data) => {
        setPersons(data);
      })
      .catch((error) => {
        setMessage("Failed to fetch contacts: " + error.message);
        setNotificationType("error");
        setTimeout(() => {
          setMessage(null);
          setNotificationType(null);
        }, 5000);
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
          setMessage(`${contact.name} successfully deleted!`);
          setNotificationType("success");
          setTimeout(() => {
            setMessage(null);
            setNotificationType(null);
          }, 5000);
        })
        .catch((error) => {
          setMessage(`Failed to delete ${contact.name}: ${error.message}`);
          setNotificationType("error");
          setTimeout(() => {
            setMessage(null);
            setNotificationType(null);
          }, 5000);
        });
    }
  };

  const addContact = (e) => {
    e.preventDefault();

    if (newName === "" || newNumber === "") {
      setMessage("Name or number field missing, please enter and try again");
      setNotificationType("error");
      setTimeout(() => {
        setMessage(null);
        setNotificationType(null);
      }, 5000);
      return;
    }

    const isExistingContact = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (isExistingContact) {
      updateContact(isExistingContact);
    } else {
      const newContact = {
        name: newName,
        number: newNumber,
      };

      contactService
        .create(newContact)
        .then((data) => {
          setPersons(persons.concat(data));
          setMessage(`${newContact.name} added to the phonebook!`);
          setNotificationType("success");
          setTimeout(() => {
            setMessage(null);
            setNotificationType(null);
          }, 5000);
        })
        .catch((error) => {
          alert(error);
        });
    }

    clearInputs();
  };

  const updateContact = (isExistingContact) => {
    const confirmUpdate = window.confirm(
      `${newName} is already in the phonebook, replace the old number with the new one?`
    );

    if (!confirmUpdate) {
      setMessage(`Update canceled, ${isExistingContact.name} not updated.`);
      setNotificationType("error");
      setTimeout(() => {
        setMessage(null);
        setNotificationType(null);
      }, 5000);
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
        setMessage(
          `${isExistingContact.name}'s number was successfully updated!`
        );
        setNotificationType("success");
        setTimeout(() => {
          setMessage(null);
          setNotificationType(null);
        }, 5000);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setMessage(
            `${isExistingContact.name} was recently deleted, update failed.`
          );
          setNotificationType("error");
        } else {
          setMessage(`Failed to update ${newName}: ${error.message}.`);
          setNotificationType("error");
        }
        setTimeout(() => {
          setMessage(null);
          setNotificationType(null);
        }, 5000);
      });
  };

  return (
    <>
      <h1>Phonebook</h1>
      <div className="contacts-container">
        <div className="sidebar">
          <h2>Search</h2>
          <Filter
            searchQuery={searchQuery}
            handleQueryChange={handleQueryChange}
          />
          <h2>Add Contact</h2>
          <PersonForm
            newName={newName}
            newNumber={newNumber}
            handleNameChange={handleNameChange}
            handleNumberChange={handleNumberChange}
            addContact={addContact}
          />
        </div>
        <div className="contacts">
          <Contacts
            persons={persons}
            searchQuery={searchQuery}
            handleDelete={handleDelete}
          />
          <Notification message={message} type={notificationType} />
        </div>
      </div>
    </>
  );
};

export default App;
