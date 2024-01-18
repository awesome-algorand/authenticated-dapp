import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Avatar, Badge, FormControlLabel, Switch, useTheme } from '@mui/material';
import {GetStartedCard} from "./states/GetStarted";
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {ConnectModal} from "./ConnectModal";
import { ColorModeContext, StateContext } from './Contexts';
import { WaitForRegistrationCard } from './states/WaitForRegistration';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { RegisteredCard } from './states/Registered';
import {socket} from './socket.js'
import { useSession } from './hooks/useSession';
export default function App() {
    const session = useSession();
    const {state, setState} = useContext(StateContext)
    const colorMode = useContext(ColorModeContext)
    const theme = useTheme()

    // Connect Modal
    const [open, setOpen] = useState(false)

    // Authentication Steps

    const STATES = {
        'start': GetStartedCard,
        'connected': WaitForRegistrationCard,
        'registered': RegisteredCard
    }
    const Content = STATES[state]
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState([]);

    useEffect(() => {
        function onConnect() {
            console.log('Connected')
            setIsConnected(true);
        }

        function onDisconnect() {
            console.log('Disconnected')
            setIsConnected(false);
        }

        function onFooEvent(value) {
            console.log(value)
            setFooEvents(previous => [...previous, value]);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('auth', onFooEvent);
        socket.on('link', onFooEvent);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('auth', onFooEvent);
            socket.off('link', onFooEvent);
        };
    }, []);

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
                      <Badge variant="dot" color={isConnected ? "success" : "error"}>
                        <Avatar alt="Remy Sharp" src="/logo.png" />
                      </Badge>
                  </IconButton>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      Avicennia
                  </Typography>
                  <IconButton onClick={() => {
                      setState(state === 'registered' ? 'connected' : 'start')
                  }} aria-label="delete" disabled={state === 'start'} color="inherit">
                      <NavigateBeforeIcon />
                  </IconButton>
                  <IconButton onClick={() => {
                      setState(state === 'start' ? 'connected' : 'registered')
                  }} aria-label="delete" disabled={state === 'registered'} color="inherit">
                      <NavigateNextIcon />
                  </IconButton>
                  {/*<ConnectModal color="inherit" />*/}
                  <IconButton sx={{ ml: 1 }} onClick={colorMode.toggle} color="inherit">
                      {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                  </IconButton>
              </Toolbar>
          </AppBar>
          <div id="leaves" style={{zIndex: -1}}>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
          </div>
          <Container component="main" maxWidth="md" sx={{ display: "flex", height: "calc(100vh - 64px)", overflow: "auto" }}>
              <Box sx={{ my: 4, flex: 1 }}>
                  <Content />
              </Box>
          </Container>

      </>
    );
}
