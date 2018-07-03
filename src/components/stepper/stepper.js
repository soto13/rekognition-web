import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import PropTypes from 'prop-types';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import Webcam from "react-webcam";
import AlertDialogSlide from "../dialog/dialog";

class Stepper extends React.Component {
  state = { activeStep: 0, imageBase64: '', photo: '', video: '', openDialog: false };
  
  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  setRef = (webcam) => {
    this.webcam = webcam;
  }
 
  capture = (dialog) => {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({ photo: imageSrc, openDialog: dialog })
  };

  uploadPhoto = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      const FR = new FileReader();
      
      FR.addEventListener("load", (e) => {
        this.setState({ imageBase64: e.target.result })
      }); 
      
      FR.readAsDataURL( files[0] );
    }
  }

  getStepContent = (step) => {
    const { classes } = this.props;
    const { imageBase64, photo, openDialog } = this.state;
    const videoConstraints = { width: 1280, height: 720, facingMode: 'user', };

    localStorage.setItem('openDialog', openDialog)

    switch (step) {
      case 0:
        return (
          <div key={step} >
            <div className='row' >
              <div className='col-xs-12' >
                { imageBase64 && (<img className={classes.img} src={imageBase64} alt='images' />) }
              </div>
            </div>
            <div className='row' >
              <div className='col-xs-12 col-sm-offset-5 col-sm-2' >
                <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={ (e) => this.uploadPhoto(e) } />
                <label htmlFor="icon-button-file">
                  <IconButton color="primary" className={classes.button} component="span">
                    <PhotoCamera />
                  </IconButton>
                </label>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div key={step} >
            <div className='row' >
              <div className='col-xs-12' >
                <Webcam audio={ false } width={ 600 } height={ 300 } ref={ this.setRef } screenshotFormat="image/jpeg" videoConstraints={ videoConstraints } />
              </div>
            </div>
            <div className='row' >
              <div className='col-xs-12 col-sm-offset-5 col-sm-2' >
                <Button variant="fab" color="primary" aria-label="edit" className={ classes.button } onClick={ this.capture.bind(this, !openDialog) } > <Icon className={ classes.icon } >add_circle</Icon> </Button>
              </div>
            </div>
            <div className='row' >
              <div className='col-xs-12 col-sm-offset-5 col-sm-4' >
                { photo && (<AlertDialogSlide photo={ photo } open={ openDialog } />) }
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div key={step} >
            <div className='row' >
              <div className='col-xs-12' >
                <h1>Resultado es</h1>
              </div>
            </div>
            <div className='row' >
              <div className='col-xs-12' >
              </div>
            </div>
          </div>
        );
      default:
        return (<div key={step} ><h1>Step desconocido</h1></div>);
    }
  }

  render() {
    const { classes, theme } = this.props;
    const { activeStep } = this.state;
    
    const maxSteps = tutorialSteps.length;
    
    return (
      <div className='container-body' >
        <div className='row' >
          <div className='col-xs-12 col-sm-offset-3 col-sm-6' >
            <Paper square elevation={0} className={classes.header}>
              <Typography>{tutorialSteps[activeStep].label}</Typography>
            </Paper>
            <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={this.state.activeStep} onChangeIndex={this.handleStepChange} enableMouseEvents>
              {tutorialSteps.map((step, index) => this.getStepContent(index) )}
            </SwipeableViews>
            <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              className={classes.mobileStepper}
              nextButton={
                <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
                  Next
                  {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
              }
              backButton={ 
                <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
                  { theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft /> }
                  Back
                </Button>
              }
              />
          </div>
        </div>
      </div>
    );
  }
}

const tutorialSteps = [
  {
    label: 'Sube la imágen que deseas comparar',
    imgPath: '/static/images/steppers/1-happy.jpg',
  },
  {
    label: 'Tómate una foto',
    imgPath: '/static/images/steppers/2-work.jpg',
  },
  {
    label: 'El resultado es',
    imgPath: '/static/images/steppers/3-friends.jpg',
  },
];


Stepper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    maxWidth: 900,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    marginBottom: 20,
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 309,
    maxWidth: 630,
    overflow: 'hidden',
    width: '100%',
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

export default withStyles(styles, { withTheme: true })(Stepper);