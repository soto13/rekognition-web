import { List, ListItem, ListItemText, ListSubheader, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getPercent } from '../../../utils';

class ListTextComponent extends Component {

  showDataList = () => {
    const { classes, textData } = this.props;
    console.log(textData);
    
    return textData.map((datas, sectionId) => (
      <li key={ sectionId } className={ classes.listSection }>
        <ul className={ classes.ul }>
          { (datas.Id === 0) && (
            <div>
              <ListSubheader>{ 'PAIS' }</ListSubheader>
              <ListItem>
                <ListItemText primary={ datas.DetectedText } />
              </ListItem>
              <ListItem>
                <ListItemText primary={ `Confidencialidad es del ${getPercent(datas.Confidence)} porciento` } />
              </ListItem>
            </div>
          )}
          { (datas.Id === 3) && (
            <div>
              <ListSubheader>{ 'CÉDULA' }</ListSubheader>
              <ListItem>
                <ListItemText primary={ datas.DetectedText } />
              </ListItem>
              <ListItem>
                <ListItemText primary={ `Confidencialidad es del ${getPercent(datas.Confidence)} porciento` } />
              </ListItem>
            </div>
          )}
          { (datas.Id === 5) && (
            <div>
              <ListSubheader>{ 'NOMBRE' }</ListSubheader>
              <ListItem>
                <ListItemText primary={ datas.DetectedText } />
              </ListItem>
              <ListItem>
                <ListItemText primary={ `Confidencialidad es del ${getPercent(datas.Confidence)} porciento` } />
              </ListItem>
            </div>
          )}
          { (datas.Id === 6) && (
            <div>
              <ListSubheader>{ 'APELLIDO I' }</ListSubheader>
              <ListItem>
                <ListItemText primary={ datas.DetectedText } />
              </ListItem>
              <ListItem>
                <ListItemText primary={ `Confidencialidad es del ${getPercent(datas.Confidence)} porciento` } />
              </ListItem>
            </div>
          )}
          { (datas.Id === 7) && (
            <div>
              <ListSubheader>{ 'APELLIDO II' }</ListSubheader>
              <ListItem>
                <ListItemText primary={ datas.DetectedText } />
              </ListItem>
              <ListItem>
                <ListItemText primary={ `Confidencialidad es del ${getPercent(datas.Confidence)} porciento` } />
              </ListItem>
            </div>
          )}
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

ListTextComponent.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(ListTextComponent);
