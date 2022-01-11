const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, //공백을 알아서 제거해주는 역할
    uniqe: 1,
  },
  passwod: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0, //관리자(1)와 일반유저(0)
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);
//schema는 모델로 감싸줘야한다.

module.exports = { User };
