// const express = require("express");
// const path = require("path");
// const app = express();
// const port = 3000;

// app.get("/",(req,res)=>{
//     res.status(200);
//     res.send("Hello Node!");
//     // res.json({message:"hello node!!"});
// });
// // 모든 연락처 가져오기
// app.get("/contact",(req,res)=>{
//     res.status(200).send("Contacts Page");
//     // res.sendFile(__dirname+"/assets/contact.html");
// });
// // 새 연락처 추가하기
// app.post("/contact",(req, res)=>{
//     res.status(201).send("Create Contacts");
// });
// // 연락처 상세보기
// app.get("/contact/:id",(req, res)=>{
//     res.status(200).send(`View Contact for ID :${req.params.id}`);
// });
// // 연락처 수정하기
// app.put("/contact/:id",(req, res)=>{
//     res.status(200).send(`Update Contact for ID :${req.params.id}`);
// });
// // 연락처 삭제하기
// app.delete("/contact/:id",(req, res)=>{
//     res.status(200).send(`Delete Contact for ID :${req.params.id}`);
// });

// app.listen(port,()=>{
//     console.log(`${port}번 포트에서 서버 실행 중`);
// });
