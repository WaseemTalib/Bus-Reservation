import React, { Component, createContext } from 'react';

import firebase, { db } from '../config/firebase'

export const AuthAdminContext = createContext();

export default class AuthAdminContextProvider extends Component {

    state = {
        adminAuthenticated: false,
        admin: {}
    }

    componentDidMount = () => {

        firebase.auth().onAuthStateChanged( (admin) => {
        if(admin){
            db.collection('userInfo').doc(admin.email).get().then(snapShot => {
     
                let userStatus = snapShot.data();
                if( userStatus.role === true ){
                    console.log("admin logged in")
                    this.setState({adminAuthenticated: true, admin: admin })
                }
                else if( userStatus.role === false ){
                    console.log("admin logged out")
                    this.setState({adminAuthenticated: false, admin: {}})
                }else if( userStatus.role === 1 ){
                    console.log("blocked User")
                    this.setState({adminAuthenticated: false, admin: {}})
                }
            })
        }else{
            this.setState({adminAuthenticated: false, admin: {}})
        }


            // if (admin) {
            //     console.log( "admin is logged in" )
            //     this.setState({adminAuthenticated: true, admin: admin})
            // } else {
            //     // admin is signed out.
            //     console.log( "admin is logged out" )
            //     this.setState({adminAuthenticated: false, admin: {}})
            // }
        
        });
    }

    render() {

        return (
            <AuthAdminContext.Provider value={{ ...this.state }}>
            {this.props.children}
            </AuthAdminContext.Provider>
        )
    }

}
