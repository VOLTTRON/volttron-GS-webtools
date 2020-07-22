import React, { useContext } from "react";
import { AppBar, Toolbar, Icon } from "@material-ui/core";
import LandingPage from "../LandingPage/LandingPage";
import ConfigPage from "../ConfigPage/ConfigPage";
import { MasterDriverContext } from "../../context/MasterDriverContext/MasterDriverContext";
import { AHUContext } from "../../context/AHUContext/AHUContext";
import { verifyLocation } from "../../components/LandingPage/Utils/Util";
import AHUIcon from "../../assets/icons/AHUIcon.PNG";
import {StyledDivWrapper, StyledTypographyTitle, StyledDivLogoWrapper, StyledDivContent} from "./_style"

const Layout = (props) => {
  const masterDriverContext = useContext(MasterDriverContext);
  const ahuContext = useContext(AHUContext);
  const [fileType, setFileType] = ahuContext.fileType;

  let content = <LandingPage></LandingPage>;
  if (fileType.length) {
    const locationList = verifyLocation(masterDriverContext);
    content = <ConfigPage locationListProp={locationList}></ConfigPage>;
  }

  return (
    <>
      <StyledDivWrapper>
        <AppBar position="static">
          <Toolbar style={{ backgroundColor: "#1F1F1F" }}>
            <StyledDivLogoWrapper>
              <Icon style={{cursor: "pointer"}}>
                <img onClick={() => {window.location.reload()}} src={AHUIcon} height={30} width={30} alt="logo" />
              </Icon>
            </StyledDivLogoWrapper>
            <div>
              <StyledTypographyTitle variant="h6"  onClick={() => {window.location.reload()}}>
                AHU Configuration
              </StyledTypographyTitle>
            </div>
          </Toolbar>
        </AppBar>
      </StyledDivWrapper>
      <StyledDivContent>
      {content}
      </StyledDivContent>
    </>
  );
};

export default Layout;
