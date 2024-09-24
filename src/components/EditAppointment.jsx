import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {
  editAppointmentApi,
  getAllPatientApi,
  getAllTReatmentApi,
} from "../services/allApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { editAppointmentContext } from "../context/ContextShare";

function AddAppointment({ appointment }) {
  const { setEditAppointmentResponse } = useContext(editAppointmentContext);

  const [show, setShow] = useState(false);

  const [editApmntNames, setEditApmntNames] = useState({
    ptName: appointment.ptName,
    date: appointment.date,
    time: appointment.time,
    ptTreat: appointment.ptTreat,
    status: appointment.status,
  });
  const [treatmentName, setTreatmentName] = useState([]);
  const [patNames, setPatNames] = useState([]);

  //   console.log(editApmntNames);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const getPatientNames = async () => {
    const result = await getAllPatientApi();
    setPatNames(result.data);
  };

  //   console.log(patNames);
  const getTreatmmentNames = async () => {
    const result = await getAllTReatmentApi();
    setTreatmentName(result.data);
  };

  const handleEdit = async () => {
    const { ptName, date, time, ptTreat, status } = editApmntNames;
    console.log(ptName, date, time, ptTreat, status);

    if (!ptName || !date || !time || !ptTreat || !status) {
      alert("Please fill the form completely");
    } else {
      //api
      console.log(appointment?._id);

      const result = await editAppointmentApi(appointment?._id, editApmntNames);
      console.log(result);

      if (result.status === 200) {
        setEditApmntNames(result.data);
        setEditAppointmentResponse(result.data);
        handleClose();
      }
    }
  };

  useEffect(() => {
    getPatientNames();
    getTreatmmentNames();
  }, []);

  return (
    <>
      <FontAwesomeIcon
        icon={faPenToSquare}
        className="text-info"
        onClick={handleShow}
      />

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
                  value={editApmntNames?.ptName}
                  onChange={(e) =>
                    setEditApmntNames({
                      ...editApmntNames,
                      ptName: e.target.value,
                    })
                  }
                >
                  <option value="">Patient</option>
                  {patNames?.length > 0 ? (
                    patNames?.map((item) => (
                      <option key={item._id} value={item?.firstname}>
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
                  value={editApmntNames?.time}
                  onChange={(e) =>
                    setEditApmntNames({
                      ...editApmntNames,
                      time: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3 mt-3">
                <input
                  type="text"
                  placeholder="Status"
                  className="form-control"
                  value={editApmntNames?.status}
                  onChange={(e) =>
                    setEditApmntNames({
                      ...editApmntNames,
                      status: e.target.value,
                    })
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
                  value={editApmntNames?.date}
                  onChange={(e) =>
                    setEditApmntNames({
                      ...editApmntNames,
                      date: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3 mt-3">
                <Form.Select
                  aria-label="Select Treatment"
                  value={editApmntNames?.ptTreat}
                  onChange={(e) =>
                    setEditApmntNames({
                      ...editApmntNames,
                      ptTreat: e.target.value,
                    })
                  }
                >
                  <option value="">Treatment</option>
                  {treatmentName?.length > 0 ? (
                    treatmentName?.map((item) => (
                      <option key={item._id} value={item?.name}>
                        {item?.name}
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
          <Button variant="info" onClick={handleEdit}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddAppointment;
