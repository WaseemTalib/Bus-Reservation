import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { AuthContext } from '../../contexts/authContext'
import firebase from '../../config/firebase'

class AdminSidebar extends Component {

    logout = () => {
        firebase.auth().signOut().then(() => {
            window.location.replace("/Login");
        })
    }

    render() {
        return <AuthContext.Consumer>
            {(authContext) => {
                return 	<aside className="one-fourth sidebar left">
					{/* <!-- Widget --> */}
					<div className="widget">
					<ul className="categories">
							<li className="active"><a href="account.html">DashBoard</a></li>
							
                        <li><Link to="/users" title="Home">All User</Link></li>
                        <li><Link to="/viewBus" >View Buses</Link></li>
                        <li><Link to="/adminBookingDetails">Booking Details</Link></li>
                        <li><Link to="/viewMessages">Messages</Link></li>
                        <li><Link to="/adminProfile">Profile</Link></li>
						</ul>
					</div>
					{/* <!-- //Widget --> */}
				</aside>
				// <!--- //Sidebar -->
            }}
        </AuthContext.Consumer>
    }

}

export default AdminSidebar;