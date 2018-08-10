import { IconButton, withStyles } from "@material-ui/core";
import { CloudUpload, PhotoCamera } from '@material-ui/icons';
import PropTypes from "prop-types";
import React, { Component } from "react";
import Webcam from 'react-webcam';

class WebcamComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { activeStep: 0, imageBase64: '', photo: '', video: '', openDialog: false, compareFacesResponse: {}, similarity: {}, openSnackBar: false, };
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  }
  
  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.props.onChange({ imageBase64: imageSrc });
  };

  uploadPhoto = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      const FR = new FileReader();
      
      FR.addEventListener("load", (e) => {
        this.props.onChange({ imageBase64: e.target.result });
      }); 
      
      FR.readAsDataURL( files[0] );
    }
  }

  render() {
    const { classes } = this.props;
    const videoConstraints = { width: 1280, height: 720, facingMode: 'user', };

    return (
      <div className='row'>
        <div className='col-xs-12' >
          <div className='center-xs' >
            <Webcam audio={ false } width={ 600 } height={ 300 } ref={ this.setRef } screenshotFormat="image/jpeg" videoConstraints={ videoConstraints } />
          </div>
        </div>
        <div className='col-xs-12' >
          <div className='center-xs' >
            <IconButton color='primary' className={ classes.button } onClick={ this.capture } >
              <PhotoCamera></PhotoCamera>
            </IconButton>
          </div>
          <div className='center-xs' >
            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={ (e) => this.uploadPhoto(e) } />
            <label htmlFor="icon-button-file">
              <IconButton color="primary" className={classes.button} component="span">
                <CloudUpload/>
              </IconButton>
            </label>
          </div>
        </div>
      </div>
    )
  }
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

WebcamComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(WebcamComponent);
