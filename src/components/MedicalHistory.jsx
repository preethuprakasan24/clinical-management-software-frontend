import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addMedicalHistoryApi, getMedicalHistoryApi } from "../services/allApi";
import { getIndividualPatientContext } from "../context/ContextShare";

function MedicalHistory() {
  const { indPatientResponse } = useContext(getIndividualPatientContext);
  // console.log(indPatientResponse._id);

  const [history, setHistory] = useState({
    goodHealth: "",
    medication: "",
    operation: "",
    allergy: "",
    diabetic: "",
    pressure: "",
    heart: "",
  });

  // console.log(history);

  // const [response, setResponse] = useState([]);
  const [rxData, setRxData] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    handleClose1();
  };
  const handleShow = () => setShow(true);

  const handleClose1 = () => {
    setHistory({
      goodHealth: "",
      medication: "",
      operation: "",
      allergy: "",
      diabetic: "",
      pressure: "",
      heart: "",
    });
  };

  const handleAdd = async () => {
    const {
      goodHealth,
      medication,
      operation,
      allergy,
      diabetic,
      pressure,
      heart,
    } = history;
    if (
      !goodHealth ||
      !medication ||
      !operation ||
      !allergy ||
      !diabetic ||
      !pressure ||
      !heart
    ) {
      toast.info("please fill the form completely");
    } else {
      try {
        const result = await addMedicalHistoryApi(
          indPatientResponse._id,
          history
        );
        console.log(result.data);

        // toast.success("added successfully");
        setRxData((prevData) => ({
          ...prevData,
          goodHealth,
          medication,
          operation,
          allergy,
          diabetic,
          pressure,
          heart,
        }));
        handleClose();
      } catch (error) {
        toast.error("Failed to add medical history");
        console.error(error);
      }
    }
  };

  const getTreatmentHistory = async () => {
    if (indPatientResponse && indPatientResponse._id) {
      const result = await getMedicalHistoryApi(indPatientResponse._id);

      setRxData(result.data);
    }
  };

  useEffect(() => {
    getTreatmentHistory();
  }, []);

  useEffect(() => {
    console.log("Updated progress data:", rxData);
  }, [rxData]);

  return (
    <>
      <div className="row mt-2 p-md-5 ">
        <div className="col-md-12 bg-primary rounded">
          <div className="d-flex justify-content-between pt-3">
            <h4 className="text-light">Medical History</h4>
            <FontAwesomeIcon
              onClick={handleShow}
              icon={faUserPen}
              size="xl"
              className="me-5"
              style={{ color: "white" }}
            />
          </div>
          <div className="d-flex justify-content-between me-5 pt-3 text-light">
            <div className="p-1">
              <p style={{ fontSize: "17px" }}>Are you in good health?</p>
              <p style={{ fontSize: "17px" }}>Are you taking any medication?</p>
              <p style={{ fontSize: "17px" }}>
                Have you ever had surgical operation?
              </p>
              <p style={{ fontSize: "17px" }}>
                Are you allergic to any medicine?
              </p>
              <p style={{ fontSize: "17px" }}>Are you a diabetic?</p>
              <p style={{ fontSize: "17px" }}>
                Do you have high blood pressure or any related conditions?
              </p>
              <p style={{ fontSize: "17px" }}>
                Have you ever had any heart related issues?
              </p>
            </div>

            <div className="p-1">
              <p style={{ fontSize: "15px", paddingTop: "3px" }}>
                {rxData?.goodHealth}
              </p>
              <p style={{ fontSize: "15px", paddingTop: "3px" }}>
                {rxData?.medication}
              </p>
              <p style={{ fontSize: "15px", paddingTop: "3px" }}>
                {rxData?.operation}
              </p>
              <p style={{ fontSize: "15px", paddingTop: "3px" }}>
                {rxData?.allergy}
              </p>
              <p style={{ fontSize: "15px", paddingTop: "3px" }}>
                {rxData?.diabetic}
              </p>
              <p style={{ fontSize: "15px", paddingTop: "3px" }}>
                {rxData?.pressure}
              </p>
              <p style={{ fontSize: "15px", paddingTop: "3px" }}>
                {rxData?.heart}
              </p>
            </div>
          </div>
        </div>
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
                  value={history.goodHealth}
                  placeholder="Are you in good health?"
                  className="form-control"
                  onChange={(e) =>
                    setHistory({ ...history, goodHealth: e.target.value })
                  }
                />
              </div>
              <div className="mb-3 mt-3">
                <input
                  type="text"
                  value={history.medication}
                  placeholder="Are you taking any medication?"
                  className="form-control"
                  onChange={(e) =>
                    setHistory({ ...history, medication: e.target.value })
                  }
                />
              </div>
              <div className="mb-3 mt-3">
                <input
                  type="text"
                  value={history.operation}
                  placeholder="Have you ever had surgical operation?"
                  className="form-control"
                  onChange={(e) =>
                    setHistory({ ...history, operation: e.target.value })
                  }
                />
              </div>
              <div className="mb-3 mt-3">
                <input
                  type="text"
                  value={history.allergy}
                  placeholder="Are you allergic to any medicine?"
                  className="form-control"
                  onChange={(e) =>
                    setHistory({ ...history, allergy: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3 mt-3">
                <input
                  type="text"
                  value={history.diabetic}
                  placeholder="Are you a diabetic?"
                  className="form-control"
                  onChange={(e) =>
                    setHistory({ ...history, diabetic: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={history.pressure}
                  placeholder="Do you have high blood pressure?"
                  className="form-control"
                  onChange={(e) =>
                    setHistory({ ...history, pressure: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={history.heart}
                  placeholder="Have you ever had any heart related issues?"
                  className="form-control"
                  onChange={(e) =>
                    setHistory({ ...history, heart: e.target.value })
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
          <Button variant="info" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={2000} theme="colored" position="top-center" />
    </>
  );
}

export default MedicalHistory;
