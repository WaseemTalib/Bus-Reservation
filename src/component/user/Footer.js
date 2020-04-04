import React, {Component} from 'react';
// import { Link } from "react-router-dom"

class UserFooter extends Component{
  
  render(){
  
    let d = new Date()

  return <footer className="footer black" role="contentinfo">
          <div className="wrap">
              <div className="row">
                  {/* <!-- Column --> */}
                  <article className="one-half">
                      <h6>About us</h6>
                      <p>You know that the official website and the booking engine you choose are like a dress for your brand. You need something that really fits it. Whatever your property is, we have your dress, because Simple Booking is one-of-a-kind while covering every distribution scenario.</p>
                  </article>
                  {/* <!-- //Column --> */}
                  
                  {/* <!-- Column --> */}
                  <article className="one-fourth">
                      <h6>Need help?</h6>
                      <p>Contact us via phone or email:</p>
                      <p className="contact-data"><span className="icon icon-themeenergy_call"></span> +1 555 555 555</p>
                      <p className="contact-data"><span className="icon icon-themeenergy_mail-2"></span> <a href="/">help@transfers.com</a></p>
                  </article>
                  {/* <!-- //Column --> */}
                  
                  {/* <!-- Column --> */}
                  <article className="one-fourth">
                      <h6>Follow us</h6>
                      <ul className="social">
                          <li><a href="/" title="facebook"><i className="fa fa-facebook"></i></a></li>
                          <li><a href="/" title="twitter"><i className="fa fa-fw fa-twitter"></i></a></li>
                          <li><a href="/" title="gplus"><i className="fa fa-fw fa-google-plus"></i></a></li>
                      
                      </ul>
                  </article>
                  {/* <!-- //Column --> */}
              </div>
              
              <div className="copy">
                  <p>Copyright {d.getFullYear()}, All rights reserved. </p>
                  
                  <nav role="navigation" className="foot-nav">
                      <ul>
                          <li><a href="/" title="Home">Home</a></li>
                          
                          <li><a href="/" title="About us">About us</a></li>
                          <li><a href="/" title="Contact us">Contact us</a></li>
                          
                      </ul>
                  </nav>
              </div>
          </div>
      </footer>
      
}

}

export default UserFooter;