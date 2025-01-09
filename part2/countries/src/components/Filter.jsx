/* eslint-disable react/prop-types */
const Filter = ({ searchQuery, handleQueryChange }) => {
  return (
    <div>
      <input
        value={searchQuery}
        onChange={handleQueryChange}
        placeholder="Search countries..."
      />
    </div>
  );
};

export default Filter;
