import React, { useContext } from "react";
import { StyledBoxWrapper, StyledBox } from './_styledFilePreview';
import Grid from '@material-ui/core/Grid';
import ReactJson from 'react-json-view';
import MasterDriverContext from "../../context/masterDriverContext";
import { darkModeContext } from "../../context/darkModeContext";

const FilePreview = props => {
    const {configuration} = useContext(MasterDriverContext);
    const { darkMode } = useContext(darkModeContext);

    return (
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <StyledBoxWrapper darkMode={darkMode}>
                    <ReactJson
                        src={configuration}
                        name={false}
                        theme={darkMode ? "shapeshifter" :"shapeshifter:inverted"}
                        enableClipboard={false}
                        displayDataTypes={false}
                        displayObjectSize={false}
                        onDelete={{}}
                    />
                </StyledBoxWrapper>
            </Grid>
        </Grid>
    );
};

export default FilePreview;