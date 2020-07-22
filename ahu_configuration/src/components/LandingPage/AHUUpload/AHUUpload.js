import React from "react";
import { Icon } from "@material-ui/core";
import UploadIcon from "../../../assets/icons/Upload.svg";
import UploadGreen from "../../../assets/icons/UploadGreen.svg";
import {
  StyledDiv,
  StyledButton,
  StyledDivReUpload,
  StyledPReUpload,
  StyledLabelReUpload,
  StyledButtonReUpload,
} from "./_style";

const AHUUpload = (props) => {
  let content = (
    <>
      <input
        accept="application/JSON"
        style={{ display: "none" }}
        type="file"
        id="ahu-file-upload"
        onChange={props.handleFileUpload}
      />
      <label htmlFor="ahu-file-upload">
        <StyledButton
          variant="contained"
          color="primary"
          component="span"
          disabled={props.disabled}
          startIcon={
            <Icon>
              <img src={UploadIcon} height={19} width={20} alt="Upload" />
            </Icon>
          }
        >
          AHU File
        </StyledButton>
      </label>
      </>
  );

  if (props.fileName.length) {
    content = (
      <StyledDivReUpload>
        <StyledPReUpload>{props.fileName}</StyledPReUpload>
        <input
          accept="application/JSON"
          style={{ display: "none" }}
          type="file"
          onChange={props.handleFileUpload}
        />
        <StyledLabelReUpload htmlFor="ahu-file-reupload">
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
  return <StyledDiv disabled={props.disabled}>{content}</StyledDiv>;
};

export default AHUUpload;
