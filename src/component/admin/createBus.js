import React, { Component } from 'react';
import { db } from '../../config/firebase';
import { AuthAdminContext } from '../../contexts/adminAuthContext'
import AdminLogin from '../admin/adminLogin';
import AdminHeader from './adminHeader'
import AdminSidebar from './adminSidebar';


class createBus extends Component {
    state = {
        date: "",
        time: "",
        seats: "",
        type: "",
        from: "",
        to: "",
        fare: "",
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    saveData = (e) => {
        e.preventDefault();

        if (this.state.from === this.state.to || this.state.from === "" || this.state.to === "" ||
            this.state.from === "0" || this.state.to === "0") {
            return console.log("Please select a different City")
        } else {
            if (this.state.type === "" || this.state.type === "0") {
                return console.log("Please slect a bus type")
            } else {

                let busRef = this.state.time + this.state.date + this.state.type;
                db.collection('bus').doc(busRef).set({
                    date: this.state.date,
                    time: this.state.time,
                    seats: this.state.seats,
                    from: this.state.from,
                    to: this.state.to,
                    type: this.state.type,
                    fare: this.state.fare,

                })
                for (var input = 1; input <= this.state.seats; input++) {

                    db.collection('SeatCount').doc(busRef).collection("seats").doc(`${"seat No " + input}`)
                        .set({

                            seatNo: input,
                            fare: this.state.fare,
                            booked: false

                        })
                }
            }
            this.setState({ type: "", date: "", time: "", seats: "", from: "", to: "", fare: "" })

        }
    }


    render() {
        let today = new Date(),
            day = today.getDate(),
            month = today.getMonth() + 1, //January is 0
            year = today.getFullYear();
        if (day < 10) {
            day = '0' + day
        }
        if (month < 10) {
            month = '0' + month
        }
        today = year + '-' + month + '-' + day;

        return <AuthAdminContext.Consumer>
            {(AuthAdminContext) => {
                if (AuthAdminContext.adminAuthenticated) {
                return <div className="createBus theme-purple index-2">

                    <main className="main" role="main">

                        <AdminHeader />
                        <div className="wrap">
                            <div className="row">

                                <AdminSidebar />
                                <div className="three-fourth">
                                    <form className="row clearfix" onSubmit={this.saveData}>
                                        <div className="box">
                                            <h2>General settings</h2>
                                            <fieldset>
                                                <div className="f-row">
                                                    <div className="one-half">
                                                        <label htmlFor="name">Bus Type</label>
                                                        <select id="type" onChange={this.handleChange} name="type" value={this.state.type}>
                                                            <option value="0">&ensp;</option>
                                                            <option value="Luxury">Luxury</option>
                                                            <option value="Business">Business</option>
                                                            <option value="Economy">Economy</option>
                                                        </select>
                                                    </div>
                                                    <div className="one-half">
                                                        <label htmlFor="company">Departure</label>
                                                        <select id="from" onChange={this.handleChange} name="from" value={this.state.from}>
                                                            <option value="0">&ensp;</option>
                                                            <option value="Faisalabad">Faisalabad</option>
                                                            <option value="Multan">Multan</option>
                                                            <option value="Lahore">Lahore</option>
                                                            <option value="Karachi">Karachi</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="f-row">
                                                    <div className="one-half">
                                                        <label htmlFor="email">Destination</label>
                                                        <select id="to" className="form-control" onChange={this.handleChange} name="to" value={this.state.to}>
                                                            <option value="0">&ensp;</option>
                                                            <option value="Faisalabad">Faisalabad</option>
                                                            <option value="Multan">Multan</option>
                                                            <option value="Lahore">Lahore</option>
                                                            <option value="Karachi">Karachi</option>
                                                        </select>
                                                    </div>
                                                    <div className="one-half">
                                                        <label >Date</label>
                                                        <input type="date" min={today} onChange={this.handleChange} name="date" value={this.state.date} placeholder="Date" />
                                                    </div>
                                                </div>
                                                <div className="f-row">
                                                    <div className="one-half">
                                                        <label >Time</label>
                                                        <input type="time" onChange={this.handleChange} name="time" value={this.state.time} placeholder="Time" />
                                                    </div>
                                                    <div className="one-half">
                                                        <label htmlFor="zip">Seats</label>
                                                        <input type="text" onChange={this.handleChange} name="seats" value={this.state.seats} />
                                                    </div>
                                                </div>
                                                <div className="f-row">
                                                    <div className="one-half">
                                                        <label htmlFor="city">Fare</label>
                                                        <input type="number" onChange={this.handleChange} name="fare" value={this.state.fare} />
                                                    </div>
                                                    <div className="one-half" style={{ visibility: "hidden" }}>
                                                    </div>

                                                </div>
                                                <div className="f-row">
                                                    <button type="submit" className="btn color medium">Create</button>
                                                </div>
                                            </fieldset>
                                        </div></form>
                                </div>

                            </div>
                        </div>
                    </main>

                </div>
                }
                else {
                    return <AdminLogin history={this.props.history} />
                }
            }}
        </AuthAdminContext.Consumer>

    }
}
export default createBus;
