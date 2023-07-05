/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = {};

db.connection = mongoose.connection;
db.mongoose = mongoose;

db.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

db.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

// Get all directories in the model folder
const modelDirectories = fs
  .readdirSync(__dirname, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

// Scan all directory to get model files and save them in db object
modelDirectories.forEach((modelName) => {
  const modelPath = path.join(__dirname, modelName);
  const capitalizedModelName =
    modelName.charAt(0).toUpperCase() + modelName.slice(1);
  fs.readdirSync(modelPath).forEach((file) => {
    if (file.endsWith('.js')) {
      const filePath = path.join(modelPath, file);
      db[capitalizedModelName] = require(filePath);
    }
  });
});

module.exports = db;
