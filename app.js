const express = require('express');
const app = express();
const path = require('node:path');
const assetsPath = path.join(__dirname, 'public');

app.set('views', path.join(__dirname, 'views'));
app.set('views engine', 'ejs');
app.set(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));