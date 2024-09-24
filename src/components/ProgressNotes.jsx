import React, { useContext, useEffect } from "react";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getIndividualPatientContext } from "../context/ContextShare";
import { addProgressDetailsApi, getProgressApi } from "../services/allApi";

function ProgressNotes() {
  const { indPatientResponse } = useContext(getIndividualPatientContext);
  const [show, setShow] = useState(false);

  const [progressData, setProgressData] = useState({
    date: "",
    findings: "",
    procedure: "",
    total: "",
    paid: "",
    pending: "",
  });

  //   console.log(progressData);
  // const [resultData, setResultData] = useState([]);

  const [progressDataReceived, setProgressDataReceived] = useState([]);
  const handleClose = () => {
    setShow(false);
    handleClose1();
  };
  const handleShow = () => setShow(true);

  const handleClose1 = () => {
    setProgressData({
      date: "",
      findings: "",
      procedure: "",
      total: "",
      paid: "",
      pending: "",
    });
  };

  const handleProgressNotes = async () => {
    const { date, findings, procedure, total, paid, pending } = progressData;
    if (!date || !findings || !procedure || !total || !paid || !pending) {
      toast.info("Please fill the form completely");
    } else {
      if (indPatientResponse._id) {
        const result = await addProgressDetailsApi(
          indPatientResponse._id,
          progressData
        );
        if (result.status === 200) {
          //   setResultData((prevData) =>
          //     prevData ? [...prevData, result.data] : [result.data]
          //   );

          setProgressDataReceived((prevData) => [result.data, ...prevData]);
          // toast.success("Added successfully");
          handleClose();
        } else {
          toast.error("Failed to add progress notes");
        }
      }
    }
  };

  const getProgressNotes = async () => {
    console.log(indPatientResponse._id);

    if (indPatientResponse && indPatientResponse._id) {
      const result = await getProgressApi(indPatientResponse._id);
      if (result.status === 200) {
        console.log(result.data);

        if (Array.isArray(result.data)) {
          setProgressDataReceived(result.data);
        } else {
          setProgressDataReceived([result.data]);
        }
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    getProgressNotes();
  }, []);

  useEffect(() => {
    console.log("Updated progress data:", progressDataReceived);
  }, [progressDataReceived]);

  console.log(progressDataReceived);

  return (
    <>
      <div className="row mt-2 p-md-5 ">
        <div className="col-md-12 bg-primary rounded">
          <div className="d-flex justify-content-between pt-3">
            <h4 className="text-light">Progress Notes</h4>
            <FontAwesomeIcon
              onClick={handleShow}
              icon={faUserPen}
              size="xl"
              className="me-5"
              style={{ color: "white" }}
            />
          </div>

          <div className="p-1 w-100 ">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: "100%" }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell >Date</TableCell>
                    <TableCell>Clinical findings</TableCell>
                    <TableCell>Procedure</TableCell>
                    <TableCell>Total Amount</TableCell>
                    <TableCell>Amount Paid</TableCell>
                    <TableCell>Amount Pending</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {progressDataReceived?.length > 0 ? (
                    progressDataReceived?.map((note, index) => (
                      <TableRow
                        key={note?._id || index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {note?.date}
                        </TableCell>
                        <TableCell align="left">{note?.findings}</TableCell>
                        <TableCell align="left">{note?.procedure}</TableCell>
                        <TableCell align="left">{note?.total}</TableCell>
                        <TableCell align="left">{note?.paid}</TableCell>
                        <TableCell align="left">{note?.pending}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No progress notes available.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
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
                  type="date"
                  value={progressData.date}
                  placeholder="Date"
                  className="form-control"
                  onChange={(e) =>
                    setProgressData({ ...progressData, date: e.target.value })
                  }
                />
              </div>
              <div className="mb-3 mt-3">
                <textarea
                  type="text"
                  style={{ height: "100px" }}
                  placeholder="Clinical findings"
                  className="form-control"
                  value={progressData.findings}
                  onChange={(e) =>
                    setProgressData({
                      ...progressData,
                      findings: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3 mt-3">
                <textarea
                  type="text"
                  value={progressData.procedure}
                  placeholder="Procedure"
                  className="form-control"
                  onChange={(e) =>
                    setProgressData({
                      ...progressData,
                      procedure: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3 mt-3">
                <input
                  type="text"
                  value={progressData.total}
                  placeholder="Total Amount"
                  className="form-control"
                  onChange={(e) =>
                    setProgressData({ ...progressData, total: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={progressData.paid}
                  placeholder="Amount Paid"
                  className="form-control"
                  onChange={(e) =>
                    setProgressData({ ...progressData, paid: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Amount Pending"
                  className="form-control"
                  value={progressData.pending}
                  onChange={(e) =>
                    setProgressData({
                      ...progressData,
                      pending: e.target.value,
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
          <Button variant="info" onClick={handleProgressNotes}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={2000} theme="colored" position="top-center" />
    </>
  );
}

export default ProgressNotes;
