
import { useEffect, useState } from "react"
import axios from "axios"

const App = ()=>{
  const [persons, setPersons] =useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPersons, setFilterPersons] = useState(null)
  
  useEffect(()=>{
    axios.get('http://localhost:3001/api/persons')
    .then(response =>{
      setPersons(response.data)
    })
    .catch(error => console.error('error fetching:',error))
  })
  const addName = (event)=>{
    event.preventDefault()
    console.log(newName)


    //alert(name added already)
    
    if(persons.some(person => person.name === newName)){
      alert(` ${newName.trim()} is already added ` )
      return
    }

//save new contact to backend
    const newPerson = {name: newName, number: newNumber}
    axios.post('http://localhost:3001/api/persons', newPerson)
    .then(response =>{
    setPersons([...persons, response.data])
    setNewName('')
    setNewNumber('')
  })
  .catch(error => console.error('Error adding person:',error))
  }

  //filter by name/number

  const searchPersons = ()=>{
    if (!searchTerm){
      "No Contacts found"
    }
    const searched = persons.filter(person =>
    person.name.includes(searchTerm) || person.number.includes(searchTerm)
  )
  setFilterPersons(searched)
}

  return(
    <div>
      <h2>Phonebook</h2>

      <div>
        Search: <input
        value={searchTerm}
        onChange={(event)=> setSearchTerm(event.target.value)}
        placeholder="search by name/no"/>

        <button onClick={searchPersons}>Search</button>
      </div>
      
      <form onSubmit={addName}>
        <div>
          Name: <input 
            value={newName}
            onChange={(event)=>{
              setNewName(event.target.value)
            }}/>
        </div>
        
        <div>
        Number: <input
          value= {newNumber}
          onChange={(event)=>{
            setNewNumber(event.target.value)}}
            />
      </div>
      <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Contacts</h2>
      <ul>
        {(searchTerm ? filterPersons :persons).map((persons,id)=>(
          <li key={id}>{persons.name} : {persons.number}</li>
        ))}
      </ul>
    </div>
  )
}
export default App