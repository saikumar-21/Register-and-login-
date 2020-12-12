const express = require('express');
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
mongoose.connect('mongodb://localhost/register', { useNewUrlParser: true }, 
{ useUnifiedTopology: true });
const port = 4000;


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const user = mongoose.model('User', userSchema);


app.use('/static', express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


/////////GET REQUESTS/////////

app.get('/', function (req, res) {
  res.status(200).render('home.pug');
});

app.get('/register', (req, res) => {
  res.status(200).render('register.pug');
});

app.get('/login', (req, res) => {
  res.status(200).render('login.pug');
});

app.get('http://localhost:3000', (req, res) => {
  res.status(200).render('index.pug');
});

//////////POST REQUESTS//////////////

app.post('/register', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new user({
    name: name,
    email: email,
    password: password
  });
  newUser.save().then(() => {
    res.send('Succesfully registered');
  });
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  user.findOne({ email: email }, (err, foundresults) => {
    if (err) {
      console.log(err);
    }else{
      if(foundresults.password == password) {
        res.status(200).render('log-pass.pug')
      }else{
        res.send('Incorrect email-id or password');
      }
    }
  });
});

app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
  });