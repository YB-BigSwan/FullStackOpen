/* eslint-disable react/prop-types */
const Filter = ({ searchQuery, handleQueryChange }) => {
  return (
    <div>
      Search: <input value={searchQuery} onChange={handleQueryChange} />
    </div>
  );
};

export default Filter;
