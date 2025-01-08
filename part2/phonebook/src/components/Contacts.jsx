/* eslint-disable react/prop-types */
const Contacts = ({ persons, searchQuery }) => {
  const filteredContacts = persons.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div>
      {searchQuery.length === 0
        ? persons.map((person) => (
            <p key={person.id}>
              {person.name} {person.number}
            </p>
          ))
        : filteredContacts.map((person) => (
            <p key={person.id}>
              {person.name} {person.number}
            </p>
          ))}
    </div>
  );
};

export default Contacts;
