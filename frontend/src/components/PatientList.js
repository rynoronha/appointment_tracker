import React from 'react';
import { formatDate, formatPhoneNumber} from '../format';
import { useHistory } from "react-router-dom";

function PatientList(props) {
    const history = useHistory();

    const handleClick = (patient) => {
        history.push({
            pathname:  `/patientdetails/${patient.patient_id}`,
            state: {
              patient: patient 
            } 
        })
    }

    return (
        <div> 
            <div className="scroll table-container">
                <table className="table">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Date of Birth</th>
                        <th>Phone Number</th>
                    </tr>
                    </thead>
                    <tbody>
                        {props.patients.map((patient) => (
                            <tr className="patient-row" key={patient.patient_id}>
                                <td>{patient.patient_id}</td>
                                <td>{patient.first_name}</td>
                                <td>{patient.last_name}</td>
                                <td>{formatDate(patient.date_of_birth)}</td>
                                <td>{formatPhoneNumber(patient.phone_number)}</td>
                                <td>
                                    <button className="view-profile-btn" onClick={() => handleClick(patient)}>View Profile</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PatientList
