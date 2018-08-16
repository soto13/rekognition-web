import { LinearProgress, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const styles = {
  root: {
    flexGrow: 1
  }
}

class LinearQuery extends Component {

  render() {
    const { classes } = this.props;
    
    return (
      <div className={ classes.root }>
        <LinearProgress variant="query" />
      </div>
    );
  }
}

LinearQuery.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LinearQuery);

