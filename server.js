const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const seatsRoutes = require('./routes/seats.routes');
const concertsRoutes = require('./routes/concerts.routes');

app.use((req, res, next) => {
  req.io = io;
  next();
});

//routes
app.use('/api', testimonialsRoutes);
app.use('/api', seatsRoutes);
app.use('/api', concertsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

//error
app.use((req, res) => {
  res.status(404).send({ message: 'Not found....' });
})

// connects our backend code with the database
const NODE_ENV = process.env.NODE_ENV;
let dbURI = '';

if (NODE_ENV === 'production') dbURI = 'mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@cluster0.le7he.mongodb.net/NewWaveDB?retryWrites=true&w=majority';
else if (NODE_ENV === 'test') dbURI = 'mongodb://localhost:27017/companyDBtest';
else dbURI = 'mongodb://localhost:27017/companyDB';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});

db.on('error', err => console.log('Error' + err));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New socket!');
});

module.exports = server;