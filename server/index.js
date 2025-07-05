// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Sample SEO headlines
const headlines = [
  "Why {name} is {location}'s Top Choice in 2025",
  "Discover {name} - {location}'s Hidden Gem",
  "{name}: The Best in {location} for Quality and Service",
  "2025's Must-Visit: {name} in {location}",
  "{name} - Redefining Excellence in {location}",
  "The Ultimate Guide to {name} in {location}",
  "{name}: {location}'s Premier Destination",
  "Why Everyone in {location} is Talking About {name}",
  "{name} - Setting New Standards in {location}",
  "Experience the Best of {location} at {name}"
];

// POST endpoint for business data
app.post('/business-data', (req, res) => {
  const { name, location } = req.body;
  
  if (!name || !location) {
    return res.status(400).json({ error: 'Business name and location are required' });
  }

  // Generate random rating between 3.5 and 5.0
  const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
  // Generate random reviews between 50 and 500
  const reviews = Math.floor(Math.random() * 450) + 50;
  
  // Select a random headline
  const randomHeadline = headlines[Math.floor(Math.random() * headlines.length)];
  const headline = randomHeadline.replace('{name}', name).replace('{location}', location);

  res.json({
    rating: parseFloat(rating),
    reviews,
    headline
  });
});

// GET endpoint to regenerate headline
app.get('/regenerate-headline', (req, res) => {
  const { name, location } = req.query;
  
  if (!name || !location) {
    return res.status(400).json({ error: 'Business name and location are required' });
  }

  const randomHeadline = headlines[Math.floor(Math.random() * headlines.length)];
  const headline = randomHeadline.replace('{name}', name).replace('{location}', location);

  res.json({ headline });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));