import Flex from "@react-css/flex";
import "./settings.css";

import Divider from "@mui/material/Divider/Divider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GitHubIcon from "@mui/icons-material/GitHub";
import SecurityIcon from "@mui/icons-material/Security";
import LogoutIcon from "@mui/icons-material/Logout";

const UserSettings = () => {
  return (
    <Flex row gap={10} className="m-3">
      <div className="w-25 card m-auto shadow">
        <div className="card-body">Settings</div>
        <Divider />
        <Flex column>
          <div className="card-body settings-menu-list">
            <AccountCircleIcon fontSize="large" className="me-2" />
            Account
          </div>
          <div className="card-body settings-menu-list">
            <GitHubIcon fontSize="large" className="me-2" />
            Projects
          </div>
          <div className="card-body settings-menu-list">
            <SecurityIcon fontSize="large" className="me-2" />
            Security
          </div>
          <div className="card-body settings-menu-list">
            <LogoutIcon fontSize="large" className="me-2" />
            Logout
          </div>
        </Flex>
      </div>
      <div className="w-75 card m-auto shadow">
        <div className="card-body flex-fill">settings</div>
      </div>
    </Flex>
  );
};

export default UserSettings;
