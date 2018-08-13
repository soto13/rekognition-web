import { List, ListItem, ListItemText, ListSubheader, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getPercent, labels } from '../../../utils';

class ListLabelComponent extends Component {

  showDataList = () => {
    const { classes, labelsData } = this.props;
    
    return labelsData.map((datas, sectionId) => (
      <li key={ sectionId } className={ classes.listSection }>
        <ul className={ classes.ul }>
          <ListSubheader>{ (labels[datas.Name] ? `Hay ${labels[datas.Name]}` : `Find ${datas.Name}`) }</ListSubheader>
          <div>
            <ListItem>
              <ListItemText primary={`Confidencialidad es del ${getPercent(datas.Confidence)} porciento`} />
            </ListItem>
          </div>
        </ul>
      </li>
    ))
  }
  
  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className='row center-xs' >
        <List className={ classes.root } subheader={<li />}>
          { this.showDataList() }
        </List>
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
  root: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 530,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
});

ListLabelComponent.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(ListLabelComponent);
