import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import PropTypes from 'prop-types';
import React, { Component } from "react";
import { DialogLabel } from "../../../components";
import { ADD_OBJECT, CREATE_BUCKET, LABEL } from "../../../endpoints/index";

class LabelComponent extends Component {
  
  constructor(props) {
    super(props);
    this.state = { imageBase64: '' }
  }

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

  createBucket = () => {
    const bucketName = 'userfake2018';
    const body = JSON.stringify({ bucketName });

    fetch(CREATE_BUCKET, { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', }, body })
      .then((res) => res.json())
      .then((bucket) => {
        this.createObject(bucketName);
        return bucket;
      })
      .catch((err) => {
        return err;
      })
  }

  createObject = (bucketName) => {
    const photoName = 'user.jpg';
    let imageBase64 = ''
    imageBase64 = this.state.imageBase64;
    imageBase64 = imageBase64.replace("data:image/jpeg;base64,", '');
    const body = JSON.stringify({ bucketName, keyName: photoName, fileBase64: imageBase64, labels: {} });

    fetch(ADD_OBJECT, { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', }, body })
      .then((res) => res.json())
      .then((object) => {
        this.getLabels(bucketName, photoName);
        return object;
      })
      .catch((err) => {
        return err;
      })
  }

  getLabels = (bucketName, photoName) => {
    const body = JSON.stringify({ bucketName, photoName });
    fetch(LABEL, { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body })
      .then((res) => res.json())
      .then((labels) => {
        this.setState({ labels })
        return labels;
      })
      .catch((err) => {
        return err;
      })
  }

  render() {
    const { classes } = this.props;
    const { imageBase64, labels } = this.state;

    return (
      <div>
        <div className='row center-xs' >
          <div className='box'>
            <h1>Ver labels</h1>
          </div>
        </div>
        <div className='row center-xs' >
          <div className='box' >
            { labels && (<DialogLabel labels={ labels } open={ true } />) }
            { imageBase64 && (<Button variant="outlined" href="#outlined-buttons" className={ classes.button } onClick={ this.createBucket } >Comprobar resultados</Button>) }
          </div>
        </div>
        <div className='row center-xs' >
          <div className='box' >
            { imageBase64 && (<img className={classes.img} src={imageBase64} alt='images' />) }
          </div>
        </div>
        <div className='row center-xs' >
          <div className='box' >
            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={ (e) => this.uploadPhoto(e) } />
            <label htmlFor="icon-button-file">
              <IconButton color="primary" className={classes.button} component="span">
                <PhotoCamera />
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

LabelComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(LabelComponent);
