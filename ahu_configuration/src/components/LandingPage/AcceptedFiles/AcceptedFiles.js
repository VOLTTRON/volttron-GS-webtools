import React from "react";
import {
  StyledH2,
  StyledDivEconomizer,
  StyledDivAirside,
  StyledPFileType,
  StyledPTypeText,
  StyledWrapper,
} from "./_style";

const AcceptedFiles = (props) => {
  return (
    <div className={props.className}>
      <StyledH2>Accepted Files</StyledH2>
      <StyledWrapper>
        <StyledDivEconomizer>
          <StyledPFileType>Economizer</StyledPFileType>
          <StyledPTypeText>
            The economizer controls AIRCx processes use a decision-tree
            structure derived from engineering principles to detect and diagnose
            problems with outdoor-air ventilation and economizer operations.
          </StyledPTypeText>
        </StyledDivEconomizer>
        <StyledDivAirside>
          <StyledPFileType>Airside</StyledPFileType>
          <StyledPTypeText>
            The air-side AIRCx (automated identification of retro-commissioning
            measures) processes use a decision-tree structure to detect,
            diagnose, and automatically provide corrective actions for the
            energy saving opportunities associated with an AHU’s operation.
          </StyledPTypeText>
        </StyledDivAirside>
      </StyledWrapper>
    </div>
  );
};

export default AcceptedFiles;
