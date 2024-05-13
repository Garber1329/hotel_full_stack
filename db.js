const mongoose = require('mongoose');

var mongoURL = "mongodb+srv://garber1329:1234qwer@cluster0.uj9irtp.mongodb.net/hotel";

mongoose.connect(mongoURL, {useUnifiedTopology: true, useNewUrlParser: true});

var connection = mongoose.connection;

connection.on('error', ()=>{
    console.log('Mongo DB Connection failed')
})

connection.on('connected', ()=>{
    console.log('Mongo DB Connection Successful')
})
module.exports = mongoose;