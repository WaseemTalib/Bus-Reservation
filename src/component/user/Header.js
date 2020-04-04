import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { AuthContext } from '../../contexts/authContext'
import firebase from '../../config/firebase'
class UserHeader extends Component {

    logout = () => {
        firebase.auth().signOut().then(() => {
            window.location.replace("/Login");
        })
    }

    render() {
        return <AuthContext.Consumer>
            {(authContext) => {
                return <header className="header" role="banner">
                    <div className="wrap">
                        <div className="logo">
                            <Link to="/" title="BooKINGs"><img src="/logoIcon.png" width="100px" alt="" /> </Link>
                        </div>
                        <nav role="navigation" className="main-nav">


                            {
                                authContext.isAuthenticated === true
                                    ?
                                    <ul>
                                        <li className="active"><Link to="/" >Home</Link></li>
                                        <li><Link to="/about" >About Us</Link></li>
                                        <li><Link to="/contact" >Contact</Link></li>
                                        <li><Link to="/userProfile" >Profile</Link></li>
                                        <li><Link to="/userBookingDetails" >My Booking Details</Link></li>
                                        <li><Link to="/" onClick={this.logout}>Logout</Link></li>
                                    </ul>
                                    :
                                    <ul>
                                        <li className="active"><Link to="/" >Home</Link></li>
                                        <li><Link to="/about" >About Us</Link></li>
                                        <li><Link to="/contact" >Contact</Link></li>
                                        <li><Link to="/sign" >Sign Up</Link></li>
                                        <li><Link to="/login">Login</Link></li>

                                    </ul>
                            }
                        </nav>
                        {/* <!-- //Main Nav --> */}
                    </div>
                </header>
                //   <!-- //Header -->
            }}
        </AuthContext.Consumer>
    }

}

export default UserHeader;