import { useState } from "react"
import Weather from "./Weather"

const Country = ({ country, detailed }) => {
  const [detailedView, setDetailedView] = useState(detailed)
  
  const handleShowClick = () => {
    setDetailedView(true)
  }

  if (detailedView) {
    return (
      <>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <b>languages:</b>
        <ul>
          {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={country.flags.png} />
        <h2>Weather in {country.capital}</h2>
        <Weather country={country} />
      </>
    )
  } else {
    return (
      <p>
        {country.name.common} <button onClick={handleShowClick}>show</button>
      </p>
    )
  }
    
}

export default Country