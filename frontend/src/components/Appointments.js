import React from 'react'

function Appointments(props) {
    return (
        <div className="card appointments-card">
            <h1>Appointments</h1>
            <div className="table-container scroll">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Start Date</th>
                            <th>Start Time</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.appointments.map((appointment) => (
                            <tr className="appointment-row" key={appointment.appointment_id}>
                                <td>{appointment.start_date}</td>
                                <td>{appointment.start_time}</td>
                                <td>{appointment.appointment_type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Appointments
