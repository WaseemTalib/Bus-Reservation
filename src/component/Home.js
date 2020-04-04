import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { AuthContext } from '../contexts/authContext'
import UserHeader from './user/Header'
import UserFooter from './user/Footer'

class Home extends Component {

	state = {
		yourName: "",
		yourEmail: "",
		suggestion: "",
		from: "",
		to: "",
		date: "",
	}
	find = (e) => {
			e.preventDefault()
			const from = this.state.from;
			const to = this.state.to;
			const date = this.state.date;
			let error = document.getElementById("error")
			let paraError = document.getElementById("paraError")
					
			if (from === to || from === "" || to === "" ||	from === "0" || to === "0") {
				
					paraError.innerHTML = `Please select a valid City *`
					error.appendChild(paraError)

			} else if (date === "") {
				paraError.innerHTML = `Please select a valid Date *`
				error.appendChild(paraError)
		} else {
				this.props.history.push(`/viewSchedule/${from}/${to}/${date}`)
			}
		}

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value })
		// console.log(this.state)
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

		return <AuthContext.Consumer>
			{(authContext) => {
				return <div className="container-fluid">
					<UserHeader />
					<main className="main" role="main">
						{/* <!-- Intro --> */}
						<div className="intro">
							<div className="wrap">
								<div className="textwidget">
									<h1 className="wow fadeInDown">Need a ride?</h1>
									<h2 className="wow fadeInUp">You've come to the right place.</h2>
									<div className="actions">
										<a href="#services" title="Our services" className="btn large white wow fadeInLeft anchor">Our services</a>
										<a href="#booking" title="Make a booking" className="btn large color wow fadeInRight anchor">Make a booking</a>
									</div>
								</div>
							</div>
						</div>
						{/* <!-- //Intro --> */}

						{/* <!-- Search --> */}
						<div className="advanced-search color" id="booking">
							<div className="wrap">
								<form onSubmit={this.find}>
									{/* <!-- Row --> */}
									<div className="f-row">
										<div className="form-group datepicker one-third">
											<label htmlFor="dep-date">Departure Date</label>
											<input id="dep-date" type="date" min={today} onChange={this.handleChange} name="date" value={this.state.date} className="form-control date" placeholder="Date" />
											{/* <input type="text" id="dep-date" /> */}
										</div>
										<div className="form-group select one-third">
											<label>Pick up location</label>
											<select id="from" className="form-control" onChange={this.handleChange} name="from" value={this.state.from}>
												<option value="0">Departure</option>
												<option value="Faisalabad">Faisalabad</option>
												<option value="Multan">Multan</option>
												<option value="Lahore">Lahore</option>
												<option value="Karachi">Karachi</option>

											</select>
										</div>
										<div className="form-group select one-third">
											<label>Drop off location</label>
											<select id="to" className="form-control" onChange={this.handleChange} name="to" value={this.state.to}>
												<option value="0">Destination</option>
												<option value="Faisalabad">Faisalabad</option>
												<option value="Multan">Multan</option>
												<option value="Lahore">Lahore</option>
												<option value="Karachi">Karachi</option>

											</select>
										</div>

										<div className="form-group select one-third" style={{marginLeft:"5px"}}>
											<button type="submit" className="btn large black"> Find</button>
										</div>
										<div className="form-group select one-third" id="error">
										<p id="paraError" style={{color:"#ffb307"}}></p>
										</div>
									</div>
									{/* <!-- //Row --> */}
								</form>
							</div>
						</div>
						{/* <!-- //Search --> */}

						{/* <!-- Services iconic --> */}
						<div className="services iconic white" data-aos="zoom-in">
							<div className="wrap">
								<div className="row">
									{/* <!-- Item --> */}
									<div className="one-third wow fadeIn">
										<span className="circle"><span className="icon  icon-themeenergy_savings"></span></span>
										<h3>Fixed rates</h3>
										<p>We never charge a commission on the payments.</p>
									</div>
									{/* <!-- //Item --> */}

									{/* <!-- Item --> */}
									<div className="one-third wow fadeIn" data-wow-delay=".2s">
										<span className="circle"><span className="icon icon-themeenergy_lockpad"></span></span>
										<h3>Reliable transfers</h3>
										<p>We're a holiday home rental agency located in the Verzasca Valley in Ticino, Switzerland.</p>
									</div>
									{/* <!-- //Item --> */}

									{/* <!-- Item --> */}
									<div className="one-third wow fadeIn" data-wow-delay=".4s">
										<span className="circle"><span className="icon icon-themeenergy_open-wallet"></span></span>
										<h3>No booking fees</h3>
										<p>present and sell your offer in an attractive way while making sure overbooking will never happen.</p>
									</div>
									{/* <!-- //Item --> */}

									{/* <!-- Item --> */}
									<div className="one-third wow fadeIn">
										<span className="circle"><span className="icon icon-themeenergy_heart"></span></span>
										<h3>Free cancellation</h3>
										<p>We're a holiday home rental agency located in the Verzasca Valley in Ticino, Switzerland.</p>
									</div>
									{/* <!-- //Item --> */}

									{/* <!-- Item --> */}
									<div className="one-third wow fadeIn" data-wow-delay=".2s">
										<span className="circle"><span className="icon icon-themeenergy_magic-trick"></span></span>
										<h3>Booking flexibility</h3>
										<p>This solution makes all modifications easy to handle and also allows us to keep our clients on at all times</p>
									</div>
									{/* <!-- //Item --> */}

									{/* <!-- Item --> */}
									<div className="one-third wow fadeIn" data-wow-delay=".4s">
										<span className="circle"><span className="icon icon-themeenergy_call"></span></span>
										<h3>24h customer service</h3>
										<p>All content (photos etc.) is managed by Planyo and API is used to present it on our website. </p>
									</div>
									{/* <!-- //Item --> */}

									{/* <!-- Item --> */}
									<div className="one-third wow fadeIn">
										<span className="circle"><span className="icon icon-themeenergy_cup"></span></span>
										<h3>Award winning service</h3>
										<p>We work together with Planyo on our entire IT solution, including the website.</p>
									</div>
									{/* <!-- //Item --> */}

									{/* <!-- Item --> */}
									<div className="one-third wow fadeIn" data-wow-delay=".2s">
										<span className="circle"><span className="icon icon-themeenergy_attach"></span></span>
										<h3>Benefits for partners</h3>
										<p> it gives our clients a possibility to reserve in different languages and automates many tasks done until now by hand.</p>
									</div>
									{/* <!-- //Item --> */}

									{/* <!-- Item --> */}
									<div className="one-third wow fadeIn" data-wow-delay=".4s">
										<span className="circle"><span className="icon icon-themeenergy_stars"></span></span>
										<h3>Quality vehicles</h3>
										<p>We are very satisfied, we now have a website that is easy to use.</p>
									</div>
									{/* <!-- //Item --> */}
								</div>
							</div>
						</div>
						{/* <!-- //Services iconic --> */}


						{/* <!-- Services --> */}
						<div id="services" className="services boxed white" id="services" data-aos="zoom-in">
							{/* <!-- Item --> */}
							<article className="one-fourth wow fadeIn">
								<figure className="featured-image">
									<img src="/assets/img/img.jpg" alt="" style={{ width: "100%" }} />
									<div className="overlay">
										<a href="/" className="expand">+</a>
									</div>
								</figure>
								<div className="details">
									<h4><a href="/">Private transfers</a></h4>
									<p>Save time by automating all reservation tasks: show up-to-date availability and immediate price quotations, ask for any information on the booking form, handle cancellations, modifications and set up automatic confirmations.</p>

								</div>
							</article>
							{/* <!-- //Item --> */}

							{/* <!-- Item --> */}
							<article className="one-fourth wow fadeIn" data-wow-delay=".2s">
								<figure className="featured-image">
									<img src="/assets/img/img4.jpg" alt="" style={{ width: "100%" }} />
									<div className="overlay">
										<a href="/" className="expand">+</a>
									</div>
								</figure>
								<div className="details">
									<h4><a href="/">Bus transfers</a></h4>
									<p>BOOKING offers a wide variety of reports which you can also export. Activity statistics provide you with up-to-date important business analytics. BOOKING integrates with Google Analytics.</p>

								</div>
							</article>
							{/* <!-- //Item --> */}

							{/* <!-- Item --> */}
							<article className="one-fourth wow fadeIn" data-wow-delay=".4s">
								<figure className="featured-image">
									<img src="/assets/img/img2.jpg" alt="" style={{ width: "100%" }} />
									<div className="overlay">
										<a href="/" className="expand">+</a>
									</div>
								</figure>
								<div className="details">
									<h4><a href="/">Shuttle transfers</a></h4>
									<p>BOOKING will be able to reflect your pricing model however complex it may be. Easily set pricing for extra form items, additional products, different seasons, durations or ages.</p>

								</div>
							</article>
							{/* <!-- //Item --> */}

							{/* <!-- Item --> */}
							<article className="one-fourth wow fadeIn" data-wow-delay=".6s">
								<figure className="featured-image">
									<img src="/assets/img/img3.jpg" alt="" style={{ width: "100%" }} />
									<div className="overlay">
										<a href="/" className="expand">+</a>
									</div>
								</figure>
								<div className="details">
									<h4><a href="/">Helicopter transfers</a></h4>
									<p>Your customers can reserve using 30 languages. Our backend is available in 6 languages. You can customize and translate to any language all your content, including personalized emails and SMS messages.</p>

								</div>
							</article>
							{/* <!-- //Item -->			 */}
						</div>
						{/* <!-- //Services --> */}
						{/* <!-- Call to action --> */}
						<div className="color cta" data-aos="zoom-in">
							<div className="wrap">
								<p className="wow fadeInLeft">Like what you see? Are you ready to stand out? You know what to do.</p>
								<Link to="/sign" className="btn huge black right wow fadeInRight">Sign Up</Link>
							</div>
						</div>
						{/* <!-- //Call to action --> */}
					</main>
					<UserFooter />
				</div>
			}}
		</AuthContext.Consumer>
	}
}
export default Home;