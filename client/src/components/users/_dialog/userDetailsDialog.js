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

export default function UserDetailsDialog({ isOpen, setOpen, userData }) {
  const [value, setValue] = useState(null);
  const handleClose = () => {
    setOpen(false);
  };

  if (isOpen) {
    return (
      <div>
        <Dialog open={isOpen}>
          <DialogTitle>Edit User Details</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <Flex gap={10}>
              <TextField
                value={userData.user_name}
                autoFocus
                margin="dense"
                id="name"
                label="Userame"
                type="text"
                fullWidth
                variant="outlined"
              />
              <TextField
                value={userData.user_email}
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
                value={userData.user_firstname}
                label="FirstName"
                aria-label="firstname"
                type="text"
                fullWidth
                variant="outlined"
                id="firstname"
                margin="dense"
                autoFocus
              />
              <TextField
                value={userData.user_lastname}
                label="LastName"
                aria-label="lastname"
                fullWidth
                type="text"
                variant="outlined"
                id="lastname"
                margin="dense"
                autoFocus
              />
            </Flex>
            <Flex>
              <TextField
                value={userData.user_role}
                label="Role"
                aria-label="role"
                fullWidth
                variant="outlined"
                id="role"
                margin="dense"
                autoFocus
                type="text"
              />
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
