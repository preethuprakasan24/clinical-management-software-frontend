import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "../services/allApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register({ doctor }) {
  const navigate = useNavigate();
  const [docRegister, setDocRegister] = useState({
    firstname: "",
    email: "",
    password: "",
  });

  console.log(docRegister);

  const handleRegister = async (e) => {
    e.preventDefault();
    const { firstname, email, password } = docRegister;
    if (!firstname || !email || !password) {
      toast.info("please fill the details completely");
    } else {
      const result = await registerApi(docRegister);
      console.log(result);
      if (result.status === 200) {
        toast.success("Registration Successful");
        doctor ? navigate("/login-doctor") : navigate("/login-receptionist");
        setDocRegister({
          firstname: "",
          email: "",
          password: "",
        });
      } else {
        toast.error("something went wrong");
        setDocRegister({
          firstname: "",
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
        <p style={{ textAlign: "center" }}>Sign up To Your Account</p>

        <div className="login__content">
          <div className="login__box">
            <FontAwesomeIcon icon={faUser} className="login__icon" />

            <div className="login__box-input">
              <input
                type="text"
                required
                className="login__input"
                id="login-name"
                placeholder=" "
                value={docRegister.firstname}
                onChange={(e) =>
                  setDocRegister({ ...docRegister, firstname: e.target.value })
                }
              />
              <label htmlFor="login-email" className="login__label">
                Firstname
              </label>
            </div>
          </div>
          <div className="login__box">
            <FontAwesomeIcon icon={faEnvelope} className="login__icon" />

            <div className="login__box-input">
              <input
                type="email"
                required
                className="login__input"
                id="login-email"
                placeholder=" "
                value={docRegister.email}
                onChange={(e) =>
                  setDocRegister({ ...docRegister, email: e.target.value })
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
                value={docRegister.password}
                onChange={(e) =>
                  setDocRegister({ ...docRegister, password: e.target.value })
                }
              />
              <label htmlFor="login-pass" className="login__label">
                Password
              </label>
            </div>
          </div>
        </div>
        <div>
          <button
            className="login__button"
            type="button"
            onClick={handleRegister}
          >
            Register
          </button>
          {doctor ? (
            <p className="pt-1 text-center">
              Not a{" "}
              <Link
                to={"/register-receptionist"}
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
                to={"/register-doctor"}
                className="text-danger"
                style={{ textDecoration: "none" }}
              >
                Receptionist?
              </Link>
            </p>
          )}
          <p className="pt-3 text-center">
            Already a User? Click here to{" "}
            <Link
              to={"/login-doctor"}
              className="text-danger"
              style={{ textDecoration: "none" }}
            >
              Login
            </Link>
          </p>
        </div>
      </form>
      <ToastContainer autoClose={2000} theme="colored" position="top-center" />
    </div>
  );
}

export default Register;
