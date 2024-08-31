// Requiring module
const express = require('express');

// Creating express object
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'views')));

// // Handling GET request
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/views', 'index.html'));
// });

// Port Number
const PORT = process.env.PORT ||5000;

// Server Setup
app.listen(PORT,console.log(
  `Server started on port ${PORT}`));