const express = require("express");
const router = express.Router();

router
.route("/")
.get((req,res)=>{
    res.status(200).send("contacts page");
})
.post((req,res)=>{
    res.status(201).send("create contacts");
});

router
.route("/:id")
.get((req,res)=>{
    res.status(200).send(`view contact for id : ${req.params.id}`);
})
.put((req,res)=>{
    res.status(200).send(`update contact for id : ${req.params.id}`);
})
.delete((req,res)=>{
    res.status(200).send(`delete contact for id : ${req.params.id}`);
});

module.exports = router;