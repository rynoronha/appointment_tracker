import React, { useState } from 'react'
import axios from 'axios';

function NewPatientForm(props) {
   const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        phoneNumber: "",
        extension: ""
    });

    const updateFormData = event => setFormData({...formData, [event.target.name]: event.target.value});

    const { firstName, lastName, dateOfBirth, phoneNumber, extension } = formData;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/addPatient', formData)
        .then(function (response) {
            alert("New Patient Added!");
            props.updatePatientsList([...props.patients, response.data]);
            setFormData({
                firstName: "",
                lastName: "",
                dateOfBirth: "",
                phoneNumber: "",
                extension: ""
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div className="card new-patient-card">
            <h1>New Patient</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div className="form-row flex-row">
                    <label htmlFor="first-name">First Name</label>
                    <input
                        value={firstName}
                        onChange={e => updateFormData(e)}
                        placeholder=""
                        type="text"
                        name="firstName"
                        id="first-name"
                        required
                    />
                </div>
                <div className="form-row flex-row">
                    <label htmlFor="last-name">Last Name</label>
                    <input
                        value={lastName}
                        onChange={e => updateFormData(e)}
                        placeholder=""
                        type="text"
                        name="lastName"
                        id="last-name"
                        required
                    />
                </div>
                <div className="form-row flex-row">
                    <label htmlFor="date-of-birth">Date of Birth</label>
                    <input
                        value={dateOfBirth}
                        onChange={e => updateFormData(e)}
                        placeholder="Date of Birth"
                        type="date"
                        name="dateOfBirth"
                        id="date-of-birth"
                        required
                    />
                </div>
                <div className="form-row flex-row">
                    <label htmlFor="phone-number">Phone</label>
                    <input
                        value={phoneNumber}
                        onChange={e => updateFormData(e)}
                        placeholder="###-###-####"
                        type="tel"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        name="phoneNumber"
                        id="phone-number"
                        required
                    />
                </div>
                <div className="form-row flex-row">
                    <label htmlFor="extension">Extension</label>
                    <input
                        value={extension}
                        onChange={e => updateFormData(e)}
                        placeholder="optional"
                        type="text"
                        pattern="[0-9]+"
                        name="extension"
                        id="extension"
                    />
                </div>
                <button className="submit-btn" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewPatientForm
