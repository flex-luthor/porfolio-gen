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
import PropTypes, { array } from "prop-types";
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
  const [activeStep, setActiveStep] = React.useState(2);
  const [loading, setLoading] = React.useState(0);

  const [profileName, setProfileName] = React.useState("");
  const [profile, setProfile] = React.useState({
    image: "",
    imageURL: "",
    progress: 0
  });
  const [aboutMe, setAboutMe] = React.useState("");
  const [linkedInLink, setLinkedIn] = React.useState("");
  const [githubLink, setGithub] = React.useState("");
  const [emailLink, setEmail] = React.useState("");
  const [twitterLink, setTwitter] = React.useState("");
  const [stackLink, setStack] = React.useState("");

  const [skills, setSkills] = React.useState([
    { id: 1, skill_name: "", skill_level: "Beginner" }
  ]);
  const [tests, setTests] = React.useState([
    { id: 1, testimonial_name: "", testimonial_cred: "", testimonial_desc: "" }
  ]);
  const [langs, setLangs] = React.useState([
    { id: 1, name: "", level: "Native Speaker" }
  ]);

  const [pubs, setPubs] = React.useState([
    {
      id: 1,
      title: "",
      journal_name: "",
      supervisor: "",
      publish_date: new Date("2014-08-18T21:11:54"),
      article_link: ""
    }
  ]);
  const [exps, setExps] = React.useState([
    {
      id: 1,
      company_url: "",
      position: "",
      company: "",
      timeline: { start: new Date("2014-08-18T21:11:54"), end: new Date("2014-08-18T21:11:54") },
      summary: ""
    }
  ]);
  const [edus, setEdus] = React.useState([
    {
      id: 1,
      college_name: "",
      degree_name: "",
      college_url: "",
      summary: "",
      timeline: { start: new Date("2014-08-18T21:11:54"), end: new Date("2014-08-18T21:11:54") }
    }
  ]);
  const [achs, setAchs] = React.useState([
    {
      id: 1,
      achievement_title: "",
      achievement_description: "",
      achievement_date: new Date("2014-08-18T21:11:54"),
      achievement_url: ""
    }
  ]);
  const [pros, setPros] = React.useState([
    {
      id: 1,
      git_url: "",
      title: "",
      proj_image: "",
      proj_desc: "",
      proj_demo: ""
    }
  ]);


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
    var skillNum = skills.length + 1;
    setSkills(oldArray => {
      return [...oldArray, { id: skillNum, skill_name: "", skill_level: "Beginner" }]
    });
    console.log(skills)
  };

  const deleteSkill = id => {
    setSkills(skills.filter(e => e.id !== id));
  };

  const addTest = () => {
    var testNum = tests.length + 1;
    setTests(oldArray => {
      return [...oldArray, { id: testNum, testimonial_name: "", testimonial_cred: "", testimonial_desc: "" }]
    });
    console.log(tests)
    };

  const deleteTest = id => {
    setTests(tests.filter(e => e.id !== id));
  };

  const addLang = () => {
    var langNum = langs.length + 1;
    setLangs(oldArray => {
      return [...oldArray, {id: langNum , name: "", level: "Native Speaker" } ]
    });
    console.log(langs)  
  };

  const deleteLang = id => {
    setLangs(langs.filter(e => e.id !== id));
  };

  const addPub = () => {
    var pubNum = pubs.length + 1;
    setPubs(oldArray => {
      return [...oldArray, {id:pubNum, title: "", journal_name: "", supervisor: "", publish_date: new Date("2014-08-18T21:11:54"), article_link: ""}]
    });
    console.log(pubs)  };

  const deletePub = id => {
    setPubs(pubs.filter(e => e.id !== id));
  };

  const addExp = () => {
    var expNum = exps.length + 1;
    setExps(oldArray => {
      return [...oldArray, {id:expNum, company_url: "", position: "", company: "", timeline: {start: new Date("2014-08-18T21:11:54"), end: new Date("2014-08-18T21:11:54")}, summary: "" }]
    });
    console.log(exps)  };  

  const deleteExp = id => {
    setExps(exps.filter(e => e.id !== id));
  };

  const addEdu = () => {
    var eduNum = edus.length + 1;
    setEdus(oldArray => {
      return [...oldArray, {id:eduNum, college_name: "", degree_name: "", college_url: "", summary: "", timeline: {start: new Date("2014-08-18T21:11:54"), end: new Date("2014-08-18T21:11:54")} }]
    });
    console.log(edus)  };  

  const deleteEdu = id => {
    setEdus(edus.filter(e => e.id !== id));
  };

  const addAch = () => {
    var achNum = achs.length + 1;
    setAchs(oldArray => {
      return [...oldArray, {id:achNum, achievement_title: "", achievement_description: "", achievement_date: new Date("2014-08-18T21:11:54"), achievement_url: "" }]
    });
    console.log(achs)  };  

  const deleteAch = id => {
    setAchs(achs.filter(e => e.id !== id));
  };

  const addProj = () => {
    var projNum = pros.length + 1;
    setPros(oldArray => {
      return [...oldArray, {id:projNum, git_url: "", title: "", proj_image: "", proj_desc: "", proj_demo: "" }]
    });
    console.log(pros)  };  

  const deleteProj = id => {
    setPros(pros.filter(e => e.id !== id));
  };

  // const handleDateChangePub = date => {
  //   setSelectedDatePub(date);
  //   console.log(date);
  // };

  const handleUploadProfileStart = () => {
    setLoading(1);
    setProfile({ imageURL: "1" });
  };

  const handleUploadProfileSuccess = filename => {
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

  const handleSkills = (field, id, evn) => {
    if (field === "skill_name") {
      setSkills([...skills.slice(0, id), {...skills[id], skill_name : evn.target.value}]);
    }
    if (field === "skill_level") {
      setSkills([...skills.slice(0, id), {...skills[id], skill_level : evn.target.value}]);
    }

  };

  const handleTests = (field, id, evn) => {
    if (field === "testimonial_name") {
      setTests([...tests.slice(0, id), {...tests[id], testimonial_name : evn.target.value}]);
    }
    if (field === "testimonial_cred") {
      setTests([...tests.slice(0, id), {...tests[id], testimonial_cred : evn.target.value}]);
    }
    if (field === "testimonial_desc") {
      setTests([...tests.slice(0, id), {...tests[id], testimonial_desc : evn.target.value}]);
    }

  };

  const handleLangs = (field, id, evn) => {
    if (field === "name") {
      setLangs([...langs.slice(0, id), {...langs[id], name : evn.target.value}]);
    }
    if (field === "level") {
      setLangs([...langs.slice(0, id), {...langs[id], level : evn.target.value}]);
    }

  };

  const handlePubs = (field, id, evn) => {
    if (field === "title") {
      setPubs([...pubs.slice(0, id), {...pubs[id], title: evn.target.value}]);
    }
    if (field === "journal_name") {
      setPubs([...pubs.slice(0, id), {...pubs[id], journal_name : evn.target.value}]);
    }
    if (field === "supervisor") {
      setPubs([...pubs.slice(0, id), {...pubs[id], supervisor : evn.target.value}]);
    }
    if (field === "publish_date") {
      setPubs([...langs.slice(0, id), {...pubs[id], publish_date : evn}]);
    }
    if (field === "article_link") {
      setPubs([...pubs.slice(0, id), {...pubs[id], article_link : evn.target.value}]);
    }

  };

  const handleExps = (field, id, evn) => {
    if (field === "company_url") {
      setExps([...exps.slice(0, id), {...exps[id],  company_url : evn.target.value}]);
    }
    if (field === "position") {
      setExps([...exps.slice(0, id), {...exps[id], position : evn.target.value}]);
    }
    if (field === "company") {
      setExps([...exps.slice(0, id), {...exps[id], company : evn.target.value}]);
    }
    if (field === "start") {
      setExps([...exps.slice(0, id), {...exps[id], timeline : {start: evn}}]);
    }
    if (field === "end") {
      setExps([...exps.slice(0, id), {...exps[id], timeline : {end: evn}}]);
    }
    if (field === "summary") {
      setExps([...exps.slice(0, id), {...exps[id], summary : evn.target.value}]);
    }

  };

  const handleEdus = (field, id, evn) => {
    if (field === "college_name") {
      setEdus([...edus.slice(0, id), {...edus[id], college_name : evn.target.value}]);
    }
    if (field === "degree_name") {
      setEdus([...edus.slice(0, id), {...edus[id], degree_name : evn.target.value}]);
    }
    if (field === "college_url") {
      setEdus([...edus.slice(0, id), {...edus[id], college_url : evn.target.value}]);
    }
    if (field === "summary") {
      setEdus([...edus.slice(0, id), {...edus[id], summary : evn.target.value}]);
    }
    if (field === "start") {
      setEdus([...edus.slice(0, id), {...edus[id], timeline : {start: evn}}]);
    }
    if (field === "end") {
      setEdus([...edus.slice(0, id), {...edus[id], timeline : {end: evn}}]);
    }

  };

  const handleAchs = (field, id, evn) => {
    if (field === "achievement_title") {
      setAchs([...achs.slice(0, id), {...achs[id], achievement_title : evn.target.value}]);
    }
    if (field === "achievement_description") {
      setAchs([...achs.slice(0, id), {...achs[id], achievement_description : evn.target.value}]);
    }
    if (field === "achievement_date") {
      setAchs([...achs.slice(0, id), {...achs[id], achievement_date : evn}]);
    }
    if (field === "achievement_url") {
      setAchs([...achs.slice(0, id), {...achs[id], achievement_url : evn.target.value}]);
    }

  };

  const handlePros = (field, id, evn) => {
    if (field === "git_url") {
      setPros([...pros.slice(0, id), {...pros[id], git_url : evn.target.value}]);
    }
    if (field === "title") {
      setPros([...pros.slice(0, id), {...pros[id], title : evn.target.value}]);
    }
    if (field === "proj_desc") {
      setPros([...pros.slice(0, id), {...pros[id], proj_desc : evn.target.value}]);
    }
    if (field === "proj_demo") {
      setPros([...pros.slice(0, id), {...pros[id], proj_demo : evn.target.value}]);
    }
    if (field === "proj_image") {
      console.log(evn.target.files[0])
      setPros([...pros.slice(0, id), {...pros[id], proj_image : ""}]);
    }

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
                            onUploadStart={handleUploadProfileStart}
                            onUploadSuccess={handleUploadProfileSuccess}
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
                    {skills.map(el => (
                      // eslint-disable-next-line react/jsx-key
                      <GridContainer
                        id={el.id}
                        className={classes.contentCard}
                        key={el.id}
                      >
                        <GridItem xs={12} sm={12} md={12}>
                          <h2 className={classes.numbering}>{el.id}.</h2>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <h2 className={classes.delete}>
                            <Button
                              color="secondary"
                              onClick={() => deleteSkill(el.id)}
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
                              handleSkills("skill_name", el.id - 1, e);
                            }}
                            value={skills[el.id -1].skill_name}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                          <Select
                            id="demo-simple-select"
                            className={classes.select}
                            value={skills[el.id - 1].skill_level}
                            onChange={e => {
                              handleSkills("skill_level", el.id - 1, e);
                            }}
                            
                          >
                            <MenuItem value={'Beginner'}>Beginner</MenuItem>
                            <MenuItem value={'Intermediate'}>Intermediate</MenuItem>
                            <MenuItem value={'Expert'}>Expert</MenuItem>
                            <MenuItem value={'Pro'}>Pro</MenuItem>
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
                              Add Another Skill
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
                    {tests.map(el => (
                      // eslint-disable-next-line react/jsx-key
                      <GridContainer id={el.id} className={classes.contentCard}>
                        <GridItem xs={12} sm={12} md={12}>
                          <h2 className={classes.numbering}>{el.id}.</h2>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <h2 className={classes.delete}>
                            <Button
                              color="secondary"
                              onClick={() => deleteTest(el.id)}
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
                            onChange={e => {
                              handleTests("testimonial_name", el.id - 1, e);
                            }}
                            value={tests[el.id -1].testimonial_name}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <TextField
                            label="Credentials"
                            style={{ margin: 8 }}
                            fullWidth
                            margin="normal"
                            onChange={e => {
                              handleTests("testimonial_cred", el.id - 1, e);
                            }}
                            value={tests[el.id -1].testimonial_cred}
                          />
                          )}
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <TextField
                            label="Testimonial"
                            style={{ margin: 8 }}
                            fullWidth
                            multiline
                            rows="4"
                            placeholder="Discription"
                            onChange={e => {
                              handleTests("testimonial_desc", el.id - 1, e);
                            }}
                            value={tests[el.id -1].testimonial_desc}
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
                              Add Another Testimonial
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
                    {langs.map(el => (
                      // eslint-disable-next-line react/jsx-key
                      <GridContainer id={el.id} className={classes.contentCard}>
                        <GridItem xs={12} sm={12} md={12}>
                          <h2 className={classes.numbering}>{el.id}.</h2>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <h2 className={classes.delete}>
                            <Button
                              color="secondary"
                              onClick={() => deleteLang(el.id)}
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
                            onChange={e => {
                              handleLangs("name", el.id - 1, e);
                            }}
                            value={langs[el.id -1].name}
                            
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                          <Select
                            id="demo-simple-select"
                            className={classes.select}
                            onChange={e => {
                              handleLangs("level", el.id - 1, e);
                            }}
                            value={langs[el.id -1].level}
                          >
                            <MenuItem value={"Native Speaker"}>Native Speaker</MenuItem>
                            <MenuItem value={"Second Language"}>Second Language</MenuItem>
                            <MenuItem value={"Third Language"}>Third Language</MenuItem>
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
                              Add Another Language
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

              {activeStep === 2 ? (
                <div>
                <div>
                  <ThemeProvider theme={theme}>
                    <h2 style={{ color: "black" }}>Publications</h2>

                    {pubs.map(el => (
                      // eslint-disable-next-line react/jsx-key
                      <GridContainer id={el.id} className={classes.contentCard}>
                        <GridItem xs={12} sm={12} md={12}>
                          <h2 className={classes.numbering}>{el.id}.</h2>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <h2 className={classes.delete}>
                            <Button
                              color="secondary"
                              onClick={() => deletePub(el.id)}
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
                            onChange={e => {
                              handlePubs("title", el.id - 1, e);
                            }}
                            value={pubs[el.id -1].title}
                          />
                          <TextField
                            label="Journal Name"
                            style={{ margin: 8 }}
                            fullWidth
                            margin="normal"
                            onChange={e => {
                              handlePubs("journal_name", el.id - 1, e);
                            }}
                            value={pubs[el.id -1].journal_name}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <TextField
                            label="Supervisor"
                            style={{ margin: 8 }}
                            fullWidth
                            margin="normal"
                            onChange={e => {
                              handlePubs("supervisor", el.id - 1, e);
                            }}
                            value={pubs[el.id -1].supervisor}
                          />
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              style={{ marginLeft: "7px", marginTop: "9px" }}
                              format="MM/dd/yyyy"
                              margin="normal"
                              fullWidth
                              id="date-picker-inline"
                              label="Published Date"
                              onChange={e => {
                                handlePubs("publish_date", el.id - 1, e);
                              }}
                              value={pubs[el.id -1].publish_date}
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
                            onChange={e => {
                              handlePubs("article_link", el.id - 1, e);
                            }}
                            value={pubs[el.id -1].article_link}
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
                              Add Another Publication
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
                    {exps.map(el => (
                      // eslint-disable-next-line react/jsx-key
                      <GridContainer id={el.id} className={classes.contentCard}>
                        <GridItem xs={12} sm={12} md={12}>
                          <h2 className={classes.numbering}>{el.id}.</h2>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <h2 className={classes.delete}>
                            <Button
                              color="secondary"
                              onClick={() => deleteExp(el.id)}
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
                            onChange={e => {
                              handleExps("company", el.id - 1, e);
                            }}
                            value={exps[el.id -1].company}
                          />
                          <TextField
                            label="Position"
                            style={{ margin: 8 }}
                            fullWidth
                            margin="normal"
                            onChange={e => {
                              handleExps("position", el.id - 1, e);
                            }}
                            value={exps[el.id -1].position}
                            
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              style={{ marginLeft: "7px", marginTop: "9px" }}
                              variant="inline"
                              format="MM/dd/yyyy"
                              margin="normal"
                              fullWidth
                              id="date-picker-inline"
                              label="From"
                              onChange={e => {
                                handleExps("start", el.id - 1, e);
                              }}
                              value={exps[el.id -1].timeline.start}
                              KeyboardButtonProps={{
                                "aria-label": "change date"
                              }}
                            />
                          </MuiPickersUtilsProvider>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              style={{ marginLeft: "7px", marginTop: "9px" }}
                              variant="inline"
                              format="MM/dd/yyyy"
                              margin="normal"
                              fullWidth
                              id="date-picker-inline"
                              label="To"
                              onChange={e => {
                                handleExps("end", el.id - 1, e);
                              }}
                              value={exps[el.id -1].timeline.end}
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
                            onChange={e => {
                              handleExps("company_link", el.id - 1, e);
                            }}
                            value={pubs[el.id -1].company_link}
                          />
                          <TextField
                            label="Summary"
                            style={{ marginTop: "20px", marginLeft: "7px" }}
                            fullWidth
                            multiline
                            rows="4"
                            placeholder="Tell us about your experience"
                            variant="outlined"
                            onChange={e => {
                              handleExps("summary", el.id - 1, e);
                            }}
                            value={pubs[el.id -1].summary}
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
                              Add Another Experience
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
                    {edus.map(el => (
                      // eslint-disable-next-line react/jsx-key
                      <GridContainer id={el.id} className={classes.contentCard}>
                        <GridItem xs={12} sm={12} md={12}>
                          <h2 className={classes.numbering}>{el.id}.</h2>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <h2 className={classes.delete}>
                            <Button
                              color="secondary"
                              onClick={() => deleteEdu(el.id)}
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
                            onChange={e => {
                              handleEdus("college_name", el.id - 1, e);
                            }}
                            value={edus[el.id -1].college_name}
                          />
                          <TextField
                            label="Degree Name"
                            style={{ margin: 8 }}
                            fullWidth
                            margin="normal"
                            onChange={e => {
                              handleEdus("degree_name", el.id - 1, e);
                            }}
                            value={edus[el.id -1].degree_name}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              style={{ marginLeft: "7px", marginTop: "9px" }}
                              variant="inline"
                              format="MM/dd/yyyy"
                              margin="normal"
                              fullWidth
                              id="date-picker-inline"
                              label="From"
                              onChange={e => {
                                handleEdus("start", el.id - 1, e);
                              }}
                              value={edus[el.id -1].timeline.start}
                              KeyboardButtonProps={{
                                "aria-label": "change date"
                              }}
                            />
                          </MuiPickersUtilsProvider>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              style={{ marginLeft: "7px", marginTop: "9px" }}
                              variant="inline"
                              format="MM/dd/yyyy"
                              margin="normal"
                              fullWidth
                              id="date-picker-inline"
                              label="To"
                              onChange={e => {
                                handleEdus("end", el.id - 1, e);
                              }}
                              value={edus[el.id -1].timeline.end}
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
                              Add Another Education
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
                    {achs.map(el => (
                      // eslint-disable-next-line react/jsx-key
                      <GridContainer id={el.id} className={classes.contentCard}>
                        <GridItem xs={12} sm={12} md={12}>
                          <h2 className={classes.numbering}>{el.id}.</h2>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <h2 className={classes.delete}>
                            <Button
                              color="secondary"
                              onClick={() => deleteAch(el.id)}
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
                            onChange={e => {
                              handleAchs("achievement_title", el.id - 1, e);
                            }}
                            value={achs[el.id -1].achievement_title}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              style={{ marginLeft: "7px", marginTop: "9px" }}
                              format="MM/dd/yyyy"
                              margin="normal"

                              fullWidth
                              id="date-picker-inline"
                              label="Date"
                              onChange={e => {
                                handleAchs("achievement_date", el.id - 1, e);
                              }}
                              value={achs[el.id -1].achievement_date}
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
                            onChange={e => {
                              handleAchs("achievement_url", el.id - 1, e);
                            }}
                            value={achs[el.id -1].achievement_url}
                          />
                          <TextField
                            label="Description"
                            style={{ marginTop: "20px", marginLeft: "7px" }}
                            fullWidth
                            multiline
                            rows="3"
                            placeholder="Tell us about your achievement"
                            variant="outlined"
                            onChange={e => {
                              handleAchs("achievement_description", el.id - 1, e);
                            }}
                            value={achs[el.id -1].achievement_description}
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
                              Add Another Achievement
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
                    {pros.map(el => (
                      // eslint-disable-next-line react/jsx-key
                      <GridContainer id={el.id} className={classes.contentCard}>
                        <GridItem xs={12} sm={12} md={12}>
                          <h2 className={classes.numbering}>{el.id}.</h2>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <h2 className={classes.delete}>
                            <Button
                              color="secondary"
                              onClick={() => deleteProj(el.id)}
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
                            onChange={e => {
                              handlePros("title", el.id - 1, e);
                            }}
                            value={pros[el.id -1].title}
                          />
                          <TextField
                            label="Demo URL"
                            style={{ margin: 8 }}
                            fullWidth
                            margin="normal"
                            onChange={e => {
                              handlePros("proj_demo", el.id - 1, e);
                            }}
                            value={pros[el.id -1].proj_demo}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          {/* <Typography style={{ color: "black" }}>
                            Project Preview
                          </Typography> */}
                          <input type='file' name='fileUpload' id='fileUpload' style={{ width: "0.1px", 
                                                                                        height: '0.1px',	
                                                                                        opacity: '0',	
                                                                                        overflow: 'hidden',	
                                                                                        position: 'absolute',	
                                                                                        zIndex: '-1'}} 
                          onChange={e => {
                              handlePros("proj_image", el.id - 1, e);
                            }} />
                            <div style={{margin: '25px'}}>
                            <label for='fileUpload' style={{cursor: "pointer", color: "#388E3C", fontSize: "18px", border: "0.5px solid #388E3C",borderRadius: "5px", padding: '8px'}}>Upload Image</label>
                            </div>
                          
                          <TextField
                            label="Git URL"
                            style={{ marginTop: "4px" }}
                            fullWidth
                            margin="normal"
                            onChange={e => {
                              handlePros("git_url", el.id - 1, e);
                            }}
                            value={pros[el.id -1].git_url}
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
                            onChange={e => {
                              handlePros("proj_desc", el.id - 1, e);
                            }}
                            value={pros[el.id -1].proj_desc}
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
                              Add Another Project
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
           </form>
            </div>
        </GridItem>
      </GridContainer>
      <div></div>
    </div>
  );
}
