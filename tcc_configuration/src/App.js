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
import InputsConfiguration from './components/Inputs/InputsConfiguration';
import Outputs from './components/Outputs/Outputs';
import DeviceConfiguration from './components/DeviceConfiguration/DeviceConfiguration';
import AgentConfiguration from './components/AgentConfiguration/AgentConfiguration';
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
                                <Route path="/campus">
                                    <Campus />
                                </Route>
                                <Route path="/agent">
                                    <AgentConfiguration />
                                </Route>
                                <Route path="/inputs">
                                    <InputsConfiguration />
                                </Route>
                                <Route path="/outputs">
                                    <Outputs />
                                </Route>
                                <Route path="/schedule">
                                    <Schedule />
                                </Route>
                                <Route path="/device_configuration">
                                    <DeviceConfiguration />
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
