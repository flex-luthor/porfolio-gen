import React from "react";
// @material-ui/core components
import {
  makeStyles,
  withStyles,
  createMuiTheme
} from "@material-ui/core/styles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
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
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import classNames from "classnames";
import green from "@material-ui/core/colors/green";
import ThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import TextField from "@material-ui/core/TextField";
import MaterialTable from "material-table";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(styles);
const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: {
      main: "#fafafa"
    }
  }
});

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
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Let{"'"}s Begin!</h2>
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
          <form>
            <div>
              {activeStep === 3 ? (
                <div>
                  <Button></Button>
                  <Button onClick={handleReset} className={classes.button}>
                    Resetxx
                  </Button>
                </div>
              ) : activeStep === 0 ? (
                <div>
                  <ThemeProvider theme={theme}>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          id="outlined"
                          label="Name"
                          style={{ margin: 8 }}
                          placeholder="Enter your full name"
                          fullWidth
                          margin="normal"
                          InputLabelProps={{
                            shrink: true
                          }}
                          variant="outlined"
                        />
                        <TextField
                          id="outlined-multiline-static"
                          label="About Me"
                          style={{ margin: 8 }}
                          fullWidth
                          multiline
                          rows="4"
                          placeholder="Tell us about yourself"
                          variant="outlined"
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}></GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <h4 className="display-4" style={{ color: "black" }}>
                          Social links:
                        </h4>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField
                          className={classes.margin}
                          id="input-with-icon-textfield"
                          variant="outlined"
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AccountCircle />
                              </InputAdornment>
                            )
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField
                          className={classes.margin}
                          id="input-with-icon-textfield"
                          variant="outlined"
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AccountCircle />
                              </InputAdornment>
                            )
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField
                          className={classes.margin}
                          id="input-with-icon-textfield"
                          variant="outlined"
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AccountCircle />
                              </InputAdornment>
                            )
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                  </ThemeProvider>

                  <div>
                    <ThemeProvider theme={theme}>
                      <ButtonGroup>
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
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                          className={classNames(
                            classes.button,
                            classes.buttonWide
                          )}
                        >
                          <Typography color="secondary">
                            {activeStep === steps.length - 1
                              ? "Finish"
                              : "Next"}
                          </Typography>
                        </Button>
                      </ButtonGroup>
                    </ThemeProvider>
                  </div>
                </div>
              ) : activeStep === 1 ? (
                <div>
                  <ThemeProvider theme={theme}>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          id="outlined"
                          label="Name"
                          style={{ margin: 8 }}
                          placeholder="Enter your full name"
                          fullWidth
                          margin="normal"
                          InputLabelProps={{
                            shrink: true
                          }}
                          variant="outlined"
                        />
                        <TextField
                          id="filled-multiline-static"
                          label="Multiline"
                          multiline
                          rows="4"
                          defaultValue="Default Value"
                          variant="filled"
                        />
                      </GridItem>
                    </GridContainer>
                  </ThemeProvider>

                  <div>
                    <ThemeProvider theme={theme}>
                      <ButtonGroup>
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
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                          className={classNames(
                            classes.button,
                            classes.buttonWide
                          )}
                        >
                          <Typography color="secondary">
                            {activeStep === steps.length - 1
                              ? "Finish"
                              : "Next"}
                          </Typography>
                        </Button>
                      </ButtonGroup>
                    </ThemeProvider>
                  </div>
                </div>
              ) : (
                <div>
                  <ThemeProvider theme={theme}>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          id="outlined"
                          label="Experience"
                          style={{ margin: 8 }}
                          placeholder="Tbd"
                          fullWidth
                          margin="normal"
                          InputLabelProps={{
                            shrink: true
                          }}
                          variant="outlined"
                        />
                      </GridItem>
                    </GridContainer>
                  </ThemeProvider>

                  <div>
                    <ThemeProvider theme={theme}>
                      <ButtonGroup>
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
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                          className={classNames(
                            classes.button,
                            classes.buttonWide
                          )}
                        >
                          <Typography color="secondary">
                            {activeStep === steps.length - 1
                              ? "Finish"
                              : "Next"}
                          </Typography>
                        </Button>
                      </ButtonGroup>
                    </ThemeProvider>
                  </div>
                </div>
              )}
            </div>
          </form>
        </GridItem>
      </GridContainer>
      <div></div>
    </div>
  );
}
