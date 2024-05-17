const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// 스키마를 모델로 변환한 후 내보내기
module.exports = mongoose.model("User", userSchema);
