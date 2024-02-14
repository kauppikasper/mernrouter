const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const contactSchema = require('./models/contactModels')

const CONNECTION_STRING = "mongodb://127.0.0.1:27017/router";

mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  const routerdb = db.collection('routers');

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  app.get('/routers', async (req, res) => {
    try {
      const result = await routerdb.find({}).toArray();
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
});