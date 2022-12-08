import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function EditCustomer(props) {
  const [open, setOpen] = React.useState(false);
  const [customer, setCustomer] = React.useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
    console.log(props.data);
    setCustomer({
      firstname: props.customer.firstname,
      lastname: props.customer.lastname,
      streetaddress: props.customer.streetaddress,
      postcode: props.customer.postcode,
      city: props.customer.city,
      email: props.customer.email,
      phone: props.customer.phone
    });
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleInputChange = (e) => {
    setCustomer({...customer, [e.target.name]: e.target.value})
  };

  const updateCustomer = () => {
    props.updateCustomer(customer, props.customer.links[0].href);
    setOpen(false);
  }

  return (
    <div>
      <Button size="small" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="First name"
            name="firstname"
            value={customer.firstname}
            onChange={e => handleInputChange(e)}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Last name"
            name="lastname"
            value={customer.lastname}
            onChange={e => handleInputChange(e)}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Street address"
            name="streetaddress"
            value={customer.streetaddress}
            onChange={e => handleInputChange(e)}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Postcode"
            name="postcode"
            value={customer.postcode}
            onChange={e => handleInputChange(e)}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="City"
            name="city"
            value={customer.city}
            onChange={e => handleInputChange(e)}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            value={customer.email}
            onChange={e => handleInputChange(e)}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Phone"
            name="phone"
            value={customer.phone}
            onChange={e => handleInputChange(e)}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateCustomer}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
