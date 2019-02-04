require('dotenv').config();

const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

/**
 *  Database setup
 */
mongoose.connect(
    process.env.MONGO_URL, 
    {
        useNewUrlParser: true,
    }
);

// configurações para o express saber tratar com json e urlenconded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// morga ira controlar os logs de request
app.use(morgan('dev'));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));


app.use(require('./routes'));
// vai ficar ouvindo a porta 3000
app.listen(3000);