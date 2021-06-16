const express = require('express'),
      userCtrl = require('./controllers/auth');
const massive = require('massive');
const session = require('express-session');
require('dotenv').config();

const {CONNECTION_STRING, SESSION_SECRET, SERVER_PORT} = process.env;

const app = express();

app.use(express.json())
app.use(session ({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 1000*60*60*24*365}
}));

massive({
  connectionString: CONNECTION_STRING,
  ssl: {rejectUnauthorized: false}
}).then(db => {
  app.set('db', db)
  console.log("database connected successfully")
  app.listen(SERVER_PORT, () => {
    console.log(`Server is listening on pizzaport ${SERVER_PORT}`);
  })
}).catch(err => console.log(err));


///// AUTH ENDPOINTS

app.post('/auth/register', userCtrl.register);
app.post('/auth/login', userCtrl.login);
app.get('/auth/account', userCtrl.getUser);
app.post('/auth/logout', userCtrl.logout);