import { Card, CardActions, CardContent, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { DeleteForever, Send } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { Component } from "react";
import { ListLabelComponent, WebcamComponent } from "../../../components";
import { LABEL_BASE64 } from "../../../endpoints";
import { typeMobile } from '../../../utils';

class LabelComponent extends Component {
  
  constructor(props) {
    super(props);
    this.state = { imageBase64: '', labelsData: [] }
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

  getLabels = () => {
    const body = JSON.stringify({ image: this.convertImage64ToFileInBase64() });
    fetch(LABEL_BASE64, { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body })
      .then((res) => res.json())
      .then((labelsData) => {
        this.setState({ labelsData: labelsData.Labels })
        return labelsData;
      })
      .catch((err) => {
        return err;
      })
  }

  cleanImage = () => {
    this.setState({ imageBase64: '', labelsData: [] })
  }

  customCard = () => {
    const { classes } = this.props;
    const { imageBase64 } = this.state;
    return (
      <div className='row center-xs'>
        <div className='box'>
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
                  <IconButton color="primary" className={ classes.button } onClick={ this.getLabels } component="span">
                    <Send />
                  </IconButton>
                </div>
              </div>
            </CardActions>
          </Card>
        </div>
      </div>
    )
  }

  render() {
    const { imageBase64, labelsData } = this.state;

    return (
      <div>
        { (labelsData.length === 0) && (
          <div className='row center-xs' >
            <div className='box' style={{ paddingTop: 26 }} >
              { !imageBase64 && (<WebcamComponent width={ (typeMobile() === 'MOBILE') ? 300 : 600 } height={ (typeMobile() === 'MOBILE') ? 300 : 300 } onChange={ (event) => this.getImageBase64(event) } />) }
              { imageBase64 && this.customCard() }
            </div>
          </div>
        )}
        { (labelsData.length > 0) && (
          <div className='row center-xs' >
            <div className='col-xs-8' style={{ paddingTop: 26 }} >
              { this.customCard() }
            </div>
            <div className='col-xs-4' style={{ paddingTop: 26 }} >
              <ListLabelComponent labelsData={ labelsData } />
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
});

LabelComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(LabelComponent);
