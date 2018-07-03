import * as color from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import './footer.css';

class FooterComponent extends Component {
  state = {
    selectedIndex: 0,
  };

  select = (index) => this.setState({ selectedIndex: index });

  render() {
    return (
      <div className='footer' >
        <Paper elevation={4} >
          <div className="row">
            <div className="col-xs-offset-3 col-xs-6 col-sm-offset-1 col-sm-2">
              <p>OllPay</p>
            </div>
            <div className="col-xs-offset-3 col-xs-6 col-sm-offset-1 col-sm-3">
              <p>Facebook</p>
            </div>
            <div className="col-xs-offset-3 col-xs-6 col-sm-offset-1 col-sm-3">
              <p>¡Contactanos!</p>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

const styles = {
	bottomNavigation: {
		backgroundColor: color.grey[900],
	},
	item: {
		padding: 20,
		alignContent: 'center',
		color: color.grey200,
	}
}

export default withStyles(styles)(FooterComponent);
