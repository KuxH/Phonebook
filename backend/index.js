
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
    response.send('<h1>hello world </h1>')
})
 //getting persons phonebook
app.get('/api/persons',(request,response)=>{
    response.json(persons)
})

//getting by id
app.get('/api/persons/:id',(request,response)=>{
    const id = Number(request.params.id)
    const person = persons.find(person=> person.id===id)

    if(person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})
//deleting by id
app.delete('/api/persons/:id',(request, response)=>{
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

//post
app.post('/api/persons',(req,res)=>{
    const person = req.body

    //missing name||number
    if(!person.name || !person.number){
        return res.status(400).json({error: 'Name or number missing'})
    }

    //duplicate name||number
    const nameExists=persons.some(p => p.name === person.name)
    if(nameExists){
        return response.status(409).json({error:'Name do exists'})
    }
    const numberExists=persons.some(p => p.number === person.number)
    if(numberExists){
        return response.status(409).json({error:'Number do exists'})
    }

    //unique id
    const newId = Math.floor(Math.random()*5444454)
    while(persons.some(p => p.id === newId)){
        newId = Math.floor(Math.random()*5444454)
    }
    //add new person
   const newPerson = {...person,id:newId}
    persons = [...persons,newPerson]
    res.json(newPerson)


})

//listeing to this port
const PORT = 3001
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})