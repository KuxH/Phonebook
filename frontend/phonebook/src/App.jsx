import { useState } from "react";

const App = ()=>{
  const [persons, setPersons] =useState([
    {name: 'ram'}
  ])
  const [newName, setNewName] = useState('')
  const addName = (event)=>{
    event.preventDefault()
    //alert
    if(persons.some(person => person.name === newName)){
      alert(' ${newName} is already added ' )
      return
    }
    const newPerson = {name: newName}
    setPersons([...persons, newPerson])
    setNewName('')
  }

  

  return(
    <div>
      <h2>Phonebook</h2>
      <ul>
        {persons.map((persons)=>(
          <li>{persons.name}</li>
        ))}
      </ul>
      <form onSubmit={addName}>
        <div>
          name: <input 
            value={newName}
            onChange={(event)=>{
              setNewName(event.target.value)
            }}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}
export default App