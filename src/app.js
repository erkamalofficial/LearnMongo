const express = require('express');
const validator = require('validator');
const app = express();
const mongoose = require('mongoose')

const port = process.env.port || 8000;
const mongoUrl = 'mongodb://127.0.0.1:27017/sample';

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('Connected To MongoDB Successfully.....!') })
    .catch((err) => console.log(err));

// sechem or (table in sql) defines the structure fo document
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  // validation
    },
    age: {
        type: Number,
        required: [true, 'Age in Required'],
    },
    city: String,
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Please Enter Valid Email")
            }
        }
    },
    active: Boolean,
    date: {
        type: Date,
        default: Date.now
    }
})
// collection (Model in sql) creation 
const User = new mongoose.model('User', userSchema)


const createDocument = async () => {
    try {
        // Create document
        const data = new User({
            name: "Sanjeev",
            age: 25,
            city: "Dasuya",
            email: 'sanjeevgmail.com',
            active: true,
            
        })
      
        const result = await data.save()
        console.log(result)
    } catch(err) {
        console.log('Insertion error', err)
    }
};

app.get('/', (req, res) => {
    res.send('Welcome to Home Page')
});

app.listen(port, () => {
    console.log(`Server Listening at Port ${port}`)
})