require('dotenv').config();
const mongoose = require('mongoose');
const Server = require('./models/server');

// Conexión a la base de datos de MongoDB
let dbURI = "mongodb://127.0.0.1:27017/sunset-hunter";
mongoose.connect(dbURI);
let db = mongoose.connection;
db.once("open", function () {
  console.log("Connected to database");
});

const server = new Server();
server.listen();