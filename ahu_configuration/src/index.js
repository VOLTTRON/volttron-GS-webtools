import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import MasterDriverProvider from "./context/MasterDriverContext/MasterDriverContext";
import AHUProvider from "./context/AHUContext/AHUContext";
import CurrentPageProvider from "./context/CurrentPageContext/CurrentPageContext";
import DropDownsProvider from "./context/DropDownsContext/DropDownsContext";
import THRESHOLDSProvider from "./context/EconThresholdsContext/EconThresholdsContext";
import EconArgumentsProvider from "./context/EconArgumentsContext/EconArgumentsContext";
import AirsideArgumentsProvider from "./context/AirsideArgumentsContext/AirsideArgumentsContext";
import AirsideThresholdsProvider from "./context/AirsideThresholdsContext/AirsideThresholdsContext";
import CampusBuildingDeviceProvider from "./context/CampusBuildingDeviceContext/CampusBuildingDeviceContext";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#0C9A6F" },
    secondary: { main: "#2D2D2D" },
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: "14px"
      }
    }
  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <MasterDriverProvider>
      <CurrentPageProvider>
        <AHUProvider>
          <THRESHOLDSProvider>
            <EconArgumentsProvider>
              <DropDownsProvider>
                <CampusBuildingDeviceProvider>
                  <AirsideArgumentsProvider>
                    <AirsideThresholdsProvider>
                      <App />
                    </AirsideThresholdsProvider>
                  </AirsideArgumentsProvider>
                </CampusBuildingDeviceProvider>
              </DropDownsProvider>
            </EconArgumentsProvider>
          </THRESHOLDSProvider>
        </AHUProvider>
      </CurrentPageProvider>
    </MasterDriverProvider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
