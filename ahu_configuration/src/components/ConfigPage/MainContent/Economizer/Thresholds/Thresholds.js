import React, { useContext } from "react";
import styled from "styled-components";
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Grid,
  Typography,
  Input,
  InputAdornment,
  Slider,
  FormLabel
} from "@material-ui/core";
import { EconThresholdsContext } from "../../../../../context/EconThresholdsContext/EconThresholdsContext";
import ToolTipInfo from "../../Util/ToolTipInfo";

const StyledTypography = styled(Typography)`
  display: flex;
  font-size: 12px;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 50%;
`;

const Threshholds = (props) => {
  const [thresholds, setThresholds] = useContext(EconThresholdsContext);

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

  const handleRadioChange = (event) => {
    if (event.target.value === "false") {
      setThresholds({
        low_supply_fan_threshold: 20.0,
        mat_low_threshold: 50.0,
        mat_high_threshold: 90.0,
        oat_low_threshold: 30.0,
        oat_high_threshold: 100.0,
        rat_low_threshold: 50.0,
        rat_high_threshold: 90.0,
        open_damper_threshold: 80,
        temp_difference_threshold: 4.0,
        oaf_temperature_threshold: 5.0,
        cooling_enabled_threshold: 5.0,
        custom: false,
      });
    } else {
      setThresholds({
        ...thresholds,
        [event.target.name]: true,
      });
    }
  };

  let content = null;

  if (thresholds.custom && thresholds.custom === true) {
    content = (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <StyledTypography color="primary" gutterBottom>
              LOW SUPPLY FAN
            </StyledTypography>
          </Grid>
          <Grid item xs={4}>
            <Input
              name="low_supply_fan_threshold"
              value={
                thresholds.low_supply_fan_threshold
                  ? thresholds.low_supply_fan_threshold
                  : 0
              }
              margin="dense"
              onChange={handleInputChange}
              onBlur={handleBlur(100)}
              inputProps={{
                min: 0,
                max: 100,
                type: "number",
              }}
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
            />
          </Grid>
          <Grid item xs={12}>
            <Slider
              name="low_supply_fan_threshold"
              value={
                thresholds.low_supply_fan_threshold
                  ? thresholds.low_supply_fan_threshold
                  : 0
              }
              onChange={handleSliderChange("low_supply_fan_threshold")}
              // marks={[{value:0, label:"Min"},{value:100, label:"Max"}]}
              min={0}
              max={100}
            />
          </Grid>
        </Grid>
        {/* Row 1 */}
        <Grid container spacing={3}>
          <Grid item xs={6} container spacing={3}>
            <Grid item xs={8}>
              <StyledTypography color="primary" gutterBottom>
                MIXED-AIR TEMPERATURE LOW
                <ToolTipInfo fieldName="mat_low_threshold" />
              </StyledTypography>
            </Grid>
            <Grid item xs={4}>
              <Input
                name="mat_low_threshold"
                value={
                  thresholds.mat_low_threshold
                    ? thresholds.mat_low_threshold
                    : 50
                }
                margin="dense"
                onChange={handleInputChange}
                onBlur={handleBlur(40, 60)}
                inputProps={{
                  min: 40,
                  max: 60,
                  type: "number",
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <sup>°</sup>
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Slider
                name="mat_low_threshold"
                value={
                  thresholds.mat_low_threshold
                    ? thresholds.mat_low_threshold
                    : 50
                }
                onChange={handleSliderChange("mat_low_threshold")}
                // marks={[{value:40, label:"Min"},{value:60, label:"Max"}]}
                min={40}
                max={60}
              />
            </Grid>
          </Grid>
          <Grid item xs={6} container spacing={3}>
            <Grid item xs={8}>
              <StyledTypography color="primary" gutterBottom>
                MIXED-AIR TEMPERATURE HIGH
                <ToolTipInfo fieldName="mat_high_threshold" />
              </StyledTypography>
            </Grid>
            <Grid item xs={4}>
              <Input
                name="mat_high_threshold"
                value={
                  thresholds.mat_high_threshold
                    ? thresholds.mat_high_threshold
                    : 85
                }
                margin="dense"
                onChange={handleInputChange}
                onBlur={handleBlur(80, 90)}
                inputProps={{
                  min: 80,
                  max: 90,
                  type: "number",
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <sup>°</sup>
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Slider
                name="mat_high_threshold"
                value={
                  thresholds.mat_high_threshold
                    ? thresholds.mat_high_threshold
                    : 85
                }
                onChange={handleSliderChange("mat_high_threshold")}
                // marks={[{value:80, label:"Min"},{value:90, label:"Max"}]}
                min={80}
                max={90}
              />
            </Grid>
          </Grid>
        </Grid>
        {/* Row 2 */}
        <Grid container spacing={3}>
          <Grid item xs={6} container spacing={3}>
            <Grid item xs={8}>
              <StyledTypography color="primary" gutterBottom>
                OUTSIDE-AIR TEMPERATURE LOW
                <ToolTipInfo fieldName="oat_low_threshold" />
              </StyledTypography>
            </Grid>
            <Grid item xs={4}>
              <Input
                name=" oat_low_threshold"
                value={
                  thresholds.oat_low_threshold
                    ? thresholds.oat_low_threshold
                    : 30
                }
                margin="dense"
                onChange={handleInputChange}
                onBlur={handleBlur(20, 40)}
                inputProps={{
                  min: 20,
                  max: 40,
                  type: "number",
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <sup>°</sup>
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Slider
                name="oat_low_threshold"
                value={
                  thresholds.oat_low_threshold
                    ? thresholds.oat_low_threshold
                    : 30
                }
                onChange={handleSliderChange("oat_low_threshold")}
                // marks={[{value:20, label:"Min"},{value:40, label:"Max"}]}
                min={20}
                max={40}
              />
            </Grid>
          </Grid>
          <Grid item xs={6} container spacing={3}>
            <Grid item xs={8}>
              <StyledTypography color="primary" gutterBottom>
                OUTSIDE-AIR TEMPERATURE HIGH
                <ToolTipInfo fieldName="oat_high_threshold" />
              </StyledTypography>
            </Grid>
            <Grid item xs={4}>
              <Input
                name="oat_high_threshold"
                value={
                  thresholds.oat_high_threshold
                    ? thresholds.oat_high_threshold
                    : 0
                }
                margin="dense"
                onChange={handleInputChange}
                onBlur={handleBlur(107)}
                inputProps={{
                  min: 90,
                  max: 125,
                  type: "number",
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <sup>°</sup>
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Slider
                name="oat_high_threshold"
                value={
                  thresholds.oat_high_threshold
                    ? thresholds.oat_high_threshold
                    : 107
                }
                onChange={handleSliderChange("oat_high_threshold")}
                // marks={[{value:90, label:"Min"},{value:125, label:"Max"}]}
                min={90}
                max={125}
              />
            </Grid>
          </Grid>
        </Grid>
        {/* Row 3 */}
        <Grid container spacing={3}>
          <Grid item xs={6} container spacing={3}>
            <Grid item xs={8}>
              <StyledTypography color="primary" gutterBottom>
                RETURN-AIR TEMPERATURE LOW
                <ToolTipInfo fieldName="rat_low_threshold" />
              </StyledTypography>
            </Grid>
            <Grid item xs={4}>
              <Input
                name="rat_low_threshold"
                value={
                  thresholds.rat_low_threshold
                    ? thresholds.rat_low_threshold
                    : 50
                }
                margin="dense"
                onChange={handleInputChange}
                onBlur={handleBlur(40, 60)}
                inputProps={{
                  min: 40,
                  max: 60,
                  type: "number",
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <sup>°</sup>
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Slider
                name="rat_low_threshold"
                value={
                  thresholds.rat_low_threshold
                    ? thresholds.rat_low_threshold
                    : 50
                }
                onChange={handleSliderChange("rat_low_threshold")}
                // marks={[{value:40, label:"Min"},{value:60, label:"Max"}]}
                min={40}
                max={60}
              />
            </Grid>
          </Grid>
          <Grid item xs={6} container spacing={3}>
            <Grid item xs={8}>
              <StyledTypography color="primary" gutterBottom>
                RETURN-AIR TEMPERATURE HIGH
                <ToolTipInfo fieldName="rat_high_threshold" />
              </StyledTypography>
            </Grid>
            <Grid item xs={4}>
              <Input
                name="rat_high_threshold"
                value={
                  thresholds.rat_high_threshold
                    ? thresholds.rat_high_threshold
                    : 85
                }
                margin="dense"
                onChange={handleInputChange}
                onBlur={handleBlur(80, 90)}
                inputProps={{
                  min: 80,
                  max: 90,
                  type: "number",
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <sup>°</sup>
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Slider
                name="rat_high_threshold"
                value={
                  thresholds.rat_high_threshold
                    ? thresholds.rat_high_threshold
                    : 85
                }
                onChange={handleSliderChange("rat_high_threshold")}
                // marks={[{value:80, label:"Min"},{value:90, label:"Max"}]}
                min={80}
                max={90}
              />
            </Grid>
          </Grid>
        </Grid>
        {/* Row 4 */}
        <Grid container spacing={3}>
          <Grid item xs={6} container spacing={3}>
            <Grid item xs={8}>
              <StyledTypography color="primary" gutterBottom>
                TEMPERATURE DIFFERENCE THRESHOLD
                <ToolTipInfo fieldName="temp_difference_threshold" />
              </StyledTypography>
            </Grid>
            <Grid item xs={4}>
              <Input
                name="temp_difference_threshold"
                value={thresholds.temp_difference_threshold}
                margin="dense"
                onChange={handleInputChange}
                onBlur={handleBlur(2, 6)}
                inputProps={{
                  min: 2,
                  max: 6,
                  type: "number",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Slider
                name="temp_difference_threshold"
                value={thresholds.temp_difference_threshold}
                onChange={handleSliderChange("temp_difference_threshold")}
                // marks={[{value:2, label:"Min"},{value:6, label:"Max"}]}
                min={2}
                max={6}
              />
            </Grid>
          </Grid>
          <Grid item xs={6} container spacing={3}>
            <Grid item xs={8}>
              <StyledTypography color="primary" gutterBottom>
                OPEN DAMPER THRESHOLD
                <ToolTipInfo fieldName="open_damper_threshold" />
              </StyledTypography>
            </Grid>
            <Grid item xs={4}>
              <Input
                name="open_damper_threshold"
                value={thresholds.open_damper_threshold}
                margin="dense"
                onChange={handleInputChange}
                onBlur={handleBlur(60, 90)}
                inputProps={{
                  min: 60,
                  max: 90,
                  type: "number",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Slider
                name="rat_high_threshold"
                value={thresholds.open_damper_threshold}
                onChange={handleSliderChange("open_damper_threshold")}
                // marks={[{value:60, label:"Min"},{value:90, label:"Max"}]}
                min={60}
                max={90}
              />
            </Grid>
          </Grid>
        </Grid>
        {/* Row 5 */}
        <Grid container spacing={3}>
          <Grid item xs={6} container spacing={3}>
            <Grid item xs={8}>
              <StyledTypography color="primary" gutterBottom>
                OAF TEMPERATURE THRESHOLD
                <ToolTipInfo fieldName="oaf_temperature_threshold" />
              </StyledTypography>
            </Grid>
            <Grid item xs={4}>
              <Input
                name="oaf_temperature_threshold"
                value={thresholds.oaf_temperature_threshold}
                margin="dense"
                onChange={handleInputChange}
                onBlur={handleBlur(5, 15)}
                inputProps={{
                  min: 5,
                  max: 15,
                  type: "number",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Slider
                name="oaf_temperature_threshold"
                value={thresholds.oaf_temperature_threshold}
                onChange={handleSliderChange("oaf_temperature_threshold")}
                // marks={[{value:5, label:"Min"},{value:15, label:"Max"}]}
                min={5}
                max={15}
              />
            </Grid>
          </Grid>
          <Grid item xs={6} container spacing={3}>
            <Grid item xs={8}>
              <StyledTypography color="primary" gutterBottom>
                COOLING ENABLED THRESHOLD
                <ToolTipInfo fieldName="cooling_enabled_threshold" />
              </StyledTypography>
            </Grid>
            <Grid item xs={4}>
              <Input
                name="cooling_enabled_threshold"
                value={thresholds.cooling_enabled_threshold}
                margin="dense"
                onChange={handleInputChange}
                onBlur={handleBlur(5, 50)}
                inputProps={{
                  min: 5,
                  max: 50,
                  type: "number",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Slider
                name="cooling_enabled_threshold"
                value={thresholds.cooling_enabled_threshold}
                onChange={handleSliderChange("cooling_enabled_threshold")}
                // marks={[{value:5, label:"Min"},{value:50, label:"Max"}]}
                min={5}
                max={50}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }

  return (
    <>
      <div>
      <StyledFormControl component="fieldset">
          <FormLabel
            style={{ color: "#0c9a6f", display: "flex", fontSize: "12px" }}
          >
            SENSITIVITY
            <ToolTipInfo fieldName="sensitivity" />
          </FormLabel>
          <RadioGroup
            name="custom"
            value={thresholds.custom}
            onChange={handleRadioChange}
            row
          >
            <FormControlLabel
              value={false}
              control={<Radio color="primary" />}
              label="Default(recommended)"
              labelPlacement="end"
            />
            <FormControlLabel
              value={true}
              control={<Radio color="primary" />}
              label="Custom"
              labelPlacement="end"
            />
          </RadioGroup>
        </StyledFormControl>
      </div>
      {content}
    </>
  );
};

export default Threshholds;
