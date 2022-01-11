const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://hans9645:1234@boilerplate.fg2ff.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      //   useCreateIndex: true,
      //   useFindAndModify: false,
      //mongoose 6.0이상부터 자동으로 위 설정이 반영된다. 따라서 필요없어짐.
    }
  )
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
