import Country from "./Country";

/* eslint-disable react/prop-types */
const CountryList = ({ countries, searchQuery, showCountry }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredCountries.length > 10) {
    return <p>Too many matches, please narrow your search</p>;
  }

  if (filteredCountries.length > 1) {
    return (
      <div>
        {filteredCountries.map((country) => (
          <div key={country.name.common}>
            {country.name.common}
            {"  "}
            <button onClick={() => showCountry(country.name.common)}>
              Show
            </button>
          </div>
        ))}
      </div>
    );
  }

  if (filteredCountries.length === 1) {
    return (
      <div>
        <Country country={filteredCountries[0]} />
      </div>
    );
  }

  return null;
};

export default CountryList;
