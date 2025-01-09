import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import countryService from "./services/countries";
import CountryList from "./components/CountryList";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    countryService
      .getAll()
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(`Failed to fetch countries: ${error.message}`);
        setLoading(false);
      });
  }, []);

  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const showCountry = (countryName) => {
    setSearchQuery(countryName);
  };

  return (
    <>
      <div>
        Find countries:
        <Filter
          searchQuery={searchQuery}
          handleQueryChange={handleQueryChange}
        />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <CountryList
            countries={countries}
            searchQuery={searchQuery}
            showCountry={showCountry}
          />
        )}
      </div>
    </>
  );
}

export default App;
