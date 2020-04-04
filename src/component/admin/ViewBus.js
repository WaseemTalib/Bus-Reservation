import React, { Component } from 'react';
import { db } from '../../config/firebase';
import { Link } from 'react-router-dom';
import { AuthAdminContext } from '../../contexts/adminAuthContext'
import AdminLogin from '../admin/adminLogin';
import AdminHeader from './adminHeader';
import AdminSidebar from './adminSidebar';

class viewBus extends Component {

    state = {
        data: []
    }
    componentDidMount = () => {
        db.collection('bus').get().then(snapShot => {
            const data = []
            snapShot.docs.forEach(doc => {
                const gotData = doc.data();
                data.push(gotData)
            });
            this.setState({ data });
        })
    }

    showTable = () => this.state.data.map((el, i) => {
        return <div className="box history" key={i}>
            <h6><span><strong>Bus Type : </strong></span> {el.from}</h6>
            <div className="row">
                <div className="one-third">
                    <p><span><strong>Pick Up : </strong></span> {el.from}</p>
                </div>
                <div className="two-third">
                    <p><span><strong>Drop Off : </strong></span> {el.to}</p>
                </div>

            </div>
            <div className="row">
                <div className="one-third">
                    <p><span><strong>Date : </strong></span> {el.date}</p>
                </div>
                <div className="two-third">
                    <p><span><strong>Time : </strong></span> {el.time}</p>
                </div>

            </div>
            <div className="row">
                <div className="one-third">
                    <p><span><strong>Seat : </strong></span> {el.seats}</p>
                </div>
                <div className="two-third">
                    <p><span><strong>Fare : </strong></span> {el.fare}</p>
                </div>
            </div>
            <div className="price"><button onClick={() => { this.remove(el) }}> Remove <i className="fa fa-bus"></i></button></div>
        </div>
    })

    remove = (el) => {
        db.collection("bus").doc(el.time + el.date + el.type).delete().then(() => {
            let remainMessages = this.state.data.filter((element, i) => {
                return el !== element
            })
            this.setState({ data: remainMessages })

        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }


    render() {
        return <AuthAdminContext.Consumer>
            {(AuthAdminContext) => {
                if (AuthAdminContext.adminAuthenticated) {

                    return <div className="viewBus theme-purple index-2">
                        <main className="main" role="main">

                            <AdminHeader />
                            <div className="wrap">
                                <div className="row">

                                    <AdminSidebar />

                                    <div className="three-fourth">
                                        <div className="f-row">
                                            <Link to="/createBus" className="btn color medium">Create Bus</Link>
                                        </div>
                                        {this.showTable()}

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
export default viewBus;
