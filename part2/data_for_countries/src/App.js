import { useState, useEffect } from "react"
import axios from "axios"
import Countries from "./components/Countries"

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('Germany')
  
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleInputChange = (event) => {
    setFilter(event.target.value)
  }

  const countriesFiltered = () => {
    return (
      countries.filter(country => 
        country.name.common.toLowerCase().includes(filter.toLowerCase()))
    )
  }

  return (
    <div>
      find countries <input onChange={handleInputChange} />
      <Countries countries={countriesFiltered()} />
    </div>
  )
}

export default App;