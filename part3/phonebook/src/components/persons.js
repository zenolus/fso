import React from 'react'
import personService from '../services/requests'
const Persons = ({persons, setPersons, flt, setColor, setMessage}) => {
    console.log(persons)
    const selectedPersons = persons.filter((person)=>{
      return person.name.toLowerCase().includes(flt.toLowerCase())
    })
    const handleDelete = (person) => () => {
      const clear = window.confirm(`Delete ${person.name}?`)
      if(clear)
      personService
        .clear(person.id)
        .then((status) => {
          personService
            .getAll()
            .then(newData => {
              setPersons(newData)
            })
          setColor("red")
          setMessage(`${person.name} has been removed from contacts`)
          setTimeout(()=>setMessage(null), 5000)
        })
        .catch(() => {
          personService
            .getAll()
            .then(newData => setPersons(newData))
          setColor("red")
          setMessage(`${person.name} doesn't exist in contacts`)
          setTimeout(()=>setMessage(null), 5000)
        })
    }
    return selectedPersons.map((person, i) => {
      return (
      <div key={i}>
        {person.name} {person.number}
        <button type="delete" onClick = {handleDelete(person)}>delete</button>
      </div>
    )})
}
export default Persons