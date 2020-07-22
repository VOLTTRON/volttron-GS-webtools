import React, { Component, useContext } from 'react'
import { masterDriverConfigParser } from '../utils/masterDriverConfigParser'
import MasterDriverContext from './masterDriverContext'

const ClusterContext = React.createContext({})

class ClusterProvider extends Component {  
    state = {
        clusterFocus: localStorage.getItem("ilc-configuration-status") ? 
        JSON.parse(localStorage.getItem("ilc-configuration-status"))["clusterFocus"] : "",
        criteria: JSON.parse(localStorage.getItem("ilc-configuration-store")) ? 
        JSON.parse(localStorage.getItem("ilc-configuration-store"))["criteria"] : {}
    }

    setClusterFocus = clusterFocus => {
        let status = JSON.parse(localStorage.getItem("ilc-configuration-status"))
        status["clusterFocus"] = clusterFocus;
        this.setState(prevState => ({ clusterFocus }) )
    }

    setCriteria = criteria => {
        this.setState(prevState => ({ criteria }))
    }

    render() {
        const { children } = this.props;
        const { clusterFocus, criteria } = this.state;
        const { setClusterFocus, setCriteria } = this;
        return (
            <ClusterContext.Provider
                value = {{
                    clusterFocus,
                    setClusterFocus,
                    criteria,
                    setCriteria,
                }}
                >
                    {children}
            </ClusterContext.Provider>
        )
    }
}

export default ClusterContext

export { ClusterProvider }