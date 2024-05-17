const express = require("express");
const router = express.Router();
const adminLayout = "../views/layouts/admin";
const adminLayout2 = "../views/layouts/admin-nologout";
const adminLayout3 = "../views/layouts/admin-adduser";
const asynchandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

// 로그인 체크
const checkLogin = (req, res, next) => {
    const token = req.cookies.token; // 쿠키정보 가져오기

    if (!token) {
        res.redirect("/admin");
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.userID = decoded.userID;
        next();
    } catch (error) {
        return res.redirect("/admin");
    }
};

router.get(
    "/admin", 
    (req, res) => {
    const locals = {
        title: "관리자 페이지",
    };

    res.render("admin/index", { locals, layout: adminLayout2 })
});


router.get("/register", asynchandler(async (req, res) => {
    res.render("admin/register", { layout: adminLayout3 });
}));

router.post("/register", asynchandler(async (req, res) => {
    const { username, password } = req.body;

    // 사용자 이름 중복 체크
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: "이미 존재하는 사용자 이름입니다." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        password: hashedPassword,
    });

    // 로그인 페이지로 리다이렉트
    res.redirect("/admin");
}));


router.post(
    "/admin",
    asynchandler(async (req, res) => {
        const { username, password } = req.body;


// 사용자 이름으로 사용자 찾기
const user = await User.findOne({ username });

// 일치하는 사용자가 없으면 401 오류 표시
if (!user) {
    return res.status(401).json({ messeage: "일치하는 사용자가 없습니다."});
}

// 입력한 비밀번호와 DB에 저장된 비밀번호 비교
const isValidPassword = await bcrypt.compare(password, user.password);

// 비밀번호가 일치하지 않으면 401 오류 표시
if (!isValidPassword) {
    return res.status(401).json({ messeage: "비밀번호가 일치하지 않습니다."});
}

// JWT토큰 생성
const token = jwt.sign({ id: user._id}, jwtSecret);

// 토큰을 쿠키에 저장
res.cookie("token", token, { httpOnly: true });

// 로그인에 성공하면 전체 게시물 목록 페이지로 이동
res.redirect("/allPosts");
})
);

router.get(
    "/register", asynchandler(async (req, res) => {
        res.render("admin/index", { layout: adminLayout2 });
    })
);

router.post(
    "/register",
    asynchandler(async (req,res)=>{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            username : req.body.username,
            password : hashedPassword,
        });
        res.json(`user created : ${user}`);
        })
);


router.get("/allPosts",checkLogin,asynchandler(async(req, res) => {
        const locals = {
            title: "전체 게시물",
        };
        const data = await Post.find().sort({updateAt: "desc", createdAt: "desc"});
        res.render("admin/allPosts", {
            locals,
            data,
            layout: adminLayout});
    }));

router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
});


// Get /add, Admin - AddPost
router.get("/add", checkLogin, asynchandler(async (req, res) => {
    const locals ={
        title: "게시물 작성",
    };
    res.render("admin/add", {
        locals,
        layout: adminLayout,
    });
})
);

// Post /add, Admin - Add Post
router.post("/add", checkLogin, asynchandler(async (req, res) => {
    const { title, body } = req.body;

    const newPost = new Post({
        title: title,
        body: body,
    });

    await Post.create(newPost);

    res.redirect("/allPosts");
}));


// GET /edit/:id
// Admin - Edit Post
router.get(
    "/edit/:id", checkLogin, asynchandler(async (req, res) => {
        const locals = { title : "게시물 편집", };

        // id 값을 사용해서 게시물 가져오기
        const data = await Post.findOne({ _id: req.params.id });
        res.render("admin/edit", { locals, data, layout: adminLayout, });
    })
);


// PUT /edit/:id
// Admin - Edit Post

router.put("/edit/:id", checkLogin, asynchandler(async (req, res) => {
    await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        body: req.body.body,
        createdAt: Date.now(),
    });
    // 수정한 후 전체 목록다시 표시하기
    res.redirect("/allPosts");
}));


// DELETE /delete/:id
// Admin - Delete Post
router.delete("/delete/:id", checkLogin, asynchandler(async (req, res) => {
    await Post.deleteOne({ _id: req.params.id });
    res.redirect("/allPosts");
}));



module.exports = router;