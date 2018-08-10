import { List, ListItem, ListItemText, ListSubheader, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { emotions, identifierData, values } from '../../../utils';

class ListFaceComponent extends Component {
  
  getNecessaryData = (datas) => {
    let newData = {}
    for (const data in datas) {
      if (data === 'Quality' || data === 'Pose' || data === 'Landmarks' || data === 'Confidence' || data === 'BoundingBox') {} else {
        newData[data] = datas[data];
      }
    }
    return newData;
  }

  showEmotions = (emotion) => {
    return emotions[emotion];
  }

  getDataFromObject = (datas) => {
    const { classes } = this.props;
    const newData = this.getNecessaryData(datas);
    let NameOfData = [];
    let counter = 0;
    for (const data in newData) {
      NameOfData.push((
        <ul key={ counter } className={ classes.ul }>
          <ListSubheader>{ identifierData[data] }</ListSubheader>
          { (data !== 'Emotions') && (data !== 'AgeRange') && (
            <div>
              <ListItem>
                <ListItemText primary={`${values[datas[data].Value]}`}> hola</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText primary={`Confidencialidad ${datas[data].Confidence}%`} />
              </ListItem>
            </div>
          ) }
          { (data === 'Emotions') && datas[data].map((item, key) => (
            <div key={ key }>
              <ListItem>
                <ListItemText primary={`Estado ${ this.showEmotions(item.Type) }`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Confidencialidad ${item.Confidence}`} />
              </ListItem>
            </div>
          )) }
          { (data === 'AgeRange') && (
            <ListItem>
            <ListItemText primary={`Rango de edad entre ${datas[data].Low} y ${datas[data].High} años`} />
          </ListItem>
          ) }
        </ul>
      ));
      counter += 1;
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
