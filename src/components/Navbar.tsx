import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
    Close,
    NightsStayOutlined,
    HomeOutlined,
    WbSunnyOutlined,
    Mail,
    GitHub,
    Telegram
} from '@material-ui/icons'
import {
    Button,
    Divider,
    Drawer,
    BottomNavigation,
    BottomNavigationAction,
    ButtonGroup,
    FormControlLabel,
    Switch
} from '@material-ui/core'

import { NavbarContext } from '../context/navbarContext'
import { DarkModeContext } from '../context'

const useStyles = makeStyles((theme) => ({
    content: {
        width: 260,
    },
    homeBtn: {
        flex: 1
    },
    btnGroup: {
        display: 'flex'
    },
    switchContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 0,
        padding: '0 1rem',
        transition: 'background-color ease 250ms',
        '&:hover': {
            backgroundColor: theme.palette.action.hover
        }
    },
    switchInfo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1
    },
    switchBtn: {
        display: 'flex',
        alignItems: 'center'
    },
    BottomNavigation: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    BottomNavigationAction: {
        minWidth: 60,
        transition: 'background-color ease 250ms',
        '&:hover': {
            backgroundColor: theme.palette.action.hover
        }
    }
}))

const Navbar = () => {
    const history = useHistory()
    const { isOpen, toggleNavbar } = useContext(NavbarContext)
    const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext)
    const classes = useStyles()

    const onHomeClick = (event: React.MouseEvent) => {
        toggleNavbar!(false)(event)
        history.push('/')
    }

    return (
        <Drawer open={isOpen} onClose={toggleNavbar!(false)}>
            <div className={classes.content}>
                <ButtonGroup className={classes.btnGroup} variant="text">
                    <Button onClick={onHomeClick} className={classes.homeBtn} startIcon={<HomeOutlined />} >
                        Home
                    </Button>
                    <Button onClick={toggleNavbar!(false)}>
                        <Close />
                    </Button>
                </ButtonGroup>
                <Divider />
                <FormControlLabel
                    className={classes.switchContainer}
                    checked={isDarkMode}
                    onChange={toggleDarkMode}
                    label={<span className={classes.switchBtn}>{isDarkMode ? <NightsStayOutlined /> : <WbSunnyOutlined />}</span>}
                    control={
                        <Switch
                            name="theme-switch"
                            color="default"
                        />
                    }
                />
                <Divider />
                <BottomNavigation className={classes.BottomNavigation} >
                    <BottomNavigationAction
                        className={classes.BottomNavigationAction}
                        rel="noopener"
                        target="_blank"
                        href="mailto:alexandr.bulgatov13@gmail.com"
                        icon={<Mail />}
                    />
                    <BottomNavigationAction
                        className={classes.BottomNavigationAction}
                        rel="noopener"
                        target="_blank"
                        href="https://github.com/doyouwannatea/"
                        icon={<GitHub />}
                    />
                    <BottomNavigationAction
                        className={classes.BottomNavigationAction}
                        rel="noopener"
                        target="_blank"
                        href="https://t.me/doyouwannatea"
                        icon={<Telegram />}
                    />
                </BottomNavigation>
            </div>
        </Drawer>
    )
}

export default Navbar