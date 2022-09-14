import Person from './Person'

const Persons = ({persons, filter, deletePersonWithID}) => {
    const personsFiltered = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  
    return (
      personsFiltered.map(person => <Person key={person.id} person={person} deletePerson={() => deletePersonWithID(person.id)}/>)
    )
  }

export default Persons