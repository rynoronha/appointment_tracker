import React, { useState, useEffect } from 'react';
import axios from "axios";
import PatientList from './PatientList'
import NewPatientForm from './NewPatientForm';

function Patients() {
    const [patients, setPatients] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get('http://localhost:8080/patients');
            setPatients(request.data); 
            return patients;
        }
        fetchData();
    }, []);

    const search = (rows) => {
        return rows.filter(
            (row) => 
                row.first_name.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
                row.last_name.toLowerCase().indexOf(query.toLowerCase()) > -1
        );
    }

    return (
        <div>
            <div className="patients-container flex-row">
                <div className="left-content">
                    <NewPatientForm  
                        patients={patients}
                        updatePatientsList={setPatients}
                    />
                </div>
                <div className="right-content">
                    <div className="card patient-list-card">
                        <h1>Patient List</h1>
                        <div className="search-query">
                            <input type="text" placeholder="search by first name and last name" value={query} onChange={(e) => setQuery(e.target.value)}/>
                        </div>
                        <PatientList patients={search(patients)}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Patients;
