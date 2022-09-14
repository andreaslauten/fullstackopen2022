import Country from "./Country"

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (countries.length == 1) {
    return <Country country={countries[0]} detailed={true} />
  }
  return countries.map(country => <Country key={country.name.common} country={country} />)
}

export default Countries