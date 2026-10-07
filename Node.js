const express = require('express');
const multer = require('multer');

const app = express();

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

app.post('/upload', upload.single('image'), (req, res) => {
  res.json({
    url: `https://yourdomain.com/uploads/${req.file.filename}`
  });
});

app.use('/uploads', express.static('uploads'));

app.listen(3000);
