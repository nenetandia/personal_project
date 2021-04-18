const express = require('express');

const path = require('path');
const app = express()
const bodyParser = require('body-parser')

const Connection = require('./config/dbConnect')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

dotenv.config({ path:'././.env' });

app.use(express.static('public'))

app.use(bodyParser.urlencoded ({extended : false}));
app.use(bodyParser.json());

// - - - - - routes - --  --
app.use('/', require('./routes/adminRoute'));
app.use('/', require('./routes/frontRoute'));
// app.use('/', require('./controllers/adminController'));
// app.use('/', require('./controllers/frontController'));

app.use(express.static('public'))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))






app.listen(3001)