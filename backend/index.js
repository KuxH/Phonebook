console.log("hello")
const express =require('express')
const app =express()
app.use(express.json())
let persons =[
    {
        "id": 1,
        "name": "sumit pathak",
        "number": "9861612820"
    },
    {
        "id": 2,
        "name": "prajjwal dhakal",
        "number": "98452123678"
    },
    {
        "id": 3,
        "name": "kapil dotel",
        "number": "9845781236"
    },
]

app.get('/',(request, response)=>{
    response.send('<h1>hello world whatsup</h1>')
})
 //getting persons phonebook
app.get('/api/persons',(request,response)=>{
    response.json(persons)
})

//getting by id
/*app.get('/api/persons/:id',(request,response)=>{
    const id = Number(request.params.id)
    const person = persons.find(person=> person.id===id)

    if(person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})*/
//deleting by id
app.delete('/api/persons/:id',(request, response)=>{
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

//post
app.post('/api/persons',(request,response)=>{
    const person =request.body
    const random=Math.floor(Math.random() * 456789)
    const personObj ={
        id:random,
        name:person.name,
        number:person.number
    }
    persons =persons.concat(personObj)
    console.log(persons)
    response.json(personObj)
    /*let newId = Math.floor(Math.random() * 1000)
    while (persons.some(p => p.id === newId)) {
        newId = Math.floor(Math.random() * 1000) 
    }

    // Create a new person object with the generated id
    const newPerson = {  id: newId, ...person }

    persons.push(newPerson);

    response.status(201).json(newPerson);*/
})

//name or number missing

app.post('/api/persons', (request, response)=>{
    const person = request.body

    if (!person.name || !person.number) {
        return response.status(400).json({ error: 'Name or number is missing' })
    }
    const random = Math.floor(Math.random() * 456789)
    const personObj = {
        id: random,
        name: person.name,
        number: person.number
    }

    persons = persons.concat(personObj)
    console.log(persons)
    response.json(personObj)
}
)

//name already exist

app.post('/api/persons', (request, response) => {
    const person = request.body

    const nameExists = persons.some(p => p.name === person.name);
    if (nameExists) {
        return response.status(409).json({ error: 'Name already exists in the phonebook' });
    }
})


//listeing to this port
const PORT = 3001
app.listen(PORT,()=>{
    console.log('Server is running on ${PORT}')
})