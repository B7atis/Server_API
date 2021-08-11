const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');
const { testimonials } = require('../db');

const getTestimonialsById = seatId => db.seats.find(element => element.id === parseInt(seatId))

// get all
router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

// get random
router.route('/testimonials/random').get((req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});

// get by id
router.route('/testimonials/:id').get((req, res) => {
  res.json(getTestimonialsById(req.params.id));
});

// post new
router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;
  const newElement = { id: uuidv4(), author: author, text: text };
  db.testimonials.push(newElement);
  res.json({ message: 'OK, posted' });
});

// get modify by id
router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;

  /* Option 1 */
  const updatedElement = ({ id: req.params.id, author: author, text: text });
  db.testimonials[db.testimonials.indexOf(getTestimonialsById(req.params.id))] = updatedElement;

  /* Option 2 */
  // const updatedElement = ({ id: req.params.id, day: day, seat: seat, client: client, email: email });
  // const index = db.testimonials.findIndex(item => item.id === parseInt(req.params.id));
  // db.testimonials[index] = updatedElement;

  /* Option 3 */
  // const testimonials = getTestimonialsById(req.params.id);
  // for (const [key, value] of Object.entries(req.body)) {
  //   testimonials[key] = value;
  // }

  res.json({ message: 'OK, updated' });
});

// delete by id
router.route('/testimonials/:id').delete((req, res) => {
  db.testimonials.splice(db.testimonials.indexOf(getTestimonialsById(req)), 1);
  res.json({ message: 'OK, deleted' });
});

module.exports = router;