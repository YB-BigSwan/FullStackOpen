/* eslint-disable react/prop-types */
import Weather from "./Weather";

const Country = ({ country }) => {
  const { name, capital, area, languages, flags, capitalInfo } = country;
  const languageArray = Object.values(languages);

  return (
    <div>
      <h1>{name.common}</h1>
      <p>Capital: {capital}</p>
      <p>Area: {area}</p>
      <h2>Languages: </h2>
      <ul>
        {languageArray.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <h2>Flag: </h2>
      <img src={flags.svg} alt={`The flag of ${name.common}`} width="200" />
      <h2>Weather in {capital}</h2>
      <Weather latlng={capitalInfo.latlng} />
    </div>
  );
};

export default Country;
