import React, { useState, useContext } from "react";
import { Switch, Grid } from '@material-ui/core';
import MasterDriverContext from '../../context/masterDriverContext';
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { ModedFormHeader } from '../common/utility';
import { FormControlLabel , FormWrapper, HorizontalRule } from '../common/_styledFormControl';

const Schedule = props => {
    let date = new Date();
    date.setSeconds(0)
    const { configuration, setConfiguration, darkMode } = useContext(MasterDriverContext);

    const [schedule] = useState(configuration["schedule"])

    const createAlwaysToggleListsFromSchedule = () => {
        let alwaysOnList = [];
        let alwaysOffList = [];
        for (const day in schedule) {
            if (schedule[day] === "always_on") {
                alwaysOnList[day] = true;
            }
            if (schedule[day] === "always_off") {
                alwaysOffList[day] = true;
            }
        }
        let toggleList = {"on": alwaysOnList, "off": alwaysOffList};
        return toggleList;
    }

    const [alwaysToggles, setAlwaysToggles] = useState(createAlwaysToggleListsFromSchedule());

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const createTimeFromConfig = (timeString) => {
        if (timeString === undefined) {
            timeString = ""
        }

        let time = new Date()
        time.setHours(timeString.slice(0,2))
        time.setMinutes(timeString.slice(3,5))
        time.setSeconds(0)

        return time
    }

    const setDate = (e, day, type) => {
        let newSchedule = schedule;
        let time = new Date(e)
        time.setSeconds(0)
        time = time.toTimeString().split(" ")[0]
        newSchedule[day][type] = time;
        let config = configuration;
        config["schedule"] = newSchedule;
        setConfiguration(config);
    }

    const handleAlwaysOn = (e, day) => {
        let onList = alwaysToggles["on"];
        let offList = alwaysToggles["off"];
        if (offList[day] === true) {
            offList[day] = false;
        }
        onList[day] = e.target.checked;
        setAlwaysToggles({"on": onList, "off": offList});

        let newSchedule = schedule;
        if (e.target.checked === true) {
            newSchedule[day] = "always_on";
        } else {
            newSchedule[day] = {"start": "00:00:00", "end": "00:00:00"};
        }

        let config = configuration;
        config["schedule"] = newSchedule;
        setConfiguration(config)
    }

    const handleAlwaysOff = (e, day) => {
        let onList = alwaysToggles["on"];
        let offList = alwaysToggles["off"];
        if (onList[day] === true) {
            onList[day] = false;
        }
        offList[day] = e.target.checked;
        setAlwaysToggles({"on": onList, "off": offList});
        let newSchedule = schedule

        if (e.target.checked === true) {
            newSchedule[day] = "always_off"
        } else {
            newSchedule[day] = {"start": "00:00:00", "end": "00:00:00"}
        }

        let config = configuration;
        config["schedule"] = newSchedule;
        setConfiguration(config);
    }

    const WeekSchedulePickers = props => {
        return (
            <Grid container spacing={0}>
                {Object.keys(props.days).map(day => {
                    let disabled = false;
                    const dayString = props.days[day];
                    if (schedule[dayString] === "always_on" || schedule[dayString] === "always_off") {
                        disabled = true;
                    }
                    let startTime = createTimeFromConfig(schedule[dayString]["start"])
                    let endTime = createTimeFromConfig(schedule[dayString]["end"])
                    let modedStyle = {}
                    if (darkMode) {
                        modedStyle = {"color" : "white"};
                    }
                    return (
                        <>
                            {ModedFormHeader(props.days[day], "small")}
                            <Grid container spacing={1} justify="center" alignItems="center">
                                <Grid item xs={4}>
                                    <TimePicker
                                        margin="normal"
                                        id={props.days[day].concat("time-pickerStart")}
                                        label={"Start"}
                                        value={startTime}
                                        onChange={(e) => setDate(e, props.days[day], "start")}
                                        disabled={disabled}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                color="primary"
                                                checked={schedule[dayString] === "always_on" ? true : false}
                                                onChange={(e) => handleAlwaysOn(e, props.days[day])}
                                            />}
                                        style={modedStyle}
                                        label="Always On"
                                        labelPlacement="top"
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                color="primary"
                                                checked={schedule[dayString] === "always_off" ? true : false}
                                                onChange={(e) => handleAlwaysOff(e, props.days[day])}
                                            />}
                                        style={modedStyle}
                                        label="Always Off"
                                        labelPlacement="top"
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TimePicker
                                        margin="normal"
                                        id={props.days[day].concat("time-pickerEnd")}
                                        label={"End"}
                                        value={endTime}
                                        onChange={(e) => setDate(e, props.days[day], "end")}
                                        disabled={disabled}
                                    />
                                </Grid>
                            </Grid>
                            <HorizontalRule />
                        </>
                    )
                })}
            </Grid>
        )
    }

    return (
        <FormWrapper>
            {ModedFormHeader("Schedule", "medium")}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <WeekSchedulePickers days={daysOfWeek} />
            </MuiPickersUtilsProvider>
        </FormWrapper>
    );
};

export default Schedule;