import { Button } from "@material-ui/core";
import { header_routes } from "../../constants";
import Flex from "@react-css/flex";
import { Link } from "react-router-dom";
import logo from "../../../img/logo.svg";
import "./header.css";
import HeaderMenu from "./headerMenu";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useSelector } from "react-redux";

export const AppHeader = ({ username, userrole, setAuth }) => {
  const usersAddCount = useSelector((state) => state.user);

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
          <Flex className="mt-3 me-1">
            <PersonAddAltIcon className="bg-primary text-white rounded-circle p-1" style={{ fontSize: "2rem" }} />
            <div className="rounded-circle bg-danger text-white notification-add-user">
              {usersAddCount}
            </div>
          </Flex>
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
          <HeaderMenu name={username} role={userrole} setAuth={setAuth} />
        </Flex>
      </Flex>
    </div>
  );
};
