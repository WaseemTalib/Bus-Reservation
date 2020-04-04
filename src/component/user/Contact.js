import React, { Component } from 'react';
import { db } from '../../config/firebase';
// import { Link } from 'react-router-dom';
import UserHeader from './Header'
import UserFooter from './Footer'

class Contact extends Component {

    state = {
        yourName: "",
        yourEmail: "",
        suggestion: "",
        from: "",
        to: "",
        date: "",

    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
        // console.log(this.state)
    }

    sendMessage = (e) => {
        e.preventDefault();
        db.collection('Messages').doc(this.state.yourEmail).set({
            Name: this.state.yourName,
            Email: this.state.yourEmail,
            Message: this.state.suggestion,
        }).catch((error) => {
            console.log(error)
        })
        this.setState({ yourName: "", yourEmail: "", suggestion: "" })
    }

    render() {
        return <div className="Contact theme-purple index-2">
            <UserHeader />
            <main className="main" role="main">
                {/* <!-- Page info --> */}
                <header className="site-title color">
                    <div className="wrap">
                        <div className="container">
                            <h1>Contact us</h1>
                            <nav role="navigation" className="breadcrumbs">
                                <ul>
                                    <li><a href="index.html" title="Home">Home</a></li>
                                    <li>Contact</li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </header>
                {/* <!-- //Page info --> */}

                {/* <!--- Google map --> */}
                <div id="map_canvas" className="gmap">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.280854423438!2d73.08354661462866!3d31.433934158551363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392242829d7a0763%3A0xd792771da24b3615!2sIqbal%20Stadium%20for%20Cricket!5e0!3m2!1sen!2s!4v1585566554903!5m2!1sen!2s" title="map" width="100%" height="450" frameBorder="0" style={{border:0}} allowFullScreen="" X-Frame-Options="" aria-hidden="false" tabIndex="0"></iframe> 
                   </div>
                {/* <!--- //Google map --> */}

                <div className="wrap">
                    <div className="row">

                        {/* <!--- Content --> */}
                        <div className="full-width content textongrey">
                            <h2>Send us a message</h2>

                        </div>
                        {/* <!--- //Content --> */}

                        {/* <!-- Form --> */}
                        <div className="three-fourth">
                        <form className="addForm" onSubmit={this.sendMessage}>
                            <div id="message"></div>
                                <div className="f-row">
                                    <div className="one-half">
                                        <label htmlFor="name">Your Name</label>
                                        <input id="name" type="text" name="yourName" value={this.state.yourName} onChange={this.handleChange} className="form-control" />
                                    </div>
                                    <div className="one-half">
                                        <label htmlFor="email">Your Email</label>
                                        <input id="email" type="email" name="yourEmail" value={this.state.yourEmail} onChange={this.handleChange} className="form-control" />
                                    </div>
                                </div>
                                <div className="f-row">
                                    <div className="full-width">
                                        <label htmlFor="comments">Your Message</label>
                                        <textarea id="comments" value={this.state.suggestion} name="suggestion" onChange={this.handleChange} className="form-control" rows="3"></textarea>
                                    </div>
                                </div>
                                <div className="f-row">
                                    <input type="submit" value="Submit" id="submit" name="submit" className="btn color medium right" />
                                </div>
                            </form>
                        </div>
                        {/* <!-- //Form --> */}

                        {/* <!--- Sidebar --> */}
                        <aside className="one-fourth sidebar right">

                            <div className="widget">
                                <h4>Need help booking?</h4>
                                <div className="textwidget">
                                    <p>Call our customer services team on the number below to speak to one of our advisors who will help you with all of your needs.</p>
                                    <p className="contact-data"><span className="icon icon-themeenergy_call black"></span> +1 555 555 555</p>
                                </div>
                            </div>

                        </aside>
                        {/* <!--- //Sidebar --> */}
                    </div>
                </div>
            </main>
            {/* <!-- //Main --> */}

            <UserFooter />
        </div>


    }

}
export default Contact;
