const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const QuoteModel = require("./models/quote")
const bodyParser = require('body-parser')


dotenv.config();
app.use(cors())


const port = process.env.PORT || 3000 
var mongoUrl = process.env.MONGO_URL


mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
  console.log("Database connected");
});
  app.listen(port, ()=>{
      console.log(`Server is running on port : ${port}`)
  })

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.post('/api/quote', async (req, res) => {
    const newQuote = new QuoteModel({
      quote: req.body.quote,

    });
    newQuote.id++;
    newQuote.save()
    .then(data => {
      console.log('Data saved successfully:', data);
      res.status(200).send('Data saved successfully');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error saving data');
    });
  });

  app.get('/api/quote', async (req, res) => {
    try {
      const allQuotes = await QuoteModel.find();
      res.status(200).json(allQuotes);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching quotes');
    }
  });

