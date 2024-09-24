import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobile, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import AddPatient from "../components/AddPatient";
import { useNavigate } from "react-router-dom";
import {
  getAllPatientApi,
  removePatientApi,
  searchAllPatientApi,
} from "../services/allApi";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import {
  addResponseContext,
  editPatientContext,
  getIndividualPatientContext,
} from "../context/ContextShare";
import EditPatient from "../components/EditPatient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
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

function Patients() {
  const navigate = useNavigate();
  const { editResponse } = useContext(editPatientContext);
  const { addResponse } = useContext(addResponseContext);
  const [allPatients, setAllPatients] = useState([]);
  const [individualUser, setIndividualUser] = useState({});
  const [searchKey, setSearchKey] = useState("");
  // const [deleteStatus, setDeleteStatus] = useState(false);
  const { setIndPatientResponse } = useContext(getIndividualPatientContext);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 4;

  const getAllPatients = async () => {
    const result = await getAllPatientApi();
    setAllPatients(result.data);
    setCurrentPage(1); // Reset to first page on fetch
  };

  const searchPatients = async () => {
    const result = await searchAllPatientApi(searchKey);
    setAllPatients(result.data);
    setCurrentPage(1);
  };

  const handleDetails = (item) => {
    setIndividualUser(item);
    setIndPatientResponse(item);
    navigate("/patientinfo");
  };

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = allPatients?.slice(firstIndex, lastIndex);
  const npage = Math.ceil(allPatients?.length / recordsPerPage);
  const numbers = [...Array(npage).keys()].map((n) => n + 1);

  const handleDelete = async (id) => {
    const result = await removePatientApi(id);
    if (result && result.status === 200) {
      getAllPatients();
      // setDeleteStatus(true);
      // toast.success("Deleted successfully")
    } else {
      toast.error("Failed to delete the patient");
    }
  };

  useEffect(() => {
    if (searchKey) {
      searchPatients();
    } else {
      getAllPatients();
    }
  }, [searchKey, addResponse, editResponse]);

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
                  <b>Patients</b>{" "}
                </h2>
                <div className="d-flex justify-content-center">
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search…"
                      value={searchKey}
                      inputProps={{ "aria-label": "search" }}
                      onChange={(e) => setSearchKey(e.target.value)}
                    />
                  </Search>
                  <AddPatient />
                </div>
              </div>
              <div className="col-md-6">
                <img
                  src="https://t3.ftcdn.net/jpg/02/74/72/96/360_F_274729600_073JyJngzhXQ5NbSlDOdjdcFCBJprzqi.jpg"
                  alt=""
                />
              </div>
            </div>

            <div className="p-md-5 p-3 ">
              {records.length > 0 ? (
                records.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 mt-4 rounded-2 d-flex "
                    style={{ backgroundColor: "#F5F5F5" }}
                  >
                    <div>
                      <h5
                        style={{ color: "#000c66" }}
                        onClick={() => handleDetails(item)}
                      >
                        <FontAwesomeIcon icon={faUser} className="me-2" />
                        {item?.firstname}
                      </h5>
                      <span className="ms-4" style={{ color: "#c3c1c1" }}>
                        <FontAwesomeIcon icon={faMobile} className="me-1" />
                        {item?.phone}
                      </span>
                    </div>
                    <div className="d-flex ms-auto align-items-center">
                      {/* <Link>
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          className="ms-3 text-success"
                        />

                      </Link> */}
                      <EditPatient patient={item} />
                      <FontAwesomeIcon
                        onClick={() => handleDelete(item?._id)}
                        icon={faTrash}
                        className="ms-3 text-danger"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p>No patients</p>
              )}
            </div>
          </div>
        </Box>
      </Box>
      {npage > 1 && (
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={prePage}>
                Prev
              </button>
            </li>
            {numbers.map((n) => (
              <li
                className={`page-item ${currentPage === n ? "active" : ""}`}
                key={n}
              >
                <button className="page-link" onClick={() => changeCPage(n)}>
                  {n}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${currentPage === npage ? "disabled" : ""}`}
            >
              <button className="page-link" onClick={nextPage}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
      <ToastContainer autoClose={2000} theme="colored" position="top-center" />
    </>
  );

  function prePage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage < npage) {
      setCurrentPage(currentPage + 1);
    }
  }
}

export default Patients;
