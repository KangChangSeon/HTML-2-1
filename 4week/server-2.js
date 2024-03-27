const http = require("http");

const server = http.createServer((req, res) =>{
    // console.log(req.method);
    res.setHeader("Context-Type", "text/plain");
    res.write("hello node...");
    res.end();
});

server.listen(3000, ()=>{
    console.log("3000번 포트에서 서버 실행중");
})