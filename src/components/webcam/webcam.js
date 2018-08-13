import { IconButton, Tooltip, withStyles } from "@material-ui/core";
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
    const { classes, width, height } = this.props;
    const videoConstraints = { width: 1280, height: 720, facingMode: 'user', };

    return (
      <div className='row center-xs'>
        <div className='col-xs-12' >
          <Webcam audio={ false } width={ width } height={ height } ref={ this.setRef } screenshotFormat="image/jpeg" videoConstraints={ videoConstraints } />
        </div>
        <div className='col-xs-12' >
          <div className='' >
            <Tooltip title="Tomar foto" enterDelay={ 300 } leaveDelay={ 200 }>
              <IconButton color='primary' className={ classes.button } onClick={ this.capture } >
                <PhotoCamera></PhotoCamera>
              </IconButton>
            </Tooltip>
          </div>
          <div className='' >
            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={ (e) => this.uploadPhoto(e) } />
            <label htmlFor="icon-button-file">
              <Tooltip title="Cargar desde galería" enterDelay={ 300 } leaveDelay={ 200 }>
                <IconButton color="primary" className={classes.button} component="span">
                  <CloudUpload/>
                </IconButton>
              </Tooltip>
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
