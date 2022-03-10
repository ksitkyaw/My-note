import { AppBar, Avatar, makeStyles, Toolbar } from '@material-ui/core'
import React from 'react'
import { Drawer } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import { ListItemIcon } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { format } from 'date-fns';

const drawerWidth = 240;

const menuItems = [
    {
        text: 'My Notes',
        icon: <SubjectOutlined color='secondary' />,
        path: '/'
    },
    {
        text: 'Create Note',
        icon: <AddCircleOutlineOutlined color='secondary' />,
        path: '/create'
    }
]
{/*This is how you access theme as an argument and use it to update the styles */}
const useStyles = makeStyles((theme) => {
    return {
    page: {
        backgroundColor: '#f9f9f9',
        width: '100%',
        padding: theme.spacing(3)
    },
    drawer: {
        width: drawerWidth
    },
    drawerPaper: {
        width: drawerWidth
    },
    root: {
        display: 'flex'
    },
    active: {
        backgroundColor: '#f4f4f4'
    },
    title: {
        padding: theme.spacing(3)
    },
    appbar: {
        width: `calc(100% - ${drawerWidth}px)`
    },
    toolbar: theme.mixins.toolbar,
    date: {
        flexGrow: 1  
    },
    avatar: {
        marginLeft: theme.spacing(2)
    }
}})
{/*in appbar ,typography 'mario' is pushed to the end by adding the first typography 'date'
a flex grow value though their parent is not set display: flex, the possibility is the Toolbar component is
set display flex by material ui's default */}

{/*useLocation hook is used to get the current location(route), the query string after main page
the same functionality as web api used with vanila javascript- window.location.smth*/}
export default function Layout({ children }) {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
{/*note Avatar component that is created by two diffrent methods */}
{/*the Layout act a bit strange there are three main section inside root which was declared display: flex but 
the AppBar doesn't seem to be a part of flex items as it always stick at the top so there only two left the 
Drawer and a div. the drawer is on the left side and the remaining space take up by div inside of the div are 
children prop which seem to be passed down from App component so it means the children is dynamically changing
according to the route  but there also is a div section above the children whose  purpose is to left space for 
space bar who always stays on top of the screen*/}
  return (
    <div className={classes.root}> 
        <AppBar className={classes.appbar} elevation={0}>
            <Toolbar>
                <Typography className={classes.date}>
                    Today is the {format(new Date(), 'do MMM Y')}
                </Typography>
                <Typography>
                    Mario
                </Typography>
                <Avatar src='/mario-av.png' className={classes.avatar}></Avatar>
            </Toolbar>
        </AppBar>
        <Drawer
            className={classes.drawer}
            variant='permanent'
            anchor='left'
            classes={{ paper: classes.drawerPaper }}
        >
            <div>
                <Typography variant='h5' className={classes.title}>
                    Keep Notes
                </Typography>
            </div>
{/*ternary operator inside ListItem decide to use a different style according to a state 'active' */}
            <List>
                {menuItems.map(item => (
                    <ListItem
                        className={location.pathname === item.path ? classes.active : null} 
                        key={item.text}
                        button
                        onClick={() => history.push(item.path)}
                    >
                        <ListItemText primary={item.text} />
                        <ListItemIcon>{item.icon}</ListItemIcon>
                    </ListItem>
                ))}
            </List>

        </Drawer>
        {/* */}
        <div className={classes.page}>
            <div className={classes.toolbar}></div>
                {children}  
        </div>
    </div> 
  )
}
