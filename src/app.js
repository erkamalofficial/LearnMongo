const express = require('express');
const app = express();
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/sample', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('Connected to MongoDB Successfully') })


const port = process.env.port || 8000;


app.get('/', (req, res) => {
    res.send('Welcome To Home Page')
});

app.listen(port, () => {
    console.log(`Server Listening At Port ${port}`)
})