import { Card, CardActions, CardContent, IconButton, withStyles } from "@material-ui/core";
import { DeleteForever, Send } from '@material-ui/icons';
import PropTypes from "prop-types";
import React, { Component } from "react";
import { LinearQueryComponent, ListFaceComponent, WebcamComponent } from '../../../components';
import { FACE_BASE64 } from '../../../endpoints';
import { convertImage64ToFileInBase64, typeMobile } from '../../../utils';

class FaceComponent extends Component {

  constructor(props) {
    super(props);
    this.state = { imageBase64: '', metadatas: [], fileBase64: '', showLinear: false }
  }

  getImageBase64 = (event) => {
    convertImage64ToFileInBase64(event.imageBase64)
    this.setState({ imageBase64: event.imageBase64 })
  }

  cleanImage = () => {
    this.setState({ imageBase64: '', metadatas: [] });
  }

  getLabelsFromFace = () => {
    this.setState({ showLinear: true });
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json', };
    const body = JSON.stringify({ image: convertImage64ToFileInBase64(this.state.imageBase64) })
    fetch(FACE_BASE64, { method: 'POST', headers, body })
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        this.setState({ metadatas: data.FaceDetails, showLinear: false });
        return data;
      })
      .catch((err) => {
        console.log(err)
        this.setState({ showLinear: false });
      });
  }

  customCard = () => {
    const { classes } = this.props;
    const { imageBase64, showLinear } = this.state;
    return (
      <div className='row center-xs'>
        <Card className={classes.card}>
          <CardContent>
            <img className={ classes.img } src={imageBase64} alt='images' />
          </CardContent>
          { !showLinear && (
            <CardActions>
              <div className='row'>
                <div className='col-xs-offset-2 col-xs-2'>
                  <IconButton color="primary" className={ classes.button } onClick={ this.cleanImage } component="span">
                    <DeleteForever />
                  </IconButton>
                </div>
                <div className='col-xs-offset-6 col-xs-2'>
                  <IconButton color="primary" className={ classes.button } onClick={ this.getLabelsFromFace } component="span">
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
    const { imageBase64, metadatas, showLinear } = this.state;
    
    return (
      <div>
        { showLinear && (<LinearQueryComponent/>) }
        { (metadatas.length === 0) && (
          <div className='row'>
            <div className='col-xs-12' >
              <div className='center-xs' >
                <h1>Tóma una foto de tu rostro</h1>
              </div>
              <div className='center-xs' >
                { !imageBase64 && (<WebcamComponent width={ (typeMobile() === 'MOBILE') ? "100%" : "100%" } height={ (typeMobile() === 'MOBILE') ? 300 : 300 } onChange={ (event) => this.getImageBase64(event) } />) }
                { imageBase64 && this.customCard() }
              </div>
            </div>
          </div>
        )}
        { (metadatas.length > 0) && (
          <div className='row'>
            <div className='col-xs-12 col-sm-8' >
              <div className='center-xs' >
                <h1>Tóma una foto de tu rostro</h1>
              </div>
              <div className='center-xs' >
                { this.customCard() }
              </div>
            </div>
            <div className='col-xs-12 col-sm-4' style={{ paddingTop: 20 }} >
              <div className='center-xs' >
                <ListFaceComponent metadatas={ metadatas } />
              </div>
            </div>
          </div>
        )}
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
    width: "100%",
    maxWidth: 400
  }
});

FaceComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FaceComponent);
