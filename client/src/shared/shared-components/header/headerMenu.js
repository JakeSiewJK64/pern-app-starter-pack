import Flex from "@react-css/flex";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import "./header.css";
import { useState } from "react";
import Logout from "@mui/icons-material/Logout";
import LogoutFunction from "../../../shared/shared-components/logout/logout";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const HeaderMenu = ({ name, role, setAuth }) => {
  const [achorEl, setAnchorEl] = useState(false);
  const open = Boolean(achorEl);
  const handleClick = () => {
    setAnchorEl(!achorEl);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="mt-3 w-100">
      {achorEl ? (
        <div open={open} onClose={handleClose} onClick={handleClose}>
          <div className="card-body menu-card m-2 p-2 shadow">
            {name !== undefined && role !== undefined ? (
              <Flex column className="m-auto" alignItemsCenter>
                <Avatar />
                <p>{name}</p>
                <span className="rounded-pill text-white p-2 bg-primary m-auto">
                  {role}
                </span>
                <div className="mt-3">
                  <Divider />
                  <Link to="profile">
                    <Button variant="text" className="item">
                      <ListItemIcon>
                        <PersonAdd fontSize="small" />
                      </ListItemIcon>
                      Profile
                    </Button>
                  </Link>
                  <Link to="settings">
                    <Button variant="text" className="item">
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      Settings
                    </Button>
                  </Link>
                  <Divider className="m-2" />
                  <Button
                    variant="text"
                    onClick={(x) => LogoutFunction({ setAuth })}
                    className="item"
                  >
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </Button>
                </div>
              </Flex>
            ) : (
              <div>loading...</div>
            )}
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <Tooltip title="Account settings">
        <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
          <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default HeaderMenu;
