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

import styles from "assets/jss/material-kit-react/views/landingPage.js";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import WorkSection from "./Sections/WorkSection.js";
import { Slide, Slider } from "@material-ui/core";
import { Link, animateScroll as scroll } from "react-scroll";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  
  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Portfolio Generator"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
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
                Create a Portfolio in 3 easy steps.
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
                the fastest web servers and will provide you an easy-to-share
                link.
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
        <div className={classes.container}  id="section1">
          <ProductSection/>
        </div>
      </div>
    </div>
  );
}
