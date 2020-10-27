import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import PatientInfo from './PatientInfo';
import Appointments from './Appointments';
import NewAppointmentForm from './NewAppointmentForm';

function PatientDetails() {
    const location = useLocation();
    const patientInfo = location.state.patient;
    const patientFullName = patientInfo.first_name + " " +  patientInfo.last_name;
    const [appointments, setAppointments] = useState([]); 
    const history = useHistory();
    
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`http://localhost:8080/appointments?name=${patientFullName}`);
            setAppointments(request.data);
            return appointments;
        }
        fetchData();
    }, [patientInfo]);

    const goBack = () => {
        history.goBack();
    }

    return (
        <div className="patient-details-container flex-row">
            <div className="left-content">
                <PatientInfo patientInfo={patientInfo} />
                <NewAppointmentForm 
                    patientInfo={patientInfo}
                    appointments={appointments}
                    updateAppointmentsList={setAppointments}
                />
                <button className="back-btn" onClick={goBack}>Go Back</button>
            </div>
            <div className="right-content">
                <Appointments appointments={appointments} />
            </div>
        </div>
    )
}

export default PatientDetails
