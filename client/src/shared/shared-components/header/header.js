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
import "./header.css";
import { useState, useEffect } from "react";
import Logout from "@mui/icons-material/Logout";
import LogoutFunction from "../../../shared/shared-components/logout/logout";
import HeaderMenu from "./headerMenu";

export const AppHeader = ({ username, userrole, setAuth }) => {
  const [achorEl, setAnchorEl] = useState(null);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState("");
  const open = Boolean(achorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setName(username);
    setRole(userrole);
    // setIsLoading(false);
  });

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
              return <div key={"null"}></div>;
            }
          })}
          <Flex>
            <HeaderMenu name={name} role={role} setAuth={setAuth} />
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};
