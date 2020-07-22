import React from "react";
import { Icon } from "@material-ui/core";
import UploadIcon from "../../../assets/icons/Upload.svg";
import UploadGreen from "../../../assets/icons/UploadGreen.svg";
import {
  StyledDiv,
  StyledDivReUpload,
  StyledPReUpload,
  StyledLabelReUpload,
  StyledButton,
  StyledButtonReUpload,
} from "./_style";

const MasterDriverUpload = (props) => {
  let content = (
    <>
      <input
        accept="application/JSON"
        style={{ display: "none" }}
        type="file"
        id="master-driver-file-upload"
        onChange={props.handleFileUpload}
      />
      <label htmlFor="master-driver-file-upload">
        <StyledButton
          variant="contained"
          color="primary"
          component="span"
          startIcon={
            <Icon>
              <img src={UploadIcon} height={19} width={20} alt="Upload" />
            </Icon>
          }
        >
          Master Driver
        </StyledButton>
      </label>
    </>
  );

  if (props.fileName) {
    content = (
      <StyledDivReUpload>
        <StyledPReUpload>{props.fileName}</StyledPReUpload>
        <input
          accept="application/JSON"
          style={{ display: "none" }}
          type="file"
          id="master-driver-file-reupload"
          onChange={props.handleFileUpload}
        />
        <StyledLabelReUpload htmlFor="master-driver-file-reupload">
          <StyledButtonReUpload
            variant="contained"
            color="primary"
            component="span"
            startIcon={
              <Icon>
                <img src={UploadGreen} height={19} width={20} alt="Re-Upload" />
              </Icon>
            }
          >
            Re-Upload
          </StyledButtonReUpload>
        </StyledLabelReUpload>
      </StyledDivReUpload>
    );
  }

  return <StyledDiv>{content}</StyledDiv>;
};

export default MasterDriverUpload;
