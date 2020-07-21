import React from 'react';

import Home from './component/Home';
import Login from './component//user/Login';
import fogetPass from './component//user/forgetPass';
import viewSchedule from './component/user/viewSchedule';
import Sign from './component/user/Sign';
import reserveSeat from './component/user/reserveSeat';
import Contact from './component/user/Contact';
import About from './component/user/About';
import userProfile from './component/user/userProfile';
import userBookingDetails from './component/user/UserBookingDetails';

import adminLogin from './component//admin/adminLogin';
import adminBookingDetails from './component//admin/bookingDetails';
import createBus from './component/admin/createBus';
import viewBus from './component/admin/ViewBus';
import viewMessages from './component/admin/viewMessages';
import users from './component/admin/user';
import adminProfile from './component/admin/adminProfile';
import './App.css';
import "./css/style.css";
import "./css/styler.css";
import "./css/theme-pink.css";
import "./css/animate.css";
import { BrowserRouter, Route } from 'react-router-dom';
import AuthContextProvider from "./contexts/authContext";
// import HomeContextProvider from "./contexts/homeContext";
import AuthAdminContextProvider from "./contexts/adminAuthContext";
function App() {
  return (
    <AuthAdminContextProvider>
      <AuthContextProvider>
          <BrowserRouter>
            <div className="App">

              <Route exact path="/viewSchedule/:from/:to/:date" component={viewSchedule} />   
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/forgetPass" component={fogetPass} />
              <Route path="/sign" component={Sign} />
              <Route exact path="/reserveSeat/:seatId" component={reserveSeat} />
              <Route exact path="/Contact" component={Contact} />
              <Route exact path="/About" component={About} />
              <Route exact path="/userProfile" component={userProfile} />
              <Route exact path="/userBookingDetails" component={userBookingDetails} />


              <Route exact path="/users" component={users} />
              <Route exact path="/adminBookingDetails" component={adminBookingDetails} />
              <Route path="/adminlogin" component={adminLogin} />
              <Route path="/createBus" component={createBus} />
              <Route path="/viewBus" component={viewBus} />
              <Route path="/viewMessages" component={viewMessages} />
              <Route path="/adminProfile" component={adminProfile} />

            </div>
          </BrowserRouter>
      </AuthContextProvider>
     </AuthAdminContextProvider>
  );
}

export default App;
