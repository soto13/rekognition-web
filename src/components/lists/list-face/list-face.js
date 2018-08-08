import { List, ListItem, ListItemText, ListSubheader, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { identifierData } from '../../../utils';

class ListFaceComponent extends Component {

  getDataFromObject = (datas) => {
    const { classes } = this.props;
    let NameOfData = [];
    let counter = 0;
    for (const data in datas) {
      if (data === 'Quality' || data === 'Pose' || data === 'Landmarks' || data === 'Confidence' || data === 'BoundingBox') {
        console.log('entre', identifierData[data])
        NameOfData.push((
          <ul key={ counter } className={ classes.ul }>
            <ListSubheader>{ identifierData[data] }</ListSubheader>
            { (data !== 'Emotions') && (
              <ListItem>
                <ListItemText primary={`Item ${datas[data].Value}`} />
              </ListItem>
            ) }
            { (data === 'Emotions') && datas[data].map((item, key) => (
              <ListItem key={ key }>
                <ListItemText primary={`Item ${item}`} />
              </ListItem>
            )) }
          </ul>
        ));
        counter += 1;
      } else { console.log('no entre') }
    }
    return NameOfData;
  }

  showDataList = () => {
    const { classes } = this.props;
    const { metadatas } = this.props;
    console.log(metadatas);
    
    return metadatas.map((datas, sectionId) => (
      <li key={ sectionId } className={ classes.listSection }>
        { this.getDataFromObject(datas) }
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

ListFaceComponent.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(ListFaceComponent);
