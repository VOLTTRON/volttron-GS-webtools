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
  Slider,
} from "@material-ui/core";
import ToolTipInfo from "../../Util/ToolTipInfo";
import { AirsideThresholdsContext } from "../../../../../context/AirsideThresholdsContext/AirsideThresholdsContext";
import { AirsideArgumentsContext } from "../../../../../context/AirsideArgumentsContext/AirsideArgumentsContext";

const StyledTypography = styled(Typography)`
  display: flex;
  font-size: 12px;
`;

const AirsideThresholds = (props) => {
  const setExpandThresholds = props.setExpandThresholds;
  const [thresholds, setThresholds] = useContext(AirsideThresholdsContext);
  const airsideArgumentsContext = useContext(AirsideArgumentsContext);
  const [argument, setArgument] = airsideArgumentsContext;

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

  const handleArgumentInputChange = (event) => {
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

  const handleArgumentSliderChange = (sliderName) => (event, newValue) => {
    setArgument({
      ...argument,
      [sliderName]: Number([newValue]),
    });
  };

  const handleSliderChange = (sliderName) => (event, newValue) => {
    setThresholds({
      ...thresholds,
      [sliderName]: Number([newValue]),
    });
  };

  const handleArgumentBlur = (min, max) => (event) => {
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

  const handleDefaultRadioChange = (event) => {
    if (event.target.value === "default") {
      setThresholds({
        no_required_data: 10.0,
        sat_stpt_deviation_thr: 5.0,
        stcpr_stpt_deviation_thr: 20.0,
        sat_reset_thr: 5,
        stcpr_reset_thr: 0.25,
        custom: false,
        // Static
        warm_up_time: 15,
        stcpr_retuning: 0.15,
        max_stcpr_stpt: 2.5,
        low_sf_thr: 20.0,
        high_sf_thr: 95.0,
        zn_low_damper_thr: 10.0,
        zn_high_damper_thr: 90,
        min_stcpr_stpt: 0.5,
        hdzn_damper_thr: 30.0,
        // SAT
        percent_reheat_thr: 25.0,
        rht_on_thr: 10.0,
        sat_high_damper_thr: 80.0,
        percent_damper_thr: 60.0,
        minimum_sat_stpt: 50.0,
        sat_retuning: 1.0,
        reheat_valve_thr: 50.0,
        maximum_sat_stpt: 75.0,
        // Schedule
        unocc_time_thr: 40.0,
        unocc_stp_thr: 0.2,
        monday_sch: ["05:30", "18:30"],
        tuesday_sch: ["05:30", "18:30"],
        wednesday_sch: ["05:30", "18:30"],
        thursday_sch: ["05:30", "18:30"],
        friday_sch: ["05:30", "18:30"],
        saturday_sch: ["00:00", "00:00"],
        sunday_sch: ["00:00", "00:00"],
      });
      setExpandThresholds(false);

      setArgument({ ...argument, sat_stpt_deviation_thr: 5 });
    } else {
      setExpandThresholds(true);
    }
    setArgument({ ...argument, [event.target.name]: event.target.value });
  };

  let content = null;

  if (thresholds.custom === true) {
    content = (
      <div>
        <Grid item xs={9}>
          <StyledTypography color="primary" gutterBottom>
            SUPPLY-AIR TEMPERATURE SETPOINT DEVIATION THRESHOLD
            <ToolTipInfo fieldName="sat_stpt_deviation_thr" />
          </StyledTypography>
        </Grid>
        <Grid item xs={3}>
          <Input
            name="sat_stpt_deviation_thr"
            value={
              argument.sat_stpt_deviation_thr
                ? argument.sat_stpt_deviation_thr
                : 5
            }
            margin="dense"
            onChange={handleArgumentInputChange}
            onBlur={handleArgumentBlur(2, 10)}
            inputProps={{
              min: 2,
              max: 10,
              type: "number",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Slider
            name="sat_stpt_deviation_thr"
            value={argument.sat_stpt_deviation_thr}
            onChange={handleArgumentSliderChange("sat_stpt_deviation_thr")}
            min={2}
            max={10}
          />
        </Grid>
        <Grid item xs={9}>
          <StyledTypography color="primary" gutterBottom>
            STATIC PRESSURE SETPOINT DEVIATION THRESHOLD
            <ToolTipInfo fieldName="stcpr_stpt_deviation_thr" />
          </StyledTypography>
        </Grid>
        <Grid item xs={3}>
          <Input
            name="stcpr_stpt_deviation_thr"
            value={
              thresholds.stcpr_stpt_deviation_thr
                ? thresholds.stcpr_stpt_deviation_thr
                : 20
            }
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur(2, 10)}
            inputProps={{
              min: 10,
              max: 30,
              type: "number",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Slider
            name="stcpr_stpt_deviation_thr"
            value={
              thresholds.stcpr_stpt_deviation_thr
                ? thresholds.stcpr_stpt_deviation_thr
                : 20
            }
            onChange={handleSliderChange("stcpr_stpt_deviation_thr")}
            min={10}
            max={30}
          />
        </Grid>
      </div>
    );
  }

  return (
    <>
      <div>
        <FormControl component="fieldset">
          <RadioGroup
            name="sensitivity"
            value={argument.sensitivity === "default" ? "default" : "custom"}
            onChange={handleDefaultRadioChange}
            row
          >
            <FormControlLabel
              value="default"
              control={<Radio color="primary" />}
              label="Use Default thresholds (recommended)"
              labelPlacement="end"
            />
            <FormControlLabel
              value="custom"
              control={<Radio color="primary" />}
              label="Customize threshold parameters"
              labelPlacement="end"
            />
          </RadioGroup>
        </FormControl>
      </div>
      {content}
    </>
  );
};

export default AirsideThresholds;
