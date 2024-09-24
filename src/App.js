import './App.css';
import './index.css';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Appointments from './pages/Appointments';
import Patients from './pages/Patients';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import PatientInfo from './pages/PatientInfo'
import Treatment from './pages/Treatment';



function App() {
  return (
    <>

      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/login-doctor' exact element={<Login doctor />} />
        <Route path='/login-receptionist' exact element={<Login  />} />
        <Route path='/register-doctor' exact element={<Register doctor />} />
        <Route path='/register-receptionist' exact element={<Register  />} />
        <Route path='/dashboard' exact element={<Dashboard />} />
        <Route path='/appointments' exact element={<Appointments />} />
        <Route path='/patients' exact element={<Patients />} />
        <Route path='/patientinfo' exact element={<PatientInfo />} />
        <Route path='/treatment' exact element={<Treatment />} />
      </Routes>
      


    </>
  );
}

export default App;
