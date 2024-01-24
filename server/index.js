import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import mongoose from 'mongoose';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
}));

connectDB();

const urlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  redirectURL: {
    type: String,
    required: true,
  },
  visitHistory: [{ timestamp: { type: Number } }],
});

const URL = mongoose.model("url", urlSchema);

app.post('/api/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  const shortUrl = Math.random().toString(36).substring(2, 7);

  try {
    const newURL = new URL({
      shortId: shortUrl,
      redirectURL: originalUrl,
    });
    await newURL.save();
    return res.status(201).json({ shortUrl });
  } catch (error) {
    console.error('Error creating URL:', error);
    res.status(500).send('Error creating short URL');
  }
});

app.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;

  try {
    // Find the URL document by shortId
    const foundURL = await URL.findOne({ shortId: shortUrl });

    // Redirect to the redirectURL
    if (foundURL) {
      res.redirect(foundURL.redirectURL);
    } else {
      res.status(404).send('URL not found');
    }
  } catch (error) {
    console.error('Error finding URL:', error);
    res.status(404).send('URL not found');
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
});
