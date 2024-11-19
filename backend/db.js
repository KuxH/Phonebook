const mongoose = require('mongoose')
require('dotenv').config()


const password = process.env.MONGODB_PASSWORD
const url = `mongodb+srv://kuxhphonebook:${password}@cluster1.jf3wh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`;

mongoose.set('strictQuery', false)

mongoose.connect(url)
.then(()=>{
    console.log('connected')
})
.catch((err)=>{
    console.log('cnnxn failed')
    console.log(err)
})


const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})
module.exports = mongoose.model('Person', personSchema)



   
