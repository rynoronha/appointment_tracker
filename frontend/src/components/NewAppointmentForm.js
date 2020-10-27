import React , { useState } from 'react';
import axios from 'axios';

function NewAppointmentForm(props) {
    const [formData, setFormData] = useState({
        startDate: "",
        startTime: "",
        type: ""
    });

    const updateFormData = event => setFormData({...formData, [event.target.name]: event.target.value});

    const { startDate, startTime, type } = formData;

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            patientFullName: props.patientInfo.first_name + " " + props.patientInfo.last_name,
            startDate: formData.startDate,
            startTime: formData.startTime,
            type: formData.type
        }
        axios.post('http://localhost:8080/addAppointment', data)
        .then(function (response) {
            console.log(response.data)
            alert("New Appointment Added");
            props.updateAppointmentsList([...props.appointments, response.data]);
            setFormData({
                startDate: "",
                startTime: "",
                type: ""
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div className="card new-appointment-card">
            <h1>New Appointment</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div className="form-row flex-row">
                    <label htmlFor="start-date">Start Date</label>
                    <input
                        value={startDate}
                        onChange={e => updateFormData(e)}
                        placeholder=""
                        type="date"
                        name="startDate"
                        id="start-date"
                        required
                    />
                </div>
                <div className="form-row flex-row">
                    <label htmlFor="start-time">Start Time</label>
                    <input
                        value={startTime}
                        onChange={e => updateFormData(e)}
                        placeholder=""
                        type="time"
                        name="startTime"
                        id="start-time"
                        required
                    />
                </div>
                <div className="form-row flex-row">
                    <label htmlFor="type">Type</label>
                    <input
                        value={type}
                        onChange={e => updateFormData(e)}
                        placeholder=""
                        type="text"
                        name="type"
                        id="type"
                        required
                    />
                </div>
                <button className="submit-btn" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewAppointmentForm
