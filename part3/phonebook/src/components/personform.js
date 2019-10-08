import personService from '../services/requests'
import React, {useState} from 'react'
const PersonForm = ({persons, setPersons, setColor, setMessage}) => {
    const [ newName, setNewName ] = useState('')
    const [ newNum, setNewNum ] = useState('')
    const onClick = (event) => {
        event.preventDefault()
        const newPerson = {
          name: newName,
          number: newNum
        }
        const person = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())
        if(person){
          const personID = person.id
          const update = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
          if(update){
          personService
            .update(personID, newPerson)
            .then(updated => {
                setPersons(persons.map(person => person.id !== personID ? person : updated))
            })
            setTimeout(()=>setMessage(null), 5000)
          }
        }
        else{
            personService
                .create(newPerson)
                .then(returnedPersons => {
                    setPersons(returnedPersons)//persons.concat(returnedPersons))
                })
            setColor("green")
            setMessage(`${newPerson.name}'s contact has been added.`)
            setTimeout(()=>setMessage(null), 5000)
        }
        setNewName('')
        setNewNum('')
    }
    const handleNameChange = (event) => setNewName(event.target.value)
    const handleNumChange = (event) => setNewNum(event.target.value)
    return (
        <div>
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
        </div>
    )
}
export default PersonForm