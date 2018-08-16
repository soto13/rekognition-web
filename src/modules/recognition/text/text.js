import { Card, CardActions, CardContent, IconButton, withStyles } from "@material-ui/core";
import { DeleteForever, Send } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { Component } from "react";
import { LinearQueryComponent, ListTextComponent, WebcamComponent } from '../../../components';
import { TEXT_BASE64 } from '../../../endpoints';
import { convertImage64ToFileInBase64, typeMobile } from '../../../utils';

class TextComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { imageBase64: '', textDetected: [], showLinear: false }
  }

  getImageBase64 = (event) => {
    this.setState({ imageBase64: event.imageBase64 })
  }

  getLabelsFromText = () => {
    this.setState({ showLinear: true });
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json', };
    const body = JSON.stringify({ image: convertImage64ToFileInBase64(this.state.imageBase64) })
    fetch(TEXT_BASE64, { method: 'POST', headers, body })
      .then(res => res.json())
      .then((data) => {
        this.setState({ textDetected: data.TextDetections, showLinear: false })
        return data;
      })
      .catch((err) => {
        console.log(err)
        this.setState({ showLinear: false });
      });
  }

  cleanImage = () => {
    this.setState({ imageBase64: '', textDetected: [] });
  }

  customCard = () => {
    const { classes } = this.props;
    const { imageBase64, showLinear } = this.state;
    return (
      <div className='row center-xs'>
        <Card className={classes.card}>
          <CardContent>
            <img className={ classes.img } src={ imageBase64 } alt='images' />
          </CardContent>
          { !showLinear && (
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
          ) }
        </Card>
      </div>
    )
  }

  render() {
    const { imageBase64, textDetected, showLinear } = this.state;
    const textData = (textDetected.length > 0) ?
      [textDetected[0], textDetected[3], textDetected[5], textDetected[6], textDetected[7]] : [];
    
    return (
      <div>
        { showLinear && (<LinearQueryComponent/>) }
        { (textDetected.length === 0) && (
          <div className='row center-xs'>
            <div className='col-xs-12'>
              <h1>Tóma o selecciona imágen de la cuál deseas obtener el texto</h1>
            </div>
            <div className='col-xs-12'>
              <div className='center-xs' >
                { !imageBase64 && (<WebcamComponent width={ (typeMobile() === 'MOBILE') ? "100%" : "100%" } height={ (typeMobile() === 'MOBILE') ? 300 : 300 } onChange={ (event) => this.getImageBase64(event) } />) }
                { imageBase64 && this.customCard() }
              </div>
            </div>
          </div>
        )}
        { textDetected.length > 0 && (
          <div className='row center-xs'>
            <div className='col-xs-12 col-sm-8'>
              <h1>Tóma o selecciona imágen de la cuál deseas obtener el texto</h1>
              { this.customCard() }
            </div>
            <div className='col-xs-12 col-sm-4'>
              <div className='center-xs' >
                <ListTextComponent textData={ textData } />
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const styles = (theme) => ({
  input: {
    display: 'none',
  },
  img: {
    width: "100%",
    maxWidth: 400
  }
})

TextComponent.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(TextComponent);
