// console.log("첫번째 처리");
//
// setTimeout(()=>{
//     console.log("두번째 처리");
// }, 0);
//
// console.log("세번째 처리");

const fs = require("node:fs");
fs.readdir("./",(err,files)=>{
    if(err){
        console.error(err);
    }
    console.log(files)
});
console.log("코드 끝")
