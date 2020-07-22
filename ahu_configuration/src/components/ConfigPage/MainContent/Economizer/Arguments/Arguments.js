import React, { useContext } from "react";
import styled from "styled-components";
import {
  Slider,
  Input,
  Grid,
  InputAdornment,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { EconArgumentsContext } from "../../../../../context/EconArgumentsContext/EconArgumentsContext";
import ToolTipInfo from "../../Util/ToolTipInfo";

const StyledTypography = styled(Typography)`
  display: flex;
  font-size: 12px;
`;

const Arguments = (props) => {
  const econArgumentsContext = useContext(EconArgumentsContext);
  const [argument, setArgument] = econArgumentsContext;

  const handleSliderChange = (sliderName) => (event, newValue) => {
    setArgument({
      ...argument,
      [sliderName]: Number([newValue]),
    });
  };

  const handleInputChange = (event) => {
    event.target.value === ""
      ? setArgument({
          ...argument,
          [event.target.name]: 0,
        })
      : setArgument({
          ...argument,
          [event.target.name]: Number(event.target.value),
        });
  };

  const handleBlur = (min, max) => (event) => {
    if (event.target.value === undefined) {
      return;
    }
    if (event.target.value < min) {
      setArgument({
        ...argument,
        [event.target.name]: min,
      });
    } else if (event.target.value > max) {
      setArgument({
        ...argument,
        [event.target.name]: max,
      });
    }
  };

  const handleRadioChange = (event) => {
    if (event.target.name === "economizer_type" && event.target.value === "DDB") {
      const newArgument = {...argument};
      newArgument["econ_hl_temp"] = 65.0;
      newArgument["economizer_type"] = event.target.value;
      setArgument(newArgument);
    } else {
      setArgument({
        ...argument,
        [event.target.name]: event.target.value,
      });
    }
  };

  return (
    <>
      {/* Radio buttons */}
      <Grid container spacing={3}>
        <Grid item xs={6} container spacing={3}>
          <Grid item xs={12}>
            <StyledTypography color="primary">
              DEVICE TYPE
              <ToolTipInfo fieldName="device_type" />
            </StyledTypography>
            <FormControl component="fieldset">
              <RadioGroup
                name="device_type"
                value={argument.device_type}
                onChange={handleRadioChange}
                row
              >
                <FormControlLabel
                  value="ahu"
                  control={<Radio color="primary" />}
                  label="AHU"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="rtu"
                  control={<Radio color="primary" />}
                  label="RTU"
                  labelPlacement="end"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={6} container spacing={3}>
          <Grid item xs={12}>
            <StyledTypography color="primary">
              Economizer Type
              <ToolTipInfo fieldName="economizer_type" />
            </StyledTypography>
            <FormControl component="fieldset">
              <RadioGroup
                name="economizer_type"
                value={argument.economizer_type}
                onChange={handleRadioChange}
                row
              >
                <FormControlLabel
                  value="DDB"
                  control={<Radio color="primary" />}
                  label="DDB"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="HL"
                  control={<Radio color="primary" />}
                  label="HL"
                  labelPlacement="end"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {argument.economizer_type === "HL" ? (
          <>
            <Grid item xs={8}>
              <StyledTypography color="primary" gutterBottom>
                ECONOMIZER SWITCHOVER SETPOINT:
                <ToolTipInfo fieldName="econ_hl_temp" />
              </StyledTypography>
            </Grid>
            <Grid item xs={4}>
              <Input
                name="econ_hl_temp"
                value={argument.econ_hl_temp}
                margin="dense"
                onChange={handleInputChange}
                onBlur={handleBlur(60, 80)}
                inputProps={{
                  min: 60,
                  max: 80,
                  type: "number",
                }}
                endAdornment={
                  <InputAdornment position="end">°</InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Slider
                name="econ_hl_temp"
                value={argument.econ_hl_temp}
                onChange={handleSliderChange("econ_hl_temp")}
                // marks={[{value:0, label:"Min"},{value:60, label:"Max"}]}
                min={60}
                max={80}
              />
            </Grid>
          </>
        ) : null}

        <Grid item xs={8}>
          <StyledTypography color="primary" gutterBottom>
            DATA WINDOW:
            <ToolTipInfo fieldName="data_window" />
          </StyledTypography>
        </Grid>
        <Grid item xs={4}>
          <Input
            name="data_window"
            value={argument.data_window}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur(0, 60)}
            inputProps={{
              min: 0,
              max: 60,
              type: "number",
            }}
            endAdornment={<InputAdornment position="end">min</InputAdornment>}
          />
        </Grid>
        <Grid item xs={12}>
          <Slider
            name="data_window"
            value={argument.data_window}
            onChange={handleSliderChange("data_window")}
            // marks={[{value:0, label:"Min"},{value:60, label:"Max"}]}
            min={0}
            max={60}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <StyledTypography color="primary" gutterBottom>
            NUMBER REQUIRED DATA:
            <ToolTipInfo fieldName="no_required_data" />
          </StyledTypography>
        </Grid>
        <Grid item xs={4}>
          <Input
            name="no_required_data"
            value={argument.no_required_data}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur(0, 20)}
            inputProps={{
              min: 0,
              max: 20,
              type: "number",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Slider
            name="no_required_data"
            value={argument.no_required_data}
            onChange={handleSliderChange("no_required_data")}
            // marks={[{value:0, label:"Min"},{value:20, label:"Max"}]}
            min={0}
            max={20}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <StyledTypography color="primary" gutterBottom>
            DESIRED OUTDOOR AIR FRACTION:
            <ToolTipInfo fieldName="desired_oaf" />
          </StyledTypography>
        </Grid>
        <Grid item xs={4}>
          <Input
            name="desired_oaf"
            value={argument.desired_oaf}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur(5, 30)}
            inputProps={{
              min: 5,
              max: 30,
              type: "number",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Slider
            name="desired_oaf"
            value={argument.desired_oaf}
            onChange={handleSliderChange("desired_oaf")}
            min={5}
            max={30}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <StyledTypography color="primary" gutterBottom>
            OPEN DAMPER TIME:
            <ToolTipInfo fieldName="open_damper_time" />
          </StyledTypography>
        </Grid>
        <Grid item xs={4}>
          <Input
            name="open_damper_time"
            value={argument.open_damper_time}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur(0, 60)}
            inputProps={{
              min: 0,
              max: 60,
              type: "number",
            }}
            endAdornment={<InputAdornment position="end">min</InputAdornment>}
          />
        </Grid>
        <Grid item xs={12}>
          <Slider
            name="open_damper_time"
            value={argument.open_damper_time}
            onChange={handleSliderChange("open_damper_time")}
            // marks={[{value:0, label:"Min"},{value:60, label:"Max"}]}
            min={0}
            max={60}
          />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={8}>
          <StyledTypography color="primary" gutterBottom>
            MINIMUM DAMPER SETPOINT:
            <ToolTipInfo fieldName="minimum_damper_setpoint" />
          </StyledTypography>
        </Grid>
        <Grid item xs={4}>
          <Input
            name="minimum_damper_setpoint"
            value={argument.minimum_damper_setpoint}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur(0, 50)}
            inputProps={{
              min: 0,
              max: 50,
              type: "number",
            }}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
          />
        </Grid>
        <Grid item xs={12}>
          <Slider
            name="minimum_damper_setpoint"
            value={argument.minimum_damper_setpoint}
            onChange={handleSliderChange("minimum_damper_setpoint")}
            // marks={[{value:0, label:"Min"},{value:50, label:"Max"}]}
            min={0}
            max={50}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <StyledTypography color="primary" gutterBottom>
            RATED CUBIC FEET PER MINUTE:
            <ToolTipInfo fieldName="rated_cfm" />
          </StyledTypography>
        </Grid>
        <Grid item xs={4}>
          <Input
            name="rated_cfm"
            value={argument.rated_cfm}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur(0, 30000)}
            inputProps={{
              min: 0,
              max: 30000,
              type: "number",
            }}
            endAdornment={<InputAdornment position="end">CFM</InputAdornment>}
          />
        </Grid>
        <Grid item xs={12}>
          <Slider
            name="rated_cfm"
            value={argument.rated_cfm}
            onChange={handleSliderChange("rated_cfm")}
            // marks={[{value:0, label:"Min"},{value:6000, label:"Max"}]}
            min={0}
            max={6000}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <StyledTypography color="primary" gutterBottom>
            ENERGY EFFICIENCY RATIO:
            <ToolTipInfo fieldName="eer" />
          </StyledTypography>
        </Grid>
        <Grid item xs={4}>
          <Input
            name="eer"
            value={argument.eer}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur(1, 15)}
            inputProps={{
              min: 1,
              max: 15,
              type: "number",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Slider
            name="eer"
            value={argument.eer}
            onChange={handleSliderChange("eer")}
            // marks={[{value:1, label:"Min"},{value:15, label:"Max"}]}
            min={1}
            max={15}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <StyledTypography color="primary" gutterBottom>
            TEMPERATURE DEADBAND:
            <ToolTipInfo fieldName="temp_band" />
          </StyledTypography>
        </Grid>
        <Grid item xs={4}>
          <Input
            name="temp_band"
            value={argument.temp_band}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur(0.5, 10)}
            inputProps={{
              min: 0.5,
              max: 10,
              type: "number",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Slider
            name="temp_band"
            value={argument.temp_band}
            onChange={handleSliderChange("temp_band")}
            // marks={[{value:.5, label:"Min"},{value:10, label:"Max"}]}
            min={0.5}
            max={10}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Arguments;
