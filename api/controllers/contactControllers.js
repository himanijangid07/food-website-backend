const Contact = require('../models/Contact')

const formData = async(req, res) => {
    const {name, email, subject, message} = req.body;
    try {
        const contact = await Contact.create({
            name, email, subject, message
        })
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getFormByEmail = async(req, res) => {
    try {
        const email = req.query.email;
        const query = {email: email};
        const result = await Contact.find(query).exec();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    formData,
    getFormByEmail
}