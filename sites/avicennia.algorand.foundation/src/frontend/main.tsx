import './index.css'
import {StrictMode, useContext, useMemo, useState} from 'react';
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import {createTheme, CssBaseline} from '@mui/material';
import {DEFAULT_THEME} from './theme';
import App from './App';
import {ColorModeContext} from "./ColorModeContext";


function ProviderApp(){
    const [mode, setMode] = useState<'light' | 'dark'>(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light');
    const colorMode = useMemo(
        () => ({
            toggle: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = useMemo(
        () =>
            createTheme({
                ...DEFAULT_THEME,
                palette: {
                    ...DEFAULT_THEME.palette,
                    mode,
                },
            }),
        [mode],
    );
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App/>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ProviderApp/>
    </StrictMode>,
);
