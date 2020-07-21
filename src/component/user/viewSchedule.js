import React, { Component } from 'react';
import { db } from '../../config/firebase';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext'
import UserHeader from './Header'
import UserFooter from './Footer'

class viewSchedule extends Component {


    state = {
        data: [],
    }
    componentDidMount = () => {
        db.collection('bus').get().then(snapShot => {
            const data = []
            snapShot.docs.forEach(doc => {
                let gotData = doc.data();
                data.push(gotData)
            });
            this.setState({ data });
        })
    }

    showTable = () => {
        let from = this.props.match.params.from
        let to = this.props.match.params.to
        let date = this.props.match.params.date

        return this.state.data.filter(ele => ele.date === date && ele.from === from && ele.to === to).map((el, i) => {
            
            return <tr key={i} >
                <td>{i + 1}</td>
                <td>{el.date}</td>
                <td>{el.type}</td>
                <td>{el.time}</td>
                <td>{el.fare}</td>
                <td><Link to={`/reserveSeat/${el.time}${el.date}${el.type}`}><button className="btn medium grey">Reserve</button></Link></td>
            </tr>
        })
    }

    render() {
        return <AuthContext.Consumer>
            {(authContext) => {

                return <div className="viewSchedule theme-purple index-2">
                    <UserHeader />
                    <main className="main" role="main">
                        <header className="site-title color">
                            <div className="wrap">
                                <div className="container">
                                    <h1>Time Schedule</h1>
                                    <nav role="navigation" className="breadcrumbs">
                                        <ul>
                                        <li><Link to="/" title="Home">Home</Link></li>
                                <li>Schedule</li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </header>

                        <div className="wrap">
                            <div className="row">
                                {/* <!--- Content --> */}
                                <div className="full-width content">
                                    <h2>Time Schedule of Buses</h2>

                                </div>
                                {/* <!--- //Content --> */}

                                <div className="three-fourth">
                                    <form>
                                        <table className="data responsive">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Date</th>
                                                    <th>Type</th>
                                                    <th>Time</th>
                                                    <th>Fare</th>
                                                    <th>Reservation</th>
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
                    {/* <!-- //Main --> */}

                    <UserFooter />
                </div>

            }}
        </AuthContext.Consumer>

    }

}
export default viewSchedule;
