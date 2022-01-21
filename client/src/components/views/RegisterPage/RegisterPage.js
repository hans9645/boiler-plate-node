import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";

function RegisterPage(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault(); //이게 없으면 바로 버튼이 눌러져서 자꾸 리프레시가 됨.
    // console.log("Email", Email);
    // console.log("Password", Password);

    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인은 같아야합니다.");
    }
    let body = {
      email: Email,
      name: Name,
      password: Password,
    };
    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        // props.history.push("/");가 안되서 밑에 navigate(-1)을 사용했음.
        navigate("/login");
      } else {
        alert("Fail to sign up");
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
        <label> Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />

        <label> Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <label>Confirm Password</label>
        <input
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        />

        <br />
        <button>Login</button>
      </form>
    </div>
  );
}

export default RegisterPage;
