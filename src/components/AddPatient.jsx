import React, { useContext } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addPatientApi } from "../services/allApi";
import { addResponseContext } from "../context/ContextShare";

function AddPatient() {
  const [show, setShow] = useState(false);
  const { setAddResponse } = useContext(addResponseContext);

  const [patientDetails, setPatientDetails] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    date: null,
    phone: "",
    address: "",
    age: "",
    drugAllergy: "",
  });

  console.log(patientDetails);

  const handleClose = () => {
    setShow(false);
    handleClose1();
  };
  const handleShow = () => setShow(true);

  const handleClose1 = () => {
    setPatientDetails({
      firstname: "",
      lastname: "",
      gender: "",
      date: "",
      phone: "",
      address: "",
      age: "",
      drugAllergy: "",
    });
  };

  const handleAdd = async () => {
    const {
      firstname,
      lastname,
      gender,
      date,
      phone,
      address,
      age,
      drugAllergy,
    } = patientDetails;

    if (
      !firstname ||
      !lastname ||
      !gender ||
      !date ||
      !phone ||
      !address ||
      !age ||
      !drugAllergy
    ) {
      toast.info("Please fill the form completely");
    } else {
      const result = await addPatientApi(patientDetails);
      console.log(result);
      setAddResponse(result.data)
      if (result.status === 200) {
        handleClose();
      } else {
        toast.error("patient already exist");
        handleClose();
      }
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <button
          className="btn rounded-0 text-light"
          onClick={handleShow}
          style={{ backgroundColor: "#1976d2" }}
        >
          New Patient
        </button>
      </div>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#1976d2" }}>Add Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row ">
            <div className="col-md-6  ">
              <div className="mb-3 mt-3">
                <input
                  type="text"
                  value={patientDetails.firstname}
                  placeholder="Firstname"
                  className="form-control"
                  onChange={(e) =>
                    setPatientDetails({
                      ...patientDetails,
                      firstname: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3 mt-3">
                <input
                  type="text"
                  value={patientDetails.lastname}
                  placeholder="Lastname"
                  className="form-control"
                  onChange={(e) =>
                    setPatientDetails({
                      ...patientDetails,
                      lastname: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3 mt-3">
                <input
                  type="text"
                  value={patientDetails.gender}
                  placeholder="Gender"
                  className="form-control"
                  onChange={(e) =>
                    setPatientDetails({
                      ...patientDetails,
                      gender: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3 mt-3">
                <input
                  type="Date"
                  value={patientDetails.date}
                  placeholder="Age"
                  className="form-control"
                  onChange={(e) =>
                    setPatientDetails({
                      ...patientDetails,
                      date: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3 mt-3">
                <input
                  type="text"
                  value={patientDetails.phone}
                  placeholder="Mobile Number"
                  className="form-control"
                  onChange={(e) =>
                    setPatientDetails({
                      ...patientDetails,
                      phone: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={patientDetails.address}
                  placeholder="Address"
                  className="form-control"
                  onChange={(e) =>
                    setPatientDetails({
                      ...patientDetails,
                      address: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={patientDetails.age}
                  placeholder="Age"
                  className="form-control"
                  onChange={(e) =>
                    setPatientDetails({
                      ...patientDetails,
                      age: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={patientDetails.drugAllergy}
                  placeholder="Drug Allergy (if any)"
                  className="form-control"
                  onChange={(e) =>
                    setPatientDetails({
                      ...patientDetails,
                      drugAllergy: e.target.value,
                    })
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
          <Button variant="info" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={2000} theme="colored" position="top-center" />
    </>
  );
}

export default AddPatient;
