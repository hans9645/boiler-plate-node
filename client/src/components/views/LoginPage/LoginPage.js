import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";

function LoginPage(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault(); //이게 없으면 바로 버튼이 눌러져서 자꾸 리프레시가 됨.
    // console.log("Email", Email);
    // console.log("Password", Password);
    let body = {
      email: Email,
      password: Password,
    };
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        // props.history.push("/");
        navigate("/");
      } else {
        alert(Error, "login error");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label> Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label> Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <br />
        <button>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
