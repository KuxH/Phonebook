const mongoose = require('mongoose')
const password = process.env.MONGODB_PASSWORD
const url = `mongodb+srv://kuxhphonebook:${password}@cluster1.jf3wh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`;
mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})
const Person = mongoose.model('Person', personSchema)
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})
person.save().then(result => {
    console.log('Contact saved')
    mongoose.connection.close()
})