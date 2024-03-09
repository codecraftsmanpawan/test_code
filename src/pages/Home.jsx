import React, { useEffect } from "react";
import {Link, NavLink} from "react-router-dom";
import {useAuth} from "../hooks/authProvider";
import useDocumentTitle from "../pureFunctions/useDocumentTitle";
import { WOW } from 'wowjs';

const Home = () => {
  const {LogOutHandle} = useAuth();
  useDocumentTitle("Sociopuff : Home");
  useEffect(() => {
    const wow = new WOW({
      boxClass: 'wow', // default
      animateClass: 'animated', // default
      offset: 0, // default
      mobile: true, // default
      live: true // default
    });
    wow.init();
  }, []);
  return (
    <>
      <div class="frontend1">
      <div className="main-header fixed-top wow fadeIn navbar navbar-expand-lg  bg-light" data-wow-delay=".3s"> 
     <div className="container-fluid">
    <a href="/" className="navbar-brand">
      <img
        src="assets/images/logo.png"
        alt="SocioPuff"
        className="desktop"
      />
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
       <i className="las la-bars"></i>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto p-2">
        <li className="nav-item">
          <Link className="nav-link " to="#">
            <strong>Brands</strong>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#">
            <strong>Influencers</strong>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#">
            <strong>Marketplace</strong>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#">
            <strong>Blog</strong>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#">
            <strong>About</strong>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="">
            <strong>Contact</strong>
          </Link>
        </li>
      
        <li className="nav-item">
          <Link  className="nav-link " to="/login">
            <strong>Login</strong>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="btn wow fadeInUp" to="/Createaccount">
            Sign up
          </Link>
        </li>
      </ul>
    </div>
  </div>
</div>

  

        <div className="banner">
          <div className="container">
            <div className="banner_inner">
              <div className="content d-flex align-items-center">
                <div className="">
                  <h1 className="wow fadeInUp" data-wow-delay=".1s">
                    Influencer Marketing Agency
                  </h1>
                  <p className="wow fadeInUp" data-wow-delay=".2s">
                    We connect brands with quality influencers to scale the
                    brand campaign results beyond clicks, share, like and
                    comments.
                  </p>
                  <a
                    href="/influencers"
                    className="btn wow fadeInUp"
                    data-wow-delay=".3s"
                  >
                    Find Influencer
                  </a>
                </div>
              </div>
              <img
                className="img wow bounceIn"
                data-wow-delay=".3s"
                src="assets/images/banner-1.png"
                alt="Landing Page Banner"
              />
            </div>
          </div>
        </div>

        <div className="counter">
          <div className="container">
            <div className="cnt-hed">
              <h2 className="wow fadeInUp" data-wow-delay=".1s">
                Influencer Marketing Campaigns
              </h2>
              <p className="p wow fadeInUp" data-wow-delay=".2s">
                Manually scan each influencer authenticity in our platform and
                make sure a well-defined contract is done to run brand-safe
                campaigns as per rules.
              </p>
            </div>
            <div className="row">
              <div className="col-md-3 col-sm-6">
                <div className="card wow bounceIn" data-wow-delay=".1s">
                  <div className="cntr-hd">1.5mn+</div>
                  <p>Creator Available</p>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="card wow bounceIn" data-wow-delay=".2s">
                  <div className="cntr-hd">2bn+</div>
                  <p>Reach Genrated</p>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="card wow bounceIn" data-wow-delay=".3s">
                  <div className="cntr-hd">50k+</div>
                  <p>Content Created</p>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="card wow bounceIn" data-wow-delay=".4s">
                  <div className="cntr-hd">1000+</div>
                  <p>Partner Brands</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section3">
          <div className="container">
            <div className="row">
              <div className="col-md-6 d-flex align-items-center">
                <div>
                  <h2 className="wow fadeInUp" data-wow-delay=".1s">
                    Influencer Reporting
                  </h2>
                  <p className="wow fadeInUp" data-wow-delay=".2s">
                    Connect with every creative users who can review your
                    product for you on camera so you can use it on your website
                    or social media.
                  </p>
                  <a
                    href="/influencers"
                    className="btn wow fadeInUp"
                    data-wow-delay=".3s"
                  >
                    Find Influencer
                  </a>
                </div>
              </div>
              <div className="col-md-6">
                <img
                  className="wow zoomIn"
                  data-wow-delay=".1s"
                  src="assets/images/img-sec3.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="section4">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <img
                  className="wow zoomIn"
                  data-wow-delay=".1s"
                  src="assets/images/img-sec4.png"
                  alt=""
                />
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <div>
                  <h2 className="wow fadeInUp" data-wow-delay=".2s">
                    Engagement Tools
                  </h2>
                  <p className="wow fadeInUp" data-wow-delay=".3s">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text.
                  </p>
                  <a
                    href="/dashboardbrand"
                    className="btn wow fadeInUp"
                    data-wow-delay=".4s"
                  >
                    Get Calculated
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section3">
          <div className="container">
            <div className="row">
              <div className="col-md-6 d-flex align-items-center">
                <div>
                  <p className="wow fadeInUp" data-wow-delay=".1s">
                    We are targeting Audience , discovery, performance tracking,
                    ROI optimization as below
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <img
                  className="wow zoomIn"
                  data-wow-delay=".1s"
                  src="assets/images/img-sec7.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

        <div className="section4 campaigns fqpb">
          <div className="container">
            <div className="cnt-hed">
              <h2 className="one wow fadeInUp" data-wow-delay="0.1s">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="row">
              <div className="col-md-8">
                <div id="accordion" className="accrdan-sect">
                  <div
                    className="card accordan1 style-2 wow fadeInUp"
                    data-wow-delay="0.2s"
                  >
                    <div className="card-header acco-heading" id="heading1">
                      <h5
                        className="mb-0 one wow fadeInUp"
                        data-wow-delay="0.2s"
                      >
                        <a
                          href="#collapse1"
                          className="btn btn-link"
                          data-toggle="collapse"
                          aria-expanded="false"
                          aria-controls="collapse1"
                        >
                          <i className="fa fa-plus" aria-hidden="true"></i>
                          <i className="fa fa-minus" aria-hidden="true"></i>
                          What is Opa's magic sauce?
                        </a>
                      </h5>
                    </div>
                    <div
                      id="collapse1"
                      className="collapse show"
                      aria-labelledby="heading1"
                      data-parent="#accordion"
                    >
                      <div
                        className="card-body one wow fadeInUp"
                        data-wow-delay="0.3s"
                      >
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book. It has
                          survived not only five centuries, but also the leap
                          into electronic typesetting, remaining essentially
                          unchanged. It was popularised in the 1960s with the
                          release of Letraset sheets containing Lorem Ipsum
                          passages, and more recently with desktop publishing
                          software like Aldus PageMaker including versions of
                          Lorem Ipsum.{" "}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="card accordan1 style-2 one wow fadeInUp"
                    data-wow-delay="0.4s"
                  >
                    <div className="card-header acco-heading" id="heading2">
                      <h5 className="mb-0">
                        <a
                          href="#collapse2"
                          className="btn btn-link"
                          data-toggle="collapse"
                          data-target="#collapse2"
                          aria-expanded="false"
                          aria-controls="collapse2"
                        >
                          <i className="fa fa-plus" aria-hidden="true"></i>
                          <i className="fa fa-minus" aria-hidden="true"></i>
                          Do influencers perform better with OPA?
                        </a>
                      </h5>
                    </div>
                    <div
                      id="collapse2"
                      className="collapse"
                      aria-labelledby="heading2"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book. It has
                          survived not only five centuries, but also the leap
                          into electronic typesetting, remaining essentially
                          unchanged. It was popularised in the 1960s with the
                          release of Letraset sheets containing Lorem Ipsum
                          passages, and more recently with desktop publishing
                          software like Aldus PageMaker including versions of
                          Lorem Ipsum.{" "}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="card accordan1 style-2 one wow fadeInUp"
                    data-wow-delay="0.5s"
                  >
                    <div className="card-header acco-heading" id="heading3">
                      <h5 className="mb-0">
                        <a
                          href="#collapse3"
                          className="btn btn-link"
                          data-toggle="collapse"
                          data-target="#collapse3"
                          aria-expanded="false"
                          aria-controls="collapse3"
                        >
                          <i className="fa fa-plus" aria-hidden="true"></i>
                          <i className="fa fa-minus" aria-hidden="true"></i>
                          What kind of influencers does OPA have?
                        </a>
                      </h5>
                    </div>
                    <div
                      id="collapse3"
                      className="collapse"
                      aria-labelledby="heading3"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book. It has
                          survived not only five centuries, but also the leap
                          into electronic typesetting, remaining essentially
                          unchanged. It was popularised in the 1960s with the
                          release of Letraset sheets containing Lorem Ipsum
                          passages, and more recently with desktop publishing
                          software like Aldus PageMaker including versions of
                          Lorem Ipsum.{" "}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="card accordan1 style-2 one wow fadeInUp"
                    data-wow-delay="0.6s"
                  >
                    <div className="card-header acco-heading" id="heading4">
                      <h5 className="mb-0">
                        <a
                          href="#collapse4"
                          className="btn btn-link"
                          data-toggle="collapse"
                          data-target="#collapse4"
                          aria-expanded="false"
                          aria-controls="collapse4"
                        >
                          <i className="fa fa-plus" aria-hidden="true"></i>
                          <i className="fa fa-minus" aria-hidden="true"></i>
                          Why activate none or micro-influencers?
                        </a>
                      </h5>
                    </div>
                    <div
                      id="collapse4"
                      className="collapse"
                      aria-labelledby="heading4"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book. It has
                          survived not only five centuries, but also the leap
                          into electronic typesetting, remaining essentially
                          unchanged. It was popularised in the 1960s with the
                          release of Letraset sheets containing Lorem Ipsum
                          passages, and more recently with desktop publishing
                          software like Aldus PageMaker including versions of
                          Lorem Ipsum.{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <img
                  className="one wow zoomIn"
                  data-wow-delay="0.2s"
                  src="assets/images/faq-img.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="learn-jamf-sect">
          <div className="container">
            <div className="laptop-tbl wow fadeInLeft" data-wow-delay="0.1s">
              <img alt="" src="assets/images/img-sec10.png" />
            </div>
            <div className="content-pnl">
              <h3 className="title2 wow fadeInUp" data-wow-delay="0.2s">
                How influencer connect works?
              </h3>
              <p className="wow fadeInUp" data-wow-delay=".3s">
                Influencer connect just made it easier to reach out influencers,
                vloggers, journalists, PR specialists and everyday regular
                social media users who can help elevate your brand.
              </p>
              <div className="count-pnl">
                <div className="box">
                  <div className="one wow bounceIn" data-wow-delay="0.4s">
                    <img src="assets/images/icon-sec10-1.png" alt="" />
                  </div>
                  <h5 className="wow fadeInUp" data-wow-delay="0.5s">
                    <a href="threat-defense.html">Make your choice</a>
                  </h5>
                  <p className="wow fadeInUp" data-wow-delay="0.6s">
                    Search available influencers, vloggers, journalists and PR
                    specialists in our platform.
                  </p>
                </div>
                <div className="box">
                  <div className="one wow bounceIn" data-wow-delay="0.7s">
                    <img src="assets/images/icon-sec10-2.png" alt="" />
                  </div>
                  <h5 className="wow fadeInUp" data-wow-delay="0.8s">
                    <a href="data-policy.html">Book them instantly</a>
                  </h5>
                  <p className="wow fadeInUp" data-wow-delay="0.9s">
                    Found someone you like? Great! Book them right away and
                    connect through our platform. Don't worry. you only need to
                    pay once the service is delivered.{" "}
                  </p>
                </div>
                <div className="box">
                  <div className="one wow bounceIn" data-wow-delay="1.0s">
                    <img src="assets/images/icon-sec10-3.png" alt="" />
                  </div>
                  <h5 className="wow fadeInUp" data-wow-delay="1.1s">
                    <a href="private-access.html">Engage direclty</a>
                  </h5>
                  <p className="wow fadeInUp" data-wow-delay="1.2s">
                    Communicate with the talent you have book have booked using
                    the information you will receive from us confirmation of
                    your booking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section3 pb-0">
          <div className="container">
            <div className="cnt-hed">
              <h2 className="wow fadeInUp" data-wow-delay=".1s">
                Influencer Niche
              </h2>
              <p className="p wow fadeInUp" data-wow-delay=".2s">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text
              </p>
            </div>
            <div className="wow fadeInUp" data-wow-delay=".1s">
              <img src="assets/images/img-sec9.png" alt="" />
            </div>
          </div>
        </div>

        <footer className="footer-area wow fadeInUp" data-wow-delay="0.1s">
          <div className="footer-top">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-sm-6">
                  <div className="footer-widget">
                    <h3 className="wow fadeInUp" data-wow-delay="0.1s">
                      <img src="assets/images/logo.png" alt="" />
                    </h3>
                    <p className="wow fadeInUp" data-wow-delay="0.2s">
                      We help to connect brands with larger audiences through
                      true social media advocates or influencers. We identify,
                      signup and create campaign strategies with influencers.
                      Create content and launch on right social media platform
                      with right influencer to reach the campaign goal.
                    </p>
                  </div>
                </div>
                <div className="col-lg-2 col-sm-6 offset-lg-1">
                  <div className="footer-widget">
                    <h3 className="wow fadeInUp" data-wow-delay="0.3s">
                      Quick Liks
                    </h3>
                    <div className="footer-menu">
                      <ul>
                        <li className="wow fadeInUp" data-wow-delay="0.4s">
                          <a href="/brands">Brands</a>
                        </li>
                        <li className="wow fadeInUp" data-wow-delay="0.5s">
                          <a href="/influencers">Influencers</a>
                        </li>
                        <li className="wow fadeInUp" data-wow-delay="0.6s">
                          <a href="/aboutus">About us</a>
                        </li>
                        <li className="wow fadeInUp" data-wow-delay="0.7s">
                          <a href="/blog">blog</a>
                        </li>
                        <li className="wow fadeInUp" data-wow-delay="0.8s">
                          <a href="/contactus">Contact us</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-lg-2 col-sm-6">
                  <div className="footer-widget">
                    <div className="footer-menu mt30">
                      <ul>
                        <li className="wow fadeInUp" data-wow-delay="0.9s">
                          <a href="/">Youtubers</a>
                        </li>
                        <li className="wow fadeInUp" data-wow-delay="1.0s">
                          <a href="/">Instagram</a>
                        </li>
                        <li className="wow fadeInUp" data-wow-delay="1.2s">
                          <a href="/">Micro Influencers</a>
                        </li>
                        <li className="wow fadeInUp" data-wow-delay="1.3s">
                          <a href="/">Tik Tok</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                  <div className="company-info">
                    <h3 className="wow fadeInUp" data-wow-delay="1.4s">
                      Contact
                    </h3>
                    <ul>
                      <li className="wow fadeInUp" data-wow-delay="1.5s">
                        A-130, A Block, Sector 63 Noida, <br />
                        Uttar Pradesh 201301
                      </li>
                      <li
                        className="mt-4 d-flex align-items-center wow fadeInUp"
                        data-wow-delay="1.6s"
                      >
                        <span>
                          <i className="fa fa-phone fa-fw mr-2"></i>
                        </span>
                        <a href="tel:9971954977">997 1954 977</a>
                      </li>
                      <li
                        className="d-flex align-items-center wow fadeInUp"
                        data-wow-delay="1.7s"
                      >
                        <span>
                          <i className="fa fa-envelope fa-fw mr-2"></i>
                        </span>
                        <a href="mailto:contact@sociopuff.com">
                          {" "}
                          contact@sociopuff.com
                        </a>
                      </li>
                    </ul>
                    <h3 className="mt-4 wow fadeInUp" data-wow-delay="1.8s">
                      Follow Our Social Media
                    </h3>
                    <div className="footer-social-sect mt-3">
                      <a
                        className="wow bounceIn"
                        data-wow-delay="2.0s"
                        href="/"
                      >
                        <i className="face fa-brands fa-facebook-f fa-fw mr-2"></i>
                      </a>
                      <a
                        className="wow bounceIn"
                        data-wow-delay="2.1s"
                        href="/"
                      >
                        <i className="twtr fa-brands fa-twitter fa-fw mr-2"></i>
                      </a>
                      <a
                        className="wow bounceIn"
                        data-wow-delay="2.2s"
                        href="/"
                      >
                        <i className="ytb fa-brands fa-youtube fa-fw mr-2"></i>
                      </a>
                      <a
                        className="wow bounceIn"
                        data-wow-delay="2.3s"
                        href="/"
                      >
                        <i className="link fa-brands fa-linkedin-in fa-fw"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="container bt1">
              <div className="d-flex align-items-center">
                <div className="copyright-text">
                  <p>Sociopuff Copyrights © 2023 | All rights reserved.</p>
                </div>

                <ul className="ml-auto mr-25">
                  <li>
                    <a href="/">Disclaimer</a>
                  </li>
                  <li>
                    <a href="/">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="/">Terms & Conditions</a>
                  </li>
                  <li>
                    {" "}
                    <NavLink to="/adminlogin" className="btn">
                      Admin Login
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
