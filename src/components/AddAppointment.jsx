import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import {
  addAppointmentApi,
  getAllPatientApi,
  getAllTReatmentApi,
} from "../services/allApi";
import { addAppointmentContext } from "../context/ContextShare";

function AddAppointment() {
  const { setAddAppointmentResponse } = useContext(addAppointmentContext);
  const [patNames, setPatNames] = useState([]);
  const [show, setShow] = useState(false);
  const [treatmentName, setTreatmentName] = useState([]);

  const [treatData, setTreatData] = useState({
    ptName: "",
    date: "",
    time: "",
    ptTreat: "",
    status: "",
  });

  // console.log(treatData);

  const handleClose = () => {
    setShow(false);
    setTreatData({
      ptName: "",
      date: "",
      time: "",
      ptTreat: "",
      status: "",
    });
  };
  const handleShow = () => setShow(true);

  const getPatientNames = async () => {
    const result = await getAllPatientApi();
    setPatNames(result.data);
  };

  // console.log(patNames);

  const getTreatmmentNames = async () => {
    const result = await getAllTReatmentApi();
    setTreatmentName(result.data);
  };

  const hadleAddAppointment = async () => {
    const result = await addAppointmentApi(treatData);
    setAddAppointmentResponse(result.data);
    handleClose();
  };

  useEffect(() => {
    getPatientNames();
    getTreatmmentNames();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center">
        <button
          className="btn rounded-0 text-light"
          onClick={handleShow}
          style={{ backgroundColor: "#1976d2" }}
        >
          New Appointment
        </button>
      </div>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#1976d2" }}>
            Add Appointment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row ">
            <div className="col-md-6  ">
              <div className="mb-3 mt-3">
                <Form.Select
                  aria-label="Select Patient"
                  value={treatData.ptName}
                  onChange={(e) =>
                    setTreatData({ ...treatData, ptName: e.target.value })
                  }
                >
                  <option value="">Patient</option>
                  {patNames?.length > 0 ? (
                    patNames?.map((item) => (
                      <option key={item._id} value={item.firstname}>
                        {item.firstname}
                      </option>
                    ))
                  ) : (
                    <option disabled>No patients</option>
                  )}
                </Form.Select>
              </div>

              <div className="mb-3 mt-3">
                <input
                  type="time"
                  placeholder="Time"
                  className="form-control"
                  value={treatData.time}
                  onChange={(e) =>
                    setTreatData({ ...treatData, time: e.target.value })
                  }
                />
              </div>
              <div className="mb-3 mt-3">
                <input
                  type="text"
                  placeholder="Status"
                  className="form-control"
                  value={treatData.status}
                  onChange={(e) =>
                    setTreatData({ ...treatData, status: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3 mt-3">
                <input
                  type="date"
                  placeholder="Date"
                  className="form-control"
                  value={treatData.date}
                  onChange={(e) =>
                    setTreatData({ ...treatData, date: e.target.value })
                  }
                />
              </div>
              <div className="mb-3 mt-3">
                <Form.Select
                  aria-label="Select Treatment"
                  value={treatData.ptTreat}
                  onChange={(e) =>
                    setTreatData({ ...treatData, ptTreat: e.target.value })
                  }
                >
                  <option value="">Treatment</option>
                  {treatmentName?.length > 0 ? (
                    treatmentName?.map((item) => (
                      <option key={item._id} value={item.name}>
                        {item.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>No treatments</option>
                  )}
                </Form.Select>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="info" onClick={hadleAddAppointment}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddAppointment;
