import React, { Component } from 'react';
import { db } from '../../config/firebase';
import { AuthAdminContext } from '../../contexts/adminAuthContext'
import AdminLogin from '../admin/adminLogin';
import AdminHeader from './adminHeader';
import AdminSidebar from './adminSidebar';

class adminBookingDetails extends Component {

    state = {
        data: [],
        booking: [],
        busRefs: [],
        userData: [],
    }
    componentDidMount = () => {
        // for bus info 
        db.collection('bus').get().then(snapShot => {
            const data = []
            const busRefs = []
            snapShot.docs.forEach(doc => {
                let gotData = doc.data();
                let gotId = doc.id
                data.push(gotData)
                busRefs.push(gotId)
            });
            this.setState({ data });
            this.setState({ busRefs });
        })

            //  for booking data
            .then(() => {
                this.state.data.map((el, i) => {
                    let busRef = `${el.time}${el.date}${el.type}`;

                    let booking = [];

                    for (var input = 1; input <= (el.seats); input++) {

                        db.collection('SeatCount').doc(busRef).collection("seats").doc(`seat No ${input}`).get().then(snapShot => {

                            const gotData = snapShot.data()
                            booking.push(gotData)
                        })
                    }
                    this.setState({ booking: [...this.state.booking, booking] })
                })
            })
    }


    showTable = (el) => el.filter( ele=> ele.booked === true ).map((element, ind) => {
        
        return <tr key={Math.random()} >
            <td>{ind + 1}</td>
            <td>{element.type}</td>
            <td>{element.Booker}</td>
            <td>{element.from} </td>
            <td>{element.to} </td>
            <td>{element.date} </td>
            <td>{element.time} </td>
            <td>{element.seatNo} </td>
        </tr>
    })

    
    showAll = () => {
       return  this.state.booking.map(el => {
            return <table className="data responsive" key={Math.random()}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Bus Type</th>
                        <th>Pessenger</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Seats</th>
                    </tr>
                </thead>
                <tbody className="tbody">
                    {this.showTable(el)}
                </tbody>
            </table>
        })
    }

    render() {
        return <AuthAdminContext.Consumer>
            {(AuthAdminContext) => {
                if (AuthAdminContext.adminAuthenticated) {

                return <div className="bookingDetails theme-purple index-2">

                    <main className="main" role="main">

                        <AdminHeader />
                        <div className="wrap">
                            <div className="row">
                                <AdminSidebar />

                                <div className="three-fourth">

                                    {this.showAll()}
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
export default adminBookingDetails;
