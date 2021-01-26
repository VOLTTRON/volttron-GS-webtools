import React, { useContext } from "react";
import styled from "styled-components";
import {
  Slider,
  Input,
  Grid,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Radio,
  FormLabel,
  Typography,
  InputAdornment,
} from "@material-ui/core";
import ToolTipInfo from "../../Util/ToolTipInfo";
import { AirsideArgumentsContext } from "../../../../../context/AirsideArgumentsContext/AirsideArgumentsContext";
import { AirsideThresholdsContext } from "../../../../../context/AirsideThresholdsContext/AirsideThresholdsContext";

const StyledFormControl = styled(FormControl)`
  min-width: 50%;
`;

const StyledTypography = styled(Typography)`
  display: flex;
  font-size: 12px;
`;

const AirsideArgument = (props) => {
  const airsideArgumentsContext = useContext(AirsideArgumentsContext);
  const [argument, setArgument] = airsideArgumentsContext;
  const [thresholds, setThresholds] = useContext(AirsideThresholdsContext);

  // Due to a refactoring of the application where fields were moved from threholds to arguments
  const handleThresholdsInputChange = (event) => {
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

  const handleThresholdsSliderChange = (sliderName) => (event, newValue) => {
    setThresholds({
      ...thresholds,
      [sliderName]: Number([newValue]),
    });
  };

  const handleThresholdsBlur = (min, max) => (event) => {
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

  const handleRadioChange = (event) => {
    let value = "";
    if (event.target.value === "true" || event.target.value === "false") {
      value = event.target.value === "true";
    } else {
      value = event.target.value;
    }
    setArgument({ ...argument, [event.target.name]: value });

    // False auto correct flag set fields to default value
    if (
      event.target.name === "autocorrect_flag" &&
      event.target.value === "false"
    ) {
      const thresholdsClone = { ...thresholds };
      thresholdsClone.sat_retuning = 1.0;
      thresholdsClone.stcpr_retuning = 0.15;
      thresholdsClone.minimum_sat_stpt = 50.0;
      thresholdsClone.maximum_sat_stpt = 75.0;
      thresholdsClone.min_stcpr_stpt = 0.5;
      thresholdsClone.max_stcpr_stpt = 2.5;
      setThresholds(thresholdsClone);
    }
  };

  let autoCorrectFields = null;
  if (argument.autocorrect_flag) {
    autoCorrectFields = (
      <>
        <Grid item xs={12} container spacing={3}>
          <Grid item xs={12} container spacing={3}>
            <Grid item xs={9}>
              <StyledTypography color="primary" gutterBottom>
                SUPPLY AIR-TEMPERATURE RETUNING
                <ToolTipInfo fieldName="sat_retuning" />
              </StyledTypography>
            </Grid>
            <Grid item xs={3}>
              <Input
                name="sat_retuning"
                value={thresholds.sat_retuning ? thresholds.sat_retuning : 1}
                margin="dense"
                onChange={handleThresholdsInputChange}
                onBlur={handleThresholdsBlur(50, 60)}
                inputProps={{
                  step: 0.01,
                  min: 1,
                  max: 3,
                  type: "number",
                }}
                endAdornment={<InputAdornment position="end">°</InputAdornment>}
              />
            </Grid>
            <Grid item xs={12}>
              <Slider
                name="sat_retuning"
                value={thresholds.sat_retuning ? thresholds.sat_retuning : 1}
                onChange={handleThresholdsSliderChange("sat_retuning")}
                step={0.01}
                // marks={[{value:1, label:"Min"},{value:3, label:"Max"}]}
                min={1}
                max={3}
              />
            </Grid>
          </Grid>
          <Grid item xs={9}>
            <StyledTypography color="primary" gutterBottom>
              DUCT-STATIC PRESSURE RETUNING
              <ToolTipInfo fieldName="stcpr_retuning" />
            </StyledTypography>
          </Grid>
          <Grid item xs={3}>
            <Input
              name="stcpr_retuning"
              value={
                thresholds.stcpr_retuning ? thresholds.stcpr_retuning : 0.15
              }
              margin="dense"
              onChange={handleThresholdsInputChange}
              onBlur={handleThresholdsBlur(0.05, 0.25)}
              inputProps={{
                step: 0.01,
                min: 0.05,
                max: 0.25,
                type: "number",
              }}
              endAdornment={
                <InputAdornment position="end">in. wc.</InputAdornment>
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Slider
              name="stcpr_retuning"
              value={
                thresholds.stcpr_retuning ? thresholds.stcpr_retuning : 0.15
              }
              onChange={handleThresholdsSliderChange("stcpr_retuning")}
              step={0.01}
              // marks={[{value:.05, label:"Min"},{value:.25, label:"Max"}]}
              min={0.05}
              max={0.25}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} container spacing={3}>
          <Grid item xs={8}>
            <StyledTypography color="primary" gutterBottom>
              MINIMUM DUCT STATIC PRESSURE SETPOINT
              <ToolTipInfo fieldName="min_stcpr_stpt" />
            </StyledTypography>
          </Grid>
          <Grid item xs={4}>
            <Input
              name="min_stcpr_stpt"
              value={
                thresholds.min_stcpr_stpt ? thresholds.min_stcpr_stpt : 0.5
              }
              margin="dense"
              onChange={handleThresholdsInputChange}
              onBlur={handleThresholdsBlur(0.25, 1)}
              inputProps={{
                step: 0.01,
                min: 0.25,
                max: 1,
                type: "number",
              }}
              endAdornment={
                <InputAdornment position="end">in. wc.</InputAdornment>
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Slider
              name="min_stcpr_stpt"
              value={
                thresholds.min_stcpr_stpt ? thresholds.min_stcpr_stpt : 0.5
              }
              onChange={handleThresholdsSliderChange("min_stcpr_stpt")}
              step={0.01}
              // marks={[{value:.25, label:"Min"},{value:1, label:"Max"}]}
              min={0.25}
              max={1}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} container spacing={3}>
          <Grid item xs={8}>
            <StyledTypography color="primary" gutterBottom>
              MAXIMUM DUCT STATIC PRESSURE SETPOINT
              <ToolTipInfo fieldName="max_stcpr_stpt" />
            </StyledTypography>
          </Grid>
          <Grid item xs={4}>
            <Input
              name="max_stcpr_stpt"
              value={
                thresholds.max_stcpr_stpt ? thresholds.max_stcpr_stpt : 2.5
              }
              margin="dense"
              onChange={handleThresholdsInputChange}
              onBlur={handleThresholdsBlur(0.25, 3)}
              inputProps={{
                step: 0.01,
                min: 0.25,
                max: 3,
                type: "number",
              }}
              endAdornment={
                <InputAdornment position="end">in. wc.</InputAdornment>
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Slider
              name="max_stcpr_stpt"
              value={
                thresholds.max_stcpr_stpt ? thresholds.max_stcpr_stpt : 2.5
              }
              onChange={handleThresholdsSliderChange("max_stcpr_stpt")}
              step={0.01}
              min={0.25}
              max={3}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} container spacing={3}>
          <Grid item xs={9}>
            <StyledTypography color="primary" gutterBottom>
              MINIMUM SUPPLY AIR-TEMPERATURE SETPOINT
              <ToolTipInfo fieldName="minimum_sat_stpt" />
            </StyledTypography>
          </Grid>
          <Grid item xs={3}>
            <Input
              name="minimum_sat_stpt"
              value={
                thresholds.minimum_sat_stpt ? thresholds.minimum_sat_stpt : 50
              }
              margin="dense"
              onChange={handleThresholdsInputChange}
              onBlur={handleThresholdsBlur(50, 60)}
              inputProps={{
                min: 50,
                max: 60,
                type: "number",
              }}
              endAdornment={<InputAdornment position="end">°</InputAdornment>}
            />
          </Grid>
          <Grid item xs={12}>
            <Slider
              name="minimum_sat_stpt"
              value={
                thresholds.minimum_sat_stpt ? thresholds.minimum_sat_stpt : 50
              }
              onChange={handleThresholdsSliderChange("minimum_sat_stpt")}
              // marks={[{value:50, label:"Min"},{value:60, label:"Max"}]}
              min={50}
              max={60}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} container spacing={3}>
          <Grid item xs={9}>
            <StyledTypography color="primary" gutterBottom>
              MAXIMUM SUPPLY AIR-TEMPERATURE SETPOINT
              <ToolTipInfo fieldName="maximum_sat_stpt" />
            </StyledTypography>
          </Grid>
          <Grid item xs={3}>
            <Input
              name="maximum_sat_stpt"
              value={
                thresholds.maximum_sat_stpt ? thresholds.maximum_sat_stpt : 75
              }
              margin="dense"
              onChange={handleThresholdsInputChange}
              onBlur={handleThresholdsBlur(55, 75)}
              inputProps={{
                min: 55,
                max: 75,
                type: "number",
              }}
              endAdornment={<InputAdornment position="end">°</InputAdornment>}
            />
          </Grid>
          <Grid item xs={12}>
            <Slider
              name="maximum_sat_stpt"
              value={
                thresholds.maximum_sat_stpt ? thresholds.maximum_sat_stpt : 75
              }
              onChange={handleThresholdsSliderChange("maximum_sat_stpt")}
              // marks={[{value:55, label:"Min"},{value:75, label:"Max"}]}
              min={55}
              max={75}
            />
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <>
      {/* Radio buttons */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledFormControl component="fieldset">
            <FormLabel
              style={{ color: "#0c9a6f", display: "flex", fontSize: "12px" }}
            >
              AUTOCORRECT FLAG
              <ToolTipInfo fieldName="autocorrect_flag" />
            </FormLabel>
            <RadioGroup
              name="autocorrect_flag"
              value={argument.autocorrect_flag ? true : false}
              onChange={handleRadioChange}
              row
            >
              <FormControlLabel
                value={true}
                control={<Radio color="primary" />}
                label="True"
                labelPlacement="end"
              />
              <FormControlLabel
                value={false}
                control={<Radio color="primary" />}
                label="False"
                labelPlacement="end"
              />
            </RadioGroup>
          </StyledFormControl>
        </Grid>
        {autoCorrectFields}

        </Grid>
        <Grid item xs={12} container spacing={3}>
          <Grid item xs={8}>
            <StyledTypography color="primary" gutterBottom>
              NUMBER REQUIRED DATA
              <ToolTipInfo fieldName="no_required_data" />
            </StyledTypography>
          </Grid>
          <Grid item xs={4}>
            <Input
              name="no_required_data"
              value={
                thresholds.no_required_data ? thresholds.no_required_data : 10
              }
              margin="dense"
              onChange={handleThresholdsInputChange}
              onBlur={handleThresholdsBlur(100)}
              inputProps={{
                min: 1,
                max: 100,
                type: "number",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Slider
              name="no_required_data"
              value={
                thresholds.no_required_data ? thresholds.no_required_data : 10
              }
              onChange={handleThresholdsSliderChange("no_required_data")}
              min={1}
              max={100}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} container spacing={3}>
          <Grid item xs={8}>
            <StyledTypography color="primary" gutterBottom>
              WARM-UP TIME
              <ToolTipInfo fieldName="warm_up_time" />
            </StyledTypography>
          </Grid>
          <Grid item xs={4}>
            <Input
              name="warm_up_time"
              value={thresholds.warm_up_time ? thresholds.warm_up_time : 15}
              margin="dense"
              onChange={handleThresholdsInputChange}
              onBlur={handleThresholdsBlur(5, 30)}
              inputProps={{
                min: 5,
                max: 30,
                type: "number",
              }}
              endAdornment={
                <InputAdornment position="end">minutes</InputAdornment>
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Slider
              name="warm_up_time"
              value={thresholds.warm_up_time ? thresholds.warm_up_time : 15}
              onChange={handleThresholdsSliderChange("warm_up_time")}
              // marks={[{value:5, label:"Min"},{value:30, label:"Max"}]}
              min={5}
              max={30}
            />
          </Grid>
        </Grid>
    </>
  );
};

export default AirsideArgument;
