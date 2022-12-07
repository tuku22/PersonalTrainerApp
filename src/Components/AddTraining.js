import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddTraining(props) {
  const [open, setOpen] = React.useState(false);
  const [training, setTraining] = React.useState({
    id: "",
    date: "",
    duration: "",
    activity: "",
    customer: props.customerId
  });

  const [customer, setCustomer] = React.useState({
    name: ""
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.addTraining(training);
    setOpen(false);
  };

  const addTraining = () => {
    fetch('http://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setCustomer(data.content.links.href))
        props.saveTraining(training);
        handleClose();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training ({customer.name})</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Date"
            inputFormat="dd/MM/yyyy HH:mm"
            mask="__/__/____ __:__"
            value={training.date}
            onChange={(e) => setTraining({ ...training, date: e.target.value })}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Duration in minutes"
            value={training.duration}
            onChange={(e) =>
              setTraining({ ...training, duration: e.target.value })
            }
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Activity"
            value={training.activity}
            onChange={(e) =>
              setTraining({ ...training, activity: e.target.value })
            }
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
