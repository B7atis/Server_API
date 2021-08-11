const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');
const { concerts } = require('../db');

const getConcertsById = seatId => db.seats.find(element => element.id === parseInt(seatId))

// get all
router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

// get by id
router.route('/concerts/:id').get((req, res) => {
  res.json(getConcertsById(req.params.id));
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

  /* Option 1 */
  const updatedElement = ({ id: req.params.id, performer: performer, genre: genre, price: price, day: day, image: image });
  db.concerts[db.concerts.indexOf(getConcertsById(req.params.id))] = updatedElement;

  /* Option 2 */
  // const updatedElement = ({ id: req.params.id, day: day, seat: seat, client: client, email: email });
  // const index = db.concerts.findIndex(item => item.id === parseInt(req.params.id));
  // db.concerts[index] = updatedElement;

  /* Option 3 */
  // const concerts = getSeatById(req.params.id);
  // for(const [key, value] of Object.entries(req.body)) {
  //   concerts[key] = value;
  // }

  res.json({ message: 'OK, updated' });
});

// delete by id
router.route('/concerts/:id').delete((req, res) => {
  db.concerts.splice(db.concerts.indexOf(getConcertsById(req.params.id)), 1);
  res.json({ message: 'OK, deleted' });
});

module.exports = router;