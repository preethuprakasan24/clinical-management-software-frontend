import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";
import profileimage from "../assets/profile.png";
import { getIndividualPatientContext } from "../context/ContextShare";
import MedicalHistory from "../components/MedicalHistory";
import { getPatientInfoApi } from "../services/allApi";
import ProgressNotes from "../components/ProgressNotes";

function PatientInfo() {
  const { indPatientResponse } = useContext(getIndividualPatientContext);
  // console.log(indPatientResponse._id);

  const [patientInfo, setPatientInfo] = useState(null);

  const getIndividualPatient = async () => {
    if (indPatientResponse && indPatientResponse._id) {
      const result = await getPatientInfoApi(indPatientResponse._id);
      // console.log(result.data);
      setPatientInfo(result.data);
    }
  };

  // console.log(patientInfo);

  useEffect(() => {
    getIndividualPatient();
  }, [patientInfo]);

  return (
    <>
      <Header />
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <div className="container-fluid p-5">
          <div className="border-bottom">
            {" "}
            <h3 className="py-2 mt-md-5">Patient Info</h3>
          </div>
          <div className="ps-3 mt-4 d-flex align-items-center border-bottom shadow">
            <img
              src={profileimage}
              alt="noimage"
              width={"120px"}
              className="mb-3"
            />
            <h4 className="ms-3">{indPatientResponse.firstname}</h4>
          </div>

          <div
            className="row mt-5 d-flex w-100 justify-content-center "
            height="100vh"
          >
            <div className="col-md-5 bg-primary shadow rounded">
              <div className="d-flex justify-content-between me-5 pt-3 text-light">
                <div className="p-1">
                  <p style={{ fontSize: "17px" }}>Firstname</p>
                  <p style={{ fontSize: "17px" }}>Lastname</p>
                  <p style={{ fontSize: "17px" }}>Gender</p>
                  <p style={{ fontSize: "17px" }}>Date</p>
                </div>
                <div className="p-1">
                  <p style={{ fontSize: "15px", paddingTop: "3px" }}>
                    {patientInfo?.firstname}
                  </p>
                  <p style={{ fontSize: "15px", paddingTop: "3px" }}>
                    {patientInfo?.lastname}
                  </p>
                  <p style={{ fontSize: "15px", paddingTop: "3px" }}>
                    {patientInfo?.gender}
                  </p>
                  <p style={{ fontSize: "15px", paddingTop: "3px" }}>
                    {patientInfo?.date}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-5 bg-secondary shadow">
              <div className="d-flex justify-content-between me-5 pt-3">
                <div>
                  <p style={{ fontSize: "17px" }}>Phone</p>
                  <p style={{ fontSize: "17px" }}>Address</p>
                  <p style={{ fontSize: "17px" }}>Age</p>
                  <p style={{ fontSize: "17px" }}>Record created date</p>
                </div>
                <div>
                  <p style={{ fontSize: "15px", paddingTop: "3px" }}>
                    {patientInfo?.phone}
                  </p>
                  <p
                    style={{
                      fontSize: "15px",
                      paddingTop: "3px",
                    }}
                  >
                    {patientInfo?.address}
                  </p>
                  <p
                    style={{
                      fontSize: "15px",
                      paddingTop: "3px",
                    }}
                  >
                    {patientInfo?.age}
                  </p>
                  <p
                    style={{
                      fontSize: "15px",
                      paddingTop: "3px",
                    }}
                  >
                    Aug 22, 2024
                  </p>
                </div>
              </div>
            </div>
          </div>

          <MedicalHistory />
          <ProgressNotes />
          {/* <div className="row mt-2 p-md-5 ">
            <div className="col-md-12 bg-primary rounded">
              <div className="d-flex justify-content-between pt-3">
                <h4 className="text-light">Progress Notes</h4>
                <FontAwesomeIcon
                  icon={faUserPen}
                  size="xl"
                  className="me-5"
                  style={{ color: "white" }}
                />
              </div>
              <div className="d-flex justify-content-between me-5 pt-3 text-light">
               
                <div className="p-1"></div>
              </div>
            </div>
          </div> */}
        </div>
      </Box>
    </>
  );
}
export default PatientInfo;
