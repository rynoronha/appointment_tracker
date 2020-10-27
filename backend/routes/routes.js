const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const db = require('../db/db');

const jsonParser = bodyParser.json()

// routes
router.get('/patients', function (req, res) {
    db.all('SELECT * FROM patients', [], (err, rows) => {
        if (err) {
          throw err;
        }

        let patients = [];
        rows.forEach((row) => {
            patients.push(row);
        });
        res.send(patients);
    });
});

router.get('/appointments', function (req, res) {
    db.all('SELECT * FROM appointments \
     WHERE patient_name = $1 \
     ORDER BY date(start_date) DESC, \
     case length(start_time) \
        when 8 then substr(start_time, 7) || substr(start_time, 1, 5) \
        when 7 then substr("0" || start_time, 7) || substr("0" || start_time, 1, 5) \
        end DESC', [req.query.name], (err, rows) => {
        if (err) {
          throw err;
        }

        let appointments = [];
        rows.forEach((row) => {
            appointments.push(row);
        });
        res.send(appointments);
    });
});

router.post('/addPatient', jsonParser, function (req, res) {
    let extension = req.body.extension.trim() ? " x" + req.body.extension : "";
     
    let params = [
        req.body.firstName.trim(), 
        req.body.lastName.trim(), 
        req.body.dateOfBirth.trim(), 
        req.body.phoneNumber.trim() + extension
    ];
    db.run('INSERT INTO patients VALUES (NULL, ?, ?, ?, ?)', params, function(err) {
        if (err) {
            return console.error(err.message);
        }

        let responseObj = {
            patient_id: this.lastID,
            first_name: req.body.firstName.trim(),
            last_name: req.body.lastName.trim(),
            date_of_birth: req.body.dateOfBirth.trim(),
            phone_number: req.body.phoneNumber.trim() + extension
        }
        res.send(responseObj)
    }); 
})

router.post('/addAppointment', jsonParser, function (req, res) {
    let time = req.body.startTime.trim();

   function formattedTime(time) {
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    
        if (time.length > 1) { 
          time = time.slice(1); 
          time[5] = +time[0] < 12 ? ' AM' : ' PM'; 
          time[0] = +time[0] % 12 || 12; 
        }
        return time.join(''); 
    }

    let params = [
        req.body.patientFullName.trim(),
        req.body.startDate.trim(), 
        formattedTime(time),
        req.body.type.trim()
    ];

    db.run('INSERT INTO appointments VALUES (NULL, ?, ?, ?, ?)', params, function(err) {
        if (err) {
            return console.error(err.message);
        }
        let responseObj = {
            appointment_id: this.lastID,
            patient_name: req.body.patientFullName.trim(),
            start_date: req.body.startDate.trim(),
            start_time: formattedTime(time),
            appointment_type: req.body.type.trim()
        }
        res.send(responseObj)
    }); 
})

module.exports = router;

  



  

