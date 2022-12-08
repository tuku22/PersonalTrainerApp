import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { DialogTitle } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function AddTraining({ addTraining, params }) {
  const [open, setOpen] = React.useState(false);
  const [training, setTraining] = useState({
    date: "",
    activity: "",
    duration: "",
    customer: params.value,
  });

  const [customer, setCustomer] = useState({
    name: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
    setCustomer({
      customerInfo: params.data.firstname + " " + params.data.lastname,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    addTraining(training);
    setTraining({
      date: "",
      activity: "",
      duration: "",
      customer: "",
    });
  };

  const inputChanged = (event, data) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Date"
              value={training.date}
              inputFormat="dd/MM/yyyy HH:mm"
              mask="__/__/____ __:__"
              onChange={(newValue) => {
                setTraining({ ...training, date: newValue });
              }}
              renderInput={(params) => (
                <TextField variant="standard" {...params} fullWidth />
              )}
            />
          </LocalizationProvider>
          <TextField
            margin="dense"
            name="duration"
            value={training.duration}
            onChange={(e) => inputChanged(e)}
            label="Duration"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={(e) => inputChanged(e)}
            label="Activity"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
