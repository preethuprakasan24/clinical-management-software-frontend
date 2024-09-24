import React, { createContext, useState } from "react";

export const addResponseContext = createContext({});
export const getIndividualPatientContext = createContext({});
export const editPatientContext = createContext({});
export const addTreatmentContext = createContext({});
export const addAppointmentContext = createContext({});
export const editAppointmentContext = createContext({});
export const isLoginAuthContext = createContext(true);

function ContextShare({ children }) {
  const [addResponse, setAddResponse] = useState({});
  const [indPatientResponse, setIndPatientResponse] = useState({});
  const [editResponse, setEditResponse] = useState({});
  const [treatmentResponse, setTreatmentResponse] = useState({});
  const [addAppointmentResponse, setAddAppointmentResponse] = useState({});
  const [editAppointmentResponse, setEditAppointmentResponse] = useState({});
  const [isLoginStatus, setIsLoginStatus] = useState(true);

  return (
    <addResponseContext.Provider value={{ addResponse, setAddResponse }}>
      <getIndividualPatientContext.Provider
        value={{ indPatientResponse, setIndPatientResponse }}
      >
        <editPatientContext.Provider value={{ editResponse, setEditResponse }}>
          <addTreatmentContext.Provider
            value={{ treatmentResponse, setTreatmentResponse }}
          >
            <addAppointmentContext.Provider
              value={{ addAppointmentResponse, setAddAppointmentResponse }}
            >
              <editAppointmentContext.Provider
                value={{ editAppointmentResponse, setEditAppointmentResponse }}
              >
                {" "}
                <isLoginAuthContext.Provider
                  value={{ isLoginStatus, setIsLoginStatus }}
                >
                  {children}
                </isLoginAuthContext.Provider>
              </editAppointmentContext.Provider>
            </addAppointmentContext.Provider>
          </addTreatmentContext.Provider>
        </editPatientContext.Provider>
      </getIndividualPatientContext.Provider>
    </addResponseContext.Provider>
  );
}

export default ContextShare;
