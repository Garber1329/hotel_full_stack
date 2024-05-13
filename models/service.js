const mongoose = require("mongoose");
const serviceSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    capacity : {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    imageurl: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
})

const serviceModel = mongoose.model('services', serviceSchema);

module.exports = serviceModel;