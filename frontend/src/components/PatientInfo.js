import React from 'react';
import { formatDate, formatPhoneNumber} from '../format';

function PatientInfo(props) {
    return (
        <div>
            <div className="card info-card">
                <h1>Patient Info</h1>
                <div className="flex-row top">
                    <div>
                        <span className="category-name">FIRST NAME  </span>
                        <span>{props.patientInfo.first_name}</span>
                    </div>
                    <div>
                        <span className="category-name">LAST NAME  </span>
                        <span>{props.patientInfo.last_name}</span>
                    </div>
                </div>
                <div className="flex-row bottom">
                    <div>
                        <span className="category-name">D.O.B  </span>
                        <span>{formatDate(props.patientInfo.date_of_birth)}</span> 
                    </div>
                    <div>
                        <span className="category-name">PHONE #  </span>
                        <span>{formatPhoneNumber(props.patientInfo.phone_number)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientInfo
