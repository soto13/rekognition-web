import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import PropTypes from 'prop-types';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import Webcam from "react-webcam";
import { typeMobile } from '../../utils';
import AlertDialogSlide from "../dialog/dialog";

class Stepper extends React.Component {
  state = { activeStep: 0, imageBase64: '', photo: '', video: '', openDialog: false, compareFacesResponse: {}, similarity: {}, openSnackBar: false };
  
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

  handleClick = () => {
    this.setState({ openSnackBar: true });
  };

  handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ openSnackBar: false });
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
        this.setState({ imageBase64: e.target.result, percent: 0 })
      }); 
      
      FR.readAsDataURL( files[0] );
    }
  }

  getStepContent = (step) => {
    const { classes } = this.props;
    const { imageBase64, photo, openDialog, similarity } = this.state;
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
                <Webcam audio={ false } width={ (typeMobile() === 'MOBILE') ? "100%" : "100%" } height={ (typeMobile() === 'MOBILE') ? 300 : 300 } ref={ this.setRef } screenshotFormat="image/jpeg" videoConstraints={ videoConstraints } />
              </div>
            </div>
            <div className='row' >
              <div className='col-xs-12 col-sm-offset-5 col-sm-2' >
                <Button variant="fab" color="primary" aria-label="edit" className={ classes.button } onClick={ this.capture.bind(this, !openDialog) } > <Icon className={ classes.icon } >add_circle</Icon> </Button>
              </div>
            </div>
            <div className='row' >
              <div className='col-xs-12 col-sm-offset-3 col-sm-10' >
                { photo && (<AlertDialogSlide sourceImage={ photo } targetImage={ imageBase64 } open={ openDialog } onChange={ (event) => this.getDataFromDialog(event) } />) }
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div key={step} >
            <div className='row' >
              <div className='col-xs-12' >
                <h1>{ (similarity.message) ? `El porcentaje es del ${similarity.message}` : 'No se encontraron datos para hacer la comparación' }</h1>
              </div>
            </div>
          </div>
        );
      default:
        return (<div key={step} ><h1>Step desconocido</h1></div>);
    }
  }

  getDataFromDialog = (event) => {
    this.handleClick()
    this.setState({ compareFacesResponse: event.compareFaces, similarity: event.similarity })
  }

  LongTextSnackbar = () => {
    const { classes } = this.props;
    const { openSnackBar, similarity } = this.state;

    return (
      <div>
        <Snackbar anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={openSnackBar}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackBar}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{ similarity.message }</span>}
          action={[
            <Button key="undo" color="secondary" size="small" onClick={this.handleCloseSnackBar}>CERRAR</Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleCloseSnackBar}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
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
              { this.LongTextSnackbar() }
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
    label: 'Resultado',
    imgPath: '/static/images/steppers/2-work.jpg',
  }
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
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

export default withStyles(styles, { withTheme: true })(Stepper);