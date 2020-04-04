import React, { Component } from 'react';
import { Link } from "react-router-dom"
import firebase, { db } from '../../config/firebase'
import { AuthAdminContext } from '../../contexts/adminAuthContext';

class adminLogin extends Component {
	state = {
		userData: [],
		email: "",
		password: "",
	}

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value })
	}

	adminLogin = (e) => {
		e.preventDefault();
		firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {

			db.collection('userInfo').doc(firebase.auth().currentUser.email).get().then(snapShot => {
				let adminStatus = snapShot.data();
				if (adminStatus.role === true) {
					console.log("admin is login")
					this.props.history.push("/createBus")
				}
				else {
					console.log("Please get User Sign In form to login your account.")
					firebase.auth().signOut()
				}
			})
		}).catch((error) => {
			console.log(error)
		});
	}

	render() {
		return <AuthAdminContext.Consumer >
			{(AuthAdminContext) => {
				return <div className="Login theme-purple authentication sidebar-collapse">
					{/* <!-- Main --> */}
					<main className="main" role="main">

						<header className="site-title color">
							<div className="wrap">
								<div className="container">
									<h1>Admin Login</h1>
									<nav role="navigation" className="breadcrumbs">
										<ul>
											<li><a href="index.html" title="Home">Home</a></li>
											<li>Admin Login</li>
										</ul>
									</nav>
								</div>
							</div>
						</header>
						{/* <!-- //Page info --> */}

						<div className="wrap">
							<div className="row">
								{/* <!--- Content --> */}
								<div className="content one-half modal">
									{/* <!--Login--> */}
									<div className="box animated bounceInLeft">
										<form className="form" onSubmit={this.adminLogin} method="" action="">
											<div className="f-row">
												<div className="full-width">
													<label htmlFor="username">Email</label>
													<input type="email" id="email" value={this.state.email} name="email" onChange={this.handleChange} type="email" className="form-control validate" />
												</div>
											</div>
											<div className="f-row">
												<div className="full-width">
													<label htmlFor="password">Password</label>
													<input type="password" id="password" value={this.state.password} name="password" onChange={this.handleChange} type="password" className="form-control validate" />
												</div>
											</div>

											<div className="f-row">
												<div className="full-width">
													<input type="submit" value="Login" className="btn color medium full" />
												</div>
											</div>

											<p style={{ textAlign: "center" }}><Link to="/forgetPass">Foget Password?</Link></p>
										</form>
									</div>
									{/* <!--//Login--> */}
								</div>
								{/* <!--- //Content --> */}
							</div>
						</div>
					</main>
					{/* <!-- //Main --> */}
				</div>
			}}
		</AuthAdminContext.Consumer>
	}
}
export default adminLogin;
