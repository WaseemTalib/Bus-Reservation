import React, {Component} from 'react';
import { Link } from "react-router-dom"
import firebase from '../../config/firebase';
import { db } from "../../config/firebase";
import  UserHeader from './Header'
import  UserFooter from './Footer'

class Sign extends Component{
   
    state = {
        userName: "",
        email: "",
        password: "",
        cpassword: ""
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
  
    signUp = (e) => {
       e.preventDefault();
    //    console.log(this.state)

       if(this.state.email === ""){
           return alert("Please enter email.")
       }
       if(this.state.password === this.state.confirmPassword){
           return alert("You're password matched.")
       }
    
       firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(cred => {
        return db.collection('userInfo').doc(this.state.email).set({
            userName: this.state.userName,
            email: this.state.email,
            userId: cred.uid,
            role: false
        })
    }).then(() => {
        this.setState({userName: "", email:"", password:"", cpassword:""});
        this.props.history.push("/")
    }).catch((err)=>{
        console.log(err)
    })
    }

  render(){
      return <div className="Sign theme-purple authentication sidebar-collapse">
   <UserHeader/>

   {/* <!-- Main --> */}
	<main className="main" role="main">
		{/* <!-- Page info --> */}
		<header className="site-title color">
			<div className="wrap">
				<div className="container">
					<h1>Register</h1>
					<nav role="navigation" className="breadcrumbs">
						<ul>
							<li><a href="index.html" title="Home">Home</a></li>
							<li>Register</li>
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
                    <form onSubmit={this.signUp} className="form" method="" action="">
               			<div className="f-row">
								<div className="full-width">
									<label htmlFor="name">Username</label>
                                    <input type="text" value={this.state.userName} id="name" name="userName" onChange={this.handleChange}className="form-control validate"/>
                   						</div>
							</div>
							<div className="f-row">
								<div className="full-width">
									<label htmlFor="email">Email</label>
                                    <input value={this.state.email} id="email" name="email" onChange={this.handleChange} type="email" className="form-control validate"/>
                  				</div>
							</div>
							<div className="f-row">
								<div className="full-width">
									<label htmlFor="password">Password</label>
                                    <input value={this.state.password} id="password" name="password" onChange={this.handleChange} type="password" className="form-control validate" />
             					</div>
							</div>
							<div className="f-row">
								<div className="full-width">
									<label htmlFor="password2">Confirm password</label>
                                    <input value={this.state.cpassword} id="password2" name="cpassword" onChange={this.handleChange} type="password" className="form-control validate" />
           					</div>
							</div>
							
							<div className="f-row">
								<div className="full-width">
									<input type="submit" value="Create an account" className="btn color medium full" />
								</div>
							</div>
							
							<p>Already have an account? <Link to="/login">Login</Link></p>
						</form>
              		</div>
					{/* <!--//Login--> */}
				</div>
				{/* <!--- //Content --> */}
			</div>
		</div>
	</main>
	{/* <!-- //Main --> */}
    
 <UserFooter/>
      </div>
}

}
export default Sign;
