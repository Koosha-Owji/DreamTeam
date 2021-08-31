
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./components/Login.component";
import SignUp from "./components/SignUp.component";
import Navbar from "./components/Navbar.component";
import ContactsPage from "./components/contact/contactsPage.component";
import AddContact from "./components/contact/addContact1.component";

const App = () => {
  
  return (
    <div className="App" >
        <h1>Dream Team CRM</h1>
      {/* <Navbar/> */}
      <Router>
      <div className="container">
      <br/>
      <Route exact path="/home" component={Navbar} />
      <Route exact path="/" component={Login} />
      <Route exact path="/user/signup" component={SignUp} />
      <Route exact path="/contacts1" component={ContactsPage} />
      <Route exact path="/contacts" component={AddContact} />
      </div>
    </Router>
    </div>
  );
}

export default App;
