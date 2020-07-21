import React, { Component } from 'react';
import { db } from '../../config/firebase';
import { AuthContext } from '../../contexts/authContext'
import Login from '../user/Login';
import UserHeader from './Header'
import UserFooter from './Footer'

class userProfile extends Component {

    static contextType = AuthContext

    state = {
        data: {},
    }
    componentDidMount = () => {

        setTimeout(() => {
            let userEmail = this.context.user.email;
            db.collection('userInfo').doc(userEmail).get().then(snapShot => {
                const gotData = snapShot.data()
                let name = document.querySelector("#userName")
                let email = document.querySelector("#userEmail")
                let id = document.querySelector("#userId")
                name.innerHTML = gotData.userName.toUpperCase();
                email.innerHTML = gotData.email;
                id.innerHTML = gotData.userId;
            })
        }, 8000);
    }

    render() {
        return <AuthContext.Consumer>
            {(authContext) => {
                if (authContext.isAuthenticated) {

                    return <div className="viewSchedule theme-purple index-2">
                        <UserHeader />
                        <div className="full-width" style={{ padding: "50px 40px 30px" }}>
                            <div className="box history">
                                <h6>User Profile</h6>
                                <div id="main">
                                    <div className="full">
                                        <p><span><strong>Name: </strong></span> <span id="userName"> </span></p>
                                    </div>
                                    <div className="full">
                                        <p><span><strong>Email: </strong></span> <span id="userEmail">  </span></p>
                                    </div>
                                    <div className="full">
                                        <p><span><strong>User Id: </strong></span> <span  id="userId">  </span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <UserFooter />
                    </div>

                }
                else
                    return <Login history={this.props.history} />
            }}
        </AuthContext.Consumer>

    }

}
export default userProfile;
