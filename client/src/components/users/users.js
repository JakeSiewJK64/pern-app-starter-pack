import { useEffect, useState } from "react";
import { Card } from "@material-ui/core";
import CustomTable from "../../shared/shared-components/table/table";
import LoadingSpinner from "../../shared/shared-components/loadingSpinner/loadingSpinner";

const Users = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [columns, setColumns] = useState([
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

  useEffect(() => {
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
    fetchUsers();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  } else {
    return (
      <div>
        <h2>Users</h2>
        <Card elevation={12} className="w-75 m-auto">
          <CustomTable columns={columns} data={users} />
        </Card>
      </div>
    );
  }
};

export default Users;
