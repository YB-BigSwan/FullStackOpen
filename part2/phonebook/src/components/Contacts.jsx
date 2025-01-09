/* eslint-disable react/prop-types */
const Contacts = ({ persons, searchQuery, handleDelete }) => {
  const filteredContacts = persons.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContacts = searchQuery.length === 0 ? persons : filteredContacts;

  return (
    <div>
      {renderContacts.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => handleDelete(person.id)}>Delete</button>
        </p>
      ))}
    </div>
  );
};

export default Contacts;
