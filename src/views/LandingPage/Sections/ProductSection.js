import React, { Component } from "react";

// @material-ui/core components
import {
  makeStyles,
  withStyles,
  createMuiTheme
} from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";

import CssBaseline from "@material-ui/core/CssBaseline";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import AnchorLink from "react-anchor-link-smooth-scroll";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import Upload from "material-ui-upload/Upload";

// @material-ui/icons

import Slide from "@material-ui/core/Slide";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import PropTypes from "prop-types";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import classNames from "classnames";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";

import ThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookf } from "@fortawesome/free-solid-svg-icons";

import linkedIn from "../../../assets/img/i.png";
import github from "../../../assets/img/g.png";
import email from "../../../assets/img/e.png";
import cancel from "../../../assets/img/cancel.svg";
import twitter from "../../../assets/img/twitter.svg";
import stack from "../../../assets/img/stack.svg";


import FileUploader from "react-firebase-file-uploader";
import firebase from "firebase";

import placeholder from "../../../assets/img/placeholder.png";
import firebaseConfig from "firebase-config";

firebase.initializeApp(firebaseConfig);

const useStyles = makeStyles(styles);
const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: {
      main: "#fff"
    }
  }
});

// const redTheme = createMuiTheme({
//   palette: {
//     primary: red,
//     secondary: {
//       main: "#fff"
//     }
//   }
// });

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)"
  },
  active: {
    "& $line": {
      borderColor: "#4caf50"
    }
  },
  completed: {
    "& $line": {
      borderColor: "#4caf50"
    }
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1
  }
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center"
  },
  active: {
    color: "#4caf50"
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor"
  },
  completed: {
    color: "#4caf50",
    zIndex: 1,
    fontSize: 18
  }
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
          <div className={classes.circle} />
        )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool
};

function getSteps() {
  return [
    "Basic Information",
    "Add Skills and Testimonials",
    "Add Experience and Projects"
  ];
}

