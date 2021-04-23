require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')
const jwt = require('jsonwebtoken')

const Student = require('./Models/students')
const studentRouter = require('./routers/student')
const loginRouter = require('./routers/login')
require('./db/connection');

app.use(cors())

const port = process.env.PORT || 8000;
app.use(express.json())
app.use(studentRouter)
app.use(loginRouter)

console.log(process.env.SECRET_KEY)

// const createToken = async () => {
//    const token = await jwt.sign({_id: '601fa70f7982ff589c350706'}, 'Samplensnsknfkanfakfnaklssafsgfs', {
//        expiresIn: '2s'
//    })
//    console.log(token)

//    const tokenVerify = await jwt.verify(token, 'Samplensnsknfkanfakfnaklssafsgfs')
//    console.log(tokenVerify)
// }


// createToken('kamal')




app.listen(port, () => {
    console.log(`Server Listening at Port ${port}`)
})