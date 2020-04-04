import React, { Component } from 'react';
import { db } from '../../config/firebase';
import AdminHeader from './adminHeader';
import AdminSidebar from './adminSidebar';
import { AuthAdminContext } from '../../contexts/adminAuthContext'
import AdminLogin from '../admin/adminLogin';

class viewMessages extends Component {

    state = {
        data: []
    }
    componentDidMount = () => {
        db.collection('Messages').get().then(snapShot => {
            const data = []
            snapShot.docs.forEach(doc => {
                const gotData = doc.data();
                data.push(gotData)
            });
            this.setState({ data });
        })
    }
    showTable = () => this.state.data.map((el, i) => {
        return <tr key={i}>
            <th>{i + 1}</th>
            <td>{el.Name}</td>
            <td>{el.Email}</td>
            <td>{el.Message}</td>
            <td> <button onClick={() => { this.del(el) }}><i className="material-icons">delete</i> </button>
            </td>
        </tr>
    })
    showTable = () => this.state.data.map((el, i) => {
        return <div className="box" key={i}>
            <h2>{el.Name}</h2>
            <fieldset>
                <div className="f-row check"> <label for="checkbox1"><strong>Message: </strong> {el.Message} </label></div>
                <div className="f-row check"><label for="checkbox2"><strong>FROM: </strong> {el.Email} </label></div>
                <div className="f-row"><button onClick={() => { this.del(el) }} className="btn btn-danger color medium" >Delete</button></div>
            </fieldset>
        </div>
    })

    del = (el) => {
        db.collection("Messages").doc(el.Email).delete().then(() => {
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

                    return <div className="viewMessages theme-purple index-2">
                        <main className="main" role="main">

                            <AdminHeader />
                            <div className="wrap">
                                <div className="row">

                                    <AdminSidebar />

                                    <div className="three-fourth">
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
export default viewMessages;







