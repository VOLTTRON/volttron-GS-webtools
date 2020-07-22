import React, { Component } from 'react'
import { masterDriverConfigParser } from '../utils/masterDriverConfigParser'
import configurationTemplate from '../constants/jsonTemplates/configuration.json';

const MasterDriverContext = React.createContext({})

class MasterDriverProvider extends Component {

    state = {
        rerender: false,
        darkMode: false,
        configuration: JSON.parse(localStorage.getItem("tcc-configuration-store")),
    }

    setRerender = rerender => {
        this.setState(prevState => ({ rerender }) )
    }

    setConfiguration = configuration => {
        localStorage.setItem("tcc-configuration-store", JSON.stringify(configuration))
        this.setState(prevState => ({ configuration }) )
    }

    setDarkMode = darkMode => {
        let status = JSON.parse(localStorage.getItem("tcc-configuration-status"))
        status["darkMode"] = darkMode
        if (darkMode) {
            document.body.style.backgroundColor = "#303030";
        } else {
            document.body.style.backgroundColor = "#FFFFFF";
        }

        localStorage.setItem("tcc-configuration-status", JSON.stringify(status))
        this.setState(prevState => ({ darkMode }) )
    }

    render() {
        if (localStorage.getItem("tcc-configuration-status") === null) {
            localStorage.setItem("tcc-configuration-status", JSON.stringify({"darkMode": "", "currentPage": ""}))
        }
        const { children } = this.props;
        const { rerender } = this.state;
        let { configuration } = this.state;
        const { setRerender, setConfiguration, setDarkMode } = this;
        const parsedMDC = masterDriverConfigParser();
        let campuses = [];
        let buildings = [];
        let devices = [];
        let points = [];
        let darkMode = JSON.parse(localStorage.getItem("tcc-configuration-status"))["darkMode"];
        if (!configuration){
            configuration = configurationTemplate;
        }
        for (let index in parsedMDC["campuses"]){
            campuses.push(parsedMDC["campuses"][index])
        }
        for (let index in parsedMDC["buildings"]){
            buildings.push(parsedMDC["buildings"][index])
        }
        for (let index in parsedMDC["devices"]){
            devices.push(parsedMDC["devices"][index])
        }
        if (darkMode) {
            document.body.style.backgroundColor = "#303030";
        } else {
            document.body.style.backgroundColor = "#FFFFFF";
        }
        return (
            <MasterDriverContext.Provider
                value = {{
                    parsedMDC,
                    campuses,
                    buildings,
                    devices,
                    points,
                    darkMode,
                    setDarkMode,
                    rerender,
                    setRerender,
                    configuration,
                    setConfiguration
                }}
                >
                    {children}
            </MasterDriverContext.Provider>
        )
    }
}

export default MasterDriverContext

export { MasterDriverProvider }