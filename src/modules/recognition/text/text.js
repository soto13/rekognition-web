import { Card, CardActions, CardContent, IconButton, withStyles } from "@material-ui/core";
import { DeleteForever, Send } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { Component } from "react";
import { WebcamComponent } from '../../../components';
import { TEXT_BASE64 } from '../../../endpoints';
import { typeMobile } from '../../../utils';

class TextComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { imageBase64: '' }
  }

  cleanImage = () => {
    this.setState({ imageBase64: '' });
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

  getLabelsFromText = () => {
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json', };
    const body = JSON.stringify({ image: this.convertImage64ToFileInBase64() })
    fetch(TEXT_BASE64, { method: 'POST', headers, body })
      .then(res => res.json())
      .then((data) => {
        console.log(data.TextDetections[0], data.TextDetections[3], data.TextDetections[5], data.TextDetections[6], data.TextDetections[7]);
        return data;
      })
      .catch(err => console.log(err));
  }

  customCard = () => {
    const { classes } = this.props;
    const { imageBase64 } = this.state;
    return (
        <Card className={classes.card}>
          <CardContent>
            <img className={ classes.img } src={imageBase64} alt='images' />
          </CardContent>
          <CardActions>
            <div className='row'>
              <div className='col-xs-offset-3 col-xs-2'>
                <IconButton color="primary" className={ classes.button } onClick={ this.cleanImage } component="span">
                  <DeleteForever />
                </IconButton>
              </div>
              <div className='col-xs-offset-4 col-xs-2'>
                <IconButton color="primary" className={ classes.button } onClick={ this.getLabelsFromText } component="span">
                  <Send />
                </IconButton>
              </div>
            </div>
          </CardActions>
        </Card>
    )
  }

  render() {
    const { imageBase64 } = this.state;
    
    return (
      <div className='row center-xs'>
        <div className='col-xs-12'>
          <h1>Tóma o selecciona imágen de la cuál deseas obtener el texto</h1>
        </div>
        <div className='col-xs-12'>
          <div className='box' >
            { !imageBase64 && (<WebcamComponent width={ (typeMobile() === 'MOBILE') ? 300 : 600 } height={ (typeMobile() === 'MOBILE') ? 300 : 300 } onChange={ (event) => this.getImageBase64(event) } />) }
            { imageBase64 && this.customCard() }
          </div>
        </div>
      </div>
    )
  }
}

const styles = (theme) => ({
  input: {
    display: 'none',
  },
})

TextComponent.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(TextComponent);
