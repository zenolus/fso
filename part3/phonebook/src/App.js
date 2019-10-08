import React, { useState, useEffect } from 'react'
import Persons from './components/persons'
import PersonForm from './components/personform'
import Filter from './components/filter'
import personService from './services/requests'
const Notification = ({message, color}) => {
  if(message === null)
    return null
  const successStyle = {
    color: color,
    background: 'lightgrey',
    borderStyle: 'solid',
    fontSize: 20,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  return (
    <div style={successStyle}>
      {message}
    </div>
  )
}
const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ flt, setFlt ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ color, setColor ] = useState("green")
  useEffect(() => {
    personService
      .getAll()
      .then(personsData => {
        setPersons(personsData)
      })
  }, [])
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} color={color}/>
      <Filter flt={flt} setFlt={setFlt}/>
      <h3>Add a new person</h3>
      <PersonForm persons={persons} setPersons={setPersons} setColor={setColor} setMessage={setMessage}/>
      <h3>Numbers</h3>
      <Persons persons={persons} setPersons={setPersons} setColor={setColor} setMessage={setMessage} flt={flt}/>
    </div>
  )
}

export default App