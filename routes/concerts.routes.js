const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

const getElementFromLink = (req) => (
  db.concerts.find(element => element.id === parseInt(req.params.id))
);

// get all
router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

// get by id
router.route('/concerts/:id').get((req, res) => {
  res.json(getElementFromLink(req));
});

// post new
router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const newElement = { id: uuidv4(), performer: performer, genre: genre, price: price, day: day, image: image };
  db.concerts.push(newElement);
  res.json({ message: 'OK, posted' });
});

// get modify by id
router.route('/concerts/:id').put((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const updatedElement = ({ id: req.params.id, performer: performer, genre: genre, price: price, day: day, image: image });
  db.concerts[db.concerts.indexOf(getElementFromLink(req))] = updatedElement;
  res.json({ message: 'OK, updated' });
});

// delete by id
router.route('/concerts/:id').delete((req, res) => {
  db.concerts.splice(db.concerts.indexOf(getElementFromLink(req)), 1);
  res.json({ message: 'OK, deleted' });
});

module.exports = router;