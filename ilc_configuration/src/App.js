import React, {useContext} from 'react';
import './App.css';
import { default as AppBar } from './components/AppBar/AppBar'
import {
  Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import history from './history';
import {default as LandingPage } from './containers/LandingPage'
import {default as MainConfig } from './containers/MainConfig'
import LeftPanel from './components/LeftPanel/LeftPanel'
import { default as AddCluster } from './components/LeftPanel/AddCluster/AddCluster'
import { default as EditClusters } from './components/LeftPanel/EditClusters/EditClusters'
import PairwiseConfig from './containers/PairwiseConfig'
import CriteriaConfig from './containers/CriteriaConfig'
import ControlConfig from './containers/ControlConfig'
import FilePreview from './components/FilePreview/FilePreview';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { darkModeContext } from "./context/darkModeContext";

function App() {

  const {darkMode} = useContext(darkModeContext);

  const darkTheme = createMuiTheme({
      palette: {
          type: "dark",
          primary: {
              main: "#5a9960",
          },
          secondary: {
            main: '#34593b'
        }
      },
      overrides: {
        MuiTooltip: {
          tooltip: {
            fontSize: "1rem"
          }
        }
      }
    });

  const lightTheme = createMuiTheme({
      palette: {
          primary: {
              main: "#34593b",
          },
          secondary: {
            main: '#5a9960'
        }
      },
      overrides: {
        MuiTooltip: {
          tooltip: {
            fontSize: "1rem"
          }
        }
      }
  });

  if (darkMode) {
    document.body.style.backgroundColor = "#303030";
  } else {
      document.body.style.backgroundColor = "#FFFFFF";
  }

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <div className="App" style={{width: '100%'}}>
        <AppBar/>
        <LeftPanel/>
        <Grid container spacing={2} style={{marginTop: '65px', marginLeft: '240px', width: 'calc(100% - 240px)'}}>
          <Grid item xs={6}>
            <Router history={history}>
                <Switch>
                  <Route exact path="/main" component={MainConfig}>
                  </Route>
                  <Route path="/pairwise">
                    <PairwiseConfig/>
                  </Route>
                  <Route path="/criteria">
                    <CriteriaConfig/>
                  </Route>
                  <Route path="/control">
                    <ControlConfig/>
                  </Route>
                  <Route exact path="/addcluster">
                    <AddCluster/>
                  </Route>
                  <Route exact path="/editclusters">
                    <EditClusters/>
                  </Route>
                  <Route exact path="/">
                    <LandingPage/>
                  </Route>
                </Switch>
            </Router>
          </Grid>
          <Grid item xs={6}>
            <FilePreview />
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>

  );
}

export default App;
