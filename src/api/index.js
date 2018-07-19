//Dependencies
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const {mongoose} = require('./database');
//Application
const app = express();
//Settings
app.set('port',process.env.PORT ||3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
//Routes
app.use('/api/contact/', require('./routes/contact.routes'));

//Static files
app.use(express.static(path.join(__dirname,'../../public')));

app.listen(app.get('port'), ()=>{
  console.log(`Connected at port ${app.get('port')}`);
})
