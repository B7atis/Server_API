const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

const getSeatById = seatId => db.seats.find(element => element.id === parseInt(seatId))

// get all
router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

// get by id
router.route('/seats/:id').get((req, res) => {
  res.json(getSeatById(req.params.id));
});

// post new
router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;
  const newElement = { id: uuidv4(), day: day, seat: seat, client: client, email: email };
  if (db.seats.some(item => (item.day == day && item.seat == seat))) {
    res.status(409).json({ message: 'The slot is already taken...' })
  } else {
    db.seats.push(newElement);
    res.json({ message: 'OK, posted' });
  }
});

// get modify by id
router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;

  /* Option 1 */
  const updatedElement = ({ id: req.params.id, day: day, seat: seat, client: client, email: email });
  db.seats[db.seats.indexOf(getSeatById(req.params.id))] = updatedElement;

  /* Option 2 */
  // const updatedElement = ({ id: req.params.id, day: day, seat: seat, client: client, email: email });
  // const index = db.seats.findIndex(item => item.id === parseInt(req.params.id));
  // db.seats[index] = updatedElement;

  /* Option 3 */
  // const seat = getSeatById(req.params.id);
  // for (const [key, value] of Object.entries(req.body)) {
  //   seat[key] = value;
  // }

  res.json({ message: 'OK, updated' });
});

// delete by id
router.route('/seats/:id').delete((req, res) => {
  db.seats.splice(db.seats.indexOf(getSeatById(req.params.id)), 1);
  res.json({ message: 'OK, deleted' });
});

module.exports = router;