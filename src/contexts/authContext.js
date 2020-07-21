import React, { Component, createContext } from 'react';

import firebase , { db }  from '../config/firebase'

export const AuthContext = createContext();

export default class AuthContextProvider extends Component {

    state = {
        isAuthenticated: false,
        user: {},   
    }

    componentDidMount = () => {

        firebase.auth().onAuthStateChanged( (user) => {
          
          if(user){
            const loggedUserId = user.email;
            db.collection('userInfo').doc(loggedUserId).get().then(snapShot => {
   
                if(snapShot.exists){
                    let userStatus = snapShot.data();
                  
                if(userStatus.role === false){
                     console.log("user logged in")
                    this.setState({isAuthenticated: true, user: user})
                }
                else if( userStatus.role === true ){
                    console.log("user logged out")
                    this.setState({isAuthenticated: false, user: {}})
                }
                else if( userStatus.role === 1 ){
                    console.log("Blocked User")
                    this.setState({isAuthenticated: false, user: {}})
                }
                }
            })
          } else{
            this.setState({isAuthenticated: false, user: {}}) 
          }
            
            // if (user) {
            //     console.log( "User is logged in" )
            //     this.setState({isAuthenticated: true, user: user})
                
            // } else {
            //     console.log( "User is logged out" )
            //     this.setState({isAuthenticated: false, user: {}})
            // }
        });

    }

    render() {

        return (
            <AuthContext.Provider value={{ ...this.state }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }

}
