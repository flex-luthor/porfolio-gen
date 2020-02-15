import React from "react";

// @material-ui/core components
import {
  makeStyles,
  withStyles,
  createMuiTheme
} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import AnchorLink from "react-anchor-link-smooth-scroll";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

// @material-ui/icons

import Slide from "@material-ui/core/Slide";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
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
import useMediaQuery from "@material-ui/core/useMediaQuery";

import ThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import Tilt from "react-tilt";

import linkedIn from "../../../assets/img/i.png";
import github from "../../../assets/img/g.png";
import email from "../../../assets/img/e.png";
import cancel from "../../../assets/img/cancel.svg";
import twitter from "../../../assets/img/twitter.svg";
import stack from "../../../assets/img/stack.svg";
import phone from "../../../assets/img/phone.svg";
import pin from "../../../assets/img/pin.svg";
import design from "../../../assets/img/design.gif";

import template1 from "../../../assets/img/template1.jpg";
import template2 from "../../../assets/img/template2.jpg";

import FileUploader from "react-firebase-file-uploader";
import firebase from "@firebase/app";
import "@firebase/storage";
import axios from "axios";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
    "Choose a Template",
    "Basic Information",
    "Add Skills and Testimonials",
    "Add Experience and Projects"
  ];
}

// eslint-disable-next-line react/display-name
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductSection() {
  const storage = firebase.storage();

  const classes = useStyles();

  function formatDate(date) {
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    if (date !== null) {
      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();
      return day + " " + monthNames[monthIndex] + " " + year;
    } else return null;
  }

  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const [template, setTemplate] = React.useState(1);

  const [profileName, setProfileName] = React.useState("");
  const [phoneNum, setPhoneNum] = React.useState("");

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

  const [currentLocation, setCurrentLocation] = React.useState("");
  const [skillDescription, setSkillDescription] = React.useState("");

  const [response, setResponse] = React.useState(false);

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
      publish_date: formatDate(new Date("2019-08-18T21:11:54")),
      article_link: ""
    }
  ]);
  const [exps, setExps] = React.useState([
    {
      id: 1,
      company_url: "",
      position: "",
      company: "",
      duration: {
        start: formatDate(new Date("2019-08-18T21:11:54")),
        end: formatDate(new Date("2019-08-17T21:11:54"))
      },
      timeline: "18 August 2019 - 17 August 2019",
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
      duration: {
        start: formatDate(new Date("2019-08-18T21:11:54")),
        end: formatDate(new Date("2019-08-18T21:11:54"))
      },
      timeline: "18 August 2019 - 17 August 2019"
    }
  ]);
  const [achs, setAchs] = React.useState([
    {
      id: 1,
      achievement_title: "",
      achievement_description: "",
      achievement_date: formatDate(new Date("2019-08-18T21:11:54")),
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
  const [portfolioLink, setPortfolioLink] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const handleNext = e => {
    e.preventDefault();
    if (activeStep === 3) {
      setOpen(true);
      const data = {
        data: {
          template_no: template,
          profile_name: profileName,
          phone_no: phoneNum,
          profile_pic_url: profile.imageURL,
          about_me: aboutMe,
          social: {
            linkedin_url: linkedInLink,
            github_url: githubLink,
            email: emailLink,
            twitter_url: twitterLink,
            stackoverflow_url: stackLink
          },
          current_location: currentLocation,
          skill_desc: skillDescription,
          skills: skills,
          testimonials: tests,
          langs: langs,
          publications: pubs,
          experience: exps,
          education: edus,
          achievements: achs,
          projects: pros
        }
      };
      console.log(data);

      // for (let index = 0; index < exps.length; index++) {
      //   console.log(data.data.experience[index].duration.start);

      //   data.data.experience[index].timeline =
      //     formatDate(data.data.experience[index].duration.start) +
      //     "-" +
      //     formatDate(data.data.experience[index].duration.end);
      // }
      // for (let index = 0; index < edus.length; index++) {
      //   data.data.education[index].timeline =
      //     formatDate(data.data.education[index].duration.start) +
      //     "-" +
      //     formatDate(data.data.education[index].duration.end);
      // }
      // for (let index = 0; index < pubs.length; index++) {
      //   data.data.publications[index].publish_date = formatDate(
      //     data.data.publications[index].publish_date
      //   );
      // }
      // for (let index = 0; index < achs.length; index++) {
      //   data.data.achievements[index].achievement_date = formatDate(
      //     data.data.achievements[index].achievement_date
      //   );
      // }
      const body = JSON.stringify(data);
      console.log(body);
      axios({
        method: "post",
        url:
          "https://cors-anywhere.herokuapp.com/https://3izwq346mb.execute-api.us-east-1.amazonaws.com/prod/portfolio",
        data: body,
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      }).then(res => {
        console.log(res.data.url);
        setResponse(true);
        setPortfolioLink(res.data.url);
      });
    } else setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  /* const handleReset = () => {
    setActiveStep(0);
  }; */

  const addSkill = () => {
    setSkills(oldArray => {
      return [
        ...oldArray,
        {
          id: skills[skills.length - 1].id + 1,
          skill_name: "",
          skill_level: "Beginner"
        }
      ];
    });
    console.log(skills);
  };

  const deleteSkill = id => {
    setSkills(skills.filter(e => e.id !== id));
    skills.filter(e => e.id > id).forEach(e => e.id--);
  };

  const addTest = () => {
    var testNum = tests.length + 1;
    setTests(oldArray => {
      return [
        ...oldArray,
        {
          id: testNum,
          testimonial_name: "",
          testimonial_cred: "",
          testimonial_desc: ""
        }
      ];
    });
    console.log(tests);
  };

  const deleteTest = id => {
    setTests(tests.filter(e => e.id !== id));
    tests.filter(e => e.id > id).forEach(e => e.id--);
  };

  const addLang = () => {
    var langNum = langs.length + 1;
    setLangs(oldArray => {
      return [...oldArray, { id: langNum, name: "", level: "Native Speaker" }];
    });
    console.log(langs);
  };

  const deleteLang = id => {
    setLangs(langs.filter(e => e.id !== id));
    langs.filter(e => e.id > id).forEach(e => e.id--);
  };

  const addPub = () => {
    var pubNum = pubs.length + 1;
    setPubs(oldArray => {
      return [
        ...oldArray,
        {
          id: pubNum,
          title: "",
          journal_name: "",
          supervisor: "",
          publish_date: formatDate(new Date("2019-08-18T21:11:54")),
          article_link: ""
        }
      ];
    });
    console.log(pubs);
  };

  const deletePub = id => {
    setPubs(pubs.filter(e => e.id !== id));
    pubs.filter(e => e.id > id).forEach(e => e.id--);
  };

  const addExp = () => {
    var expNum = exps.length + 1;
    setExps(oldArray => {
      return [
        ...oldArray,
        {
          id: expNum,
          company_url: "",
          position: "",
          company: "",
          duration: {
            start: formatDate(new Date("2019-08-18T21:11:54")),
            end: formatDate(new Date("2019-08-18T21:11:54"))
          },
          timeline: "18 August 2019 - 17 August 2019",
          summary: ""
        }
      ];
    });
    console.log(exps);
  };

  const deleteExp = id => {
    setExps(exps.filter(e => e.id !== id));
    exps.filter(e => e.id > id).forEach(e => e.id--);
  };

  const addEdu = () => {
    var eduNum = edus.length + 1;
    setEdus(oldArray => {
      return [
        ...oldArray,
        {
          id: eduNum,
          college_name: "",
          degree_name: "",
          college_url: "",
          summary: "",
          duration: {
            start: formatDate(new Date("2019-08-18T21:11:54")),
            end: formatDate(new Date("2019-08-18T21:11:54"))
          },
          timeline: "18 August 2019 - 17 August 2019"
        }
      ];
    });
    console.log(edus);
  };

  const deleteEdu = id => {
    setEdus(edus.filter(e => e.id !== id));
    edus.filter(e => e.id > id).forEach(e => e.id--);
  };

  const addAch = () => {
    var achNum = achs.length + 1;
    setAchs(oldArray => {
      return [
        ...oldArray,
        {
          id: achNum,
          achievement_title: "",
          achievement_description: "",
          achievement_date: formatDate(new Date("2019-08-18T21:11:54")),
          achievement_url: ""
        }
      ];
    });
    console.log(achs);
  };

  const deleteAch = id => {
    setAchs(achs.filter(e => e.id !== id));
    achs.filter(e => e.id > id).forEach(e => e.id--);
  };

  const addProj = () => {
    var projNum = pros.length + 1;
    setPros(oldArray => {
      return [
        ...oldArray,
        {
          id: projNum,
          git_url: "",
          title: "",
          proj_image: "",
          proj_desc: "",
          proj_demo: ""
        }
      ];
    });
    console.log(pros);
  };

  const deleteProj = id => {
    setPros(pros.filter(e => e.id !== id));
    pros.filter(e => e.id > id).forEach(e => e.id--);
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
  const handlePhoneNum = event => {
    setPhoneNum(event.target.value);
  };
  const handleStack = event => {
    setStack(event.target.value);
  };
  const handleCurrentLocation = event => {
    setCurrentLocation(event.target.value);
  };
  const handleSkillDescription = event => {
    setSkillDescription(event.target.value);
  };

  const handleSkills = (field, id, evn) => {
    if (field === "skill_name") {
      setSkills([
        ...skills.slice(0, id),
        { ...skills[id], skill_name: evn.target.value },
        ...skills.slice(id + 1, skills.length)
      ]);
    }
    if (field === "skill_level") {
      setSkills([
        ...skills.slice(0, id),
        { ...skills[id], skill_level: evn.target.value },
        ...skills.slice(id + 1, skills.length)
      ]);
    }
  };

  const handleTests = (field, id, evn) => {
    if (field === "testimonial_name") {
      setTests([
        ...tests.slice(0, id),
        { ...tests[id], testimonial_name: evn.target.value },
        ...tests.slice(id + 1, tests.length)
      ]);
    }
    if (field === "testimonial_cred") {
      setTests([
        ...tests.slice(0, id),
        { ...tests[id], testimonial_cred: evn.target.value },
        ...tests.slice(id + 1, tests.length)
      ]);
    }
    if (field === "testimonial_desc") {
      setTests([
        ...tests.slice(0, id),
        { ...tests[id], testimonial_desc: evn.target.value },
        ...tests.slice(id + 1, tests.length)
      ]);
    }
  };

  const handleLangs = (field, id, evn) => {
    if (field === "name") {
      setLangs([
        ...langs.slice(0, id),
        { ...langs[id], name: evn.target.value },
        ...langs.slice(id + 1, langs.length)
      ]);
    }
    if (field === "level") {
      setLangs([
        ...langs.slice(0, id),
        { ...langs[id], level: evn.target.value },
        ...langs.slice(id + 1, langs.length)
      ]);
    }
  };

  const handlePubs = (field, id, evn) => {
    if (field === "title") {
      setPubs([
        ...pubs.slice(0, id),
        { ...pubs[id], title: evn.target.value },
        ...pubs.slice(id + 1, pubs.length)
      ]);
    }
    if (field === "journal_name") {
      setPubs([
        ...pubs.slice(0, id),
        { ...pubs[id], journal_name: evn.target.value },
        ...pubs.slice(id + 1, pubs.length)
      ]);
    }
    if (field === "supervisor") {
      setPubs([
        ...pubs.slice(0, id),
        { ...pubs[id], supervisor: evn.target.value },
        ...pubs.slice(id + 1, pubs.length)
      ]);
    }
    if (field === "publish_date") {
      setPubs([
        ...pubs.slice(0, id),
        { ...pubs[id], publish_date: evn },
        ...pubs.slice(id + 1, pubs.length)
      ]);
    }
    if (field === "article_link") {
      setPubs([
        ...pubs.slice(0, id),
        { ...pubs[id], article_link: evn.target.value },
        ...pubs.slice(id + 1, pubs.length)
      ]);
    }
  };

  const handleExps = (field, id, evn) => {
    if (field === "company_url") {
      setExps([
        ...exps.slice(0, id),
        { ...exps[id], company_url: evn.target.value },
        ...exps.slice(id + 1, exps.length)
      ]);
    }
    if (field === "position") {
      setExps([
        ...exps.slice(0, id),
        { ...exps[id], position: evn.target.value },
        ...exps.slice(id + 1, exps.length)
      ]);
    }
    if (field === "company") {
      setExps([
        ...exps.slice(0, id),
        { ...exps[id], company: evn.target.value },
        ...exps.slice(id + 1, exps.length)
      ]);
    }
    if (field === "start") {
      setExps([
        ...exps.slice(0, id),
        {
          ...exps[id],
          duration: { start: evn, end: exps[id].duration.end },
          timeline: evn + "-" + exps[id].duration.end
        },
        ...exps.slice(id + 1, exps.length)
      ]);
    }
    if (field === "end") {
      setExps([
        ...exps.slice(0, id),
        {
          ...exps[id],
          duration: { start: exps[id].duration.start, end: evn },
          timeline: exps[id].duration.start + "-" + evn
        },
        ...exps.slice(id + 1, exps.length)
      ]);
    }
    if (field === "summary") {
      setExps([
        ...exps.slice(0, id),
        { ...exps[id], summary: evn.target.value },
        ...exps.slice(id + 1, exps.length)
      ]);
    }
  };

  const handleEdus = (field, id, evn) => {
    if (field === "college_name") {
      setEdus([
        ...edus.slice(0, id),
        { ...edus[id], college_name: evn.target.value },
        ...edus.slice(id + 1, edus.length)
      ]);
    }
    if (field === "degree_name") {
      setEdus([
        ...edus.slice(0, id),
        { ...edus[id], degree_name: evn.target.value },
        ...edus.slice(id + 1, edus.length)
      ]);
    }
    if (field === "college_url") {
      setEdus([
        ...edus.slice(0, id),
        { ...edus[id], college_url: evn.target.value },
        ...edus.slice(id + 1, edus.length)
      ]);
    }
    if (field === "summary") {
      setEdus([
        ...edus.slice(0, id),
        { ...edus[id], summary: evn.target.value },
        ...edus.slice(id + 1, edus.length)
      ]);
    }
    if (field === "start") {
      setEdus([
        ...edus.slice(0, id),
        {
          ...edus[id],
          duration: { start: evn, end: edus[id].duration.end },
          timeline: evn + "-" + edus[id].duration.end
        },
        ...edus.slice(id + 1, edus.length)
      ]);
    }
    if (field === "end") {
      setEdus([
        ...edus.slice(0, id),
        {
          ...edus[id],
          duration: { start: edus[id].duration.start, end: evn },
          timeline: edus[id].duration.start + "-" + evn
        },
        ...edus.slice(id + 1, edus.length)
      ]);
    }
  };

  const handleAchs = (field, id, evn) => {
    if (field === "achievement_title") {
      setAchs([
        ...achs.slice(0, id),
        { ...achs[id], achievement_title: evn.target.value },
        ...achs.slice(id + 1, achs.length)
      ]);
    }
    if (field === "achievement_description") {
      setAchs([
        ...achs.slice(0, id),
        { ...achs[id], achievement_description: evn.target.value },
        ...achs.slice(id + 1, achs.length)
      ]);
    }
    if (field === "achievement_date") {
      setAchs([
        ...achs.slice(0, id),
        { ...achs[id], achievement_date: evn },
        ...achs.slice(id + 1, achs.length)
      ]);
    }
    if (field === "achievement_url") {
      setAchs([
        ...achs.slice(0, id),
        { ...achs[id], achievement_url: evn.target.value },
        ...achs.slice(id + 1, achs.length)
      ]);
    }
  };

  const handlePros = (field, id, evn) => {
    if (field === "git_url") {
      setPros([
        ...pros.slice(0, id),
        { ...pros[id], git_url: evn.target.value },
        ...pros.slice(id + 1, pros.length)
      ]);
    }
    if (field === "title") {
      setPros([
        ...pros.slice(0, id),
        { ...pros[id], title: evn.target.value },
        ...pros.slice(id + 1, pros.length)
      ]);
    }
    if (field === "proj_desc") {
      setPros([
        ...pros.slice(0, id),
        { ...pros[id], proj_desc: evn.target.value },
        ...pros.slice(id + 1, pros.length)
      ]);
    }
    if (field === "proj_demo") {
      setPros([
        ...pros.slice(0, id),
        { ...pros[id], proj_demo: evn.target.value },
        ...pros.slice(id + 1, pros.length)
      ]);
    }
    if (field === "proj_image") {
      const imageFb = evn.target.files[0];
      const uploadTask = storage.ref(`images/${imageFb.name}`).put(imageFb);
      // firebase
      // .storage()
      // .ref("profile")
      // .child(evn.target.files[0])
      // .getDownloadURL()
      // .then(url => setPros([...pros.slice(0, id), {...pros[id], proj_image : url}]));
      uploadTask.on(
        "state_changed",
        snapshot => {
          // progress function ...
          // eslint-disable-next-line no-unused-vars
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPros([
            ...pros.slice(0, id),
            { ...pros[id], proj_image: "loading" },
            ...pros.slice(id + 1, pros.length)
          ]);
        },
        error => {
          // Error function ...
          console.log(error);
        },
        () => {
          // complete function ...
          storage
            .ref("images")
            .child(imageFb.name)
            .getDownloadURL()
            .then(url => {
              setPros([
                ...pros.slice(0, id),
                { ...pros[id], proj_image: url },
                ...pros.slice(id + 1, pros.length)
              ]);
            });
        }
      );
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  function ClipBoard(result) {
    navigator.clipboard.writeText(result);
  }

  const handleCopy = () => {
    setCopied(true);
    ClipBoard(portfolioLink);
  };

  const handleTemplate = (temp, e) => {
    setTemplate(temp);
    handleNext(e);
    console.log(temp);
  };

  const matches = useMediaQuery("(min-width:600px)");
  return (
    <div className={classes.section} id="top">
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          {activeStep === 1 ? (
            <h2 className={classes.title}>Let{"'"}s Begin!</h2>
          ) : activeStep === 2 ? (
            <h2 className={classes.title}>Showcase your Skills.</h2>
          ) : activeStep === 3 ? (
            <h2 className={classes.title}>Almost Done!</h2>
          ) : (
            <h2 className={classes.title}>Choose a Template</h2>
          )}
          {matches ? (
            <Stepper
              alternativeLabel
              activeStep={activeStep}
              connector={<QontoConnector />}
              style={{ marginTop: "40px", marginBottom: "50px" }}
            >
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel StepIconComponent={QontoStepIcon}>
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          ) : null}
          <div>
            <form onSubmit={handleNext}>
              {activeStep === 0 ? (
                <ThemeProvider theme={theme}>
                  <GridContainer>
                    <GridItem
                      xs={12}
                      sm={12}
                      md={6}
                      style={{ marginTop: "50px" }}
                    >
                      <Tilt
                        className="Tilt"
                        options={{ max: 15, scale: 1.05 }}
                        // style={{ height: 250, width: 250 }}
                      >
                        <div className="Tilt-inner">
                          <Card className={classes.root}>
                            <CardActionArea onClick={e => handleTemplate(1, e)}>
                              <img
                                src={template2}
                                alt="Theme 1"
                                style={{ width: "100%" }}
                              />
                              <CardContent>
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="h2"
                                  style={{ color: "#222" }}
                                >
                                  Nice and Simple
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  component="p"
                                >
                                  A classic and responsive portfolio theme for
                                  all your professional needs.
                                </Typography>
                                <br />
                                <br />
                              </CardContent>
                            </CardActionArea>
                            <CardActions>
                              <a
                                href="https://d2c1dleky96i4z.cloudfront.net/janedoe-gmail-com.html"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Button size="small" color="primary">
                                  Live Demo
                                </Button>
                              </a>
                              <Button
                                size="small"
                                color="primary"
                                onClick={e => handleTemplate(1, e)}
                              >
                                Select
                              </Button>
                            </CardActions>
                          </Card>
                        </div>
                      </Tilt>
                    </GridItem>
                    <GridItem
                      xs={12}
                      sm={12}
                      md={6}
                      style={{ marginTop: "50px" }}
                    >
                      <Tilt
                        className="Tilt"
                        options={{ max: 15, scale: 1.05 }}
                        // style={{ height: 250, width: 250 }}
                      >
                        <div className="Tilt-inner">
                          <Card className={classes.root}>
                            <CardActionArea onClick={e => handleTemplate(2, e)}>
                              <img
                                src={template1}
                                alt="Theme 2"
                                style={{ width: "100%" }}
                              />
                              <CardContent>
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="h2"
                                  style={{ color: "#222" }}
                                >
                                  Ronaldo
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  component="p"
                                >
                                  Ronaldo is an all-around free one page
                                  personal website template for creative
                                  individuals, professionals and job seekers.
                                </Typography>
                                <br />
                              </CardContent>
                            </CardActionArea>
                            <CardActions>
                              <a
                                href="https://d2c1dleky96i4z.cloudfront.net/johndoe-gmail-com.html"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Button size="small" color="primary">
                                  Live Demo
                                </Button>
                              </a>
                              <Button
                                size="small"
                                color="primary"
                                onClick={e => handleTemplate(2, e)}
                              >
                                Select
                              </Button>
                            </CardActions>
                          </Card>
                        </div>
                      </Tilt>
                    </GridItem>
                  </GridContainer>
                </ThemeProvider>
              ) : null}
              {activeStep === 1 ? (
                <div>
                  <div>
                    <ThemeProvider theme={theme}>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={8}>
                          <TextField
                            id="fullname"
                            label="Name"
                            style={{ margin: 8, marginLeft: "0px" }}
                            placeholder="Enter your full name"
                            required
                            autoFocus
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                              shrink: true
                            }}
                            variant="outlined"
                            value={profileName}
                            onChange={handleChangeName}
                          />
                          <TextField
                            label="About Me"
                            style={{ margin: 8, marginLeft: "0px" }}
                            fullWidth
                            id="aboutme"
                            multiline
                            rows="8"
                            placeholder="Tell us about yourself"
                            variant="outlined"
                            value={aboutMe}
                            required
                            onChange={handleChangeAbout}
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
                              required
                              style={{ marginLeft: "30%" }}
                              storageRef={firebase.storage().ref("profile")}
                              onUploadStart={handleUploadProfileStart}
                              onUploadSuccess={handleUploadProfileSuccess}
                            />
                          </div>
                        </GridItem>
                        <ThemeProvider
                          theme={theme}
                          className={classes.contentCard}
                        >
                          <GridItem
                            xs={12}
                            sm={12}
                            md={12}
                            style={{ marginTop: "20px" }}
                          >
                            <h4
                              style={{
                                color: "black",
                                marginTop: "40px",
                                fontWeight: "500"
                              }}
                            >
                              Skill Description:
                            </h4>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                            <TextField
                              required
                              id="skill-desc"
                              variant="outlined"
                              label="Skill Description"
                              fullWidth
                              style={{ margin: 8, marginLeft: "0px" }}
                              value={skillDescription}
                              onChange={handleSkillDescription}
                            />
                          </GridItem>
                        </ThemeProvider>
                        <GridItem
                          xs={12}
                          sm={12}
                          md={12}
                          style={{ marginTop: "20px" }}
                        >
                          <h4
                            style={{
                              color: "black",
                              fontWeight: "500",
                              marginTop: "40px"
                            }}
                          >
                            Social links:
                          </h4>
                        </GridItem>
                        <GridItem
                          xs={12}
                          sm={12}
                          md={4}
                          style={{ marginTop: "20px" }}
                        >
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
                        <GridItem
                          xs={12}
                          sm={12}
                          md={4}
                          style={{ marginTop: "20px" }}
                        >
                          <TextField
                            className={classes.margin}
                            id="github"
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
                        <GridItem
                          xs={12}
                          sm={12}
                          md={4}
                          style={{ marginTop: "20px" }}
                        >
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
                        <GridItem
                          xs={12}
                          sm={12}
                          md={4}
                          style={{ marginTop: "20px" }}
                        >
                          <TextField
                            className={classes.margin}
                            id="phone"
                            variant="outlined"
                            label="Phone No."
                            fullWidth
                            value={phoneNum}
                            onChange={handlePhoneNum}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <img
                                    src={phone}
                                    alt="phone"
                                    style={{ width: "20px" }}
                                  />
                                </InputAdornment>
                              )
                            }}
                          />
                        </GridItem>

                        <GridItem
                          xs={12}
                          sm={12}
                          md={4}
                          style={{ marginTop: "20px" }}
                        >
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
                        <GridItem
                          xs={12}
                          sm={12}
                          md={4}
                          style={{ marginTop: "20px" }}
                        >
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
                        <GridItem
                          xs={12}
                          sm={12}
                          md={12}
                          style={{ marginTop: "20px" }}
                        >
                          <TextField
                            className={classes.margin}
                            id="location"
                            variant="outlined"
                            label="Current Location"
                            fullWidth
                            value={currentLocation}
                            onChange={handleCurrentLocation}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <img
                                    src={pin}
                                    alt="Location"
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
                          <Typography style={{ color: "white" }}>
                            {activeStep === steps.length - 1
                              ? "Finish"
                              : "Next"}
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
                    <ThemeProvider
                      theme={theme}
                      className={classes.contentCard}
                    >
                      <h2 style={{ color: "black" }}>Skills</h2>
                      {skills.map(el => (
                        // eslint-disable-next-line react/jsx-key
                        <GridContainer
                          id={el.id}
                          className={classes.contentCard}
                          key={el.id}
                        >
                          <GridItem xs={12} sm={12} md={12}>
                            <h2 className={classes.delete}>
                              <Button
                                color="secondary"
                                onClick={() => deleteSkill(el.id)}
                              >
                                <img
                                  src={cancel}
                                  alt="cancel"
                                  style={{ width: "30px" }}
                                />
                              </Button>
                            </h2>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={8}>
                            <TextField
                              InputProps={{
                                className: classes.input
                              }}
                              label="Skill Description"
                              autoFocus
                              required
                              style={{ margin: 8 }}
                              fullWidth
                              margin="normal"
                              onChange={e => {
                                handleSkills("skill_name", el.id - 1, e);
                              }}
                              value={skills[el.id - 1].skill_name}
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
                              <MenuItem value={"Beginner"}>Beginner</MenuItem>
                              <MenuItem value={"Intermediate"}>
                                Intermediate
                              </MenuItem>
                              <MenuItem value={"Expert"}>Expert</MenuItem>
                              <MenuItem value={"Pro"}>Pro</MenuItem>
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
                              <Typography
                                color="secondary"
                                style={{ color: "white" }}
                              >
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
                        <GridContainer
                          id={el.id}
                          className={classes.contentCard}
                        >
                          <GridItem xs={12} sm={12} md={12}>
                            <h2 className={classes.delete}>
                              <Button
                                color="secondary"
                                onClick={() => deleteTest(el.id)}
                              >
                                <img
                                  src={cancel}
                                  alt="cancel"
                                  style={{ width: "30px" }}
                                />{" "}
                              </Button>
                            </h2>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={6}>
                            <TextField
                              label="Name"
                              style={{ margin: 8 }}
                              fullWidth
                              required
                              autoFocus={el.id === 1 ? false : true}
                              margin="normal"
                              onChange={e => {
                                handleTests("testimonial_name", el.id - 1, e);
                              }}
                              value={tests[el.id - 1].testimonial_name}
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
                              value={tests[el.id - 1].testimonial_cred}
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
                              value={tests[el.id - 1].testimonial_desc}
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
                        <GridContainer
                          id={el.id}
                          className={classes.contentCard}
                        >
                          <GridItem xs={12} sm={12} md={12}>
                            <h2 className={classes.delete}>
                              <Button
                                color="secondary"
                                onClick={() => deleteLang(el.id)}
                              >
                                <img
                                  src={cancel}
                                  alt="cancel"
                                  style={{ width: "30px" }}
                                />{" "}
                              </Button>
                            </h2>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={8}>
                            <TextField
                              label="Language"
                              autoFocus={el.id === 1 ? false : true}
                              style={{ margin: 8 }}
                              fullWidth
                              required
                              margin="normal"
                              onChange={e => {
                                handleLangs("name", el.id - 1, e);
                              }}
                              value={langs[el.id - 1].name}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <Select
                              id="demo-simple-select"
                              className={classes.select}
                              onChange={e => {
                                handleLangs("level", el.id - 1, e);
                              }}
                              value={langs[el.id - 1].level}
                            >
                              <MenuItem value={"Native Speaker"}>
                                Native Speaker
                              </MenuItem>
                              <MenuItem value={"Second Language"}>
                                Second Language
                              </MenuItem>
                              <MenuItem value={"Third Language"}>
                                Third Language
                              </MenuItem>
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
                          <Typography style={{ color: "white" }}>
                            {activeStep === steps.length - 1
                              ? "Finish"
                              : "Next"}
                          </Typography>
                        </Button>
                      </ButtonGroup>
                    </ThemeProvider>
                  </div>
                </div>
              ) : null}

              {activeStep === 3 ? (
                <div>
                  <div>
                    <ThemeProvider theme={theme}>
                      <h2 style={{ color: "black" }}>Publications</h2>

                      {pubs.map(el => (
                        // eslint-disable-next-line react/jsx-key
                        <GridContainer
                          id={el.id}
                          className={classes.contentCard}
                        >
                          <GridItem xs={12} sm={12} md={12}>
                            <h2 className={classes.delete}>
                              <Button
                                color="secondary"
                                onClick={() => deletePub(el.id)}
                              >
                                <img
                                  src={cancel}
                                  alt="cancel"
                                  style={{ width: "30px" }}
                                />{" "}
                              </Button>
                            </h2>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={6}>
                            <TextField
                              label="Title"
                              autoFocus
                              style={{ margin: 8 }}
                              fullWidth
                              required
                              margin="normal"
                              onChange={e => {
                                handlePubs("title", el.id - 1, e);
                              }}
                              value={pubs[el.id - 1].title}
                            />
                            <TextField
                              label="Journal Name"
                              style={{ margin: 8 }}
                              fullWidth
                              margin="normal"
                              onChange={e => {
                                handlePubs("journal_name", el.id - 1, e);
                              }}
                              value={pubs[el.id - 1].journal_name}
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
                              value={pubs[el.id - 1].supervisor}
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
                                  handlePubs(
                                    "publish_date",
                                    el.id - 1,
                                    formatDate(e)
                                  );
                                }}
                                value={pubs[el.id - 1].publish_date}
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
                              value={pubs[el.id - 1].article_link}
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
                        <GridContainer
                          id={el.id}
                          className={classes.contentCard}
                        >
                          <GridItem xs={12} sm={12} md={12}>
                            <h2 className={classes.delete}>
                              <Button
                                color="secondary"
                                onClick={() => deleteExp(el.id)}
                              >
                                <img
                                  src={cancel}
                                  alt="cancel"
                                  style={{ width: "30px" }}
                                />{" "}
                              </Button>
                            </h2>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={6}>
                            <TextField
                              label="Company"
                              autoFocus={el.id === 1 ? false : true}
                              style={{ margin: 8 }}
                              fullWidth
                              required
                              margin="normal"
                              onChange={e => {
                                handleExps("company", el.id - 1, e);
                              }}
                              value={exps[el.id - 1].company}
                            />
                            <TextField
                              label="Position"
                              style={{ margin: 8 }}
                              fullWidth
                              margin="normal"
                              onChange={e => {
                                handleExps("position", el.id - 1, e);
                              }}
                              value={exps[el.id - 1].position}
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
                                  handleExps("start", el.id - 1, formatDate(e));
                                }}
                                value={exps[el.id - 1].duration.start}
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
                                  handleExps("end", el.id - 1, formatDate(e));
                                }}
                                value={exps[el.id - 1].duration.end}
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
                              value={exps[el.id - 1].company_link}
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
                              value={exps[el.id - 1].summary}
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
                        <GridContainer
                          id={el.id}
                          className={classes.contentCard}
                        >
                          {el.id !== 1 ? (
                             <GridItem xs={12} sm={12} md={12}>
                             <h2 className={classes.delete}>
                               <Button
                                 color="secondary"
                                 onClick={() => deleteEdu(el.id)}
                               >
                                 <img
                                   src={cancel}
                                   alt="cancel"
                                   style={{ width: "30px" }}
                                 />{" "}
                               </Button>
                             </h2>
                           </GridItem> 
                          ) : null}
                          <GridItem xs={12} sm={12} md={6}>
                            <TextField
                              label="Institute Name"
                              style={{ margin: 8 }}
                              autoFocus={el.id === 1 ? false : true}
                              fullWidth
                              required
                              margin="normal"
                              onChange={e => {
                                handleEdus("college_name", el.id - 1, e);
                              }}
                              value={edus[el.id - 1].college_name}
                            />
                            <TextField
                              label="Degree Name"
                              style={{ margin: 8 }}
                              fullWidth
                              margin="normal"
                              onChange={e => {
                                handleEdus("degree_name", el.id - 1, e);
                              }}
                              value={edus[el.id - 1].degree_name}
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
                                  handleEdus("start", el.id - 1, formatDate(e));
                                }}
                                value={edus[el.id - 1].duration.start}
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
                                  handleEdus("end", el.id - 1, formatDate(e));
                                }}
                                value={edus[el.id - 1].duration.end}
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
                              onChange={e => {
                                handleEdus("college_url", el.id - 1, e);
                              }}
                            />
                            <TextField
                              label="Summary"
                              style={{ marginTop: "20px", marginLeft: "7px" }}
                              fullWidth
                              multiline
                              rows="4"
                              placeholder="Tell us about your education"
                              variant="outlined"
                              onChange={e => {
                                handleEdus("summary", el.id - 1, e);
                              }}
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
                        <GridContainer
                          id={el.id}
                          className={classes.contentCard}
                        >
                          <GridItem xs={12} sm={12} md={12}>
                            <h2 className={classes.delete}>
                              <Button
                                color="secondary"
                                onClick={() => deleteAch(el.id)}
                              >
                                <img
                                  src={cancel}
                                  alt="cancel"
                                  style={{ width: "30px" }}
                                />{" "}
                              </Button>
                            </h2>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={6}>
                            <TextField
                              label="Achievement Title"
                              autoFocus={el.id === 1 ? false : true}
                              style={{ margin: 8 }}
                              fullWidth
                              required
                              margin="normal"
                              onChange={e => {
                                handleAchs("achievement_title", el.id - 1, e);
                              }}
                              value={achs[el.id - 1].achievement_title}
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
                                  handleAchs(
                                    "achievement_date",
                                    el.id - 1,
                                    formatDate(e)
                                  );
                                }}
                                value={achs[el.id - 1].achievement_date}
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
                              value={achs[el.id - 1].achievement_url}
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
                                handleAchs(
                                  "achievement_description",
                                  el.id - 1,
                                  e
                                );
                              }}
                              value={achs[el.id - 1].achievement_description}
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
                        <GridContainer
                          id={el.id}
                          className={classes.contentCard}
                          key={el.id}
                        >
                          <GridItem xs={12} sm={12} md={12}>
                            <h2 className={classes.delete}>
                              <Button
                                color="secondary"
                                onClick={() => deleteProj(el.id)}
                              >
                                <img
                                  src={cancel}
                                  alt="cancel"
                                  style={{ width: "30px" }}
                                />{" "}
                              </Button>
                            </h2>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={6}>
                            <TextField
                              label="Title"
                              autoFocus={el.id === 1 ? false : true}
                              style={{ margin: 8 }}
                              fullWidth
                              required
                              variant="outlined"
                              margin="normal"
                              onChange={e => {
                                handlePros("title", el.id - 1, e);
                              }}
                              value={pros[el.id - 1].title}
                            />
                            <TextField
                              label="Demo URL"
                              style={{ margin: 8 }}
                              fullWidth
                              variant="outlined"
                              margin="normal"
                              onChange={e => {
                                handlePros("proj_demo", el.id - 1, e);
                              }}
                              value={pros[el.id - 1].proj_demo}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={6}>
                            <input
                              type="file"
                              name="fileUpload"
                              id={`fileUpload` + el.id}
                              style={{
                                width: "0.1px",
                                height: "0.1px",
                                opacity: "0",
                                overflow: "hidden",
                                position: "absolute",
                                zIndex: "-1"
                              }}
                              onChange={e => {
                                handlePros("proj_image", el.id - 1, e);
                              }}
                            />
                            <div style={{ margin: "25px" }}>
                              {pros[el.id - 1].proj_image === "" ? (
                                <label
                                  htmlFor={`fileUpload` + el.id}
                                  style={{
                                    cursor: "pointer",
                                    color: "#388E3C",
                                    fontSize: "18px",
                                    border: "0.5px solid #388E3C",
                                    borderRadius: "5px",
                                    padding: "8px"
                                  }}
                                >
                                  Upload Image
                                </label>
                              ) : pros[el.id - 1].proj_image === "loading" ? (
                                <CircularProgress />
                              ) : (
                                <img
                                  src={pros[el.id - 1].proj_image}
                                  alt="Project"
                                  style={{ maxWidth: "100%" }}
                                />
                              )}
                            </div>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                            <TextField
                              label="Git URL"
                              style={{ margin: 8 }}
                              fullWidth
                              variant="outlined"
                              margin="normal"
                              onChange={e => {
                                handlePros("git_url", el.id - 1, e);
                              }}
                              value={pros[el.id - 1].git_url}
                            />
                            <TextField
                              label="Project Description"
                              style={{ margin: 8, marginLeft: "7px" }}
                              fullWidth
                              multiline
                              rows="4"
                              placeholder="Tell us about your project"
                              variant="outlined"
                              onChange={e => {
                                handlePros("proj_desc", el.id - 1, e);
                              }}
                              value={pros[el.id - 1].proj_desc}
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
                          <Typography style={{ color: "white" }}>
                            {activeStep === steps.length - 1
                              ? "Finish"
                              : "Next"}
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
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          maxWidth={"sm"}
          fullWidth
        >
          <DialogTitle id="alert-dialog-slide-title">
            {!response ? "Building you portfolio " : "You are all set!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {!response ? (
                <h1 style={{ textAlign: "center" }}>
                  <img src={design} alt="design" />
                </h1>
              ) : (
                <div style={{ textAlign: "center" }}>
                  <h4>Here&apos;s your Portfolio&apos;s short link:</h4>
                  <a
                    href={portfolioLink}
                    style={{
                      border: "1px solid #f0f0f0",
                      borderRadius: "5px",
                      padding: "15px",
                      fontWeight: "500",
                      fontSize: "18px",
                      color: "#4caf50"
                    }}
                    id="portfolio"
                  >
                    {portfolioLink}
                  </a>
                </div>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {!response ? (
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            ) : (
              <div>
                <Tooltip
                  title={!copied ? "Copy to clipboard" : "Copied"}
                  aria-label="add"
                >
                  <Button onClick={handleCopy} color="primary">
                    Copy Link
                  </Button>
                </Tooltip>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
              </div>
            )}
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
