import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";
import Table from "react-bootstrap/Table";
import Header from "../components/Header";
import { getAllPatientApi } from "../services/allApi";

function Dashboard() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getAllPatientApi();
        console.log(response.data);

        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients", error);
      }
    };

    fetchPatients();
  }, []);

  // Helper function to filter patients by today's date
  const filterTodayPatients = (patients) => {
    const today = new Date();
    return patients.filter((patient) => {
      if (!patient.createdAt) return false; // Check if createdAt exists

      const createdAtDate = new Date(patient.createdAt);
      return (
        createdAtDate.getDate() === today.getDate() &&
        createdAtDate.getMonth() === today.getMonth() &&
        createdAtDate.getFullYear() === today.getFullYear()
      );
    });
  };

  // Filter patients for today
  const todayPatients = filterTodayPatients(patients);

  return (
    <>
      <Header />
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div className="w-100 p-2  mt-md-5">
            <div className="row p-4 text-center" style={{ color: "#000080" }}>
              <h2>
                <b>Dashboard</b>
              </h2>
              <p className="pb-3">
                This displayed data is based on the current date.
              </p>
              <div className="col-md-1"></div>
              <div className="col-md-5 border mx-4 p-5 shadow text-center rounded">
                <h3>
                  <b>Consultation</b>
                </h3>
                <h1>
                  <b>{patients?.length}</b>
                </h1>
              </div>
              <div className="col-md-5 border mx-4 p-5 shadow text-center rounded">
                <h3>
                  <b>Earnings</b>
                </h3>
                <h1>
                  <b>₹ {patients?.length * 500}</b>
                </h1>
              </div>

              {/* <div className="col-md-3 border mx-4 p-5 shadow text-center rounded">
                <h3>
                  <b>New Patients</b>
                </h3>
                <h1>
                  <b>{todayPatients?.length}</b>
                </h1>
              </div> */}

              <div className="col-md-1"></div>
            </div>

            <div className="row p-4 ">
              <h3
                className="text-center mb-4 mt-md-4"
                style={{ color: "#000080" }}
              >
                <b>Daily Register</b>
              </h3>
              <div className="col-md-1"></div>
              <div className="col-md-10 mt-3 d-flex justify-content-center align-items-center">
                <Table
                  striped
                  style={{ width: "100%" }}
                  className="px-3 shadow"
                >
                  <thead>
                    <tr>
                      <th>#</th>

                      <th>Date</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Phone</th>
                      <th>Sex</th>
                      <th>Age</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients?.length > 0 ? (
                      patients.map((patient, index) => (
                        <tr key={patient.id}>
                          <td>{index + 1}</td>

                          <td>{patient?.date}</td>
                          <td>{patient?.firstname}</td>
                          <td>{patient?.lastname}</td>
                          <td>{patient?.phone}</td>
                          <td>{patient?.gender}</td>
                          <td>{patient?.age}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="10" className="text-center">
                          No patient data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
              <div className="col-md-1"></div>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
