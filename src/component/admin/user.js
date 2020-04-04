import React, { Component } from 'react';
import { db } from '../../config/firebase';

import { AuthAdminContext } from '../../contexts/adminAuthContext'
import AdminLogin from '../admin/adminLogin';
import AdminHeader from './adminHeader';
import AdminSidebar from './adminSidebar';

class users extends Component {


    state = {
        userName: [],
    }

    componentDidMount = () => {
        db.collection('userInfo').get().then(snapShot => {
            const userName = []
            snapShot.docs.forEach(doc => {
                const gotData = doc.data();
                userName.push(gotData)
            });
            this.setState({ userName });
        })
    }


    showTable = () => this.state.userName.map((el, i) => {
        if (el.role === 1) {
            return <tr key={i}>
                <td>{el.email}</td>
                <td>{el.userName}</td>
                <td>{el.email}</td>
                <td>
                    <i style={{ cursor: "pointer" }} className="fa fa-unlock" onClick={() => { this.unblock(el) }}></i>
                </td>
            </tr>
        }
        if (el.role === false) {
            return <tr key={i}>
                <td>{el.email}</td>
                <td>{el.userName}</td>
                <td>{el.email}</td>
                <td>
                    <i style={{ cursor: "pointer" }} className="fa fa-lock" onClick={() => { this.block(el) }}></i>
                </td>
            </tr>
        }
        if (el.role === true) {
            return <tr key={i}>
                <td>{el.email}</td>
                <td>{el.userName}</td>
                <td>{el.email}</td>
                <td>Admin</td>
            </tr>
        }
    })
    block = (el) => {
        db.collection("userInfo").doc(el.email).update({ role: 1 }).then(() => {
            window.location.reload()
        })
    }
    unblock = (el) => {
        db.collection("userInfo").doc(el.email).update({ role: false }).then(() => {
            window.location.reload()
        })
    }


    render() {
        return <AuthAdminContext.Consumer>
            {(AuthAdminContext) => {
                if (AuthAdminContext.adminAuthenticated) {
                    return <div className="users theme-purple index-2">
                        <main className="main" role="main">
                            <AdminHeader />
                            <div className="wrap">
                                <div className="row">

                                    <AdminSidebar />

                                    <div className="three-fourth">
                                        <form>
                                            <table className="data responsive">
                                                <thead>
                                                    <tr >
                                                        <th></th>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {this.showTable()}

                                                </tbody>
                                            </table>

                                        </form>
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
export default users;
