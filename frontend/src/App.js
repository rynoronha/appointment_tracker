import React from 'react';
import Patients from './components/Patients'
import PatientDetails from './components/PatientDetails'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import './styles.css';

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Patients} />
          <Route exact path="/patientdetails/:id" component={PatientDetails} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
