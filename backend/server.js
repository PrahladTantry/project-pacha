// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/malayalam_dictionary", { useNewUrlParser: true, useUnifiedTopology: true });

const WordSchema = new mongoose.Schema({
  headword: String,
  pos: [String],
  senses: [String]
});

const Word = mongoose.model('Word', WordSchema);

app.get('/api/search', async (req, res) => {
  const { query } = req.query;
  try {
    const words = await Word.find({ headword: new RegExp(query, 'i') }).limit(10); // Use regex for case-insensitive search
    res.json(words);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(5000, () => console.log("Server is running on http://localhost:5000"));