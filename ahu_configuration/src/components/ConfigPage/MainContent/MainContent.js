import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  InputAdornment
} from "@material-ui/core";
import { CurrentPageContext } from "../../../context/CurrentPageContext/CurrentPageContext";
import PointMapping from "./Economizer/PointMapping/PointMapping";
import AirSidePointMapping from "./Airside/AirsidePointMapping/AirsidePointMapping";
import Argument from "./Economizer/Arguments/Arguments";
import AirsideArgument from "./Airside/AirsideArguments/AirsideArguments";
import Thresholds from "./Economizer/Thresholds/Thresholds";
import AirsideThresholds from "./Airside/AirsideThresholds/AirsideThresholds";
import AirsideThresholdStatic from "./Airside/AirsideThresholds/AirsideThresholdStatic/AirsideThresholdStatic";
import AirsideThresholdSAT from "./Airside/AirsideThresholds/AirsideThresholdSAT/AirsideThresholdSAT";
import AirsideThresholdSchedule from "./Airside/AirsideThresholds/AirsideThresholdSchedule/AirsideThresholdSchedule";
import FilePreview from "./FilePreview/FilePreview";
import { EconThresholdsContext } from "../../../context/EconThresholdsContext/EconThresholdsContext";
import { AirsideThresholdsContext } from "../../../context/AirsideThresholdsContext/AirsideThresholdsContext";
import { AirsideArgumentsContext } from "../../../context/AirsideArgumentsContext/AirsideArgumentsContext";
import { EconArgumentsContext } from "../../../context/EconArgumentsContext/EconArgumentsContext";
import { CampusBuildingDeviceContext } from "../../../context/CampusBuildingDeviceContext/CampusBuildingDeviceContext";
import { AHUContext } from "../../../context/AHUContext/AHUContext";
import { exportJson } from "./Util/Util";
import {StyledBoxMainWrapper, StyledButton} from "./_style"

const MainContent = props => {
  const {open, setOpen} = props;
  const setExpandThresholds = props.setExpandThresholds
  const [file, setFile] = useState("");
  const currentPageContext = useContext(CurrentPageContext);
  const [currentPage, setCurrentPage] = currentPageContext.currentPage;

  const ahuContext = useContext(AHUContext);
  const [airsideArguments, setAirsideArguments] = useContext(AirsideArgumentsContext);
  const [airsideThresholds, setAirsideThresholds] = useContext(AirsideThresholdsContext);
  const [pointMapping, setPointMapping] = ahuContext.pointMapping;
  const [fileType, setFileType] = ahuContext.fileType;

  const [thresholds, setThresholds] = useContext(EconThresholdsContext);
  const [argument, setArgument] = useContext(EconArgumentsContext);
  const campusBuildingDeviceContext = useContext(CampusBuildingDeviceContext);
  const [campus, setCampus] = campusBuildingDeviceContext.campus;
  const [building, setBuilding] = campusBuildingDeviceContext.building;
  const [device, setDevice] = campusBuildingDeviceContext.device;
  const [subDevice, setSubDevice] = campusBuildingDeviceContext.subDevice;
  const [
    locationList,
    setLocationList
  ] = campusBuildingDeviceContext.locationList;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitFile = event => {
    setOpen(false);
    (fileType === "AirsideAIRCx") ?
    exportJson(
      campus,
      building,
      device,
      subDevice,
      locationList,
      pointMapping,
      airsideArguments,
      airsideThresholds,
      file,
      true
    ) :
    exportJson(
      campus,
      building,
      device,
      subDevice,
      locationList,
      pointMapping,
      argument,
      thresholds,
      file,
      false
    )
  };

  const nextSection = event => {
    switch (currentPage) {
      case "Point Mapping":
        setCurrentPage("Settings");
        break;
      case "Settings":
        setCurrentPage("Thresholds");
        break;
      default:
        setCurrentPage("Settings");
    }
  };

  const handleFileOnBlur = event => {
    setFile(event.target.value);
  };

  let content = null;
  let nextSectionButton = (
    <StyledButton onClick={nextSection}>Next Section</StyledButton>
  );
  let fileNameDialog = (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Save As</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="File name:"
          onBlur={handleFileOnBlur}
          InputProps={{
            endAdornment: <InputAdornment position="end">.json</InputAdornment>,
            placeholder:"AHU_Configuration_File"
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={submitFile} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );

  if (currentPage) {
    switch (currentPage) {
      case "Point Mapping":
        if(fileType === "AirsideAIRCx"){
          content = <AirSidePointMapping subDevice={subDevice}></AirSidePointMapping>;
        } else {
          content = <PointMapping></PointMapping>;
        }
        
        break;
      case "Settings":
        if(fileType === "AirsideAIRCx"){
          content = <AirsideArgument></AirsideArgument>;
        } else {
          content = <Argument></Argument>;
        }
        
        break;
      case "Thresholds":
        if(fileType === "AirsideAIRCx"){
          content = <AirsideThresholds setExpandThresholds={setExpandThresholds}></AirsideThresholds>;
        } else {
          content = <Thresholds></Thresholds>;
        }
        nextSectionButton = (
          <StyledButton onClick={handleClickOpen}>SAVE AS</StyledButton>
        );
        break;
      case "Static Pressure":
        content = <AirsideThresholdStatic></AirsideThresholdStatic>;
        nextSectionButton = (
          <StyledButton onClick={handleClickOpen}>SAVE AS</StyledButton>
        )
        break;
      case "SAT AIRCx":
        content = <AirsideThresholdSAT></AirsideThresholdSAT>;
        nextSectionButton = (
          <StyledButton onClick={handleClickOpen}>SAVE AS</StyledButton>
        )
        break;
      case "Schedule/Reset AIRCx":
        content = <AirsideThresholdSchedule></AirsideThresholdSchedule>;
        nextSectionButton = (
          <StyledButton onClick={handleClickOpen}>SAVE AS</StyledButton>
        )
        break;
      default:
        content = <StyledButton></StyledButton>;
    }
  }

  return (
    <>
      <StyledBoxMainWrapper display="flex" p={1} flexDirection="column">
        <Box p={1} bgcolor="grey.300" style={{ width: "90%"}}>
          <span style={{borderBottom: "1px solid #979797", width: "100%",display: "block"}}>
          <h2>{currentPage}</h2>
          </span>
        </Box>
        <Box p={1} bgcolor="grey.300" flexGrow={0} style={{ width: "94%" }}>
          {content}
        </Box>
      </StyledBoxMainWrapper>
      <StyledBoxMainWrapper display="flex" p={1} flexDirection="column">
        <Box p={1} style={{ width: "90%"}} bgcolor="grey.300">
          <div>
          <span style={{borderBottom: "1px solid #979797", width: "100%",display: "block"}}>
          <h2 style={{display: "inline-block"}}>File Preview</h2>
          {nextSectionButton}
          </span>
          </div>
        </Box>
        <Box p={1} style={{ width: "90%"}} bgcolor="grey.300" flexGrow={0}>
          <FilePreview></FilePreview>
        </Box>
        <Box p={1} bgcolor="grey.300">
          {nextSectionButton}
        </Box>
        
      </StyledBoxMainWrapper>
      {fileNameDialog}
    </>
  );
};

export default MainContent;
