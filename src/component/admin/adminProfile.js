import React, { Component } from 'react';
import { db } from '../../config/firebase';
import { AuthAdminContext } from '../../contexts/adminAuthContext'
import AdminLogin from '../admin/adminLogin';
import AdminHeader from './adminHeader';
import AdminSidebar from './adminSidebar';

class adminProfile extends Component {

    static contextType = AuthAdminContext

    state = {
        data: {}
    }
    
    componentDidMount = () => {

        setTimeout(() => {
            let adminEmail = this.context.admin.email;
            db.collection('userInfo').doc(adminEmail).get().then(snapShot => {
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
        return <AuthAdminContext.Consumer>
            {(AuthAdminContext) => {
                if(AuthAdminContext.adminAuthenticated){

                return <div className="viewBus theme-purple index-2">
                    <main className="main" role="main">

                        <AdminHeader />
                        <div className="wrap">
                            <div className="row">

                                <AdminSidebar />
                                <div className="full-width" style={{ padding: "50px 40px 30px" }}>
                        <div className="box history">
                            <h6>Admin Profile</h6>
                            <div id="main"></div>
                        </div>
                    </div>

                            </div>
                        </div>
                    </main>
                </div>
                }
                else
                return <AdminLogin history={this.props.history} />
            }}
        </AuthAdminContext.Consumer>

    }

}
export default adminProfile;
