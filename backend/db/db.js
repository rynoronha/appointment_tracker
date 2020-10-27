const fs = require("fs");
const fastcsv = require("fast-csv");
const sqlite3 = require('sqlite3').verbose();

// open db in memory
let db = new sqlite3.Database('./db/patients.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory db');

    // read patients csv data into patients table
    let patientsStream = fs.createReadStream("./patients.csv");
    let csvPatientsData = [];
    let csvPatientsStream = fastcsv
    .parse()
    .on("data", function(data) {
        csvPatientsData.push(data);
    })
    .on("end", function() {
        // remove the first line
        csvPatientsData.shift();

        db.serialize(function() {
            db.run("CREATE TABLE IF NOT EXISTS patients(patient_id integer primary key autoincrement, first_name text, last_name text, date_of_birth text, phone_number text)");

            let totalRows = 0;
            for (let i = 0; i < csvPatientsData.length; i++) {
                db.run("INSERT INTO patients VALUES (NULL, ?, ?, ?, ?)", csvPatientsData[i], function(err) {
                    if (err) {
                        return console.error(err.message);
                    }
                    totalRows += this.changes;
                    if (i === csvPatientsData.length - 1) {
                        console.log(`Patients Table: Rows inserted ${totalRows}`);
                    }
                }); 
            }
        })
    });
    patientsStream.pipe(csvPatientsStream);


    // read appointments csv data into appointments table
    let appointmentsStream = fs.createReadStream("./appointments.csv");
    let csvAppointmentsData = [];
    let csvAppointmentsStream = fastcsv
    .parse()
    .on("data", function(data) {
        csvAppointmentsData.push(data);
    })
    .on("end", function() {
        // remove the first line
        csvAppointmentsData.shift();

        db.serialize(function() {
            db.run("CREATE TABLE IF NOT EXISTS appointments(appointment_id integer primary key autoincrement, patient_name text, start_date text, start_time text, appointment_type text)");

            let totalRows = 0;
            for (let i = 0; i < csvAppointmentsData.length; i++) {
                db.run("INSERT INTO appointments VALUES  (NULL, ?, ?, ?, ?)", csvAppointmentsData[i], function(err) {
                    if (err) {
                        return console.error(err.message);
                    }
                    totalRows += this.changes;
                    if (i === csvAppointmentsData.length - 1) {
                        console.log(`Appointments Table: Rows inserted ${totalRows}`);
                    }
                }); 
            }
        })
    });
    appointmentsStream.pipe(csvAppointmentsStream);
});

module.exports = db;
