import { Axios } from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
import { useNavigate } from "react-router-dom";

//higher order component is a function that takes a component and returns a new components.
export default function (SpecificComponent, Option, adminRoute = null) {
  //true: 로그인한 유저만 가능, false:로그인 안한 유저만 갈 수 있는 페이지, null:모두 다
  function AuthenticationCheck(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log(response);
        //로그인하지 않은 상태
        if (!response.payload.isAuth) {
          if (Option) {
            navigate("/login");
          }
        } else {
          //로그인 한 상태
          if (adminRoute && !response.payload.isAdmin) {
            //admin이 아닌데 로그인 상태에서 admin페이지에 들어가려 할 때
            alert("당신은 admin이 아닙니다.");
            navigate("landing page");
          } else {
            if (Option === false) {
              navigate("/");
            }
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
