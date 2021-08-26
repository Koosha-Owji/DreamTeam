
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./components/Login.component";
import SignUp from "./components/SignUp.component";
import Navbar from "./components/Navbar.component";


function App() {
  return (
    <div className="App" >
        <h1>Dream Team CRM</h1>
      {/* <Navbar/> */}
      <Router>
      <div className="container">
      <br/>
      <Route exact path="/home" component={Navbar} />
      <Route exact path="/user" component={Login} />
      <Route exact path="/user/signup" component={SignUp} />
      </div>
    </Router>
    </div>
  );
}

export default App;