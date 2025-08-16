//  const express=require("express")
//  const app=express()
//  const mongoose=require('mongoose');
//  const contact=require("./Modal/contacts.modal")
//  //DBconnection 
//  mongoose.connect('mongodb://127.0.0.1:27017/contact-crud')
//  .then(()=>console.log("Database is connected"))


// //Middleware
// app.set('view engine','ejs');
// app.use(express.urlencoded({extended:false}))
// app.use(express.static('public'))


//  //Routes
//  app.get('/',async(req,res)=>{
//    const contacts= await contact.find()
//    //res.json(contacts)->api jono eta
//    res.render('home',{contacts})

// })
//  app.get('/show-contact/:id', async (req, res) => {
//   const id = req.params.id;
//   const contactData = await contact.findById(id);
//   res.render('showcontact', { contact: contactData });
// });

//  app.get('/add-contact', (req, res) => {
//   res.render('addcontact', { contact: null }); // for adding new
// });

// app.post('/add-contact', async (req, res) => {
//   const { name, email, phone } = req.body;
//   await contact.create({ name, email, phone });
//   res.redirect('/');
// });
// app.get('/update-contact', async (req, res) => {
//   const id = req.query.id;
//   const contactData = await contact.findById(id);
//   res.render('addcontact', { contact: contactData });
// });
// app.post('/update-contact/:id', async (req, res) => {
//   const id = req.params.id;
//   const { name, email, phone } = req.body;
//   await contact.findByIdAndUpdate(id, { name, email, phone });
//   res.redirect('/');
// });
//  app.post('/delete-contact/:id', async (req, res) => {
//   const id = req.params.id;
//   await contact.findByIdAndDelete(id);
//   res.redirect('/');
// });

//  const port=3000
//  app.listen(port,()=>{
//     console.log(`Running at localhost:${port}`);
    
//  })
const express = require('express');
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contacts.route');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/contact-crud')
.then(()=>console.log("Database is connected"))


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', contactRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
