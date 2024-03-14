const fs = require('node:fs');
const express = require('express');
const { ensureImageExists } = require('./resize-image.js');
var cors = require('cors');

const app = express();
const port = 3000;

var corsOptions = {
  origin: 'http://localhost.com',
  optionsSuccessStatus: 200,
};

app.get('/', cors(corsOptions), (req, res) => {
  res.send('Hello World!');
});

app.get('/image', async (req, res) => {
  let filePath;
  try {
    filePath = await ensureImageExists(req.query.filebase, req.query.width, req.query.height, req.query.quality);
  } catch (err) {
    res.send(err.message);
    return;
  }
  let fileStream = fs.createReadStream(filePath);
  fileStream.on('open', () => {
    res.set('Content-Type', 'image/webp');
    res.set('Cache-Control', 'public, max-age=31536000');
    fileStream.pipe(res);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at ${port}`);
});
