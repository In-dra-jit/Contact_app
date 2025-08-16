const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contacts.controller');
const { body } = require('express-validator');

// Validation rules
const contactValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').matches(/^\d{10}$/).withMessage('Phone must be 10 digits')
];

// Read
router.get('/', contactController.getAllContacts);
router.get('/show-contact/:id', contactController.showContact);

// Create
router.get('/add-contact', contactController.renderAddForm);
router.post('/add-contact', contactValidation, contactController.addContact);

// Update
router.get('/update-contact/:id', contactController.renderUpdateForm);
router.post('/update-contact/:id', contactValidation, contactController.updateContact);

// Delete
router.post('/delete-contact/:id', contactController.deleteContact);

module.exports = router;
