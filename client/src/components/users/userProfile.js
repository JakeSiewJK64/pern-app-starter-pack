import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import Flex from "@react-css/flex";
import profile from "../../img/empty-profile.png";
const UserProfile = () => {
  const [user, setUser] = useState(null);

  const getUserProfile = async () => {
    const res = await fetch("/auth/userprofile", {
      method: "GET",
      headers: {
        jwt_token: localStorage.token,
      },
    });
    const parseRes = await res.json();
    if (parseRes) {
      setUser(parseRes);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  if (user) {
    return (
      <div className="w-50 m-auto card">
        <Flex column className="m-auto p-3">
          <h2>My Profile</h2>
          <img
            src={profile}
            alt="profile"
            draggable={false}
            style={{ width: "5rem" }}
            className="m-3 rounded-circle"
          />
        </Flex>
        <div className="card-body">
          <Flex column gap={10}>
            <Flex row gap={10}>
              <TextField label="Username" fullWidth value={user.user_name} />
              <TextField label="Email" fullWidth value={user.user_email} />
            </Flex>
            <Flex row gap={10}>
              <TextField label="First Name" fullWidth value={user.first_name} />
              <TextField label="Last Name" fullWidth value={user.last_name} />
            </Flex>
          </Flex>
        </div>
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
};

export default UserProfile;
