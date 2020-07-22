import React, { Component } from 'react'
import { masterDriverConfigParser } from '../utils/masterDriverConfigParser'
import configurationTemplate from '../constants/jsonTemplates/configuration.json';

const MasterDriverContext = React.createContext({})

class MasterDriverProvider extends Component {

    state = {
        rerender: false,
        configuration: JSON.parse(localStorage.getItem("ilc-configuration-store")),
    }

    setRerender = rerender => {
        this.setState(prevState => ({ rerender }) )
    }

    setConfiguration = configuration => {
        localStorage.setItem("ilc-configuration-store", JSON.stringify(configuration))
        this.setState(prevState => ({ configuration }) )
    }

    render() {
        const { children } = this.props;
        const { rerender } = this.state;
        let { configuration } = this.state;
        const { setRerender, setConfiguration } = this;
        const parsedMDC = masterDriverConfigParser();
        let campuses = [];
        let buildings = [];
        let devices = [];
        let points = [];
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
        return (
            <MasterDriverContext.Provider
                value = {{
                    parsedMDC,
                    campuses,
                    buildings,
                    devices,
                    points,
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