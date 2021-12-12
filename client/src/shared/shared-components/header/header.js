import { Button } from "@material-ui/core";
import { header_routes } from "../../constants";
import Flex from "@react-css/flex";
import { Link } from "react-router-dom";
import logo from "../../../img/logo.svg";
import "./header.css";

export const AppHeader = () => {
  return (
    <div className="w-100">
      <Flex justifySpaceBetween>
        <Link to="/" className="logo">
          <Flex row justifyCenter>
            <img src={logo} className="logo-config" alt="logo"/>
            <h3 className="my-3">React</h3>
          </Flex>
        </Link>
        <Flex>
          {header_routes.map((x) => {
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
          })}
        </Flex>
      </Flex>
    </div>
  );
};
