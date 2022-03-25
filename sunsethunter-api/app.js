require('dotenv').config();
const mongoose = require('mongoose');
const Server = require('./models/server');

// Conexión a la base de datos de MongoDB
let dbURI = "mongodb+srv://sunset-hunter:sunset-hunter@cluster0.a2saa.mongodb.net/sunset-hunter?retryWrites=true&w=majority";

mongoose.connect(dbURI);
let db = mongoose.connection;
db.once("open", function () {
  console.log("Connected to database");
});

const server = new Server();
server.listen();