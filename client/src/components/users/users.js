import { useEffect, useState } from "react";
import { Card, Button, IconButton } from "@material-ui/core";
import UserTable from "./_table/userTable";
import LoadingSpinner from "../../shared/shared-components/loadingSpinner/loadingSpinner";
import Flex from "@react-css/flex";
import UserDetailsDialog from "./_dialog/userDetailsDialog";

import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";

const Users = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [isAddNewUser] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [columns] = useState([
    {
      id: "col1",
      Header: "ID",
      accessor: "user_id",
      width: 20,
    },
    {
      id: "col2",
      Header: "Name",
      accessor: "user_name",
      width: 40,
    },
    {
      id: "col3",
      Header: "Email",
      accessor: "user_email",
      width: 40,
    },
    {
      id: "col4",
      Header: "Role",
      accessor: "role_name",
      width: 40,
    },
  ]);

  const fetchUsers = async () => {
    await fetch("/users/getAllUsers", {
      method: "GET",
      headers: {
        jwt_token: localStorage.token,
      },
    })
      .then((x) => x.json())
      .then((res) => {
        setUsers(res);
        setIsLoading(false);
      });
  };

  const openDialogFunction = () => {
    setOpenDialog(true);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (isLoading) {
    fetchUsers();
    return <LoadingSpinner />;
  } else {
    return (
      <div className="w-75 m-auto">
        <UserDetailsDialog
          isOpen={openDialog}
          setUsers={setUsers}
          setOpen={setOpenDialog}
          userData={null}
        />
        <Card elevation={12} className="w-75 m-auto">
          <Flex row className="m-4">
            <h2>Users</h2>
            <Flex row className="ms-auto" gap={5}>
              <IconButton onClick={fetchUsers}>
                <RefreshIcon />
              </IconButton>
              <Button
                onClick={openDialogFunction}
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                className="ml-auto"
              >
                Add User
              </Button>
            </Flex>
          </Flex>
          <UserTable
            columns={columns}
            data={users}
            isAddNewUser={isAddNewUser}
          />
        </Card>
      </div>
    );
  }
};

export default Users;
