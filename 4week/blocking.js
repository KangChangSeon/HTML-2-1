const http = require("http");
const fs = require("fs");
const server = http.createServer((req,res)=>{
    if(req.url === "/home"){
        res.end(" home");
    }
    else if (req.url ==="/about"){
        for (let i = 0; i < 1000; i++){
            for (let j = 0; j < 1000; j++){
                console.log(`${i} ${j}`);
            }
        }
        res.end("about");
    }
    else{
        res.end("not found");
    }
});
server.listen(3000,()=>{
    console.log("3000qjs 포트 실행중")
})