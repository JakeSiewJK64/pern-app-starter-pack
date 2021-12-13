import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  DialogTitle,
} from "@mui/material";
import React from "react";
import Flex from "@react-css/flex";
import { useFormik } from "formik";
import { toast } from "react-toastify";

export default function UserDetailsDialog({ isOpen, setOpen, userData }) {
  const handleClose = () => {
    setOpen(false);
  };

  var formik;
  const GetFormikConfig = () => {
    formik = useFormik({
      initialValues: {
        email: "jakewashere@gmail.com",
        user_name: userData.user_name,
        user_email: userData.user_email,
        user_role: userData.user_role,
        user_firstname: userData.user_firstname,
        user_lastname: userData.user_lastname,
      },
      onSubmit: (val) => {
        toast.success("Successfully updated user!");
        console.log(val);
      },
    });
  };

  if (isOpen) {
    GetFormikConfig();
    return (
      <div>
        <Dialog open={isOpen}>
          <form onSubmit={formik.handleSubmit}>
            <DialogTitle>Edit User Details</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To subscribe to this website, please enter your email address
                here. We will send updates occasionally.
              </DialogContentText>
              <Flex row gap={10}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Userame"
                  name="user_name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={formik.values.user_name}
                  onChange={formik.handleChange}
                />
                <TextField
                  label="Email Address"
                  type="email"
                  id="email"
                  autoFocus
                  margin="dense"
                  name="user_email"
                  fullWidth
                  onChange={formik.handleChange}
                  value={formik.values.user_email}
                  variant="outlined"
                />
              </Flex>
              <Flex row gap={10}>
                <TextField
                  name="user_firstname"
                  label="FirstName"
                  autoFocus
                  margin="dense"
                  aria-label="firstname"
                  type="text"
                  variant="outlined"
                  id="firstname"
                  margin="dense"
                  autoFocus
                  fullWidth
                  onChange={formik.handleChange}
                  value={formik.values.user_firstname}
                />
                <TextField
                  value={formik.values.user_lastname}
                  label="LastName"
                  autoFocus
                  margin="dense"
                  onChange={formik.handleChange}
                  aria-label="lastname"
                  fullWidth
                  type="text"
                  name="user_lastname"
                  variant="outlined"
                  id="lastname"
                />
              </Flex>
              <Flex>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Age</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="user_role"
                    value={formik.values.user_role}
                    label="Role"
                    onChange={formik.handleChange}
                  >
                    <MenuItem value={"administrator"}>administrator</MenuItem>
                    <MenuItem value={"user"}>user</MenuItem>
                    <MenuItem value={"contributor"}>contributor</MenuItem>
                  </Select>
                </FormControl>
              </Flex>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
              <Button type="submit">Save</Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  } else {
    return <div></div>;
  }
}
