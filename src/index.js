const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/app.html'));
});

app.get('/app.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/app.js'));
});

app.listen(3000, () => {
  console.log('The application is listening on port 3000!');
});
