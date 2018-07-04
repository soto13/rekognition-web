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

class DialogLabel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false, labels: this.props.labels };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  showLabels = () => {
    const { labels } = this.state;
    return labels.Labels.map((label, key) => {
      return (
        <div key={ key } >
          <div>
            <p>{ label.Name }</p>
          </div>
          <div>
            <p>{ label.Confidence }</p>
          </div>
        </div>
      )
    })
  }
    
  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={ classes.root } >
        <Button variant="outlined" href="#outlined-buttons" className={ classes.button } onClick={ this.handleClickOpen } >Ver Resultados</Button>
        <Dialog open={ open }
          TransitionComponent={ Transition }
          keepMounted
          onClose={ this.handleClose }
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description" >

          <DialogTitle id="alert-dialog-slide-title"> <p style={{ textAlign: 'center' }} >Labels encontrados</p> </DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              { this.showLabels }
            </DialogContentText>
          </DialogContent>
          
          <DialogActions>
            <Button onClick={ this.handleClose } color="primary">CERRAR</Button>
          </DialogActions>

        </Dialog>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
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

DialogLabel.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(DialogLabel);