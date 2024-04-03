// const fs = require("fs");
// let files = fs.readdirSync("./");
// console.log(files);
// console.log("End")
// //파일 내용이 출력되고 End 출력 됨.//
// //동기 처리//
//
// const fs = require("fs");
// let files = fs.readdir("./",(err,files) => {
//     if(err){
//         console.error(err);
//     }
//     console.log(files);
// })
// console.log("End");
// //이렇게 출력하면 End가 먼저 출력된다.//
// //비동기 처리 콜백 함수//
//
// const fs = require("fs").promises;
// fs.readdir("./")
// .then((result)=> console.log(result))
// .catch((err)=>console.log(err));
//
// const fs = require("fs").promises;
// async function readDirAsync(){
//     try{
//         const files = await fs.readdir("./");
//         console.log(this);
//         console.log("End")
//     }
//     catch{
//         console.log(err);
//     }
// }
// readDirAsync();
// //함수를 불러서 실행 시키는 형식
// //async로 하는 형식