import { useEffect, useState } from "react";
import { Card, Button } from "@material-ui/core";
import UserTable from "./_table/userTable";
import AddIcon from "@mui/icons-material/Add";
import LoadingSpinner from "../../shared/shared-components/loadingSpinner/loadingSpinner";
import { Stack } from "@mui/material";
import UserDetailsDialog from "./_dialog/userDetailsDialog";

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

  const openDialogFunction = (userchoice) => {
    setOpenDialog(true);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  } else {
    return (
      <div className="w-75 m-auto">
        <UserDetailsDialog
          isOpen={openDialog}
          setOpen={setOpenDialog}
          userData={null}
        />
        <Card elevation={12} className="w-75 m-auto">
          <Stack direction="row" className="m-4">
            <h2>Users</h2>
            <Stack className="ms-auto">
              <Button
                onClick={openDialogFunction}
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                className="ml-auto"
              >
                Add User
              </Button>
            </Stack>
          </Stack>
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
