const mongoose = require('mongoose')

mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log('Connected To MongoDB Successfully.....!')
})
.catch((err) => console.log("No Connection", err));