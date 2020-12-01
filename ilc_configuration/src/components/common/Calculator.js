import React, { useState, useContext, Fragment} from 'react';
import MasterDriverContext from '../../context/masterDriverContext';
import ClusterContext from '../../context/clusterContext';
import { InputLabel, TextField, MenuItem, Button } from '@material-ui/core';
import { FormControl } from '../MainConfig/_styledMainConfigForm';
import { StyledPointSelect, StyledButton } from './_styledDemandFormula';
import { Grid, Radio, RadioGroup } from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { OPERATION, OPERATION_ARGS, _CONTROL, _CRITERIA } from '../../constants/strings';
import { darkModeContext } from "../../context/darkModeContext";


export default function DemandFormula(props) {
    const { darkMode } = useContext(darkModeContext);
    let {configuration, setConfiguration} = useContext(MasterDriverContext);
    const savePathArray = props.savePath;
    let operationPath = null;
    let formulaStringValue = null;
    if (savePathArray.length === 5){
        operationPath = configuration[savePathArray[0]][savePathArray[1]][savePathArray[2]][savePathArray[3]][savePathArray[4]]
        formulaStringValue = operationPath[OPERATION]
        formulaStringValue = formulaStringValue ? formulaStringValue : "";
    }
    if(savePathArray.length === 3){
        const mainConfigPath = configuration[savePathArray[0]][savePathArray[1]][savePathArray[2]]
        formulaStringValue = mainConfigPath[OPERATION]
    }
    console.log(`From calculator: ${savePathArray}`)

    const [pointValue, setPointValue] = useState("");
    const [formulaString, setFormulaString] = useState(formulaStringValue);
    const [pointsCounter, setPointsCounter] = useState(2);
    const [formulaArray, setFormulaArray] = useState(formulaStringValue.trim().split(" "));
    const [curtailed, setCurtailed] = useState("always")
    const [minimum, setMinimum] = useState(0)
    const [maximum, setMaximum] = useState(0)

    const calcStrings = ["/", "*", "-", "+", ".", "(", ")", "ABS", "^", " ", "", "==", ">", "<", "<=", ">=", "AND", "OR", "NOT"]

    const clone = (obj) => JSON.parse(JSON.stringify(obj));

    // Utility function to create the new demand formula string after the form has changed
    const makeConfigString = () => {
        let configString = formulaArray.join(" ")
        return configString
    }


    // Utility function to check if string s is a number or not
    const checkNumber = (s) => {
        return !isNaN(s);
    }


    // Handles the PointSelect changes and manages the formula update
    const handlePointChange = (event) => {
        const value = event.target.value
        setPointValue(value)
    }


    // Handles most button presses and manages the formula update
    const buttonPress = (event, value) => {
        let isValueNumber = checkNumber(value)
        if(value === ".") {
            isValueNumber = true
        }
        let fArray = formulaArray
        let lastEl = fArray[fArray.length - 1]
        let isLastElNumber = checkNumber(lastEl)
        if(isValueNumber && isLastElNumber) {
            fArray[fArray.length - 1] = lastEl.concat(value)
        } else {
            fArray.push(value)
        }

        setFormulaArray(fArray)
        let newState = makeConfigString()
        setFormulaString(newState)
    }


    // Handles the +/- button to negate or remove negation from numbers
    const negationPress = () => {
        let fArray = formulaArray
        let lastEl = fArray[fArray.length - 1]
        let isLastElNumber = checkNumber(lastEl)

        if(isLastElNumber) {
            if(lastEl[0] === "-") {
                lastEl = lastEl.substring(1)
                fArray[fArray.length - 1] = lastEl
            } else {
                fArray[fArray.length - 1] = "-".concat(lastEl)
            }
        } else {
            fArray.push("-")
        }

        setFormulaArray(fArray)
        let newState = makeConfigString()
        setFormulaString(newState)
    }

    // Updates the demand formula context
    const updateConfiguration = () => {
        let newConfiguration = clone(configuration)
        // main configuration
        if (savePathArray.length === 3){
            let operationArgs = []
            formulaArray.forEach(string => {
                let parsedInt = parseInt(string)
                if (isNaN(parsedInt)){
                    if(!(calcStrings.indexOf(string) > -1)){
                        if(!operationArgs.includes(string))
                        operationArgs.push(string)
                    }
                }
            })
            newConfiguration[savePathArray[0]][savePathArray[1]][savePathArray[2]][OPERATION] = formulaString.trim();
            newConfiguration[savePathArray[0]][savePathArray[1]][savePathArray[2]][OPERATION_ARGS] = operationArgs;
        } else if (savePathArray.length === 5 && savePathArray[0].includes(_CRITERIA)){
            // criteria configuration
            let operationArgs = {always: [], nc: []}
            formulaArray.forEach(string => {
                let parsedInt = parseInt(string)
                if (isNaN(parsedInt)){
                    if(!(calcStrings.indexOf(string) > -1)){
                        if(string.includes("[always]")){
                            operationArgs["always"].push(string.replace("[always]", ""))
                        } else if(string.includes("[nc]")){
                            operationArgs["nc"].push(string.replace("[nc]", ""))
                        }
                    }
                }
            })
            newConfiguration[savePathArray[0]][savePathArray[1]][savePathArray[2]][savePathArray[3]][savePathArray[4]][OPERATION] = formulaString;
            newConfiguration[savePathArray[0]][savePathArray[1]][savePathArray[2]][savePathArray[3]][savePathArray[4]][OPERATION_ARGS] = operationArgs;
        } else {
            // control configuration
            let operationArgs = []
            formulaArray.forEach(string => {
                let parsedInt = parseInt(string)
                if (isNaN(parsedInt)){
                    if(!(calcStrings.indexOf(string) > -1)){
                        if(!operationArgs.includes(string)){
                            operationArgs.push(string)
                        }
                    }
                }
            })
            if (newConfiguration[savePathArray[0]][savePathArray[1]][savePathArray[2]][savePathArray[3]][savePathArray[4]][OPERATION]){
                newConfiguration[savePathArray[0]][savePathArray[1]][savePathArray[2]][savePathArray[3]][savePathArray[4]][OPERATION] = formulaString;
            } else {
                newConfiguration[savePathArray[0]][savePathArray[1]][savePathArray[2]][savePathArray[3]][savePathArray[4]] = {
                    [OPERATION]: formulaString
                };
            }

            newConfiguration[savePathArray[0]][savePathArray[1]][savePathArray[2]][savePathArray[3]][savePathArray[4]][OPERATION_ARGS] = operationArgs;
        }
        setConfiguration(newConfiguration)
    }


    // Function to add an operator and select to the demand formula creation form
    const addPoint = () => {
        if (pointValue !== "") {
            let fArray = formulaArray
            if (operationPath && !props.savePath[0].includes(_CONTROL)){
                fArray.push(`${pointValue}[${curtailed}]`)
            } else {
                fArray.push(`${pointValue}`)
            }
            setFormulaString(fArray)
            setPointsCounter(pointsCounter + 1)
            let newState = makeConfigString()
            setFormulaString(newState)
        }
    }

    // Removes last item from the demand formula creation form
    const removeLastItem = () => {
        // If there is nothing in the array, do not attempt to remove anything
        if (formulaArray.length === 0) {
            return 0;
        }
        let fArray = Array.from(formulaArray)
        const deletedItem = fArray.pop()
        setPointsCounter(pointsCounter - 1)
        let newFormulaString = fArray.join(" ")
        setFormulaArray(fArray)
        setFormulaString(newFormulaString)
    }

    // Used to clear the formula completely
    const clearFormula = () => {
        setFormulaArray([]);
        setFormulaString("");
        setPointsCounter(0);
    }


    // Functional component for dropdown creation that contains the possible Points from a predetermined list, along with all extras
    const PointSelect = (index) => {
            return  <>
                        <FormControl>
                            <Grid container>
                                <Grid item xs={11}>
                                    <InputLabel id={"pointSelectLabel"}>Operation Argument</InputLabel>
                                        <StyledPointSelect
                                            id={"pointSelect"}
                                            name={"pointSelect"}
                                            labelId={"pointSelectLabel"}
                                            value={pointValue}
                                            onChange={handlePointChange}>
                                            {props.points.map((point, index) => {
                                                return (
                                                    <MenuItem key={index} value={point}>{point}</MenuItem>
                                                    )})}
                                        </StyledPointSelect>
                                </Grid>
                                <Grid item xs={1}>
                                    <Button
                                        color="primary"
                                        onClick={addPoint}
                                        style={{marginTop: "2rem"}}><b><h3 style={{marginRight: "1rem"}}>+Add</h3></b></Button>
                                </Grid>
                            </Grid>
                        </FormControl>
                        {(operationPath && !props.savePath[0].includes(_CONTROL)) ?
                        <FormControl>
                            <RadioGroup
                                row
                                value={curtailed}
                                style={{color: "rgba(0, 0, 0, 0.87)"}}
                                onChange={(event) => setCurtailed(event.target.value)}
                            >
                                <FormControlLabel value="always" control={<Radio />} label="Always" class={darkMode ? "darkLabel" : ""}/>
                                <FormControlLabel value="nc" control={<Radio />} label="Not Curtailed" class={darkMode ? "darkLabel" : ""}/>
                            </RadioGroup>
                        </FormControl>
                        : null}
                    </>
    }


    // Component that renders a row on the Keypad
    const GridRow = props => {
        return (
            <Grid container item xs={12} justify="center">
                {props.buttonConfig.map(conf => {
                    return (
                        <Grid item>
                            <StyledButton variant="contained" onClick={e => conf[0](e, conf[1])} disabled={conf[3]} >
                                    {conf[4] ? <b style={{color: "red"}}> {conf[2]} </b> : conf[2]}
                            </StyledButton>
                        </Grid>
                    )
                })}
            </Grid>
        )
    }


    // Configurations for the Keypad Buttons
    // Structure:
    // [Function when pressed, output characters when pressed, characters displayed on button, disabled? (optional), red coloring? (optional)]
    const buttonConfigurations = [
        [[buttonPress, "sin", "sin", true], [buttonPress, "cos", "cos", true], [buttonPress, "tan", "tan", true], [buttonPress, "!", "!", true], [buttonPress, "%", "%", true]],
        [[buttonPress, "^ 2", "x^2", true], [buttonPress, "7", "7"], [buttonPress, "8", "8"], [buttonPress, "9", "9"], [buttonPress, "/", "/"]],
        [[buttonPress, "10 ^", "10^x", true], [buttonPress, "4", "4"], [buttonPress, "5", "5"], [buttonPress, "6", "6"], [buttonPress, "*", "*"]],
        [[buttonPress, "log", "log", true], [buttonPress, "1", "1"], [buttonPress, "2", "2"], [buttonPress, "3", "3"], [buttonPress, "-", "-"]],
        [[buttonPress, "ln", "ln", true], [negationPress, "+/-", "+/-"], [buttonPress, "0", "0"], [buttonPress, ".", "."], [buttonPress, "+", "+"]],
        [[buttonPress, "^", "^"], [buttonPress, "(", "("], [buttonPress, ")", ")"],  [buttonPress, "abs", "abs"], [removeLastItem, "del", "del", false, true]]
    ]

    // append additional comparison options for device status
    if(props.deviceStatus){
        buttonConfigurations.push(
            [[buttonPress, "==", "=="], [buttonPress, ">", ">"], [buttonPress, "<", "<"], [buttonPress, "<=", "<="], [buttonPress, ">=", ">="]]
        )
        buttonConfigurations.push(
            [  [buttonPress, "AND", "AND"], [buttonPress, "OR", "OR"], [buttonPress, "NOT", "NOT"]]
        )
    }


    // Wrapper Component to display the Keypad
    const Keypad = props => {
        return (
            <Grid container xs={12} justify="center">
                {props.buttonConfigs.map(rowConfigs => {
                    return (
                        <GridRow
                            buttonConfig={rowConfigs}
                        />
                    )
                })}
                <Grid container xs={12} justify="center">
                    <Grid item>
                        <StyledButton variant="contained" onClick={clearFormula} style={{color: "#FF0000", marginRight: "1rem", marginTop: ".5rem"}}><b>Clear Formula</b></StyledButton>
                        <StyledButton variant="contained" onClick={updateConfiguration} style={{color: "green", marginLeft: "1rem", marginTop: ".5rem"}}><b>Save Operation</b></StyledButton>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    return(
    <div>
        <FormControl>
            <TextField
                id="demandFormulaInput"
                name={OPERATION}
                label="Operation"
                type="string"
                value={formulaString}
                multiline/>
        </FormControl>
        <PointSelect />
        <Keypad buttonConfigs={buttonConfigurations} />
        { (props.savePath[0] !== "config" && !props.savePath[0].includes(_CONTROL)) ?
            <Fragment>
                <FormControl>
                    <TextField
                        id="minimumInput"
                        name="minimum"
                        label="Minimum (Optional)"
                        type="number"
                        onChange={event => {setMinimum(event.target.value)}}
                        value={minimum}/>
                </FormControl>
                <FormControl>
                    <TextField
                        id="maximumInput"
                        name="maximum"
                        label="Maximum (Optional)"
                        type="number"
                        onChange={event => {setMaximum(event.target.value)}}
                        value={maximum}/>
                </FormControl>
            </Fragment> : null
        }

    </div>)
}