const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new Schema ({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    subject: String,
    message: String
})

const Contacts = mongoose.model("Contact", contactSchema)
module.exports = Contacts;