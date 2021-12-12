import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import Flex from "@react-css/flex";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

export default function UserDetailsDialog({ isOpen, setOpen }) {
  const [value, setValue] = useState(null);
  const handleClose = () => {
    setOpen(false);
  };

  if (isOpen) {
    return (
      <div>
        <Dialog open={isOpen}>
          <DialogTitle>User Details</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <Flex gap={10}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Userame"
                type="name"
                fullWidth
                variant="outlined"
              />
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="outlined"
              />
            </Flex>
            <Flex column gap={10}>
              <TextField
                label="FirstName"
                aria-label="firstname"
                fullWidth
                variant="outlined"
                id="firstname"
                margin="dense"
                autoFocus
              />
              <TextField
                label="LastName"
                aria-label="lastname"
                fullWidth
                variant="outlined"
                id="lastname"
                margin="dense"
                autoFocus
              />
            </Flex>
            <Flex gap={10}>
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Phone Number"
                type="email"
                fullWidth
                variant="outlined"
              />
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Credit Token"
                type="email"
                fullWidth
                variant="outlined"
              />
              <TextField
                label="FirstName"
                aria-label="firstname"
                fullWidth
                variant="outlined"
                id="firstname"
                margin="dense"
                autoFocus
              />
            </Flex>
            <Flex>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Basic example"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Flex>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  } else {
    return <div></div>;
  }
}
