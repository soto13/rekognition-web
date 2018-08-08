import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ListFaceComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { test: ['hola', 'lista', 'xD'] }
  }

  showDataList = () => {
    const { test } = this.state;

    return test.map((data, key) => (<div key={ key } className='row' ><div className='col-sm-12' ><h1>{ data }{key}</h1></div></div>))
  }

  render() {
    // const { classes } = this.props;
    return (
      <div>
        <div className='row center-xs' >
          { this.showDataList() }
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

ListFaceComponent.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(ListFaceComponent);
