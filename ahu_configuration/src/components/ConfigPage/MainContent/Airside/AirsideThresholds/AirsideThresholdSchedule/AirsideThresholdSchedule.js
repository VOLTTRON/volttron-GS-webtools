import React, { useContext, useState } from "react";
import DateFnsAdapter from "@date-io/date-fns";
import "date-fns";
import { Grid, Input, InputAdornment, Slider } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";

import ToolTipInfo from "../../../Util/ToolTipInfo";
import ErrorModal from "../../../../../../containers/Layout/ErrorModal/ErrorModal";
import { AirsideThresholdsContext } from "../../../../../../context/AirsideThresholdsContext/AirsideThresholdsContext";
import {
  StyledTypographyDOW,
  StyledTypography,
  StyledArrowRightAltIcon,
  StyledButtonOnOff,
} from "./_style";

const AirsideThresholdSchedule = (props) => {
  const [thresholds, setThresholds] = useContext(AirsideThresholdsContext);
  const [showError, setShowError] = useState(false);

  const handleInputChange = (event) => {
    if (event.target.name === "unocc_stp_thr") {
      if (event.target.value === 0) {
        setShowError(true);
        return;
      }
    }

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
    if (event.target.name === "unocc_stp_thr") {
      if (event.target.value === 0) {
        setShowError(true);
        return;
      }
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
    if (event.target.name === "unocc_stp_thr") {
      if (event.target.value === 0) {
        setShowError(true);
        return;
      }
    }
    setThresholds({
      ...thresholds,
      [sliderName]: Number([newValue]),
    });
  };

  const handleTimeOnOff = (dayOfWeek) => {
    let newSchedule = ["00:00", "00:00"];
    if (
      thresholds[dayOfWeek][0] === "00:00" &&
      thresholds[dayOfWeek][1] === "00:00"
    ) {
      newSchedule = ["05:00", "18:30"];
    }

    setThresholds({
      ...thresholds,
      [dayOfWeek]: newSchedule,
    });
  };

  const handleTimeChange = (name, opening) => (event) => {
    const hours =
      event.getHours() < 10 ? "0" + event.getHours() : event.getHours(); // Time format needs leading 0
    const minutes =
      event.getMinutes() < 10 ? "0" + event.getMinutes() : event.getMinutes(); // Time format needs leading 0
    const index = opening === true ? 0 : 1;
    let newSchedule = thresholds[name];
    newSchedule[index] = hours + ":" + minutes;
    if (newSchedule[0] >= newSchedule[1]) {
      alert("Closing time must be later than the opening time");
      return;
    }
    setThresholds({
      ...thresholds,
      [name]: newSchedule,
    });
  };

  return (
    <>
      {showError ? (
        <ErrorModal onClose={() => setShowError(false)}>
          Fault will occur if value is 0
        </ErrorModal>
      ) : null}
      <div>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <StyledTypography color="primary" gutterBottom>
              RESET THRESHOLD
              <ToolTipInfo fieldName="sat_reset_thr" />
            </StyledTypography>
          </Grid>
          <Grid item xs={4}>
            <Input
              name="sat_reset_thr"
              value={thresholds.sat_reset_thr ? thresholds.sat_reset_thr : 5}
              margin="dense"
              onChange={handleInputChange}
              onBlur={handleBlur(1, 5)}
              inputProps={{
                step: 0.1,
                min: 1,
                max: 5,
                type: "number",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Slider
              name="sat_reset_thr"
              value={thresholds.sat_reset_thr ? thresholds.sat_reset_thr : 5}
              onChange={handleSliderChange("sat_reset_thr")}
              step={0.1}
              // // marks={[{value:1, label:"Min"},{value:5, label:"Max"}]}
              min={1}
              max={5}
            />
          </Grid>
          <Grid item xs={8}>
            <StyledTypography color="primary" gutterBottom>
              STATIC PRESSURE RESET THRESHOLD
              <ToolTipInfo fieldName="stcpr_reset_thr" />
            </StyledTypography>
          </Grid>
          <Grid item xs={4}>
            <Input
              name="stcpr_reset_thr"
              value={
                thresholds.stcpr_reset_thr ? thresholds.stcpr_reset_thr : 0.25
              }
              margin="dense"
              onChange={handleInputChange}
              onBlur={handleBlur(0.1, 0.5)}
              inputProps={{
                step: 0.01,
                min: 0.1,
                max: 0.5,
                type: "number",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Slider
              name="stcpr_reset_thr"
              value={
                thresholds.stcpr_reset_thr ? thresholds.stcpr_reset_thr : 0.25
              }
              onChange={handleSliderChange("stcpr_reset_thr")}
              step={0.01}
              // marks={[{value:.1, label:"Min"},{value:.5, label:"Max"}]}
              min={0.1}
              max={0.5}
            />
          </Grid>
          <Grid item xs={12} container spacing={3}>
            <Grid item xs={9}>
              <StyledTypography color="primary" gutterBottom>
                UNOCCUPIED TIME <ToolTipInfo fieldName="unocc_time_thr" />
              </StyledTypography>
            </Grid>
            <Grid item xs={3}>
              <Input
                name="unocc_time_thr"
                value={
                  thresholds.unocc_time_thr ? thresholds.unocc_time_thr : 40
                }
                margin="dense"
                onChange={handleInputChange}
                onBlur={handleBlur(20, 40)}
                inputProps={{
                  min: 20,
                  max: 60,
                  type: "number",
                }}
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
              />
            </Grid>
            <Grid item xs={12}>
              <Slider
                name="unocc_time_thr"
                value={
                  thresholds.unocc_time_thr ? thresholds.unocc_time_thr : 40
                }
                onChange={handleSliderChange("unocc_time_thr")}
                // marks={[{value:20, label:"Min"},{value:60, label:"Max"}]}
                min={20}
                max={60}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} container spacing={3}>
            <Grid item xs={9}>
              <StyledTypography color="primary" gutterBottom>
                UNOCCUPIED STATIC PRESSURE{" "}
                <ToolTipInfo fieldName="unocc_stp_thr" />
              </StyledTypography>
            </Grid>
            <Grid item xs={3}>
              <Input
                name="unocc_stp_thr"
                value={
                  thresholds.unocc_stp_thr ? thresholds.unocc_stp_thr : 0.2
                }
                margin="dense"
                onChange={handleInputChange}
                onBlur={handleBlur(0.13, 3)}
                inputProps={{
                  step: 0.01,
                  min: 0.13,
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
                name="unocc_stp_thr"
                value={
                  thresholds.unocc_stp_thr ? thresholds.unocc_stp_thr : 0.2
                }
                onChange={handleSliderChange("unocc_stp_thr")}
                step={0.01}
                // marks={[{value:.13, label:"Min"},{value:3, label:"Max"}]}
                min={0.13}
                max={3}
              />
            </Grid>
          </Grid>
          <MuiPickersUtilsProvider utils={DateFnsAdapter}>
            <Grid item xs={12} container spacing={1}>
              WHEN SHOULD EQUIPMENT BE CONSIDERED ON?
            </Grid>
            {/* Monday */}
            <Grid item xs={12} container spacing={0}>
              <Grid item xs={2}>
                <StyledTypographyDOW>MONDAY:</StyledTypographyDOW>
              </Grid>
              <Grid item xs={4}>
                <KeyboardTimePicker
                  margin="normal"
                  placeholder="00:00 AM"
                  ampm={false}
                  value={new Date(`2015-03-25T${thresholds.monday_sch[0]}:00`)}
                  disabled={
                    thresholds.monday_sch[0] === "00:00" &&
                    thresholds.monday_sch[1] === "00:00"
                  }
                  onChange={handleTimeChange("monday_sch", true)}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </Grid>
              <Grid item xs={1}>
                <StyledArrowRightAltIcon />
              </Grid>
              <Grid item xs={4}>
                <KeyboardTimePicker
                  margin="normal"
                  placeholder="00:00 AM"
                  ampm={false}
                  value={new Date(`2015-03-25T${thresholds.monday_sch[1]}:00`)}
                  disabled={
                    thresholds.monday_sch[0] === "00:00" &&
                    thresholds.monday_sch[1] === "00:00"
                  }
                  onChange={handleTimeChange("monday_sch", false)}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </Grid>
              <Grid item xs={1}>
                <StyledButtonOnOff
                  open={thresholds.monday_sch[0]}
                  close={thresholds.monday_sch[1]}
                  onClick={() => handleTimeOnOff("monday_sch")}
                >
                  {thresholds.monday_sch[0] === "00:00" &&
                  thresholds.monday_sch[1] === "00:00"
                    ? "ON"
                    : "OFF"}
                </StyledButtonOnOff>
              </Grid>
            </Grid>
            {/* Tuesday */}
            <Grid item xs={12} container spacing={0}>
              <Grid item xs={2}>
                <StyledTypographyDOW>TUESDAY:</StyledTypographyDOW>
              </Grid>
              <Grid item xs={4}>
                <KeyboardTimePicker
                  margin="normal"
                  placeholder="00:00 AM"
                  ampm={false}
                  value={new Date(`2015-03-25T${thresholds.monday_sch[0]}:00`)}
                  disabled={
                    thresholds.tuesday_sch[0] === "00:00" &&
                    thresholds.tuesday_sch[1] === "00:00"
                  }
                  onChange={handleTimeChange("tuesday_sch", true)}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </Grid>
              <Grid item xs={1}>
                <StyledArrowRightAltIcon />
              </Grid>
              <Grid item xs={4}>
                <KeyboardTimePicker
                  margin="normal"
                  placeholder="00:00 AM"
                  ampm={false}
                  value={new Date(`2015-03-25T${thresholds.tuesday_sch[1]}:00`)}
                  disabled={
                    thresholds.tuesday_sch[0] === "00:00" &&
                    thresholds.tuesday_sch[1] === "00:00"
                  }
                  onChange={handleTimeChange("tuesday_sch", false)}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </Grid>
              <Grid item xs={1}>
                <StyledButtonOnOff
                  open={thresholds.tuesday_sch[0]}
                  close={thresholds.tuesday_sch[1]}
                  onClick={() => handleTimeOnOff("tuesday_sch")}
                >
                  {thresholds.tuesday_sch[0] === "00:00" &&
                  thresholds.tuesday_sch[1] === "00:00"
                    ? "ON"
                    : "OFF"}
                </StyledButtonOnOff>
              </Grid>
            </Grid>
            {/* Wednesday */}
            <Grid item xs={12} container spacing={0}>
              <Grid item xs={2}>
                <StyledTypographyDOW>WEDNESDAY:</StyledTypographyDOW>
              </Grid>
              <Grid item xs={4}>
                <KeyboardTimePicker
                  margin="normal"
                  placeholder="00:00 AM"
                  ampm={false}
                  value={
                    new Date(`2015-03-25T${thresholds.wednesday_sch[0]}:00`)
                  }
                  disabled={
                    thresholds.wednesday_sch[0] === "00:00" &&
                    thresholds.wednesday_sch[1] === "00:00"
                  }
                  onChange={handleTimeChange("wednesday_sch", true)}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </Grid>
              <Grid item xs={1}>
                <StyledArrowRightAltIcon />
              </Grid>
              <Grid item xs={4}>
                <KeyboardTimePicker
                  margin="normal"
                  placeholder="00:00 AM"
                  ampm={false}
                  value={
                    new Date(`2015-03-25T${thresholds.wednesday_sch[1]}:00`)
                  }
                  disabled={
                    thresholds.wednesday_sch[0] === "00:00" &&
                    thresholds.wednesday_sch[1] === "00:00"
                  }
                  onChange={handleTimeChange("wednesday_sch", false)}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </Grid>
              <Grid item xs={1}>
                <StyledButtonOnOff
                  open={thresholds.wednesday_sch[0]}
                  close={thresholds.wednesday_sch[1]}
                  onClick={() => handleTimeOnOff("wednesday_sch")}
                >
                  {thresholds.wednesday_sch[0] === "00:00" &&
                  thresholds.wednesday_sch[1] === "00:00"
                    ? "ON"
                    : "OFF"}
                </StyledButtonOnOff>
              </Grid>
            </Grid>
            {/* Thursday */}
            <Grid item xs={12} container spacing={0}>
              <Grid item xs={2}>
                <StyledTypographyDOW>THURSDAY:</StyledTypographyDOW>
              </Grid>
              <Grid item xs={4}>
                <KeyboardTimePicker
                  margin="normal"
                  placeholder="00:00 AM"
                  ampm={false}
                  value={
                    new Date(`2015-03-25T${thresholds.thursday_sch[0]}:00`)
                  }
                  disabled={
                    thresholds.thursday_sch[0] === "00:00" &&
                    thresholds.thursday_sch[1] === "00:00"
                  }
                  onChange={handleTimeChange("thursday_sch", true)}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </Grid>
              <Grid item xs={1}>
                <StyledArrowRightAltIcon />
              </Grid>
              <Grid item xs={4}>
                <KeyboardTimePicker
                  margin="normal"
                  placeholder="00:00 AM"
                  ampm={false}
                  value={
                    new Date(`2015-03-25T${thresholds.thursday_sch[1]}:00`)
                  }
                  disabled={
                    thresholds.thursday_sch[0] === "00:00" &&
                    thresholds.thursday_sch[1] === "00:00"
                  }
                  onChange={handleTimeChange("thursday_sch", false)}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </Grid>
              <Grid item xs={1}>
                <StyledButtonOnOff
                  open={thresholds.thursday_sch[0]}
                  close={thresholds.thursday_sch[1]}
                  onClick={() => handleTimeOnOff("thursday_sch")}
                >
                  {thresholds.thursday_sch[0] === "00:00" &&
                  thresholds.thursday_sch[1] === "00:00"
                    ? "ON"
                    : "OFF"}
                </StyledButtonOnOff>
              </Grid>
            </Grid>
            {/* Friday */}
            <Grid item xs={12} container spacing={0}>
              <Grid item xs={2}>
                <StyledTypographyDOW>FRIDAY:</StyledTypographyDOW>
              </Grid>
              <Grid item xs={4}>
                <KeyboardTimePicker
                  margin="normal"
                  placeholder="00:00 AM"
                  ampm={false}
                  value={new Date(`2015-03-25T${thresholds.friday_sch[0]}:00`)}
                  disabled={
                    thresholds.friday_sch[0] === "00:00" &&
                    thresholds.friday_sch[1] === "00:00"
                  }
                  onChange={handleTimeChange("friday_sch", true)}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </Grid>
              <Grid item xs={1}>
                <StyledArrowRightAltIcon />
              </Grid>
              <Grid item xs={4}>
                <KeyboardTimePicker
                  margin="normal"
                  placeholder="00:00 AM"
                  ampm={false}
                  value={new Date(`2015-03-25T${thresholds.friday_sch[1]}:00`)}
                  disabled={
                    thresholds.friday_sch[0] === "00:00" &&
                    thresholds.friday_sch[1] === "00:00"
                  }
                  onChange={handleTimeChange("friday_sch", false)}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </Grid>
              <Grid item xs={1}>
                <StyledButtonOnOff
                  open={thresholds.friday_sch[0]}
                  close={thresholds.friday_sch[1]}
                  onClick={() => handleTimeOnOff("friday_sch")}
                >
                  {thresholds.friday_sch[0] === "00:00" &&
                  thresholds.friday_sch[1] === "00:00"
                    ? "ON"
                    : "OFF"}
                </StyledButtonOnOff>
              </Grid>
            </Grid>
            {/* Saturday */}
            <Grid item xs={12} container spacing={0}>
              <Grid item xs={2}>
                <StyledTypographyDOW>SATURDAY:</StyledTypographyDOW>
              </Grid>
              <Grid item xs={4}>
                <KeyboardTimePicker
                  margin="normal"
                  placeholder="00:00 AM"
                  ampm={false}
                  value={
                    new Date(`2015-03-25T${thresholds.saturday_sch[0]}:00`)
                  }
                  disabled={
                    thresholds.saturday_sch[0] === "00:00" &&
                    thresholds.saturday_sch[1] === "00:00"
                  }
                  onChange={handleTimeChange("saturday_sch", true)}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </Grid>
              <Grid item xs={1}>
                <StyledArrowRightAltIcon />
              </Grid>
              <Grid item xs={4}>
                <KeyboardTimePicker
                  margin="normal"
                  placeholder="00:00 AM"
                  ampm={false}
                  value={
                    new Date(`2015-03-25T${thresholds.saturday_sch[1]}:00`)
                  }
                  disabled={
                    thresholds.saturday_sch[0] === "00:00" &&
                    thresholds.saturday_sch[1] === "00:00"
                  }
                  onChange={handleTimeChange("saturday_sch", false)}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </Grid>
              <Grid item xs={1}>
                <StyledButtonOnOff
                  open={thresholds.saturday_sch[0]}
                  close={thresholds.saturday_sch[1]}
                  onClick={() => handleTimeOnOff("saturday_sch")}
                >
                  {thresholds.saturday_sch[0] === "00:00" &&
                  thresholds.saturday_sch[1] === "00:00"
                    ? "ON"
                    : "OFF"}
                </StyledButtonOnOff>
              </Grid>
            </Grid>
            {/* Sunday */}
            <Grid item xs={12} container spacing={0}>
              <Grid item xs={2}>
                <StyledTypographyDOW>SUNDAY:</StyledTypographyDOW>
              </Grid>
              <Grid item xs={4}>
                <KeyboardTimePicker
                  margin="normal"
                  placeholder="00:00 AM"
                  ampm={false}
                  value={new Date(`2015-03-25T${thresholds.sunday_sch[0]}:00`)}
                  disabled={
                    thresholds.sunday_sch[0] === "00:00" &&
                    thresholds.sunday_sch[1] === "00:00"
                  }
                  onChange={handleTimeChange("sunday_sch", true)}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </Grid>
              <Grid item xs={1}>
                <StyledArrowRightAltIcon />
              </Grid>
              <Grid item xs={4}>
                <KeyboardTimePicker
                  margin="normal"
                  placeholder="00:00 AM"
                  ampm={false}
                  value={new Date(`2015-03-25T${thresholds.sunday_sch[1]}:00`)}
                  disabled={
                    thresholds.sunday_sch[0] === "00:00" &&
                    thresholds.sunday_sch[1] === "00:00"
                  }
                  onChange={handleTimeChange("sunday_sch", false)}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </Grid>
              <Grid item xs={1}>
                <StyledButtonOnOff
                  open={thresholds.sunday_sch[0]}
                  close={thresholds.sunday_sch[1]}
                  onClick={() => handleTimeOnOff("sunday_sch")}
                >
                  {thresholds.sunday_sch[0] === "00:00" &&
                  thresholds.sunday_sch[1] === "00:00"
                    ? "ON"
                    : "OFF"}
                </StyledButtonOnOff>
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
      </div>
    </>
  );
};

export default AirsideThresholdSchedule;
