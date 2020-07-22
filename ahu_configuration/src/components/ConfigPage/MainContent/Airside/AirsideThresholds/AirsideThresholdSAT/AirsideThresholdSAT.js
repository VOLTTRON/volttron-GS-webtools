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


const AirsideThresholdSAT = (props) => {
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
          {/* Row 1 */}
          <Grid item xs={12} container spacing={3}>
            <Grid item xs={9}>
              <StyledTypography color="primary" gutterBottom>PERCENT REHEAT THRESHOLD<ToolTipInfo fieldName="percent_reheat_thr" /></StyledTypography>
            </Grid>
            <Grid item xs={3}>
              <Input
                name="percent_reheat_thr"
                value={thresholds.percent_reheat_thr ? thresholds.percent_reheat_thr : 25.0}
                margin="dense"
                onChange={handleInputChange}
                onBlur={handleBlur(10, 40)}
                inputProps={{
                  min: 10,
                  max: 40,
                  type: "number",
                }}
                endAdornment={
                  <InputAdornment position="end">%</InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Slider
                name="percent_reheat_thr"
                value={thresholds.percent_reheat_thr ? thresholds.percent_reheat_thr : 25.0}
                onChange={handleSliderChange("percent_reheat_thr")}
                // marks={[{value:10, label:"Min"},{value:40, label:"Max"}]}
                min={10}
                max={40}
              />
            </Grid>
          </Grid>
          {/* Row 2 */}
          <Grid item xs={12} container spacing={3}>
            <Grid item xs={9}>
              <StyledTypography color="primary" gutterBottom>REHEAT ON<ToolTipInfo fieldName="rht_on_thr" /></StyledTypography>
            </Grid>
            <Grid item xs={3}>
              <Input
                name="rht_on_thr"
                value={thresholds.rht_on_thr ? thresholds.rht_on_thr :10}
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
                name="rht_on_thr"
                value={thresholds.rht_on_thr ? thresholds.rht_on_thr : 10}
                onChange={handleSliderChange("rht_on_thr")}
                // marks={[{value:5, label:"Min"},{value:30, label:"Max"}]}
                min={5}
                max={30}
              />
            </Grid>
          </Grid>
          {/* Row 3 */}
          <Grid item xs={12} container spacing={3}>
            <Grid item xs={9}>
              <StyledTypography color="primary" gutterBottom>SUPPLY AIR-TEMPERATURE HIGH DAMPER<ToolTipInfo fieldName="sat_high_damper_thr" /></StyledTypography>
            </Grid>
            <Grid item xs={3}>
              <Input
                name="sat_high_damper_thr"
                value={thresholds.sat_high_damper_thr ? thresholds.sat_high_damper_thr : 80}
                margin="dense"
                onChange={handleInputChange}
                onBlur={handleBlur(70, 90)}
                inputProps={{
                  min: 70,
                  max: 90,
                  type: "number",
                }}
                endAdornment={
                  <InputAdornment position="end">%</InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Slider
                name="sat_high_damper_thr"
                value={thresholds.sat_high_damper_thr ? thresholds.sat_high_damper_thr : 80}
                onChange={handleSliderChange("sat_high_damper_thr")}
                // marks={[{value:70, label:"Min"},{value:90, label:"Max"}]}
                min={70}
                max={90}
              />
            </Grid>
          </Grid>
          {/* Row 4 */}
          <Grid item xs={12} container spacing={3}>
            <Grid item xs={9}>
              <StyledTypography color="primary" gutterBottom>PERCENT DAMPER<ToolTipInfo fieldName="percent_damper_thr" /></StyledTypography>
            </Grid>
            <Grid item xs={3}>
              <Input
                name="percent_damper_thr"
                value={thresholds.percent_damper_thr ? thresholds.percent_damper_thr : 60}
                margin="dense"
                onChange={handleInputChange}
                onBlur={handleBlur(45, 75)}
                inputProps={{
                  min: 45,
                  max: 75,
                  type: "number",
                }}
                endAdornment={
                  <InputAdornment position="end">%</InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Slider
                name="percent_damper_thr"
                value={thresholds.percent_damper_thr ? thresholds.percent_damper_thr : 60}
                onChange={handleSliderChange("percent_damper_thr")}
                // marks={[{value:45, label:"Min"},{value:75, label:"Max"}]}
                min={45}
                max={75}
              />
            </Grid>
          </Grid>
          {/* Row 5 */}
          <Grid item xs={12} container spacing={3}>
            <Grid item xs={9}>
              <StyledTypography color="primary" gutterBottom>REHEAT VALVE<ToolTipInfo fieldName="reheat_valve_thr" /></StyledTypography>
            </Grid>
            <Grid item xs={3}>
              <Input
                name="reheat_valve_thr"
                value={thresholds.reheat_valve_thr ? thresholds.reheat_valve_thr : 50}
                margin="dense"
                onChange={handleInputChange}
                onBlur={handleBlur(25, 75)}
                inputProps={{
                  min: 25,
                  max: 75,
                  type: "number",
                }}
                endAdornment={
                  <InputAdornment position="end">%</InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Slider
                name="reheat_valve_thr"
                value={thresholds.reheat_valve_thr ? thresholds.reheat_valve_thr : 50}
                onChange={handleSliderChange("reheat_valve_thr")}
                // marks={[{value:25, label:"Min"},{value:75, label:"Max"}]}
                min={25}
                max={75}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default AirsideThresholdSAT;
