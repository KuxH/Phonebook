
const express =require('express')
const app =express()
app.use(express.json())
const cors = require("cors")
app.use(cors())

require('dotenv').config()

const Person = require('./db')

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:', request.path)
    console.log('Body:', request.body)
    console.log('---')
    next()
}
app.use(requestLogger)
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

app.get('/',(req, res, next)=>{
    res.send('<h1>Welcome to Phonebook </h1>')
})
 //getting persons phonebook
app.get('/api/persons',(req,res,next)=>{
    Person.find({}).then(persons=>{
        res.json(persons)
    })
    .catch(error => next(error))
})

//getting by id
app.get('/api/persons/:id',(req,res,next)=>{
    Person.findById(req.params.id)
    .then(person => {
        if(person){
            res.json(person)
        }
        else{
            res.status(404).end()
        }
    })
    .catch(error => next(error))
})
//deleting by id
app.delete('/api/persons/:id',(req, res, next)=>{
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})


//post
app.post('/api/persons',(req,res,next)=>{
    console.log(req.body)
    const person = req.body

    //missing name||number
    if(!person.name || !person.number){
        return res.status(400).json({error: 'Name or number missing'})
    }
    

    //duplicate name||number
    const nameExists=persons.some(p => p.name === person.name)
    if(nameExists){
        return res.status(409).json({error:'Name do exists'})
    }
    const numberExists=persons.some(p => p.number === person.number)
    if(numberExists){
        return res.status(409).json({error:'Number do exists'})
    }

    //unique id
    const newId = Math.floor(Math.random()*5444454)
    while(persons.some(p => p.id === newId)){
        newId = Math.floor(Math.random()*5444454)
    }
    //add new person
   const newPerson = new Person({
        id: newId,
        name: person.name,  
        number: person.number
   })

   //saving to db
   newPerson.save().then(savedPerson => {
    res.json(savedPerson)
   })
   .catch(error => next(error))

})

//error handler
const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
      return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message })
    }
  
    next(error)
  }
  
  app.use(errorHandler)

//listeing to this port
const PORT = 3002
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})