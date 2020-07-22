import React from "react";
import {
  Slide,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));
const ErrorModal = (props) => (
  <div>
    <Dialog
      open
      TransitionComponent={Transition}
      keepMounted
      onClose={props.onClose}
    >
      <DialogContent>
        <p style={{ color: "black", textAlign: "center", fontSize: "1.5rem" }}>
          {props.children}
        </p>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={props.onClose}>
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

export default ErrorModal;
