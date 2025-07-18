const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL || 'mongodb+srv://danialemayehu32:Nu2eMxAnRaPJuwfY@cluster0.uf7vtue.mongodb.net/';

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

async function mongoConnect() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connected to MongoDB successfully!');
}

async function mongoDisconnect() {
  console.log('Disconnecting from MongoDB...');
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB!');
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
