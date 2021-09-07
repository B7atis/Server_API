const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const testim = await Testimonial.findOne().skip(rand);
    if (!testim) res.status(404).json({ message: 'Not found' });
    else res.json(testim);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const testim = await Testimonial.findById(req.params.id);
    if (!testim) res.status(404).json({ message: 'Not found' });
    else res.json(testim);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { author, text } = req.body;
    const newElement = new Testimonial({ author: author, text: text });
    await newElement.save();
    res.json({ message: 'OK' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.update = async (req, res) => {
  try {
    const { author, text } = req.body;
    const testim = await Testimonial.findById(req.params.id);
    if (testim) {
      await Testimonial.updateOne({ _id: req.params.id }, { $set: { author: author, text: text } });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const testim = await Testimonial.findById(req.params.id);
    if (testim) {
      await Testimonial.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};