import { useEffect, useState } from "react";
import Contacts from "./components/Contacts";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
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

  const addContact = (e) => {
    e.preventDefault();
    const isDuplicateName = persons.find((person) => person.name === newName);
    const isDuplicateNumber = persons.find(
      (person) => person.number === newNumber
    );

    if (isDuplicateName) {
      alert(`${newName} is already added to the phonebook`);
      setNewName("");
      setNewNumber("");
    } else if (isDuplicateNumber) {
      alert(`${newNumber} belongs to ${isDuplicateNumber.name}`);
      setNewName("");
      setNewNumber("");
    } else {
      const newContact = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      setPersons(persons.concat(newContact));
      setNewName("");
      setNewNumber("");
    }
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
      <Contacts persons={persons} searchQuery={searchQuery} />
    </div>
  );
};

export default App;
