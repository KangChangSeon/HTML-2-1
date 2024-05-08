const express = require("express");
const app = express();
const port = 3000;
const dbConnect = require("./config/dbConnect");
dbConnect();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/contacts",require("./routes/contactRoutes"));



app.get("/",(req,res)=>{
    res.status(200);
    res.send("Hello Node!");
});


app.listen(port,()=>{
    console.log(`${port}번 포트에서 서버 실행 중`);
});