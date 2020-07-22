import React, { useContext } from "react";
import { StyledBoxWrapper } from './_styledFilePreview';
import Grid from '@material-ui/core/Grid';
import ReactJson from 'react-json-view';
import MasterDriverContext from "../../context/masterDriverContext";

const FilePreview = props => {
    const {configuration, darkMode} = useContext(MasterDriverContext);

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