const express = require("express");
const router = express.Router();
const mainLayout = "../views/layouts/main.ejs";
const Post = require("../models/Post");
const asynchandler = require("express-async-handler");

router.get(["/", "/home"],
asynchandler(async(req, res) => {
    const locals ={
        title: "Home",
    };

    const data = await Post.find({}); // 데이터 베이스에 있는 데이터 모두 가져오기
    res.render("index", { locals, data, layout: mainLayout });
    })
);

router.get(
    "/post/:id",
    asynchandler(async (req, res) => {
        const data = await Post.findOne({ _id: req.params.id });
        res.render("post", { data, layout: mainLayout });
    })
);


router.get("/about", (res, req) => {
    res.render("about", { layout: mainLayout });
}); 

module.exports = router;


