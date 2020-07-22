import React, { useContext, useState } from "react";
import { Box, List, ListItemText, Button } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { AHUContext } from "../../../context/AHUContext/AHUContext";
import { AirsideThresholdsContext } from "../../../context/AirsideThresholdsContext/AirsideThresholdsContext";
import { CurrentPageContext } from "../../../context/CurrentPageContext/CurrentPageContext";
import { MasterDriverContext } from "../../../context/MasterDriverContext/MasterDriverContext";
import SaveIcon from "@material-ui/icons/Save";
import {
  StyledP,
  StyledBoxWrapper,
  StyledDivConfig,
  StyledButtonSave,
  StyledCollapse,
  StyledListItem,
} from "./_style";

const LeftPanel = (props) => {
  const { open, setOpen, expandThresholds, setExpandThresholds } = props;
  const masterDriverContext = useContext(MasterDriverContext);
  const [airsideThresholdsContext, setAirsideThresholdsContext] = useContext(
    AirsideThresholdsContext
  );
  const ahuContext = useContext(AHUContext);
  const [fileType, setFileType] = ahuContext.fileType;
  const [fileName, setFileName] = ahuContext.fileName;
  const currentPageContext = useContext(CurrentPageContext);
  const [currentPage, setCurrentPage] = currentPageContext.currentPage;
  const [expandOpen, setExpandOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const customThreshold = airsideThresholdsContext.custom;

  if (expandThresholds && expandOpen !== true) {
    setExpandOpen(true);
    setAnimate(true);
  }

  if (expandThresholds === false && expandOpen === true) {
    setExpandOpen(false);
  }

  if (animate && expandOpen) {
    setTimeout(
      function () {
        setAnimate(false);
      }.bind(this),
      3500
    );
  }

  const handleCurrentPageClick = (buttonName) => (event) => {
    setCurrentPage(buttonName);
  };

  const handleReUpload = (event) => {
    if (
      window.confirm(
        "Are you sure you want to re-upload a new file? This will start the process over and all unsaved data will be lost."
      )
    ) {
      localStorage.removeItem("AHU_Configuration");
      window.location.reload();
    }
  };

  let threshold = (
    <>
      <StyledListItem
        button
        key="Thresholds"
        selected={currentPage === "Thresholds" ? true : false}
        name="Thresholds"
        onClick={handleCurrentPageClick("Thresholds")}
      >
        <ListItemText primary="Thresholds" />
      </StyledListItem>
    </>
  );

  if (fileType === "AirsideAIRCx") {
    threshold = (
      <>
        <StyledListItem
          button
          key="threshholds"
          selected={currentPage === "Thresholds" ? true : false}
          name="thresholds"
          onClick={handleCurrentPageClick("Thresholds")}
        >
          {customThreshold ? (
            expandOpen ? (
              <ExpandMore onClick={() => setExpandThresholds(false)} />
            ) : (
              <ExpandLess onClick={() => setExpandThresholds(true)} />
            )
          ) : null}
          <ListItemText primary="Thresholds" />
        </StyledListItem>
        <StyledCollapse in={expandOpen}>
          <StyledListItem
            button
            animate={animate ? 1 : 0}
            key="staticPressure"
            selected={currentPage === "Static Pressure" ? true : false}
            onClick={handleCurrentPageClick("Static Pressure")}
          >
            <ListItemText primary="Static Pressure AIRCx" />
          </StyledListItem>
          <StyledListItem
            button
            animate={animate ? 1 : 0}
            key="statAircx"
            selected={currentPage === "SAT AIRCx" ? true : false}
            onClick={handleCurrentPageClick("SAT AIRCx")}
          >
            <ListItemText primary="SAT AIRCx" />
          </StyledListItem>
          <StyledListItem
            button
            animate={animate ? 1 : 0}
            key="schedule"
            selected={currentPage === "Schedule/Reset AIRCx" ? true : false}
            onClick={handleCurrentPageClick("Schedule/Reset AIRCx")}
          >
            <ListItemText primary="Schedule/Reset AIRCx" />
          </StyledListItem>
        </StyledCollapse>
      </>
    );
  }
  return (
    <>
      <StyledBoxWrapper display="flex" p={1} flexDirection="column">
        <Box p={1} flexGrow={0}>
          <Box display="flex" flexDirection="column">
            <Box p={1} flexGrow={1}>
              <StyledP>
                {fileType === "AirsideAIRCx" ? "Airside" : "Economizer"}
              </StyledP>
            </Box>
            <Box p={1} flexGrow={1}>
              <div style={{ width: "100%", display: "inline-block" }}>
                <p
                  style={{
                    color: "#858585",
                    display: "inline-block",
                    paddingRight: "10px",
                  }}
                >
                  {masterDriverContext.masterDriver.name}
                </p>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={handleReUpload}
                  style={{
                    display: "inline-block",
                    borderRadius: "0px",
                  }}
                >
                  RE-UPLOAD
                </Button>
              </div>
            </Box>
            <Box p={1} flexGrow={1}>
              <div style={{ width: "100%", display: "inline-blick" }}>
                <p
                  style={{
                    color: "#858585",
                    display: "inline-block",
                    paddingRight: "10px",
                  }}
                >
                  {fileName.length > 1
                    ? fileName
                    : fileType === "AirsideAIRCx"
                    ? "DefaultAirside"
                    : "DefaultEconomizer"}
                </p>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={handleReUpload}
                  style={{
                    display: "inline-block",
                    borderRadius: "0px",
                  }}
                >
                  RE-UPLOAD
                </Button>
              </div>
            </Box>
          </Box>
        </Box>
        <Box p={1} flexGrow={1} style={{ padding: 0 }}>
          <StyledDivConfig>
            <h3 style={{ textAlign: "center" }}>Configuration Areas</h3>
          </StyledDivConfig>
          <List>
            <StyledListItem
              button
              selected={currentPage === "Point Mapping" ? true : false}
              key="pointMapping"
              name="point_mapping"
              onClick={handleCurrentPageClick("Point Mapping")}
            >
              <ListItemText primary="Point Mapping" />
            </StyledListItem>
            <StyledListItem
              button
              selected={currentPage === "Settings" ? true : false}
              key="settings"
              name="settings"
              onClick={handleCurrentPageClick("Settings")}
            >
              <ListItemText primary="Settings" />
            </StyledListItem>
            {threshold}
          </List>
        </Box>
        <Box p={1} alignContent="flex-end" flexGrow={1}>
          <StyledButtonSave
            onClick={() => setOpen(true)}
            variant="contained"
            color="primary"
            startIcon={<SaveIcon></SaveIcon>}
          >
            SAVE AS
          </StyledButtonSave>
        </Box>
      </StyledBoxWrapper>
    </>
  );
};

export default LeftPanel;
