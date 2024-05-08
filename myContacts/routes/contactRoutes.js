const express = require("express");
const router = express.Router();
const {
    getAllContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,
    } = require("../controllers/contactController");

router
.route("/")
.get(getAllContacts)
.post(createContact);

router
.route("/:id")
.get(getContact).put(updateContact).delete(deleteContact);

// .get((req,res)=>{
//     
// })
// .put((req,res)=>{
//     
// })
// .delete((req,res)=>{
//     
// });

module.exports = router;