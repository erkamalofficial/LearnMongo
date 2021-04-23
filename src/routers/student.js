const express = require('express');

const router = express.Router();
const Student = require('../Models/students')


// ---------------------------- Post ---------------------------------
router.post('/student', async (req, res) => {
    try {
        if (req.body.password === req.body.confirmpassword) {
            const user = new Student(req.body)
            
            const token = await user.genrateAuthToken();
            res.cookie('jwt', token, {
                expires: new Date(Date.now(), 30000),
                httpOnly: true
            })

            const result = await user.save();
            res.status(201).send(token)
        } else {
            res.status(400).send("Password and Confirm Password does not Match")
        }

    } catch (err) {
        res.status(400).send(err)
    }
});

// ---------------------------- Get ---------------------------------
router.get('/student', async (req, res) => {
    try {
        const result = await Student.find();
        res.status(201).send(result)
    } catch (err) {
        res.status(400).send(err)
    }
});

// --------------Get indvisual student data ------------------------
router.get('/student/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await Student.findById(_id);
        if (!result) {
            return res.status(404).send();
        } else { res.status(201).send(result) }

    } catch (err) {
        res.status(400).send(err)
    }
});


// ---------------------------- Patch ---------------------------------
router.patch('/student/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await Student.findByIdAndUpdate(_id, req.body, { new: true });
        res.status(201).send(result)

    } catch (err) {
        res.status(400).send(err)
    }
});


// ---------------------------- Delete ---------------------------------
router.delete('/student/:id', async (req, res) => {
    try {
        const result = await Student.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            res.status(400).send()
        }
        res.status(201).send(result)

    } catch (err) {
        res.status(400).send(err)
    }
});

module.exports = router;