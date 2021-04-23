const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Email already exist'],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Please Entger Valid Email")
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
        min: 10,
    },
    address: {
        type: String,
        required: true
    }
})

studentSchema.methods.genrateAuthToken = async function() {
    try {
        return jwt.sign({_id: this._id.toString()}, process.env.SECRET_KEY);
    } catch(err) {
        console.log('Token Error Accour', err)
    }
}

// =================Converting password in Hash=====================
studentSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmpassword = this.password;
    }
    next();
})

const Student = new mongoose.model("Student", studentSchema)

module.exports = Student;