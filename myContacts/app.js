const express = require("express");
const dbConnect = require("./config/dbConnect");
const path = require("path");
const app = express();
const port = 3000;
dbConnect();

const requestTime = (req,res,next)=>{
    let today = new Date();
    let now = today.toLocaleTimeString();
    req.requestTime = now;
    next();
};

app.use(requestTime);

// const logger = (req,res,next)=>{
//     console.log("user logged");
//     next();
// };

//app.use(logger);

app.get("/",(req,res)=>{
    const responseText = `hello node \n 요청시간: ${req.requestTime}`;
    res.set("Content-type","text/plain");
    res.send(responseText);

});

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/contacts",require("./routes/contactRoutes"));

app.listen(port,()=>{
    console.log(`${port}번 포트에서 실행중`);
});