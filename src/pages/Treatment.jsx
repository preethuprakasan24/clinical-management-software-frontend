
import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";
import AddTreatment from "../components/AddTreatment";
import { getAllTReatmentApi } from "../services/allApi";
import Table from "react-bootstrap/Table";
import { addTreatmentContext } from "../context/ContextShare";

function Treatment() {
  const [allTreatment, setAllTreatment] = useState([]);
  const{treatmentResponse} = useContext(addTreatmentContext)

  const getAllTreatment = async () => {
    const result = await getAllTReatmentApi();
    setAllTreatment(result.data);
  };
  console.log(allTreatment);

  useEffect(() => {
    getAllTreatment();
  }, [treatmentResponse]);

  return (
    <>
      <Header />
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Box
          component="main"
          sx={{ flexGrow: 1 }}
          className="d-flex justify-content-center align-items-center w-100"
        >
          <div className="w-100 p-md-5">
            <div className="row">
              <div
                className="col-md-6 d-flex  flex-column"
                style={{ marginTop: "100px" }}
              >
                <h2 className="text-center mb-4" style={{ color: "#000080" }}>
                  <b>Treatment</b>{" "}
                </h2>
                <div className="d-flex justify-content-center">
                  <AddTreatment />
                </div>
              </div>
              <div className="col-md-6">
                <img
                  src="https://t3.ftcdn.net/jpg/02/74/72/96/360_F_274729600_073JyJngzhXQ5NbSlDOdjdcFCBJprzqi.jpg"
                  alt=""
                />
              </div>
            </div>

            <div>
              <Table striped className="shadow">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Treatment Name</th>
                    <th>Cost</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {allTreatment?.length > 0 ? (
                    allTreatment?.map((item, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.cost}</td>
                        <td>{item.description}</td>
                      </tr>
                    ))
                  ) : (
                    <p>No data</p>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
}

export default Treatment;
