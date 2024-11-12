const express = require('express')
const app = express()

const persons =[
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
//list of persons
app.get('/api/persons', (req, res) => {
    res.json(persons)
    
})

//start server
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})