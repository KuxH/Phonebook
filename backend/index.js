const express = require("express");
const app = express();
app.use(express.json());
// const cors = require("cors");
// app.use(cors());

require("dotenv").config();

const Person = require("./db");

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:", request.path);
  console.log("Body:", request.body);
  console.log("---");
  next();
};
app.use(requestLogger);

app.get("/", (req, res, next) => {
  res.send("<h1>Welcome to Phonebook </h1>");
});
//getting persons phonebook
app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons);
    })
    .catch((error) => next(error));
});
//getting by id
app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});
//post
app.post("/api/persons", (req, res, next) => {
  console.log(req.body);
  const person = req.body;

  //missing name||number
  if (!person.name || !person.number) {
    return res.status(400).json({ error: "Name or number missing" });
  }

  //add new person
  const newPerson = new Person({
    name: person.name,
    number: person.number,
  })
  //saving to db
  newPerson
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((error) => next(error));
});
//delete
app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});
//put(updating existing name)
app.put("/api/persons/:id", (req, res, next)=>{
  const body= req.body
  //updating names db
  const person ={name: body.name, number: body.number}
  Person.findByIdAndUpdate(req.params.id, person, {new: true})
  .then(updatedNote =>{
    res.json(updatedNote)
  })
  .catch(error => next(error))
})
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

//error handler
const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

//listeing to this port
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
