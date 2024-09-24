import React, { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";
import Header from "../components/Header";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import AddAppointment from "../components/AddAppointment";
import { deleteAppointmentApi, getAllAppointmentApi } from "../services/allApi";
import SearchIcon from "@mui/icons-material/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import EditAppointment from "../components/EditAppointment";
import {
  addAppointmentContext,
  editAppointmentContext,
} from "../context/ContextShare";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  border: "1px solid #1976d2",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#1976d2",
}));

function Appointments() {
  const { addAppointmentResponse } = useContext(addAppointmentContext);
  const { editAppointmentResponse } = useContext(editAppointmentContext);
  const [appointmentRes, setAppointmentRes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getAllAppointments = async () => {
    const result = await getAllAppointmentApi();
    setAppointmentRes(result.data);
  };

  const handleDelete = async (id) => {
    const result = await deleteAppointmentApi(id);
    if (result.status === 200) {
      console.log("deleted successfully");
      getAllAppointments();
    }
  };

  useEffect(() => {
    getAllAppointments();
  }, [addAppointmentResponse, editAppointmentResponse]);

  const filteredAppointments = appointmentRes.filter((appointment) =>
    appointment.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header />
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div style={{ margin: "50px" }}>
            <div className="row">
              <div
                className="col-md-6 d-flex  flex-column"
                style={{ marginTop: "100px" }}
              >
                <h2 className="text-center mb-4" style={{ color: "#000080" }}>
                  <b>Appointments</b>{" "}
                </h2>
                <div className="d-flex justify-content-center">
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search by status"
                      inputProps={{ "aria-label": "search" }}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </Search>
                  <AddAppointment />
                </div>
              </div>
              <div className="col-md-6">
                <img
                  src="https://img.freepik.com/free-vector/appointment-booking-with-calendar_52683-39831.jpg"
                  alt=""
                />
              </div>
            </div>

            <div>
              <Table striped className="shadow">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Treatment</th>
                    <th>Status</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments?.length > 0 ? (
                    filteredAppointments?.map((item, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.ptName}</td>
                        <td>{item.date}</td>
                        <td>{item.time}</td>

                        <td>{item.ptTreat}</td>
                        <td
                          style={{
                            color:
                              item.status === "pending" ? "orange" : "green",
                          }}
                        >
                          <b>{item.status}</b>
                        </td>
                        <td>
                          <EditAppointment appointment={item} />
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="ms-3 text-danger"
                            onClick={() => handleDelete(item?._id)}
                          />
                        </td>
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

export default Appointments;
