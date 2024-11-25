const personRouter = require("express").Router();
const Contact = require("../models/contact");
const logger = require("../utils/logger");

personRouter.get("/", (req, res, next) => {
  Contact.find({})
    .then((contacts) => {
      res.json(contacts);
    })
    .catch((error) => {
      logger.error(error);
    });
});

personRouter.get("/:id", (req, res, next) => {
  Contact.findById(req.params.id)
    .then((contact) => {
      if (contact) {
        res.json(contact);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      logger.error(error);
    });
});

personRouter.post("/", (req, res, next) => {
  const contact = new Contact({
    name: req.body.name,
    number: req.body.number,
  });
  contact
    .save()
    .then((savedContact) => {
      res.json(savedContact);
    })
    .catch((error) => {
      logger.error(error);
    });
});

personRouter.delete("/:id", (req, res, next) => {
  Contact.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => {
      logger.error(error);
    });
});

personRouter.put("/:id", (req, res, next) => {
  const contact = {
    name: req.body.name,
    number: req.body.number,
  };
  Contact.findByIdAndUpdate(req.params.id, contact, { new: true })
    .then((updatedContact) => {
      res.json(updatedContact);
    })
    .catch((error) => {
      logger.error(error);
    });
});

module.exports = personRouter;
