
import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

//register
export const registerApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/register-doctor`, reqBody, "")
}

//login
export const loginApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/login-doctor`, reqBody, "")
}

//add patient api 
export const addPatientApi = async (reqBody, reqHeader) => {
    return await commonApi('POST', `${serverUrl}/add-patient`, reqBody,"")
}

//all patient api
export const getAllPatientApi = async () => {
    return await commonApi('GET', `${serverUrl}/all-patients`, "", "")
}

//search all patient api
export const searchAllPatientApi = async (searchKey) => {
    return await commonApi('GET', `${serverUrl}/search-all-patients?search=${searchKey}`, "", "")
}

//api to remove a project
export const removePatientApi = async (id) =>{
    return await commonApi('DELETE' , `${serverUrl}/remove-patient/${id}`,{},"")
}

//api to edit patient details
export const editPatientApi = async(id, reqBody)=>{
    return await commonApi('PUT',`${serverUrl}/edit-patient/${id}`, reqBody,"" )
}

//api for getting patient info
export const getPatientInfoApi = async(id)=>{
    // console.log(id);
    
    return await commonApi('GET', `${serverUrl}/patient-info/${id}`,"", "")
}

//api to add medical History
export const addMedicalHistoryApi = async(id, reqBody)=>{
    return await commonApi('POST', `${serverUrl}/patient-rx/${id}`, reqBody, "")
}


//api for getting treatment history
export const getMedicalHistoryApi = async(id)=>{
    return await commonApi('GET', `${serverUrl}/patient-medhistory/${id}`,"", "")
}

//api to add progress details
export const addProgressDetailsApi = async(id, reqBody)=>{
    return await commonApi('POST', `${serverUrl}/patient-progress/${id}`, reqBody, "")
} 

//get progress notes
export const getProgressApi = async(id)=>{
    return await commonApi('GET', `${serverUrl}/get-progress/${id}`, "", "")
}

//add treatment
export const addTreatmentApi = async(reqBody)=>{
    return await commonApi('POST', `${serverUrl}/add-treatment`,reqBody,"")
}

//get all treatment
export const getAllTReatmentApi= async()=>{
    return await commonApi('GET', `${serverUrl}/get-treatment`, "","")
}

//add booking details
export const addAppointmentApi = async(reqBody)=>{
    return await commonApi('POST', `${serverUrl}/add-appointment`, reqBody, "")
}

//get all appointment details
export const getAllAppointmentApi = async()=>{
    return await commonApi('GET',`${serverUrl}/get-appointment`,"","" )
}

//edit appointment details
export const editAppointmentApi= async(id,reqBody)=>{
    console.log(reqBody);
    
    console.log("hjfffffffffffffff",id);
    
    return await commonApi('PUT',`${serverUrl}/edit-appointment/${id}`, reqBody, "" )
}

//delete appointment api
export const deleteAppointmentApi= async(id)=>{
    console.log(id);
    return await commonApi('DELETE',`${serverUrl}/delete-appointment/${id}`,{},"" )
    
}