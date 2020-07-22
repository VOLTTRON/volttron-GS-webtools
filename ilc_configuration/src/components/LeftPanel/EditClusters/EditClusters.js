import React, { useContext} from 'react';
import MasterDriverContext from '../../../context/masterDriverContext';
import ClusterSettings from './ClusterSettings'

export default function EditCluster(props) { 
    let { configuration } = useContext(MasterDriverContext);

    const createClusterEdit = () => {
        let clusterSettings = []
        configuration["config"]["cluster"].forEach(cluster => {
            clusterSettings.push(<ClusterSettings cluster={cluster}/>)
        })
        return clusterSettings    
    }

    return(
        <>
            {createClusterEdit()}
        </>
    )
}