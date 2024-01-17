import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import {Avatar, FormControlLabel, Switch, useTheme} from "@mui/material";
import {GetStartedCard} from "./states/GetStarted";
import {useContext, useLayoutEffect, useState} from "react";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {ConnectModal} from "./ConnectModal";
import {ColorModeContext} from "./ColorModeContext";
export default function App() {
    const colorMode = useContext(ColorModeContext)
    const theme = useTheme()

    // Connect Modal
    const [open, setOpen] = useState(false)

    // Authentication Steps
    const [state, setState] = useState('start')
    const STATES = {
        'start': GetStartedCard,
        'connected': GetStartedCard,
        'registered': GetStartedCard
    }
    const Content = STATES[state]

    useLayoutEffect(() => {
        console.log(theme)
    }, [theme]);

    return (
        <>
        <AppBar position="sticky">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    disabled={state === 'start'}
                >
                    <Avatar alt="Remy Sharp" src="/logo.png" />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Avicennia
                </Typography>
                <ConnectModal color="inherit"/>
                <IconButton sx={{ ml: 1 }} onClick={colorMode.toggle} color="inherit">
                    {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
            </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="md" sx={{display: "flex", height: "calc(100vh - 64px)"}}>
            <Box sx={{ my: 4, flex: 1 }}>
                <Content/>
            </Box>
        </Container>

        </>
    );
}
