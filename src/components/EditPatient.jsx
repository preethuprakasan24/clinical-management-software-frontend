import React, { useContext, useState } from "react";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editPatientApi } from "../services/allApi";
import { editPatientContext } from "../context/ContextShare";

function EditPatient({ patient }) {
  console.log(patient);
  const { setEditResponse } = useContext(editPatientContext);
  const [patientDetails, setPatientDetails] = useState({
    firstname: patient.firstname,
    lastname: patient.lastname,
    gender: patient.gender,
    date: patient.date,
    phone: patient.phone,
    address: patient.address,
    age: patient.age,
    drugAllergy: patient.drugAllergy,
  });

  // console.log(patientDetails);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    handleClose1();
  };
  const handleShow = () => setShow(true);

  const handleClose1 = () => {
    setPatientDetails({
      firstname: patient.firstname,
      lastname: patient.lastname,
      gender: patient.gender,
      date: patient.date,
      phone: patient.phone,
      address: patient.address,
      age: patient.age,
      drugAllergy: patient.drugAllergy,
    });
  };

  const handleEdit = async () => {
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
      //api
      const result = await editPatientApi(patient._id, patientDetails);
      setEditResponse(result.data);
      if (result.status === 200) {
        handleClose();
      }
    }
  };
  return (
    <div>
      <FontAwesomeIcon
        icon={faPenToSquare}
        className="text-info"
        onClick={handleShow}
      />

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#1976d2" }}>Edit Patient</Modal.Title>
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
                  placeholder="Date"
                  className="form-control"
                  onChange={(e) =>
                    setPatientDetails({
                      ...patientDetails,
                      age: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3 mt-3">
                <input
                  value={patientDetails.phone}
                  type="text"
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
                  value={patientDetails.address}
                  type="text"
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
                  value={patientDetails.age}
                  type="text"
                  placeholder="Age"
                  className="form-control"
                  onChange={(e) =>
                    setPatientDetails({
                      ...patientDetails,
                      occupation: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <input
                  value={patientDetails.drugAllergy}
                  type="text"
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
          <Button variant="secondary" onClick={handleClose1}>
            Cancel
          </Button>
          <Button variant="info" onClick={handleEdit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={2000} theme="colored" position="top-center" />
    </div>
  );
}

export default EditPatient;
