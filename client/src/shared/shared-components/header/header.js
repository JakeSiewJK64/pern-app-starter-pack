import { Button } from "@material-ui/core";
import { header_routes } from "../../constants";
import Flex from "@react-css/flex";
import { Link } from "react-router-dom";
import logo from "../../../img/logo.svg";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import "./header.css";
import { useState, useEffect } from "react";

export const AppHeader = ({ props, username, userrole }) => {
  const [achorEl, setAnchorEl] = useState(null);
  const [routes, setRoutes] = useState([]);
  const open = Boolean(achorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    props(false);
    localStorage.removeItem("token");
  };

  return (
    <div className="w-100">
      <Flex justifySpaceBetween>
        <Link to="/" className="logo">
          <Flex row justifyCenter>
            <img src={logo} className="logo-config" alt="logo" />
            <h3 className="my-3">React</h3>
          </Flex>
        </Link>
        <Flex className="me-5">
          {header_routes.map((x) => {
            if (x.role === undefined) {
              return (
                <Link
                  className="m-2 p-2 link-style"
                  to={x.route}
                  key={header_routes.indexOf(x)}
                >
                  <Button variant="outlined">
                    <span className="link-style">{x.title}</span>
                  </Button>
                </Link>
              );
            } else if (
              x.role !== undefined &&
              x.role.includes("administrator") &&
              userrole === "administrator"
            ) {
              return (
                <Link
                  className="m-2 p-2 link-style"
                  to={x.route}
                  key={header_routes.indexOf(x)}
                >
                  <Button variant="outlined">
                    <span className="link-style">{x.title}</span>
                  </Button>
                </Link>
              );
            } else {
              return <div key={null}></div>;
            }
          })}

          <Flex>
            <Tooltip title="Account settings">
              <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
              </IconButton>
            </Tooltip>
          </Flex>
        </Flex>
      </Flex>
      <Menu
        anchorEl={achorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Flex column className="m-auto" alignItemsCenter>
            <Avatar />
            <p>{username}</p>
            <span className="role-badge">{userrole}</span>
          </Flex>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          View my Profile
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};
