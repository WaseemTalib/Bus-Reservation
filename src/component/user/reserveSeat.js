import React, { Component } from 'react';
import { db } from '../../config/firebase';
import { AuthContext } from '../../contexts/authContext'
import UserHeader from './Header'
import UserFooter from './Footer'

class reserveSeat extends Component {

    static contextType = AuthContext

    state = {
        data: [],
        seatsData: [],
        selectedSeats: [],
        seats: "",
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    componentDidMount = () => {
        let busRef = this.props.match.params.seatId
        db.collection('bus').doc(busRef).get().then(snapShot => {
            const data = [];
            const gotData = snapShot.data();
            data.push(gotData)
            this.setState({ data });
        })
            .then(() => {

                this.state.data.map((el, i) => {
                    const seatsData = [];
                    for (var input = 1; input <= (el.seats); input++) {
                        db.collection('SeatCount').doc(busRef).collection("seats").doc(`seat No ${input}`).get().then(snapShot => {
                            const gotData = snapShot.data();
                            seatsData.push(gotData)
                            this.setState({ seatsData });
                        })
                    }
                    return seatsData
                })
            })
    }

    showTable = () => this.state.data.map((el, i) => {
        return <tbody key={i} className="full-width">
            <tr><td>Bus Type</td><td>{el.type}</td></tr>
            <tr><td>Departure</td><td>{el.from}</td></tr>
            <tr><td>Destination</td><td>{el.to}</td></tr>
            <tr><td>Departure Date</td><td>{el.date}</td></tr>
            <tr><td>Departure Time </td><td>{el.time}</td></tr>
            <tr><td>Fare</td><td>{el.fare}</td></tr>
        </tbody>
    })

    showSeats = (seatsData) => {
        return seatsData.map((e, i) => {
            if (e.seatNo <= 9) {
                if (e.booked === false) {
                    return <button key={i} onClick={() => { this.selectedSeat(e) }} disabled={false} className="btn seat" id={e.seatNo} style={{ marginRight: "2px", marginBottom: "3px" }} type="button">{`0${e.seatNo}`}</button>

                } else {
                    return <button key={i} className="btn" id="seat" style={{ backgroundColor: "#4084A7", marginRight: "2px", marginBottom: "3px", cursor: "not-allowed" }} title="Already Booked" disabled={true} type="button" type="button">{`0${e.seatNo}`}</button>
                }
            } else {
                if (e.booked === false) {
                    return <button key={i} onClick={() => { this.selectedSeat(e) }} disabled={false} className="btn seat" id={e.seatNo} style={{ marginRight: "2px", marginBottom: "3px" }} type="button">{e.seatNo}</button>
                } else {
                    return <button key={i} className="btn" id="seat" style={{ backgroundColor: "#4084A7", marginRight: "2px", marginBottom: "3px", cursor: "not-allowed" }} title="Already Booked" disabled={true} type="button" type="button">{e.seatNo}</button>
                }
            }
        })
    }


    selectedSeat = (e) => {

        let selectedSeats = [...this.state.selectedSeats];
        document.getElementById(`${e.seatNo}`).disabled = true;
        document.getElementById(`${e.seatNo}`).style.backgroundColor = "#4084A7";

        selectedSeats.push(e.seatNo)
        this.setState({ selectedSeats })

        var selectedSeat = document.getElementById("selectedSeat");
        var html = `
        <button id="remove" className="btn btn-primary" onclick={this.myFunction()} style="padding: 10px;background-color:#4084A7; color:white;" type="button">
        <i className="fa fa-times" aria-hidden="true">${e.seatNo}</i></button>`
        selectedSeat.innerHTML += html
    }


    book = (e) => {
        e.preventDefault();
        if (this.context.isAuthenticated) {
            if (this.state.selectedSeats.length !== 0) {
                let userEmail = this.context.user.email;
                let busRef = this.props.match.params.seatId
                this.state.data.map((el, i) => {
                    let destination = `${el.from}->${el.to}`
                    return db.collection('Reserve').doc(busRef).collection(destination).doc(userEmail).set({
                        email: userEmail,
                        seatNo: this.state.selectedSeats,
                        from: el.from,
                        to: el.to,
                        type: el.type,
                        fare: el.fare,
                        date: el.date,
                        time: el.time,
                    })
                        .then(() => {
                            this.state.selectedSeats.map((e, i) => {
                                return db.collection('SeatCount').doc(busRef).collection("seats").doc(`seat No ${e}`)
                                    .update({
                                        booked: true,
                                        Booker: userEmail,
                                        cencel: false,
                                        from: el.from,
                                        to: el.to,
                                        fare: el.fare,
                                        type: el.type
                                    })
                            })
                        })
                        .then(() => {
                            window.location.replace("/userbookingdetails");
                        })
                })
            } else {
                let select = document.getElementById("select")
                let message = document.getElementById("message")
                message.innerHTML = `Select a seat to confirm your booking.`
                select.appendChild(message)
            }
        } else {
            return document.querySelector(".outer").style.display = "block"
        }
    }

    render() {
        return <AuthContext.Consumer>
            {(authContext) => {
                // if (authContext.isAuthenticated) {

                return <div className="reserveSeat theme-purple index-2">
            
                    <div className="outer" style={{ backgroundColor: `rgba(0,0,0,0.5)`, position: "fixed", top: 0, left: 0, width: "100%", height: "100vh", zIndex: 1000 }}>
                        <div className="inner" style={{ backgroundColor: `rgb(64, 132, 167)`, color: "white", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "70%", height: "auto", zIndex: 1000 }}>
                            <button className="btn" id="seat" style={{ float: "right" }} onClick={() => document.querySelector(".outer").style.display = "none"}>&times;</button>
                            <h5>Before Make any booking please Make Sure That your are signed in.</h5>
                        </div>
                    </div>


                    <UserHeader />
                    <main className="main" role="main">

                        <div className="wrap">
                            <div className="row">

                                <div className="full">
                                    <form>
                                        <table className="data responsive" style={{ padding: "50px 40px 30px" }}>
                                            {this.showTable()}
                                        </table>
                                    </form>
                                </div>
                                <div className="three-fourth">
                                    <div className="box history">
                                        <h6 >Select Your Seat: </h6>
                                        <h2 style={{ display: "inline-block" }}>Note:&ensp; </h2>
                                        <p style={{ display: "inline-block" }}><b> CHOOSE WISELY </b>because once you select your seat you </p>
                                        <p style={{ color: "red", display: "inline-block" }}>&ensp;CANNOT CHANGE&ensp; </p>
                                        <p style={{ display: "inline-block" }}> your choice.</p>
                                        <p style={{ display: "inline-block" }}>If you Choose Wrong one! you have to click on this button-> </p>
                                        <button onClick={() => { window.location.reload() }}>Reload</button><br />
                                        <label>Available: </label>
                                        <button style={{ border: "1px solid grey", backgroundColor: "black", color: "white" }} id="seat"> &ensp;&ensp;&ensp;</button>
                                        <label>Booked: </label>
                                        <button style={{ border: "1px solid grey", backgroundColor: "#4084A7", color: "white" }} id="seat"> &ensp;&ensp;&ensp;</button>
                                        <br /><br />
                                        <div className="row">

                                            {this.showSeats(this.state.seatsData)}
                                        </div>

                                                <div className="form-group select one-half" id="select">
                                                    <p id="message" style={{ color: "#ffb307" }}></p>
                                                </div>
                                    </div>

                                </div>
                                <aside className="one-fourth sidebar right">

                                    <div className="widget">
                                        <h4>Booking</h4>
                                        <div className="textwidget">
                                            <div id="selectedSeat">
                                            </div>
                                            <br />
                                            <label>Number of Seats</label>
                                            <input className="form-control" type="text" placeholder={this.state.selectedSeats.length} readOnly />

                                            <br />
                                        </div>
                                    </div>
                                </aside>
                                <button onClick={this.book} style={{ margin: "10px" }} id="submit" name="submit" className="btn color medium centre" >Confirm Booking</button>
                            </div>
                        </div>
                    </main>

                    <UserFooter />
                </div>
                // }
                // else
                //     return <Login history={this.props.history} />
            }}
        </AuthContext.Consumer>

    }

}
export default reserveSeat;
