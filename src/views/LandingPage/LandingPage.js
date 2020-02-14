import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import GoogleLogin from "react-google-login";
import Tilt from "react-tilt";

import styles from "assets/jss/material-kit-react/views/landingPage.js";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import { Link } from "react-scroll";
import axios from "axios";
import loginImg from "../../assets/img/login.png";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CircularProgress from "@material-ui/core/CircularProgress";
const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const [email, setEmail] = React.useState("example@bits.com");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const responseGoogle = response => {
    console.log(response.profileObj.email);
    setEmail(response.profileObj.email);
    const data = { email: email };
    const json = JSON.stringify(data);
    axios({
      method: "get",
      url:
        "https://cors-anywhere.herokuapp.com/https://3izwq346mb.execute-api.us-east-1.amazonaws.com/prod/portfolio",
      data: json,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(res => {
        console.log(json);
        console.log(res);
        setIsLoggedIn(true);
      })
      .catch(err => {
        console.log(json);
        setIsLoggedIn(true);
      });
  };

  const matches = useMediaQuery("(min-width:960px)");
  const phone = useMediaQuery("(max-width:600px)");


  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Portfolio Generator"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={phone ? {
          height: 50,
          color: "white"
        } : {
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax filter image={require("assets/img/landing-bg.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>
                Create a Portfolio in 4 easy steps.
              </h1>
              {/* <h3 className="display-1">
                <KeyboardArrowRightRoundedIcon fontSize="large" />
                <StorageRoundedIcon fontSize="large" />
                <KeyboardArrowRightRoundedIcon fontSize="large" />
                <LanguageRoundedIcon fontSize="large" />
              </h3> */}
              <h4>
                Create a digital Portfolio in few minutes, by filling our
                intuitive form. Portfolio Generator will host your Portfolio on
                the fastest web servers and will provide you an easy-to-share{" "}
                <a href="https://bp-gc.in/" style={{ color: "#4CAF50" }}>
                  bp-gc.in{" "}
                </a>
                short link.
              </h4>
              <br />
              <Link to="section1" smooth={true} offset={-70} duration={500}>
                <Button
                  round
                  color="success"
                  size="lg"
                  rel="noopener noreferrer"
                >
                  <CreateRoundedIcon fontSize="large" />
                  Get Started
                </Button>
              </Link>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container} id="section1">
          {isLoggedIn ? (
            <ProductSection />
          ) : (
            <div className={classes.section}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={12} style={{textAlign: 'center'}}>
                  <h1 className={classes.title} style={{color: "#222", marginTop: "100px",}}>Hey there.</h1>
                </GridItem>
                <GridItem
                  xs={12}
                  sm={12}
                  md={6}
                >
                  <Tilt
                    className="Tilt"
                    options={{ max: 25 }}
                    // style={{ height: 250, width: 250 }}
                    glare={true}
                  >
                    <div className="Tilt-inner">
                      <Card
                        className={classes.root}
                        style={{ textAlign: "center", margin: "15vh 0", minWidth: "200px", boxShadow: "0 6px 20px rgba(200, 230, 201, 0.5)" }}
                        
                      >
                        <CardContent>
                          <Typography
                            variant="h5"
                            component="h2"
                            style={{ color: "#388E3C" }}
                          >
                            Login to continue
                          </Typography>
                          <div
                            style={{ marginTop: "25px", marginBottom: "10px" }}
                          >
                            {loading ? (
                              <CircularProgress style={{ color: "green" }} />
                            ) : (
                              <div onClick={() => setLoading(true)}>
                                <GoogleLogin
                                  clientId="356883126789-kr191fl5f5odmmb8c9lr0dspapq41rlb.apps.googleusercontent.com"
                                  buttonText="Login with Google"
                                  onSuccess={responseGoogle}
                                  onFailure={responseGoogle}
                                />
                              </div>
                            )}
                          </div>
                          <Typography
                            variant="body2"
                            style={{ color: "#aaa", padding: "5px 15px" }}
                          >
                            By continuing, I agree that I am at least 13 years
                            old and have read and agree to Terms of Service and
                            Privacy Policy.
                          </Typography>
                        </CardContent>
                      </Card>
                    </div>
                  </Tilt>
                </GridItem>
                <GridItem
                  xs={12}
                  sm={12}
                  md={6}
                  style={{padding: "20px", marginBottom: '100px' }}
                >
                  {matches ? (
                    <img src={loginImg} alt="login" style={{ width: "100%" }} />
                  ) : null}
                </GridItem>
              </GridContainer>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
