const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const Student = require('../Models/students')


router.post('/login', async (req, res) => {
    try {
        
        const result = await Student.findOne({email: req.body.email})
        const isMatched = await bcrypt.compare(req.body.password, result.password)
        if(isMatched) {
            const token = await result.genrateAuthToken();
            res.status(200).send(token)
        } else {
            res.status(400).send('Invalid Login Detail')
        }
        
    } catch (err) {
        res.status(400).send('Invalid Login Detail')
    }
});

module.exports = router;