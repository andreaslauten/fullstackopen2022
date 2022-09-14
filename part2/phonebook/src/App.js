import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import phonebookService from './services/phonebook'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filter, setNewFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notificationMessage, setNotificationMessage] = useState("")
  const [notificationClass, setNotificationClass] = useState("")

  useEffect(() => {
    phonebookService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      if (window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        phonebookService
        .update(existingPerson.id, newPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
          setNotificationClass("notification")
          setNotificationMessage(`Updated ${newPerson.name}`)
        })
        .catch(error => {
          setNotificationClass("error")
          setNotificationMessage(`Information of ${newPerson.name} has already been removed from server`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.name !== newPerson.name))
        })
        
      }
    }
    else {
      phonebookService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response))
      })
      setNotificationClass("notification")
      setNotificationMessage(`Added ${newPerson.name}`)
    }
    setNewName('')
    setNewNumber('')
    
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const deletePersonWithID = personID => {
    const name = persons.find(({ id }) => id === personID).name

    if (window.confirm(`Delete ${name} ?`)) {
      phonebookService
      .deleteEntry(personID)
      .then(response => {
        const newPersons = persons.filter(person => person.id !== personID)
        setPersons(newPersons)
        setNotificationClass("notification")
        setNotificationMessage(`Deleted ${name}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      .catch(error => {
        setNotificationClass("error")
        setNotificationMessage(`Information of ${name} has already been removed from server`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== personID))
      })
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} notificationClass={notificationClass} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} deletePersonWithID={deletePersonWithID} />
    </div>
  )
}

export default App