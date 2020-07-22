import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";

import MasterDriverUpload from "../../components/LandingPage/MasterDriverUpload/MasterDriverUpload";
import AHUUpload from "../../components/LandingPage/AHUUpload/AHUUpload";
import GenerateFile from "../../components/LandingPage/GenerateFile/GenerateFile";
import { MasterDriverContext } from "../../context/MasterDriverContext/MasterDriverContext";
import { AHUContext } from "../../context/AHUContext/AHUContext";
import { CampusBuildingDeviceContext } from "../../context/CampusBuildingDeviceContext/CampusBuildingDeviceContext";
import { CurrentPageContext } from "../../context/CurrentPageContext/CurrentPageContext";
import { EconThresholdsContext } from "../../context/EconThresholdsContext/EconThresholdsContext";
import { AirsideArgumentsContext } from "../../context/AirsideArgumentsContext/AirsideArgumentsContext";
import { AirsideThresholdsContext } from "../../context/AirsideThresholdsContext/AirsideThresholdsContext";
import { EconArgumentsContext } from "../../context/EconArgumentsContext/EconArgumentsContext";
import { DropDownsContext } from "../../context/DropDownsContext/DropDownsContext";
import { handleAHUUpload } from "../../components/LandingPage/Utils/AHUUpload";
import ErrorModal from "../Layout/ErrorModal/ErrorModal";
import { verifyLocation } from "../../components/LandingPage/Utils/Util";
import { readFromLocalStorage } from "../../context/AccessLocalStorage";
import {
  StyledAcceptedFiles,
  StyledOL,
  StyledDiv,
  StyledFileDv,
  StyledLi,
  StyledSpan,
  StyledP,
} from "./_style";

const LandingPage = (props) => {
  const masterDriverContext = useContext(MasterDriverContext);
  const currentPageContext = useContext(CurrentPageContext);
  const ahuContext = useContext(AHUContext);
  const [fileName, setFileName] = ahuContext.fileName;
  const dropDownsContext = useContext(DropDownsContext);

  const campusBuildingDeviceContext = useContext(CampusBuildingDeviceContext);
  const [econThresholds, setEconThresholds] = useContext(EconThresholdsContext);
  const [airsideArguments, setAirsideArguments] = useContext(
    AirsideArgumentsContext
  );
  const [airsideThresholds, setAirsideThresholds] = useContext(
    AirsideThresholdsContext
  );
  const [econArgument, setEconArguments] = useContext(EconArgumentsContext);
  const [showError, setShowError] = useState(false);
  const [reloadConfigWindow, setReloadConfigWindow] = useState(true);
  const [error, setError] = useState("");

  let reloadConfigDialog = null;
  if (reloadConfigWindow && localStorage.getItem("AHU_Configuration")) {
    reloadConfigDialog = (
      <div>
        <Dialog open keepMounted onClose={props.onClose}>
          <DialogContent>
            <p
              style={{
                color: "black",
                textAlign: "center",
                fontSize: "1.5rem",
              }}
            >
              A previous configuration session has been found. Would you like to edit the previous session or start a
              new one?
            </p>
          </DialogContent>
          <DialogActions style={{ justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setReloadConfigWindow(false);
                readFromLocalStorage(
                  ahuContext,
                  campusBuildingDeviceContext,
                  currentPageContext,
                  dropDownsContext,
                  masterDriverContext,
                  setAirsideArguments,
                  setAirsideThresholds,
                  setEconArguments,
                  setEconThresholds
                );
              }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setReloadConfigWindow(false);
              }}
            >
              Start
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  const masterDriverUploadHandler = (event) => {
    const file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
      const masterDrive = {
        name: file.name,
        data: reader.result,
      };
      masterDriverContext.setMasterDriver(masterDrive);
    };
    reader.onerror = function () {
      console.log(reader.error);
    };
  };

  const ahuUploadHandler = (event) => {
    event.persist();
    const file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    setFileName(file.name);
    reader.onload = function () {
      const fileContents = reader.result;
      let errorMsg = handleAHUUpload(
        fileContents,
        ahuContext,
        setEconArguments,
        setAirsideArguments,
        setEconThresholds,
        setAirsideThresholds,
        campusBuildingDeviceContext,
        verifyLocation,
        masterDriverContext,
        dropDownsContext
      );

      if (errorMsg.length > 1) {
        setShowError(true);
        event.target.value = null;
        setError(errorMsg);
      }
    };
    reader.onerror = function () {
      console.log(reader.error);
    };
  };

  return (
    <StyledDiv>
      {showError ? (
        <ErrorModal onClose={() => setShowError(false)}>{error}</ErrorModal>
      ) : null}
      {reloadConfigDialog}
      <StyledAcceptedFiles></StyledAcceptedFiles>

      <StyledFileDv>
        <StyledOL>
          <StyledLi>
            <StyledSpan>
              <MasterDriverUpload
                fileName={masterDriverContext.masterDriver.name}
                handleFileUpload={masterDriverUploadHandler}
              />
            </StyledSpan>
          </StyledLi>
          <StyledLi>
            <StyledSpan>
              <AHUUpload
                disabled={masterDriverContext.masterDriver.data ? false : true}
                fileName={fileName}
                handleFileUpload={ahuUploadHandler}
              ></AHUUpload>
            </StyledSpan>
          </StyledLi>
          <StyledP
            disabled={masterDriverContext.masterDriver.data ? false : true}
          >
            {" "}
            or
          </StyledP>
          <GenerateFile
            disabled={masterDriverContext.masterDriver.data ? false : true}
          ></GenerateFile>
        </StyledOL>
      </StyledFileDv>
    </StyledDiv>
  );
};

export default LandingPage;
