const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const { User } = require("./models/User");
const bodyParser = require("body-parser");
const config = require("./config/key");
const { json } = require("body-parser");

//application/x-www-form-lencoded
app.use(bodyParser.urlencoded({ extended: true }));
//application/json
app.use(bodyParser.json());

require("dotenv").config();

mongoose
  .connect(config.mongoURI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    //mongoose 6.0이상부터 자동으로 위 설정이 반영된다. 따라서 필요없어짐.
  })
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post("/register", (req, res) => {
  //회원가입 시 필요한 정보를 client로 부터 받아씀.
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.post("login", (req, res) => {
  //요청된 이메일이 데이터베이스에 있는 지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }

    // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 같은 지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      }
    });

    //비밀번호까지 같다면 토큰 생성.
    user.generateToken((err, user) => {});
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
