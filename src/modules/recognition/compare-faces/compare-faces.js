import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { Component } from "react";
import { Stepper } from "../../../components";

class CompareFacesComponent extends Component {

  render() {

    return (
      <div>
        <div className='row' >
          <div className='col-xs-offset-3 col-sm-offset-5'>
            <h1>Comparar similitud</h1>
          </div>
        </div>
        <div className='row' >
          <div className='col-xs-12'>
            <Stepper />
          </div>
        </div>
      </div>
    )
  }
}

CompareFacesComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  icon: {
    color: '#fffff'
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

export default  withStyles(styles)(CompareFacesComponent);
