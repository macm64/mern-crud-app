const express = require('express');
const router = express('router');
const Contact = require('../models/contact');

//Create
router.post('/', async(req,res)=>{
    const {name,lastName,email,contactNumber,age} = req.body;
    const contact =new Contact({name,lastName,email,contactNumber,age});
    await contact.save();
    res.json({status: 'Contact saved'});
});
//Read
//All contacts
router.get('/', async(req,res)=>{
    const contacts = await Contact.find();
    res.json(contacts);
});
router.get('/all', async(req,res)=>{
    const contacts = await Contact.find();
    res.json(contacts);
});
//An specific contact
router.get('/:id', async(req,res)=>{
  const contact = await Contact.findById(req.params.id);
  res.json(contact);
})
//Update
router.put('/:id', async(req,res)=>{
    const {name,lastName,email,contactNumber,age} = req.body;
    const newContact = {name,lastName,email,contactNumber,age};
    await Contact.findByIdAndUpdate(req.params.id,newContact);
    res.json({status:'Contact Updated'});
});
//Delete
router.delete('/:id', async(req,res) =>{
  await Contact.findByIdAndDelete(req.params.id);
  res.json({status:'Contact Deleted'});
});
module.exports = router;
