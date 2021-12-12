import { useEffect, useState } from "react";
import { Card } from "@material-ui/core";
import CustomTable from "../../shared/shared-components/table/table";

const Users = () => {
  const [columns, setColumns] = useState([
    {
      id: "col1",
      Header: "Name",
      accessor: "name",
      width: 50,
    },
    {
      id: "col2",
      Header: "Email",
      accessor: "email",
      width: 50,
    },
  ]);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "jake",
      email: "jake@gmail.com",
    },
    {
      id: 2,
      name: "daniel",
      email: "daniel@gmail.com",
    },
    {
      id: 3,
      name: "daniel",
      email: "daniel@gmail.com",
    },
    {
      id: 4,
      name: "daniel",
      email: "daniel@gmail.com",
    },
    {
      id: 5,
      name: "daniel",
      email: "daniel@gmail.com",
    },
    {
      id: 6,
      name: "daniel",
      email: "daniel@gmail.com",
    },
    {
      id: 7,
      name: "daniel",
      email: "daniel@gmail.com",
    },
    {
      id: 8,
      name: "daniel",
      email: "daniel@gmail.com",
    },
    {
      id: 9,
      name: "daniel",
      email: "daniel@gmail.com",
    },
    {
      id: 9,
      name: "daniel",
      email: "daniel@gmail.com",
    },
    {
      id: 9,
      name: "daniel",
      email: "daniel@gmail.com",
    },
    {
      id: 9,
      name: "daniel",
      email: "daniel@gmail.com",
    },
    {
      id: 10,
      name: "daniel",
      email: "daniel@gmail.com",
    },
    {
      id: 11,
      name: "daniel",
      email: "daniel@gmail.com",
    },
  ]);

  useEffect(() => {}, []);

  const RenderTable = () => {
    if (!users.length) {
      return <p>loading...</p>;
    } else {
      return <CustomTable columns={columns} data={users} />;
    }
  };

  return (
    <div>
      <h2>Users</h2>
      <Card elevation={12} className="w-75 m-auto">
        <RenderTable />
      </Card>
    </div>
  );
};

export default Users;
