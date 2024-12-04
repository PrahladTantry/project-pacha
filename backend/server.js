const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/dictionary', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Dictionary Schema
const dictionarySchema = new mongoose.Schema({
  headword: String,
  pos: String,
  sense: [String]
});

const Dictionary = mongoose.model('Entry', dictionarySchema);

// Search Route with Bidirectional Search
app.get('/api/search', async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query || query.trim() === '') {
      return res.json([]);
    }

    // Create case-insensitive regex search
    const searchRegex = new RegExp(query.trim(), 'i');

    // Perform search in both headword and sense
    const results = await Dictionary.find({
      $or: [
        { headword: searchRegex },
        { sense: searchRegex }
      ]
    }).limit(20);

    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Server error during search' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});