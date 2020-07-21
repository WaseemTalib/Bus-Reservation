import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { AuthContext } from '../../contexts/authContext';
import firebase, { db } from '../../config/firebase';
import UserHeader from './Header'
import UserFooter from './Footer'

class Login extends Component {
	state = {
		email: "",
		password: "",
	}

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value })
	}

	Login = (e) => {
		e.preventDefault();
		firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {

			firebase.auth().onAuthStateChanged((user) => {
				const loggedUserId = user.email;
				db.collection('userInfo').doc(loggedUserId).get().then(snapShot => {
					let userStatus = snapShot.data();
					if (userStatus.role === false) {
						console.log("user is login")
						this.props.history.push("/")
					}
					else {
						console.log("Please get Admin Sign In form to login your account.")
						firebase.auth().signOut()
					}
				})
			})
		}).catch((error) => {
			console.log(error)
		});
	}

	render() {
		return <AuthContext.Consumer >
			{(authContext) => {
				return <div className="Login theme-purple authentication sidebar-collapse">
					<UserHeader />
					{/* <!-- Main --> */}
					<main className="main" role="main">
						{/* <!-- Page info --> */}
						<header className="site-title color">
							<div className="wrap">
								<div className="container">
									<h1>Login</h1>
									<nav role="navigation" className="breadcrumbs">
										<ul>
										<li><Link to="/" title="Home">Home</Link></li>
											<li>Login</li>
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
										<form className="form" onSubmit={this.Login} method="" action="">
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

											<p>Dont have an account yet? <Link to="/sign">Sign up</Link>.</p>
											<p>Do you forget Password? <Link to="/forgetPass">Forget Password</Link>.</p>
											</form>
									</div>
									{/* <!--//Login--> */}
								</div>
								{/* <!--- //Content --> */}
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
export default Login;
