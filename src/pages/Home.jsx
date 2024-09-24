import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import background from '../assets/home-banner.webp';

function Home() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <>
      <div
        className="container-fluid d-flex justify-content-center align-items-center flex-column"
        style={{
          width: "100%",
          height: "100vh",

          backgroundImage:
           `url(${background})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
        }}
      >
        <div className="row p-4">
          <div className="col-md-12 text-center">
            <div id="homeHeading" data-aos="fade-down-right">
              <h1
                style={{
                  color: "#000080",
                  fontWeight: "800",
                  fontSize: "80px",
                }}
              >
                Welcome to Wellness Clinic
              </h1>
            </div>
            <h3
              style={{ color: "#000080", fontWeight: "600", fontSize: "30px" }}
            >
              "Empowering Your Practice, Enhancing Patient Care"
            </h3>
            <p
              className="mt-3"
              style={{ color: "#000080", fontWeight: "600", fontSize: "16px" }}
            >
              Manage appointments, streamline patient records, and optimize your
              clinic’s workflow with ease.
              <br /> Your journey to better dental care management starts here!
            </p>
          </div>
        </div>
        <Link to={"/login-doctor"}>
          <button className="btn btn-primary my-4 ">
            Get started <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
          </button>
        </Link>
      </div>
    </>
  );
}

export default Home;
