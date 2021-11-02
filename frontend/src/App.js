
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./components/Login.component";
import SignUp from "./components/SignUp.component";
import Navbar from "./components/Navbar.component";
import ContactsPage from "./components/contact/ContactPage";
import NotesPage from "./components/Notes/NotePages";
import ManageLabels from './components/label/LabelList';
import OrderPage from './components/order/OrderList.component';
import ErrorBoundary from './components/ErrorBoundary.component';
const App = () => {
  
  return (
    <div className="App" >
      <Router>
      <div className="container">
      <br/>
      <ErrorBoundary>
      <Route exact path="/home" component={Navbar} />
      </ErrorBoundary>
      <Route exact path="/" component={Login} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/contacts" component={ContactsPage} />
      <Route exact path="/user/notes" component= {NotesPage}/>
      <Route exact path="/label" component= {ManageLabels} />
      <Route exact path="/orders" component= {OrderPage} />
      </div>
    </Router>
    </div>
  );
}

export default App;
