const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.post('/signup', upload.single('license'), (req, res) => {
  const { name, email, password, address, service } = req.body;
  const license = req.file;

  // Here, you would handle the form data, e.g., save it to a database
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Password:', password);
  console.log('Address:', address);
  console.log('Service:', service);
  console.log('License File:', license);

  res.send('Sign-up successful');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});