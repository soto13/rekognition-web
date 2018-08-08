import { Card, CardActions, CardContent, IconButton, withStyles } from "@material-ui/core";
import { DeleteForever, Send } from '@material-ui/icons';
import PropTypes from "prop-types";
import React, { Component } from "react";
import { ListFaceComponent, WebcamComponent } from '../../../components';

class FaceComponent extends Component {

  constructor(props) {
    super(props);
    this.state = { imageBase64: '', metadatas: [], fileBase64: '' }
  }

  getImageBase64 = (event) => {
    this.setState({ imageBase64: event.imageBase64 })
  }

  convertImage64ToFileInBase64 = () => {
    const { imageBase64 } = this.state;
    let fileBase64 = '';
    fileBase64 = imageBase64.replace("data:image/jpeg;base64,", '');
    return fileBase64;
  }

  cleanImage = () => {
    this.setState({ imageBase64: '' });
  }

  getLabelsFromFace = () => {
    //
  }

  customCard = () => {
    const { classes } = this.props;
    const { imageBase64 } = this.state;
    return (
      <div className='row center-xs'>
        <Card className={classes.card}>
          <CardContent>
            <img className={ classes.img } src={imageBase64} alt='images' />
          </CardContent>
          <CardActions>
            <div className='row'>
              <div className='col-xs-offset-2 col-xs-2'>
                <IconButton color="primary" className={ classes.button } onClick={ this.cleanImage } component="span">
                  <DeleteForever />
                </IconButton>
              </div>
              <div className='col-xs-offset-6 col-xs-2'>
                <IconButton color="primary" className={ classes.button } component="span">
                  <Send />
                </IconButton>
              </div>
            </div>
          </CardActions>
        </Card>
      </div>
    )
  } 

  render() {
    const { imageBase64 } = this.state;

    return (
      <div className='row'>
        <div className='col-xs-8' >
          <div className='center-xs' >
            <h1>Tóma una foto de tu rostro</h1>
          </div>
          <div className='center-xs' >
            { !imageBase64 && (<WebcamComponent onChange={ (event) => this.getImageBase64(event) } />) }
            { imageBase64 && this.customCard() }
          </div>
        </div>
        <div className='col-xs-4'>
          <div className='center-xs' >
            <ListFaceComponent/>
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
  img: {
    height: 255,
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
  card: {
    maxWidth: 345,
  },
});

FaceComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FaceComponent);
