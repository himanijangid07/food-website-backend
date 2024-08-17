// routes/contact.js

const express = require("express");
const router = express.Router();

const contactController = require("../controllers/contactControllers");
router.post("/", contactController.formData);
router.get("/", contactController.getFormByEmail)

module.exports = router;
