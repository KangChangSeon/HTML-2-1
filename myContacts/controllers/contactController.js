const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc Get All contacts
// @route GET /contacts
const getAllContacts = asyncHandler(async(req,res)=>{
    const contacts = await Contact.find();
        res.status(200).send(contacts); 
});

// @desc Create a contact
// @route POST /contacts
const createContact = asyncHandler(async(req,res)=>{
    console.log(req.body);
    const { name, email, phone } = req.body;
    if(!name || !email || !phone){
        return res.status(400).send("필수값 미입력");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
    });
    res.status(201).send("create contacts");
});

// @desc Get contact
// @route GET /contacts/:id
const getContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    res.status(200).send(contact);
});

// @desc Update contact
// @route PUT /contacts/:id
const updateContact = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    const {name,email,phone} = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(
        id,
        {name,email,phone},
        {new: true}
    );
    res.status(200).send(updatedContact); 
});

// @desc Delete contact
// @route DELETE /contacts/:id
const deleteContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not fonud");
    }
    await Contact.deleteOne();
    res.status(200).send(`delete contact for id : ${req.params.id}`);
});

module.exports = {
    getAllContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact 
};