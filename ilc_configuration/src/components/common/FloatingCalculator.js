import React, { useState } from "react";
import styled from "styled-components";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  Modal,
  Grid,
  Chip,
  Typography,
} from "@material-ui/core";

const StyledFormulaDiv = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 7px;
`;

const FloatingCalculator = (props) => {
  const calcStrings = [
    "/",
    "*",
    "-",
    "+",
    ".",
    "(",
    ")",
    "ABS",
    "^",
    " ",
    "",
    "==",
    ">",
    "<",
    "<=",
    ">=",
    "AND",
    "OR",
    "NOT",
  ];
  /**
   * Format string formula into array to make sure
   * items like numbers next to each other appear
   * as a single chip
   * @param {*} parts
   */
  const formatStringFormulaToArray = (parts) => {
    if (!parts || parts.length < 1) {
      return [];
    }
    const splitParts = parts.split(" ");
    let displayArray = [];
    let index = 0;
    let previous = null;
    for (let part of splitParts) {
      if (!isNaN(previous)) {
        if (!isNaN(part)) {
          if (previous !== null) {
            previous = `${previous}${part}`;
          } else {
            previous = part;
          }
        } else {
          displayArray[index] = {
            title: previous,
            type: argumentType(previous),
          };
          previous = part;
          index++;
        }
      } else {
        // catch first iteration
        if (previous !== null) {
          displayArray[index] = {
            title: previous,
            type: argumentType(previous),
          };
          index++;
        }

        previous = part;
      }
    }

    if (previous !== null) {
      // Catch last iteration
      displayArray[index] = { title: previous, type: argumentType(previous) };
    }
    return displayArray;
  };

  const argumentType = (argument) => {
    if (!isNaN(argument)) {
      return "int";
    }
    if (calcStrings.indexOf(argument) > -1) {
      return "op";
    }
    return "arg";
  };

  const {
    open,
    handleClose,
    operationalArguments,
    formula,
    handleOperationChange,
  } = props;
  const [displayFormula, setDisplayFormula] = useState(
    formatStringFormulaToArray(formula)
  );

  // Handle button presses
  const buttonPress = (value, type) => {
    let displayFormulaCopy = [...displayFormula];
    const lastValue = displayFormulaCopy[displayFormulaCopy.length - 1];
    if (lastValue && lastValue.type === "int" && type === "int") {
      displayFormulaCopy[
        displayFormulaCopy.length - 1
      ].title = `${lastValue.title}${value}`;
    } else {
      displayFormulaCopy.push({ title: value, type });
    }
    setDisplayFormula(displayFormulaCopy);
  };

  // Wrapper Component to display the Keypad
  const negationButtonPress = (value, type) => {
    let displayFormulaCopy = [...displayFormula];
    const lastValue = displayFormulaCopy[displayFormulaCopy.length - 1];
    if (lastValue && lastValue.type === "int") {
      if (lastValue.title.charAt(0) === "-") {
        // Remove negation if exists
        displayFormulaCopy[
          displayFormulaCopy.length - 1
        ].title = `${lastValue.title.substring(1)}`;
      } else {
        displayFormulaCopy[ // Add negation if missing
          displayFormulaCopy.length - 1
        ].title = `-${lastValue.title}`;
      }
    } else {
      displayFormulaCopy.push({ title: value, type });
    }
    setDisplayFormula(displayFormulaCopy);
  };

  const clearAll = () => {
    setDisplayFormula([]);
  };

  const GridRow = (props) => {
    return (
      <Grid container item xs={12} justify="center">
        {props.buttonConfig.map((conf) => {
          return (
            <Grid item key={conf[1]}>
              <Button
                variant="contained"
                onClick={(e) => conf[0](conf[1], conf[3])}
                disabled={conf[4]}
              >
                {conf[2]}
              </Button>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  const operationalArgs = operationalArguments.map((arg) => {
    return (
      <Grid container item xs={12} justify="center">
        <Grid item style={{ paddingTop: "5px" }}>
          <Button
            variant="contained"
            size="small"
            onClick={() => buttonPress(arg, "arg")}
            style={{
              textTransform: "none",
              fontSize: "10px",
              minWidth: "220px",
            }}
          >
            {arg}
          </Button>
        </Grid>
      </Grid>
    );
  });

  const buttonConfigurations = [
    [
      [buttonPress, "sin", "sin", "op", true],
      [buttonPress, "cos", "cos", "op", true],
      [buttonPress, "tan", "tan", "op", true],
      [buttonPress, "!", "!", "op", true],

      [clearAll, "C", "C", false, false],
    ],
    [
      [buttonPress, "^ 2", "x^2", "op", true],
      [buttonPress, "7", "7", "int"],
      [buttonPress, "8", "8", "int"],
      [buttonPress, "9", "9", "int"],
      [buttonPress, "/", "/", "op"],
    ],
    [
      [buttonPress, "10 ^", "10^x", "op", true],
      [buttonPress, "4", "4", "int"],
      [buttonPress, "5", "5", "int"],
      [buttonPress, "6", "6", "int"],
      [buttonPress, "*", "*", "op"],
    ],
    [
      [buttonPress, "log", "log", "op", true],
      [buttonPress, "1", "1", "int"],
      [buttonPress, "2", "2", "int"],
      [buttonPress, "3", "3", "int"],
      [buttonPress, "-", "-", "op"],
    ],
    [
      [buttonPress, "ln", "ln", "op", true],
      [negationButtonPress, "-", "+/-", "op"],
      [buttonPress, "0", "0", "int"],
      [buttonPress, ".", ".", "int"],
      [buttonPress, "+", "+", "op"],
    ],
    [
      [buttonPress, "%", "%", "op", true],
      [buttonPress, "(", "("],
      [buttonPress, ")", ")"],
      [buttonPress, "abs", "abs"],
      [buttonPress, "^", "^"],
    ],
  ];

  const deleteChip = (index) => {
    let displayFormulaCopy = [...displayFormula];
    if (
      displayFormulaCopy[index - 1] &&
      displayFormulaCopy[index + 1] &&
      displayFormulaCopy[index - 1].type === "int" &&
      displayFormulaCopy[index + 1].type === "int"
    ) {
      displayFormulaCopy[index - 1].title = `${
        displayFormulaCopy[index - 1].title
      }${displayFormulaCopy[index + 1].title}`;
      displayFormulaCopy.splice(index + 1, 1);
    }
    displayFormulaCopy.splice(index, 1);
    setDisplayFormula(displayFormulaCopy);
  };

  const chipWrapper = displayFormula.map((chip, index) => {
    return (
      <Chip
        // variant={chip.type === "op" ? "outlined" : "default"}
        variant={"outlined"}
        label={chip.title}
        color={
          chip.type === "op"
            ? "default"
            : chip.type === "int"
            ? "secondary"
            : "primary"
        }
        onDelete={() => {
          deleteChip(index);
        }}
      />
    );
  });

  const keypad = (
    <Grid container xs={12} justify="center">
      {buttonConfigurations.map((rowConfigs) => {
        return <GridRow buttonConfig={rowConfigs} />;
      })}
    </Grid>
  );

  const saveForumla = () => {
    let forumlaString = "";
    let argArray = [];
    for (let form of displayFormula) {
      if (forumlaString === "") {
        forumlaString = form.title;
      } else {
        forumlaString = `${forumlaString} ${form.title}`;
      }
      if(form.type === "arg" && argArray.indexOf(form.title) === -1){
        argArray.push(form.title);
      }
    }
    handleOperationChange(forumlaString, argArray); //TODO: Operation args
    handleClose();
  };

  return (
    <Modal open={open} disableBackdropClick>
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableBackdropClick
      >
        <DialogTitle id="alert-dialog-title">{"Edit Formula"}</DialogTitle>
        <DialogContent>
          <StyledFormulaDiv>{chipWrapper}</StyledFormulaDiv>
          
          <Grid container spacing={0}>
            <Grid item xs={7}>
              <Typography style={{ textAlign: "center" }}>
                Operations
              </Typography>
              {keypad}
            </Grid>
            <Grid item xs={5}>
              <Typography style={{ textAlign: "center" }}>Arguments</Typography>
              {operationalArgs}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={saveForumla} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Modal>
  );
};

export default FloatingCalculator;
