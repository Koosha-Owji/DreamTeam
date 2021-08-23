
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import CreateUser from "./components/CreateUser.component";

function App() {
  return (
    <div className="App">
        <h1>Dream Team CRM</h1>
      
      <Router>
      <div className="container">
      <br/>
      <Route path="/user" component={CreateUser} />
      </div>
    </Router>
    </div>
  );
}

export default App;
