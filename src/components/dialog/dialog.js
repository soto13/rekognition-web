import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

class AlertDialogSlide extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false, sourceImage: '', targetImage: '' };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  
  uploadImage = () => {
    const { sourceImage, targetImage } = this.props;
    let imageSource = '';
    let imageTarget = '';
    imageSource = sourceImage;
    imageTarget = targetImage;
    imageSource = imageSource.replace("data:image/jpeg;base64,", '');
    imageTarget = imageTarget.replace("data:image/jpeg;base64,", '');

    // console.log(imageSource, imageTarget)

    this.setState({ open: false, sourceImage: imageSource, targetImage, imageTarget });
  }

  render() {
    const { sourceImage, classes } = this.props;
    const { open } = this.state;

    return (
      <div>
        <Button variant="outlined" href="#outlined-buttons" className={ classes.button } onClick={ this.handleClickOpen } >Ver Foto</Button>
        <Dialog open={ open }
          TransitionComponent={ Transition }
          keepMounted
          onClose={ this.handleClose }
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description" >

          <DialogTitle id="alert-dialog-slide-title"> <p style={{ textAlign: 'center' }} >¿Deseas subir ésta foto?</p> </DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <img className={ styles.img } src={sourceImage} alt='images' />
            </DialogContentText>
          </DialogContent>
          
          <DialogActions>
            <Button onClick={ this.handleClose } color="primary">CERRAR</Button>
            <Button onClick={ this.uploadImage } color="primary">Subir</Button>
          </DialogActions>

        </Dialog>
      </div>
    );
  }
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  img: {
    height: 255,
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

AlertDialogSlide.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(AlertDialogSlide);