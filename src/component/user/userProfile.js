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
                let main = document.getElementById("main")
                const profile = `<div className="full">
                                    <p><span><strong>Name: </strong></span> ${gotData.userName.toUpperCase()}</p>
                            </div>
                                <div className="full">
                                    <p><span><strong>Email: </strong></span> ${gotData.email}</p>
                            </div>
                                <div className="full">
                                    <p><span><strong>User Id: </strong></span> ${gotData.userId}</p>
                            </div>`;
                main.innerHTML = profile;
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
                            <div id="main"></div>
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
