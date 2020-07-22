import React, { useContext } from "react";
import { StyledDiv } from './_styledFilePreview';

import MasterDriverContext from "../../context/masterDriverContext";

const JSONFilePreview = props => {
    const {configuration} = useContext(MasterDriverContext);


    // Functional component that displays the JSON of the configuration dynamically based on context
    const ShowJsonSections = ({configuration}) => {
        return (
            Object.keys(configuration).map(config => {
                return(
                    <StyledDiv>
                        <pre>"{config}": {JSON.stringify(configuration[config], undefined, 4)}</pre>
                    </StyledDiv>
                )
            })
        );
    };


    return (
        <ShowJsonSections configuration={configuration} />
    );
};

export default JSONFilePreview;