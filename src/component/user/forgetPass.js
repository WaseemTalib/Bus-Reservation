import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import firebase from "../../config/firebase";
import UserHeader from "./Header";
import UserFooter from "./Footer";

class Login extends Component {
  state = {
    email: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  Login = e => {
    e.preventDefault();
    var email = this.state.email;
    let paraError = document.getElementById("paraError");

    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        paraError.style.backgroundColor = "green";
        paraError.innerHTML = "Recovery Mail Sent Successfully";
      })
      .catch(error => {
        paraError.style.visibility = "visible";
        paraError.innerHTML = error.message;
      });
  };

  render() {
    return (
      <AuthContext.Consumer>
        {authContext => {
          return (
            <div className="Login theme-purple authentication sidebar-collapse">
              <UserHeader />
              <main className="main" role="main">
                <header className="site-title color">
                  <div className="wrap">
                    <div className="container">
                      <h1>Login</h1>
                      <nav role="navigation" className="breadcrumbs">
                        <ul>
                          <li>
                            <Link to="/" title="Home">
                              Home
                            </Link>
                          </li>
                          <li>Login</li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </header>

                <div className="wrap">
                  <div className="row">
                    <div className="content one-half modal">
                      <div className="box animated bounceInLeft">
                        <form
                          className="form"
                          onSubmit={this.Login}
                          method=""
                          action=""
                        >
                          <div className="f-row">
                            <div className="full-width">
                              <label htmlFor="username">Email</label>
                              <input
                                type="email"
                                id="email"
                                value={this.state.email}
                                name="email"
                                onChange={this.handleChange}
                                type="email"
                                className="form-control validate"
                              />
                            </div>
                          </div>

                          <div className="f-row">
                            <div className="full-width">
                              <input
                                type="submit"
                                value="Reset Password"
                                className="btn color medium full"
                              />
                            </div>
                          </div>
                          <div className="f-row">
                            <div className="full-width">
                              <div
                                style={{
                                  fontSize: "16px",
                                  color: "#fff",
                                  backgroundColor: "red",
                                  lineHeight: "2",
                                  textAlign: "center",
                                  visibility: "hidden"
                                }}
                                className="message"
                                id="paraError"
                              ></div>
                            </div>
                          </div>

                          <p>
                            Do u want to get <Link to="/login"> LOGIN </Link>
                            now?
                          </p>
                          <p>
                            Want to <Link to="/sign"> Sign Up </Link>
                            now?
                          </p>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
              <UserFooter />
            </div>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}
export default Login;
