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

import EditIcon from "@mui/icons-material/Edit";

import React, { useRef } from "react";
import Flex from "@react-css/flex";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { SetUser } from "../../../redux/actions/userActions/latestAddedUser";
import profile from "../../../img/empty-profile.png";
import "../users.css";

export default function UserDetailsDialog({ isOpen, setOpen, userData }) {
  const roleMenu = ["administrator", "contributor", "user"];
  const dispatch = useDispatch();
  var formik;
  var imageRef;

  const handleClose = () => {
    setOpen(false);
  };

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

  const GetFormikConfig = () => {
    formik = useFormik({
      initialValues: {
        user_name: userData.user_name,
        image_url: userData.image_url,
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
        image_url: "",
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

  const GetImageRef = () => {
    imageRef = useRef();
  };

  if (isOpen) {
    GetImageRef();

    const onImageUploadClick = () => {
      imageRef.current.click();
    };

    const handleFileInputChange = (e) => {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (x) => {
        var file = x.target.result.toString();
        formik.values.image_url = file;
      };
    };

    userData ? GetFormikConfig() : SetAddNewUser();

    return (
      <div>
        <input
          ref={imageRef}
          type="file"
          id="file"
          name="image_url"
          onChange={handleFileInputChange}
          accept="image/*"
          style={{ display: "none" }}
        />
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
              <Flex alignItemsCenter>
                <img
                  src={
                    formik.values.image_url ? formik.values.image_url : profile
                  }
                  alt="profile"
                  draggable={false}
                  onClick={onImageUploadClick}
                  style={{ width: "5rem", zIndex: 2 }}
                  className="m-3 rounded-circle m-auto profile-circle"
                />
                <EditIcon fontSize="medium" className="edit-icon" />
              </Flex>
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
