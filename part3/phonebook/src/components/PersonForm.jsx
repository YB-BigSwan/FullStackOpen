/* eslint-disable react/prop-types */
const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  addContact,
}) => {
  return (
    <form onSubmit={addContact}>
      <div className="input-field">
        <label htmlFor="name">Name:</label>
        <input name="name" value={newName} onChange={handleNameChange} />
      </div>
      <div className="input-field">
        <label htmlFor="number">Number:</label>
        <input name="number" value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
