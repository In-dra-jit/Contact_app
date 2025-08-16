const Contact = require('../Modal/contacts.modal');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');


exports.getAllContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // current page
    const limit = 3; // items per page

    const result = await Contact.paginate({}, { page, limit });

    res.render('home', { 
      contacts: result.docs, 
      totalPages: result.totalPages, 
      currentPage: result.page 
    });
  } catch (error) {
    res.status(500).render('500', { message: "Server error while fetching contacts", contacts: [] });
  }
};

exports.showContact = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).render('404', { message: "Invalid ID", contacts: [] });
  }

  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).render('500', { message: "Contact not found", contacts: [] });
    }

    res.render('showcontact', { contact });
  } catch (error) {
    res.status(500).render('500', { message: "Server error while fetching contact", contacts: [] });
  }
};

// Show add contact form
exports.renderAddForm = (req, res) => {
  res.render('addcontact', { contact: null ,errors: {}});
};

// exports.addContact = async (req, res) => {
//   const { name, email, phone } = req.body;
//   try {
//     await Contact.create({ name, email, phone });
//     res.redirect('/');
//   } catch (error) {
//     res.status(500).render('500', { message: "Error adding contact", contacts: [] });
//   }
// };


exports.addContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorObj = {};
    errors.array().forEach(err => {
      errorObj[err.param] = err.msg;
    });
    return res.render('addcontact', {
      contact: req.body,
      errors: errorObj
    });
  }

  const { name, email, phone } = req.body;
  try {
    await Contact.create({ name, email, phone });
    res.redirect('/');
  } catch (error) {
    res.status(500).render('500', { message: "Error adding contact", contacts: [] });
  }
};


exports.renderUpdateForm = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).render('500', { message: "Contact not found", contacts: []});
    }
    res.render('updatecontact', { contact,errors:{} } );
  } catch (error) {
    res.status(500).render('500', { message: "Error loading update form", contacts: [] });
  }
};

// exports.updateContact = async (req, res) => {
//   const { name, email, phone } = req.body;
//   try {
//     await Contact.findByIdAndUpdate(req.params.id, { name, email, phone });
//     res.redirect('/');
//   } catch (error) {
//     res.status(500).render('500', { message: "Error updating contact", contacts: [] });
//   }
// };

exports.updateContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorObj = {};
    errors.array().forEach(err => {
      errorObj[err.param] = err.msg;
    });
    return res.render('updatecontact', {
      contact: { ...req.body, _id: req.params.id },
      errors: errorObj
    });
  }

  const { name, email, phone } = req.body;
  try {
    await Contact.findByIdAndUpdate(req.params.id, { name, email, phone });
    res.redirect('/');
  } catch (error) {
    res.status(500).render('500', { message: "Error updating contact", contacts: [] });
  }
};



exports.deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (error) {
    res.status(500).render('500', { message: "Error deleting contact", contacts: [] });
  }
};
