import { useState } from "react";

const App = ()=>{
  const [persons, setPersons] =useState([
    {name: 'ram'}
  ])
  const [newName, setNewName] = useState('')
  const addName = (event)=>{
    event.preventDefault()
    console.log(newName)
    //alert(name added already)
    const nameExists = persons.some(person => person.name === newName.trim());
    if(persons.some(person => person.name === newName)){
      alert(` ${newName.trim()} is already added ` )
      return
    }
    const newPerson = {name: newName}
    setPersons([...persons, newPerson])
    setNewName('')
  }

  

  return(
    <div>
      <h2>Phonebook</h2>
      
      <form onSubmit={addName}>
        <div>
          Name: <input 
            value={newName}
            onChange={(event)=>{
              setNewName(event.target.value)
            }}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((persons,id)=>(
          <li key={id}>{persons.name}</li>
        ))}
      </ul>
    </div>
  )
}
export default App