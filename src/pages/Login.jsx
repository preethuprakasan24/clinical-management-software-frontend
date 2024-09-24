import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../services/allApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login({ doctor }) {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  console.log(loginData);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    if (!email || !password) {
      toast.info("please fill the form completely");
    } else {
      const result = await loginApi(loginData);
      console.log(result);
      if (result.status === 200) {
        toast.success("Login Successful");
        setLoginData({
          email: "",
          password: "",
        });
        // sessionStorage.setItem(
        //   "existingUser",
        //   JSON.stringify(result.data.existingUser)
        // );
        // sessionStorage.setItem("token", result.data.token);
        navigate("/dashboard");
      } else {
        toast.error("Account doesn't exist, Please Register");
        setLoginData({
          email: "",
          password: "",
        });
      }
    }
  };

  return (
    <div className="login bgd_a">
      <form action="" className="login__form shadow">
        <h3 className="login__title" style={{ color: "#000080" }}>
          <b>{doctor ? "Doctor!" : "Receiptionist!"}</b>
        </h3>
        <p style={{ textAlign: "center" }}>Sign in To Your Account</p>

        <div className="login__content">
          <div className="login__box">
            <FontAwesomeIcon icon={faEnvelope} className="login__icon" />

            <div className="login__box-input">
              <input
                type="email"
                required
                className="login__input"
                id="login-email"
                placeholder=" "
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
              />
              <label htmlFor="login-email" className="login__label">
                Email
              </label>
            </div>
          </div>

          <div className="login__box">
            <FontAwesomeIcon icon={faLock} className="login__icon" />

            <div className="login__box-input">
              <input
                type="password"
                required
                className="login__input"
                id="login-pass"
                placeholder=" "
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
              <label htmlFor="login-pass" className="login__label">
                Password
              </label>
            </div>
          </div>
        </div>
        <div>
          <button className="login__button" type="button" onClick={handleLogin}>
            Login
          </button>

          {doctor ? (
            <p className="pt-1 text-center">
              Not a{" "}
              <Link
                to={"/login-receptionist"}
                className="text-danger"
                style={{ textDecoration: "none" }}
              >
                Doctor?
              </Link>
            </p>
          ) : (
            <p className="pt-1 text-center">
              Not a{" "}
              <Link
                to={"/login-doctor"}
                className="text-danger"
                style={{ textDecoration: "none" }}
              >
                Receptionist?
              </Link>
            </p>
          )}
          <p className="pt-3 text-center">
            New User? Click Here to{" "}
            <Link
              to={"/register-doctor"}
              className="text-danger"
              style={{ textDecoration: "none" }}
            >
              Register
            </Link>
          </p>
        </div>
      </form>
      <ToastContainer autoClose={2000} theme="colored" position="top-center" />
    </div>
  );
}

export default Login;
