const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle GET request for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Port Number
const PORT = process.env.PORT || 5000;

// Server Setup
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