export default function ProductSection() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(1);
  const [skillID, setSkillID] = React.useState([1]);
  const [testID, setTestID] = React.useState([1]);
  const [langID, setLangID] = React.useState([1]);
  const [pubID, setPubID] = React.useState([1]);
  const [expID, setExpID] = React.useState([1]);
  const [eduID, setEduID] = React.useState([1]);
  const [achID, setAchID] = React.useState([1]);
  const [projID, setProjID] = React.useState([1]);
  const [loading, setLoading] = React.useState(0);

  const [profileName, setProfileName] = React.useState("");
  const [aboutMe, setAboutMe] = React.useState("");
  const [linkedInLink, setLinkedIn] = React.useState("");
  const [githubLink, setGithub] = React.useState("");
  const [emailLink, setEmail] = React.useState("");
  const [twitterLink, setTwitter] = React.useState("");
  const [stackLink, setStack] = React.useState("");
  


  const [skills, setSkills] = React.useState([{ description: "", level: "" }]);

  const [profile, setProfile] = React.useState({
    image: "",
    imageURL: "",
    progress: 0
  });

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const steps = getSteps();

  const handleNext = (e) => {
    e.preventDefault();
      setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const addSkill = () => {
    var skillNum = skillID.length + 1;
    setSkillID(oldArray => [...oldArray, skillNum]);
    skills.push({ description: "", level: "" });
  };

  const deleteSkill = id => {
    setSkillID(skillID.filter(e => e !== id));
    skills.slice();
  };

  const addTest = () => {
    var testNum = testID.length + 1;
    setTestID(oldArray => [...oldArray, testNum]);
  };

  const deleteTest = id => {
    setTestID(testID.filter(e => e !== id));
  };

  const addLang = () => {
    var langNum = langID.length + 1;
    setLangID(oldArray => [...oldArray, langNum]);
  };

  const deleteLang = id => {
    setLangID(langID.filter(e => e !== id));
  };

  const addPub = () => {
    var pubNum = pubID.length + 1;
    setPubID(oldArray => [...oldArray, pubNum]);
  };

  const deletePub = id => {
    setPubID(pubID.filter(e => e !== id));
  };

  const addExp = () => {
    var expNum = expID.length + 1;
    setExpID(oldArray => [...oldArray, expNum]);
  };

  const deleteExp = id => {
    setExpID(expID.filter(e => e !== id));
  };

  const addEdu = () => {
    var eduNum = eduID.length + 1;
    setEduID(oldArray => [...oldArray, eduNum]);
  };

  const deleteEdu = id => {
    setEduID(eduID.filter(e => e !== id));
  };

  const addAch = () => {
    var achNum = achID.length + 1;
    setAchID(oldArray => [...oldArray, achNum]);
  };

  const deleteAch = id => {
    setAchID(achID.filter(e => e !== id));
  };

  const addProj = () => {
    var projNum = projID.length + 1;
    setProjID(oldArray => [...oldArray, projNum]);
  };

  const deleteProj = id => {
    setProjID(projID.filter(e => e !== id));
  };

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleUploadStart = () => {
    setLoading(1);
    setProfile({ imageURL: "1" });
  };

  const handleUploadSuccess = filename => {
    setProfile({
      image: filename,
      progress: 100
    });

    firebase
      .storage()
      .ref("profile")
      .child(filename)
      .getDownloadURL()
      .then(url => setProfile({ imageURL: url }))
      .then(setLoading(0));
  };

  const handleChangeName = event => {
    setProfileName(event.target.value);
  };

  const handleChangeAbout = event => {
    setAboutMe(event.target.value);
  };

  const handleLinkedIn = event => {
    setLinkedIn(event.target.value);
  };

  const handleGithub = event => {
    setGithub(event.target.value);
  };

  const handleEmail = event => {
    setEmail(event.target.value);
  };
  const handleTwitter = event => {
    setTwitter(event.target.value);
  };
  
  const handleStack = event => {
    setStack(event.target.value);
  };

  const handleSkills = (field, id, event) => {
    const newSkills = skills;
    // newSkills[id].description = event.target.value;
    setSkills(skills[id].description = event.target.value);
    console.log(skills);
  };

  return (
    <div className={classes.section} id="top">
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          {activeStep === 0 ? (
            <h2 className={classes.title}>Let{"'"}s Begin!</h2>
          ) : activeStep === 1 ? (
            <h2 className={classes.title}>Showcase your Skills.</h2>
          ) : (
                <h2 className={classes.title}>Almost Done!</h2>
              )}
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<QontoConnector />}
          >
            {steps.map(label => (
              <Step key={label}>
                <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
            <div>
            <form onSubmit={handleNext}>
              {activeStep === 0 ? (
                <div>
                <div>
                  <ThemeProvider theme={theme}>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={8}>
                        <TextField
                          id="fullname"
                          label="Name"
                          style={{ margin: 8 }}
                          placeholder="Enter your full name"
                          required
                          fullWidth
                          margin="normal"
                          InputLabelProps={{
                            shrink: true
                          }}
                          variant="outlined"
                          value={profileName}
                          onChange={handleChangeName}
                          style={{marginLeft: '0px'}}
                        />
                        <TextField
                          label="About Me"
                          style={{ margin: 8 }}
                          fullWidth
                          id="aboutme"
                          multiline
                          rows="8"
                          placeholder="Tell us about yourself"
                          variant="outlined"
                          value={aboutMe}
                          required
                          onChange={handleChangeAbout}
                          style={{marginLeft: '0px'}}

                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        {loading ? (
                          <CircularProgress style={{ marginTop: "50px" }} />
                        ) : null}
                        {profile.imageURL === "" ? (
                          <img
                            src={placeholder}
                            className={classes.imageRaised}
                            alt="placeholder"
                            style={{
                              width: "150px",
                              margin: "auto",
                              marginTop: "30px",
                              marginBottom: "20px"
                            }}
                          />
                        ) : (
                              <img
                                src={profile.imageURL}
                                className={classes.imageRaised}
                                alt="placeholder"
                                style={{
                                  width: "150px",
                                  margin: "auto",
                                  marginTop: "30px",
                                  marginBottom: "20px"
                                }}
                              />
                            )}

                        <br />
                        <div style={{ textAlign: "center" }}>
                          <FileUploader
                            accept="images/*"
                            name="image"
                            
                            style={{ marginLeft: "30%" }}
                            storageRef={firebase.storage().ref("profile")}
                            onUploadStart={handleUploadStart}
                            onUploadSuccess={handleUploadSuccess}
                          />
                        </div>
                      </GridItem>
                      <GridItem
                        xs={12}
                        sm={12}
                        md={12}
                        style={{ marginTop: "40px" }}
                      >
                        <h4 style={{ color: "black", fontWeight: "500" }}>
                          Social links:
                        </h4>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4} style={{marginTop: '20px'}}>
                        <TextField
                          className={classes.margin}
                          id="linkedin"
                          variant="outlined"
                          label="LinkedIn"
                          fullWidth
                          required
                          value={linkedInLink}
                          onChange={handleLinkedIn}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <img
                                  className={classes.svgIcon}
                                  src={linkedIn}
                                  alt="linkedIn"
                                  style={{ width: "20px" }}
                                />
                              </InputAdornment>
                            )
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4} style={{marginTop: '20px'}}>
                        <TextField
                          className={classes.margin}
                          id="twitter"
                          variant="outlined"
                          label="Github"
                          fullWidth
                          value={githubLink}
                          required
                          onChange={handleGithub}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <img
                                  src={github}
                                  alt="github"
                                  style={{ width: "20px" }}
                                />
                              </InputAdornment>
                            )
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4} style={{marginTop: '20px'}}>
                        <TextField
                          className={classes.margin}
                          id="email"
                          variant="outlined"
                          label="Email Id"
                          fullWidth
                          required
                          value={emailLink}
                          onChange={handleEmail}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <img
                                  src={email}
                                  alt="email"
                                  style={{ width: "20px" }}
                                />
                              </InputAdornment>
                            )
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6} style={{marginTop: '20px'}}>
                        <TextField
                          className={classes.margin}
                          id="twitter"
                          variant="outlined"
                          label="twitter"
                          fullWidth
                          value={twitterLink}
                          onChange={handleTwitter}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <img
                                  src={twitter}
                                  alt="twitter"
                                  style={{ width: "20px" }}
                                />
                              </InputAdornment>
                            )
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6} style={{marginTop: '20px'}}>
                        <TextField
                          className={classes.margin}
                          id="stack"
                          variant="outlined"
                          label="Stack Overflow"
                          fullWidth
                          value={stackLink}
                          onChange={handleStack}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <img
                                  src={stack}
                                  alt="Stack overflow"
                                  style={{ width: "20px" }}
                                />
                              </InputAdornment>
                            )
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                  </ThemeProvider>
                </div>
                <div>
                <ThemeProvider theme={theme}>
                  <ButtonGroup>
                    <AnchorLink href="#top">
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        color="primary"
                        className={classNames(
                          classes.button,
                          classes.buttonWide
                        )}
                      >
                        Back
                      </Button>
                    </AnchorLink>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classNames(
                          classes.button,
                          classes.buttonWide
                        )}
                        type="submit"
                        >
                        <Typography color="secondary">
                          {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Typography>
                      </Button>
                  </ButtonGroup>
                </ThemeProvider>
              </div>
              </div>                       
              ) : null}
              {activeStep === 1 ? (
                <div>
                <div>
                  <ThemeProvider theme={theme} className={classes.contentCard}>
                    <h2 style={{ color: "black" }}>Skills</h2>
                    {skillID.map(id => (
                      // eslint-disable-next-line react/jsx-key
                      <GridContainer
                        id={id}
                        className={classes.contentCard}
                        key={id}
                      >
                        <GridItem xs={12} sm={12} md={12}>
                          <h2 className={classes.numbering}>{id}.</h2>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <h2 className={classes.delete}>
                            <Button
                              color="secondary"
                              onClick={() => deleteSkill(id)}
                            >
                              <img src={cancel} style={{ width: "30px" }} />
                            </Button>
                          </h2>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={8}>
                          <TextField
                            InputProps={{
                              className: classes.input
                            }}
                            label="Skill Description"
                            required
                            style={{ margin: 8 }}
                            fullWidth
                            margin="normal"
                            onChange={e => {
                              handleSkills("description", id - 1, e);
                            }}
                            value={skills[id - 1].description}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                          <Select
                            id="demo-simple-select"
                            className={classes.select}
                          >
                            <MenuItem value={10}>Beginner</MenuItem>
                            <MenuItem value={20}>Intermediate</MenuItem>
                            <MenuItem value={30}>Expert</MenuItem>
                            <MenuItem value={40}>Pro</MenuItem>
                          </Select>
                          )}
                        </GridItem>
                      </GridContainer>
                    ))}
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <ThemeProvider theme={theme}>
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ marginTop: "40px" }}
                            onClick={addSkill}
                          >
                            <Typography color="secondary">
                              Add Another
                            </Typography>
                          </Button>
                        </ThemeProvider>
                      </GridItem>
                    </GridContainer>
                  </ThemeProvider>
                  <ThemeProvider theme={theme}>
                    <h2 style={{ color: "black", marginTop: "60px" }}>
                      Testimonials
                    </h2>
                    {testID.map(id => (
                      // eslint-disable-next-line react/jsx-key
                      <GridContainer id={id} className={classes.contentCard}>
                        <GridItem xs={12} sm={12} md={12}>
                          <h2 className={classes.numbering}>{id}.</h2>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <h2 className={classes.delete}>
                            <Button
                              color="secondary"
                              onClick={() => deleteTest(id)}
                            >
                              <img src={cancel} style={{ width: "30px" }} />{" "}
                            </Button>
                          </h2>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <TextField
                            label="Name"
                            style={{ margin: 8 }}
                            fullWidth
                            margin="normal"
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <TextField
                            label="Credentials"
                            style={{ margin: 8 }}
                            fullWidth
                            margin="normal"
                          />
                          )}
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <TextField
                            label="About Me"
                            style={{ margin: 8 }}
                            fullWidth
                            multiline
                            rows="4"
                            placeholder="Discription"
                          />
                        </GridItem>
                      </GridContainer>
                    ))}
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <ThemeProvider theme={theme}>
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ marginTop: "40px" }}
                            onClick={addTest}
                          >
                            <Typography color="secondary">
                              Add Another
                            </Typography>
                          </Button>
                        </ThemeProvider>
                      </GridItem>
                    </GridContainer>
                  </ThemeProvider>
                  <ThemeProvider theme={theme}>
                    <h2 style={{ color: "black", marginTop: "60px" }}>
                      Languages
                    </h2>
                    {langID.map(id => (
                      // eslint-disable-next-line react/jsx-key
                      <GridContainer id={id} className={classes.contentCard}>
                        <GridItem xs={12} sm={12} md={12}>
                          <h2 className={classes.numbering}>{id}.</h2>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <h2 className={classes.delete}>
                            <Button
                              color="secondary"
                              onClick={() => deleteLang(id)}
                            >
                              <img src={cancel} style={{ width: "30px" }} />{" "}
                            </Button>
                          </h2>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={8}>
                          <TextField
                            label="Language"
                            style={{ margin: 8 }}
                            fullWidth
                            margin="normal"
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                          <Select
                            id="demo-simple-select"
                            className={classes.select}
                          >
                            <MenuItem value={10}>Beginner</MenuItem>
                            <MenuItem value={20}>Intermediate</MenuItem>
                            <MenuItem value={30}>Native</MenuItem>
                          </Select>
                          )}
                        </GridItem>
                      </GridContainer>
                    ))}
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <ThemeProvider theme={theme}>
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ marginTop: "40px" }}
                            onClick={addLang}
                          >
                            <Typography color="secondary">
                              Add Another
                            </Typography>
                          </Button>
                        </ThemeProvider>
                      </GridItem>
                    </GridContainer>
                  </ThemeProvider>
                </div>
              <div>
              <ThemeProvider theme={theme}>
                <ButtonGroup>
                  <AnchorLink href="#top">
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      color="primary"
                      className={classNames(
                        classes.button,
                        classes.buttonWide
                      )}
                    >
                      Back
                    </Button>
                  </AnchorLink>
                  {/* <AnchorLink href="#top"> */}
                    <Button
                      variant="contained"
                      color="primary"
                      className={classNames(
                        classes.button,
                        classes.buttonWide
                      )}
                      onClick={handleNext}
                      type="submit"
                    >
                      <Typography color="secondary">
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </Typography>
                    </Button>
                  {/* </AnchorLink> */}
                </ButtonGroup>
              </ThemeProvider>
            </div>
            </div>
            ) : null}

              {activeStep === 2 ? (
                <div>
                <div>
                  <ThemeProvider theme={theme}>
                    <h2 style={{ color: "black" }}>Publications</h2>

                    {pubID.map(id => (
                      // eslint-disable-next-line react/jsx-key
                      <GridContainer id={id} className={classes.contentCard}>
                        <GridItem xs={12} sm={12} md={12}>
                          <h2 className={classes.numbering}>{id}.</h2>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <h2 className={classes.delete}>
                            <Button
                              color="secondary"
                              onClick={() => deletePub(id)}
                            >
                              <img src={cancel} style={{ width: "30px" }} />{" "}
                            </Button>
                          </h2>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <TextField
                            label="Title"
                            style={{ margin: 8 }}
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            label="Journal Name"
                            style={{ margin: 8 }}
                            fullWidth
                            margin="normal"
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <TextField
                            label="Supervisor"
                            style={{ margin: 8 }}
                            fullWidth
                            margin="normal"
                          />
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              style={{ marginLeft: "7px", marginTop: "9px" }}
                              disableToolbar
                              variant="inline"
                              format="MM/dd/yyyy"
                              margin="normal"
                              fullWidth
                              id="date-picker-inline"
                              label="Published Date"
                              value={selectedDate}
                              onChange={handleDateChange}
                              KeyboardButtonProps={{
                                "aria-label": "change date"
                              }}
                            />
                          </MuiPickersUtilsProvider>
                          )}
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <TextField
                            label="Publication Link"
                            style={{ marginTop: "20px", marginLeft: "7px" }}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                          />
                          )}
                        </GridItem>
                      </GridContainer>
                    ))}
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <ThemeProvider theme={theme}>
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ marginTop: "40px" }}
                            onClick={addPub}
                          >
                            <Typography color="secondary">
                              Add Another
                            </Typography>
                          </Button>
                        </ThemeProvider>
                      </GridItem>
                    </GridContainer>
                  </ThemeProvider>
                  <ThemeProvider theme={theme}>
                    <h2 style={{ color: "black", marginTop: "40px" }}>
                      Experience
                    </h2>
                    {expID.map(id => (
                      // eslint-disable-next-line react/jsx-key
                      <GridContainer id={id} className={classes.contentCard}>
                        <GridItem xs={12} sm={12} md={12}>
                          <h2 className={classes.numbering}>{id}.</h2>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <h2 className={classes.delete}>
                            <Button
                              color="secondary"
                              onClick={() => deleteExp(id)}
                            >
                              <img src={cancel} style={{ width: "30px" }} />{" "}
                            </Button>
                          </h2>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <TextField
                            label="Company"
                            style={{ margin: 8 }}
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            label="Position"
                            style={{ margin: 8 }}
                            fullWidth
                            margin="normal"
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              style={{ marginLeft: "7px", marginTop: "9px" }}
                              disableToolbar
                              variant="inline"
                              format="MM/dd/yyyy"
                              margin="normal"
                              fullWidth
                              id="date-picker-inline"
                              label="From"
                              value={selectedDate}
                              onChange={handleDateChange}
                              KeyboardButtonProps={{
                                "aria-label": "change date"
                              }}
                            />
                          </MuiPickersUtilsProvider>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              style={{ marginLeft: "7px", marginTop: "9px" }}
                              disableToolbar
                              variant="inline"
                              format="MM/dd/yyyy"
                              margin="normal"
                              fullWidth
                              id="date-picker-inline"
                              label="To"
                              value={selectedDate}
                              onChange={handleDateChange}
                              KeyboardButtonProps={{
                                "aria-label": "change date"
                              }}
                            />
                          </MuiPickersUtilsProvider>
                          )}
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <TextField
                            label="Company Link"
                            style={{ marginTop: "20px", marginLeft: "7px" }}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                          />
                          <TextField
                            label="Summary"
                            style={{ marginTop: "20px", marginLeft: "7px" }}
                            fullWidth
                            multiline
                            rows="4"
                            placeholder="Tell us about your experience"
                            variant="outlined"
                          />
                          )}
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          )}
                        </GridItem>
                      </GridContainer>
                    ))}
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <ThemeProvider theme={theme}>
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ marginTop: "40px" }}
                            onClick={addExp}
                          >
                            <Typography color="secondary">
                              Add Another
                            </Typography>
                          </Button>
                        </ThemeProvider>
                      </GridItem>
                    </GridContainer>
                  </ThemeProvider>
                  <ThemeProvider theme={theme}>
                    <h2 style={{ color: "black", marginTop: "40px" }}>
                      Education
                    </h2>
                    {eduID.map(id => (
                      // eslint-disable-next-line react/jsx-key
                      <GridContainer id={id} className={classes.contentCard}>
                        <GridItem xs={12} sm={12} md={12}>
                          <h2 className={classes.numbering}>{id}.</h2>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <h2 className={classes.delete}>
                            <Button
                              color="secondary"
                              onClick={() => deleteEdu(id)}
                            >
                              <img src={cancel} style={{ width: "30px" }} />{" "}
                            </Button>
                          </h2>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <TextField
                            label="Institute Name"
                            style={{ margin: 8 }}
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            label="Degree Name"
                            style={{ margin: 8 }}
                            fullWidth
                            margin="normal"
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              style={{ marginLeft: "7px", marginTop: "9px" }}
                              disableToolbar
                              variant="inline"
                              format="MM/dd/yyyy"
                              margin="normal"
                              fullWidth
                              id="date-picker-inline"
                              label="From"
                              value={selectedDate}
                              onChange={handleDateChange}
                              KeyboardButtonProps={{
                                "aria-label": "change date"
                              }}
                            />
                          </MuiPickersUtilsProvider>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              style={{ marginLeft: "7px", marginTop: "9px" }}
                              disableToolbar
                              variant="inline"
                              format="MM/dd/yyyy"
                              margin="normal"
                              fullWidth
                              id="date-picker-inline"
                              label="To"
                              value={selectedDate}
                              onChange={handleDateChange}
                              KeyboardButtonProps={{
                                "aria-label": "change date"
                              }}
                            />
                          </MuiPickersUtilsProvider>
                          )}
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <TextField
                            label="College URL"
                            style={{ marginTop: "20px", marginLeft: "7px" }}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                          />
                          <TextField
                            label="Summary"
                            style={{ marginTop: "20px", marginLeft: "7px" }}
                            fullWidth
                            multiline
                            rows="4"
                            placeholder="Tell us about your education"
                            variant="outlined"
                          />
                          )}
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          )}
                        </GridItem>
                      </GridContainer>
                    ))}
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <ThemeProvider theme={theme}>
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ marginTop: "40px" }}
                            onClick={addEdu}
                          >
                            <Typography color="secondary">
                              Add Another
                            </Typography>
                          </Button>
                        </ThemeProvider>
                      </GridItem>
                    </GridContainer>
                  </ThemeProvider>
                  <ThemeProvider theme={theme}>
                    <h2 style={{ color: "black", marginTop: "40px" }}>
                      Achievements
                    </h2>
                    {achID.map(id => (
                      // eslint-disable-next-line react/jsx-key
                      <GridContainer id={id} className={classes.contentCard}>
                        <GridItem xs={12} sm={12} md={12}>
                          <h2 className={classes.numbering}>{id}.</h2>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <h2 className={classes.delete}>
                            <Button
                              color="secondary"
                              onClick={() => deleteAch(id)}
                            >
                              <img src={cancel} style={{ width: "30px" }} />{" "}
                            </Button>
                          </h2>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <TextField
                            label="Achievement Title"
                            style={{ margin: 8 }}
                            fullWidth
                            margin="normal"
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              style={{ marginLeft: "7px", marginTop: "9px" }}
                              disableToolbar
                              variant="inline"
                              format="MM/dd/yyyy"
                              margin="normal"
                              fullWidth
                              id="date-picker-inline"
                              label="Date"
                              value={selectedDate}
                              onChange={handleDateChange}
                              KeyboardButtonProps={{
                                "aria-label": "change date"
                              }}
                            />
                          </MuiPickersUtilsProvider>
                          )}
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <TextField
                            label="Achievement URL"
                            style={{ marginTop: "20px", marginLeft: "7px" }}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                          />
                          <TextField
                            label="Description"
                            style={{ marginTop: "20px", marginLeft: "7px" }}
                            fullWidth
                            multiline
                            rows="3"
                            placeholder="Tell us about your achievement"
                            variant="outlined"
                          />
                          )}
                        </GridItem>
                      </GridContainer>
                    ))}
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <ThemeProvider theme={theme}>
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ marginTop: "40px" }}
                            onClick={addAch}
                          >
                            <Typography color="secondary">
                              Add Another
                            </Typography>
                          </Button>
                        </ThemeProvider>
                      </GridItem>
                    </GridContainer>
                  </ThemeProvider>
                  <ThemeProvider theme={theme}>
                    <h2 style={{ color: "black", marginTop: "40px" }}>
                      Projects
                    </h2>
                    {projID.map(id => (
                      // eslint-disable-next-line react/jsx-key
                      <GridContainer id={id} className={classes.contentCard}>
                        <GridItem xs={12} sm={12} md={12}>
                          <h2 className={classes.numbering}>{id}.</h2>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <h2 className={classes.delete}>
                            <Button
                              color="secondary"
                              onClick={() => deleteProj(id)}
                            >
                              <img src={cancel} style={{ width: "30px" }} />{" "}
                            </Button>
                          </h2>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <TextField
                            label="Title"
                            style={{ margin: 8 }}
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            label="Demo URL"
                            style={{ margin: 8 }}
                            fullWidth
                            margin="normal"
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <Typography style={{ color: "black" }}>
                            Project Preview
                          </Typography>
                          <Input type="file" style={{ marginTop: "6px" }}>
                            Upload Preview
                          </Input>
                          <TextField
                            label="Git URL"
                            style={{ marginTop: "9px" }}
                            fullWidth
                            margin="normal"
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <TextField
                            label="Project Description"
                            style={{ marginTop: "20px", marginLeft: "7px" }}
                            fullWidth
                            multiline
                            rows="4"
                            placeholder="Tell us about your project"
                            variant="outlined"
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}></GridItem>
                      </GridContainer>
                    ))}
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <ThemeProvider theme={theme}>
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ marginTop: "40px" }}
                            onClick={addProj}
                          >
                            <Typography color="secondary">
                              Add Another
                            </Typography>
                          </Button>
                        </ThemeProvider>
                      </GridItem>
                    </GridContainer>
                  </ThemeProvider>
                </div>
              <div>
              <ThemeProvider theme={theme}>
                <ButtonGroup>
                  <AnchorLink href="#top">
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      color="primary"
                      className={classNames(
                        classes.button,
                        classes.buttonWide
                      )}
                    >
                      Back
                    </Button>
                  </AnchorLink>
                  {/* <AnchorLink href="#top"> */}
                    <Button
                      variant="contained"
                      color="primary"
                      className={classNames(
                        classes.button,
                        classes.buttonWide
                      )}
                      onClick={handleNext}
                      type="submit"
                    >
                      <Typography color="secondary">
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </Typography>
                    </Button>
                  {/* </AnchorLink> */}
                </ButtonGroup>
              </ThemeProvider>
            </div>
            </div>
            ) : null}
           </form>
            </div>
        </GridItem>
      </GridContainer>
      <div></div>
    </div>
  );
}
