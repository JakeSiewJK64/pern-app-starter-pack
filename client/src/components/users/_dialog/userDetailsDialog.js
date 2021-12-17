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
import { useDispatch } from "react-redux";
import { SetUser } from "../../../redux/actions/userActions/latestAddedUser";

export default function UserDetailsDialog({ isOpen, setOpen, userData }) {
  const roleMenu = ["administrator", "contributor", "user"];
  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  const submitUser = async (user) => {
    const res = await fetch("/users/upsertUser", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        jwt_token: localStorage.token,
      },
      body: JSON.stringify(user),
    });

    const p = await res.json();
    if (res.status === 500) {
      toast.error(p.msg);
    } else {
      toast.success("Success!");
      setOpen(false);
    }
  };

  var formik;
  const GetFormikConfig = () => {
    formik = useFormik({
      initialValues: {
        user_name: userData.user_name,
        user_email: userData.user_email,
        user_role: userData.user_role,
        user_firstname: userData.user_firstname,
        user_lastname: userData.user_lastname,
      },
      onSubmit: (val) => {
        submitUser(val);
      },
    });
    formik.values.user_id = userData.user_id;
  };

  const SetAddNewUser = () => {
    formik = useFormik({
      initialValues: {
        user_id: null,
        user_name: "",
        user_email: "",
        user_password: "",
        user_role: "",
        user_firstname: "",
        user_lastname: "",
      },
      onSubmit: (val) => {
        submitUser(val);
        dispatch(SetUser(1));
      },
    });
  };

  if (isOpen) {
    userData ? GetFormikConfig() : SetAddNewUser();
    return (
      <div>
        <Dialog open={isOpen}>
          <form onSubmit={formik.handleSubmit}>
            <DialogTitle>
              {userData !== null ? "Edit" : "Add"} User Details{" "}
              {userData !== null ? `# ${userData.user_id}` : ""}
            </DialogTitle>
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
              <Flex gap={10} className="mt-2">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="user_role"
                    value={formik.values.user_role}
                    label="Role"
                    onChange={formik.handleChange}
                  >
                    {roleMenu.map((role) => {
                      return (
                        <MenuItem value={role} key={role}>
                          {role}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Flex>
              {userData === null ? (
                <Flex gap={10} className="mt-3">
                  <TextField
                    fullWidth
                    name="user_password"
                    label="Password"
                    value={formik.values.user_password}
                    onChange={formik.handleChange}
                    type="password"
                  >
                    Password
                  </TextField>
                </Flex>
              ) : (
                <div></div>
              )}
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
