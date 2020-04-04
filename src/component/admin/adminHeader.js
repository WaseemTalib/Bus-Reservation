import React, { Component } from 'react';
import { AuthContext } from '../../contexts/authContext'
import firebase from '../../config/firebase'

class AdminHeader extends Component {

    logout = () => {
        firebase.auth().signOut().then(() => {
            window.location.replace("/adminLogin");
        })
    }

    render() {
        return <AuthContext.Consumer>
            {(authContext) => {
                return <header className="site-title color">
                <div className="wrap">
                    <div className="container">
                        <h1>Dashboard</h1>
                        <nav role="navigation" className="breadcrumbs">
                        
                            <ul>
                                <li style={{cursor:"pointer"}} onClick={this.logout}><p><strong><u>LOGOUT</u> &ensp; &ensp; </strong> </p></li>
                                <li><a href="/" title="Admin Dashboard">Dashoard</a></li>
                                <li><p>All User</p></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
            // <!-- //Page info -->
                //   <!-- //Header -->
            }}
        </AuthContext.Consumer>
    }

}

export default AdminHeader;