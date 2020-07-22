import React, { useContext } from "react";
import styled from "styled-components";
import {
  Grid,
  Typography,
  Input,
  InputAdornment,
  Slider,
} from "@material-ui/core";
import ToolTipInfo from "../../../Util/ToolTipInfo";
import { AirsideThresholdsContext } from "../../../../../../context/AirsideThresholdsContext/AirsideThresholdsContext";

const StyledTypography = styled(Typography)`
  display: flex;
  font-size: 12px;
`;

const AirsideThresholdStatic = (props) => {
  const [thresholds, setThresholds] = useContext(AirsideThresholdsContext);

  const handleInputChange = (event) => {
    event.target.value === ""
      ? setThresholds({
          ...thresholds,
          [event.target.name]: 0,
        })
      : setThresholds({
          ...thresholds,
          [event.target.name]: Number(event.target.value),
        });
  };

  const handleBlur = (min, max) => (event) => {
    if (event.target.value === undefined) {
      return;
    }
    if (event.target.value < min) {
      setThresholds({
        ...thresholds,
        [event.target.name]: min,
      });
    } else if (event.target.value > max) {
      setThresholds({
        ...thresholds,
        [event.target.name]: max,
      });
    }
  };

  const handleSliderChange = (sliderName) => (event, newValue) => {
    setThresholds({
      ...thresholds,
      [sliderName]: Number([newValue]),
    });
  };

  return (
    <>
      <div>
        <Grid container spacing={3}>
          <Grid container spacing={3}>
            <Grid item xs={6} container spacing={3} style={{paddingLeft: "25px"}}>
              <Grid item xs={6}>
                <StyledTypography color="primary" gutterBottom>LOW SUPPLY FAN<ToolTipInfo fieldName="low_sf_thr" /></StyledTypography>
              </Grid>
              <Grid item xs={6}>
                <Input
                  name="low_sf_thr"
                  value={thresholds.low_sf_thr ? thresholds.low_sf_thr : 20}
                  margin="dense"
                  onChange={handleInputChange}
                  onBlur={handleBlur(5, 30)}
                  inputProps={{
                    min: 5,
                    max: 30,
                    type: "number",
                  }}
                  endAdornment={
                    <InputAdornment position="end">%</InputAdornment>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Slider
                  name="low_sf_thr"
                  value={thresholds.low_sf_thr ? thresholds.low_sf_thr : 20}
                  onChange={handleSliderChange("low_sf_thr")}
                  // marks={[{value:5, label:"Min"},{value:30, label:"Max"}]}
                  min={5}
                  max={30}
                />
              </Grid>
            </Grid>
            <Grid item xs={6} container spacing={3}>
              <Grid item xs={6}>
                <StyledTypography color="primary" gutterBottom>HIGH SUPPLY FAN<ToolTipInfo fieldName="high_sf_thr" /></StyledTypography>
              </Grid>
              <Grid item xs={6}>
                <Input
                  name="high_sf_thr"
                  value={thresholds.high_sf_thr ? thresholds.high_sf_thr : 90}
                  margin="dense"
                  onChange={handleInputChange}
                  onBlur={handleBlur(60, 100)}
                  inputProps={{
                    min: 60,
                    max: 100,
                    type: "number",
                  }}
                  endAdornment={
                    <InputAdornment position="end">%</InputAdornment>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Slider
                  name="high_sf_thr"
                  value={thresholds.high_sf_thr ? thresholds.high_sf_thr : 90}
                  onChange={handleSliderChange("high_sf_thr")}
                  // marks={[{value:60, label:"Min"},{value:100, label:"Max"}]}
                  min={60}
                  max={100}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={6} container spacing={3} tyle={{paddingLeft:"25px"}}>
              <Grid item xs={6}>
                <StyledTypography color="primary" gutterBottom>ZONE LOW DAMPER<ToolTipInfo fieldName="zn_low_damper_thr" /></StyledTypography>
              </Grid>
              <Grid item xs={6}>
                <Input
                  name="zn_low_damper_thr"
                  value={
                    thresholds.zn_low_damper_thr
                      ? thresholds.zn_low_damper_thr
                      : 10
                  }
                  margin="dense"
                  onChange={handleInputChange}
                  onBlur={handleBlur(0, 35)}
                  inputProps={{
                    min: 0,
                    max: 35,
                    type: "number",
                  }}
                  endAdornment={
                    <InputAdornment position="end">%</InputAdornment>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Slider
                  name="zn_low_damper_thr"
                  value={
                    thresholds.zn_low_damper_thr
                      ? thresholds.zn_low_damper_thr
                      : 10
                  }
                  onChange={handleSliderChange("zn_low_damper_thr")}
                  // marks={[{value:0, label:"Min"},{value:35, label:"Max"}]}
                  min={0}
                  max={35}
                />
              </Grid>
            </Grid>
            <Grid item xs={6} container spacing={3}>
              <Grid item xs={6}>
                <StyledTypography color="primary" gutterBottom>ZONE HIGH DAMPER<ToolTipInfo fieldName="zn_high_damper_thr" /></StyledTypography>
              </Grid>
              <Grid item xs={6}>
                <Input
                  name="zn_high_damper_thr"
                  value={
                    thresholds.high_sf_thr ? thresholds.zn_high_damper_thr : 70
                  }
                  margin="dense"
                  onChange={handleInputChange}
                  onBlur={handleBlur(70, 100)}
                  inputProps={{
                    min: 70,
                    max: 100,
                    type: "number",
                  }}
                  endAdornment={
                    <InputAdornment position="end">%</InputAdornment>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Slider
                  name="zn_high_damper_thr"
                  value={
                    thresholds.zn_high_damper_thr
                      ? thresholds.zn_high_damper_thr
                      : 70
                  }
                  onChange={handleSliderChange("zn_high_damper_thr")}
                  // marks={[{value:70, label:"Min"},{value:100, label:"Max"}]}
                  min={70}
                  max={100}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} container spacing={3}>
            <Grid item xs={8}>
              <StyledTypography color="primary" gutterBottom>
                HIGH DUCT STATIC PRESSURE ZONE DAMPER
              <ToolTipInfo fieldName="hdzn_damper_thr" /></StyledTypography>
            </Grid>
            <Grid item xs={4}>
              <Input
                name="hdzn_damper_thr"
                value={
                  thresholds.hdzn_damper_thr ? thresholds.hdzn_damper_thr : 30
                }
                margin="dense"
                onChange={handleInputChange}
                onBlur={handleBlur(20, 50)}
                inputProps={{
                  min: 20,
                  max: 50,
                  type: "number",
                }}
                endAdornment={
                  <InputAdornment position="end">%</InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Slider
                name="hdzn_damper_thr"
                value={
                  thresholds.hdzn_damper_thr ? thresholds.hdzn_damper_thr : 30
                }
                onChange={handleSliderChange("hdzn_damper_thr")}
                // marks={[{value:20, label:"Min"},{value:50, label:"Max"}]}
                min={20}
                max={50}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default AirsideThresholdStatic;
