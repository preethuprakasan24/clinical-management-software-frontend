import React, { useContext } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import { addTreatmentApi} from "../services/allApi";
import { addTreatmentContext } from "../context/ContextShare";

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

function AddTreatment() {
  const {setTreatmentResponse} = useContext(addTreatmentContext)
  const [treatment, setTreatment] = useState({
    name: "",
    cost: "",
    description: "",
  });
  console.log(treatment);

  

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setTreatment({
      name: "",
      cost: "",
      description: "",
    });
  };
  const handleShow = () => setShow(true);

  const handleTreatment = async () => {
    const result = await addTreatmentApi(treatment);
    console.log(result);
    setTreatmentResponse(result.data)
    handleClose()
  };

  
  return (
    <>
      <div className="d-flex justify-content-center">
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <button
          className="btn rounded-0 text-light"
          onClick={handleShow}
          style={{ backgroundColor: "#1976d2" }}
        >
          Add Treatment
        </button>
      </div>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#1976d2" }}>Add Treatment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row ">
            <div className="col-md-6  ">
              <div className="mb-3 mt-3">
                <input
                  type="text"
                  placeholder="Name"
                  value={treatment.name}
                  className="form-control"
                  onChange={(e) =>
                    setTreatment({ ...treatment, name: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={treatment.description}
                  placeholder="Description"
                  className="form-control"
                  onChange={(e) =>
                    setTreatment({ ...treatment, description: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3 mt-3">
                <input
                  type="text"
                  value={treatment.cost}
                  placeholder="Cost"
                  className="form-control"
                  onChange={(e) =>
                    setTreatment({ ...treatment, cost: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="info" onClick={handleTreatment}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddTreatment;
