import { AppBar, Button, Icon, IconButton, Toolbar, Typography } from "@material-ui/core";
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withStyles } from '@material-ui/core/styles';
import { Menu as MenuIcon } from "@material-ui/icons";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class AppBars extends Component {
	constructor(props) {
		super(props);
		this.state = { title: 'OllPay', anchorEl: null, left: false, openDrawer: false }
		this._handleToggle = this._handleToggle.bind(this);
	}
	
	_handleToggle(event) {
		event.preventDefault();
		this.setState({ open: !this.state.open });
	}
	
  signOut = () => {
		localStorage.removeItem('user');
		this.setState({ user: false, redirect: <Redirect to='/jspanel/sign-in' /> });
		this.props.onChange(false)
		window.location.reload()
	}

	redirectTo(path) {
		this.setState({ redirect: <Redirect to={ path } /> })
	}

	handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
	};
	
	handleListClick = event => {
    this.setState({ openDrawer: !this.state.openDrawer });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
	};
	
	toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
	};

	render () {
		const { classes } = this.props;
		const { title, openDrawer } = this.state;
		
		return(
			<div className={classes.root}>
				<AppBar position="static" className={classes.backgroundColor} >
					<Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer('left', true)} ><MenuIcon /></IconButton>
						<Typography variant="title" color="inherit" className={classes.flex}><Link className={ classes.link } style={{ textDecoration: 'none' }} title='Compañías' to="/web">{ title }</Link></Typography>
						<Button color="inherit" >Recognition</Button>
					</Toolbar>
				</AppBar>

				<Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div tabIndex={ 0 } role="button" >
						<List component="nav" subheader={<ListSubheader component="div">Opciones para navegar</ListSubheader>} >
							<Link className={ classes.linkMenu } style={{ textDecoration: 'none' }} title='Comparar Caras' to="/web/recognition/compare-faces">
								<ListItem button onClick={this.toggleDrawer('left', false)} >
									<ListItemIcon>
										<Icon>featured_play_list</Icon>
									</ListItemIcon>
									<ListItemText inset primary='COMPARAR CARAS' />
								</ListItem>
							</Link>

              <Link className={ classes.linkMenu } style={{ textDecoration: 'none' }} title='Ver Labels' to="/web/recognition/label">
                <ListItem button onClick={this.toggleDrawer('left', false)} >
                  <ListItemIcon>
                    <Icon>location_city</Icon>
                  </ListItemIcon>
                  <ListItemText inset primary='VER LABELS' />
                </ListItem>
              </Link>

              <Link className={ classes.linkMenu } style={{ textDecoration: 'none' }} title='Ver Texto' to="/web/recognition/text">
                <ListItem button onClick={this.toggleDrawer('left', false)} >
                  <ListItemIcon>
                    <Icon>people</Icon>
                  </ListItemIcon>
                  <ListItemText inset primary='VER TEXTO' />
                </ListItem>
              </Link>

              <Link className={ classes.linkMenu } style={{ textDecoration: 'none' }} title='Ver Cara' to="/web/recognition/face">
                <ListItem button onClick={this.toggleDrawer('left', false)} >
                  <ListItemIcon>
                    <Icon>people</Icon>
                  </ListItemIcon>
                  <ListItemText inset primary='VER CARA' />
                </ListItem>
              </Link>
						</List>

						<Divider />
						
            <List>
							<ListItem button onClick={ this.handleListClick } >
								<ListItemIcon>
									<Icon>supervised_user_circle</Icon>
								</ListItemIcon>
								<ListItemText inset primary="BUCKET" />
								{ openDrawer ? <ExpandLess /> : <ExpandMore /> }
							</ListItem>
							<Collapse in={ openDrawer } timeout="auto" unmountOnExit>

                <Link className={ classes.linkMenu } style={{ textDecoration: 'none' }} title='Buckets' to="/bucket/buckets">
                  <ListItem button onClick={this.toggleDrawer('left', false)} >
                    <ListItemIcon>
                      <Icon>people</Icon>
                    </ListItemIcon>
                    <ListItemText inset primary='BUCKETS' />
                  </ListItem>
                </Link>

                <Link className={ classes.linkMenu } style={{ textDecoration: 'none' }} title='Objetos en Bucket' to="/bucket/objects">
                  <ListItem button onClick={this.toggleDrawer('left', false)} >
                    <ListItemIcon>
                      <Icon>people</Icon>
                    </ListItemIcon>
                    <ListItemText inset primary='OBJETOS EN BUCKET' />
                  </ListItem>
                </Link>

							</Collapse>
						</List>
          </div>
        </Drawer>

			</div>
		)
	}
}

const styles = theme => ({
	backgroundColor: {
		backgroundColor: 'rgb(183, 28, 28)'
	},
	root: {
		flexGrow: 1,
  },
  flex: {
		flex: 1,
  },
  menuButton: {
		marginLeft: -12,
    marginRight: 20,
	},
	link: {
		textDecoration: 'none',
		color: '#FFFF'
	},
	linkMenu: {
		textDecoration: 'none',
		color: '#3F0808'
	},
	list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
	},
	nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
})

export default withStyles(styles)(AppBars);