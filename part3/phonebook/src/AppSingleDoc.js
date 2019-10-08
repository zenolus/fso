import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1234567'
    }
  ]) 
  const [ flt, setFlt ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const showNumbers = () => {
    const selectedPersons = persons.filter((person)=>{
      return person.name.toLowerCase().includes(flt.toLowerCase())
    })
    return selectedPersons.map((person, i) => <div key={i}>{person.name} {person.number}</div>)
  }
  const onClick = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNum
    }
    if(persons.find((person) => person.name === newName)){
      window.alert(`${newName} is already added to phonebook`)
    }
    else
      setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNum('')
  }
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumChange = (event) => setNewNum(event.target.value)
  const handleFltChange = (event) => {
    setFlt(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with:
          <input 
            value={flt}
            onChange={handleFltChange}/>
        </div>
      </form>
      <h2>add a new</h2>
      <form>
        <div>
          name:
          <input 
            value={newName}
            onChange={handleNameChange}/>
          <br/>
          number:
          <input
            value={newNum}
            onChange={handleNumChange} />
        </div>
        <div>
          <button type="submit" onClick={onClick}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {showNumbers()}
    </div>
  )
}

export default App