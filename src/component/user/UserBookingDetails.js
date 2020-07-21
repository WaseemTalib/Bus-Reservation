import React, { Component } from 'react';
import { db } from '../../config/firebase';
import { Link } from "react-router-dom"
import { AuthContext } from '../../contexts/authContext'
import Login from './Login';
import UserHeader from './Header';
import UserFooter from './Footer';


class userBookingDetails extends Component {

    static contextType = AuthContext

    state = {
        data: [],
        gotData: [],
        data2: [],
        dataObj: {}
    }

    componentDidMount = () => {
        db.collection('bus').get().then(snapShot => {
            const data = []
            snapShot.docs.forEach(doc => {
                let gotData = doc.data();
                data.push(gotData)
            });
            this.setState({ data });
            return data
        }).then(data => {
            const data2 = [];
            setTimeout(() => {
                data.map((el, i) => {
                    let destination = `${el.from}->${el.to}`
                    let userEmail = this.context.user.email;
                    let busRef = `${el.time}${el.date}${el.type}`

                    db.collection("Reserve").doc(busRef).collection(destination).doc(userEmail).get().then(snapShot => {
                        if (snapShot.exists) {
                            let gotData = snapShot.data();
                            //  console.log(gotData)
                            data2.push(gotData)
                        }
                        this.setState({ data2 })
                    })
                })
            }, 3000);
        })
    }
    showTable = (data) => data.map((el, i) => {
        //  console.log(el)
        return <tr key={Math.random()}>
            <td>{i + 1}</td>
            <td>{el.type}</td>
            <td>{el.date}</td>
            <td>{el.time}</td>
            <td>{el.from}</td>
            <td>{el.to}</td>
            <td>{el.fare}</td>
            <td>{el.seatNo.length}</td>
        </tr>
    })

    render() {

        return this.context.isAuthenticated ? <div className="userBookingDetails theme-purple index-2">
            <UserHeader />
            <main className="main" role="main">
                <header className="site-title color">
                    <div className="wrap">
                        <div className="container">
                            <h1>Booking Details</h1>
                            <nav role="navigation" className="breadcrumbs">
                                <ul>
                                    <li><Link to="/" title="Home">Home</Link></li>
                                    <li>Booking Details</li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </header>
                <div className="wrap">
                    <div className="row">
                        <div className="form-group select one-third" id="div">
                            <p id="message" style={{ color: "#ffb307" }}></p>
                        </div>
                        <div className="full-width">

                            <form>
                                <table className="data responsive">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Type</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Departure</th>
                                            <th>Destination</th>
                                            <th>Fare</th>
                                            <th>Seats</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbody">
                                        {this.showTable(this.state.data2)}
                                    </tbody>
                                </table>

                            </form>
                        </div>

                    </div>
                </div>
            </main>
            {/* <!-- //Main --> */}

            <UserFooter />
        </div>
            : <Login history={this.props.history} />

    }

}
export default userBookingDetails;
