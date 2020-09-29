import React, {useContext} from 'react';
import './App.css';
import { default as AppBar } from './components/AppBar/AppBar';
import { Router, Switch, Route } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import history from './history';
import {default as LandingPage } from './containers/LandingPage';
import LeftPanel from './components/LeftPanel/LeftPanel';
import FilePreview from './components/FilePreview/FilePreview';
import Schedule from './components/Schedule/Schedule';
import Campus from './components/Campus/Campus';
import Inputs from './components/Inputs/Inputs';
import Outputs from './components/Outputs/Outputs';
import Device from './components/Device/Device';
import { MainGrid } from './containers/_styledApp';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import MasterDriverContext from './context/masterDriverContext';

function App() {
    const {darkMode} = useContext(MasterDriverContext);

    const darkTheme = createMuiTheme({
        palette: {
            type: "dark",
            primary: {
                main: "#23478d",
            },
        },
    });

    const lightTheme = createMuiTheme({
        palette: {
            primary: {
                main: "#142850",
            },
        },
    });

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <div className="App">
                <AppBar />
                <LeftPanel />
                <MainGrid container spacing={2} >
                    <Grid item xs={6}>
                        <Router history={history}>
                            <Switch>
                                <Route path="/agent">
                                    <Campus />
                                </Route>
                                <Route path="/inputs">
                                    <Inputs />
                                </Route>
                                <Route path="/outputs">
                                    <Outputs />
                                </Route>
                                <Route path="/schedule">
                                    <Schedule />
                                </Route>
                                <Route path="/device">
                                    <Device />
                                </Route>
                                <Route exact path="/">
                                    <LandingPage />
                                </Route>
                            </Switch>
                        </Router>
                    </Grid>
                    <Grid item xs={6}>
                        <FilePreview />
                    </Grid>
                </MainGrid>
            </div>
        </ThemeProvider>
    );
}

export default App;
