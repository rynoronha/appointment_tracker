const express = require('express');
const cors = require('cors');
const db = require('./db/db');
const path = require('path');

const app = express();

// configure cors
const corsOpts = {
    origin: '*',

    methods: [
        'GET',
        'POST',
    ],

    allowedHeaders: [
        'Content-Type',
    ],
};
  
app.use(cors(corsOpts));

// configure routes
app.use(require('./routes/routes'));


// launch react + static files via the server root
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// start server 
let server = app.listen('8080', () => {
    console.log("server is running on port 8080");
});

// close the db when server is killed
process.on('SIGINT', () => {
    db.serialize(function() {
        db.run("DROP TABLE patients");
        db.run("DROP TABLE appointments");
    })
    server.close();
});


  



  

