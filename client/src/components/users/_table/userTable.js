import React, { useState } from "react";
import "../users.css";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@material-ui/core";
import MaUTable from "@material-ui/core/Table";
import { usePagination, useTable } from "react-table";
import TablePagination from "@material-ui/core/TablePagination/TablePagination";
import UserDetailsDialog from "../_dialog/userDetailsDialog";

export default function UserTable({ columns, data }) {
  const [paginatorPage, setPaginatorPage] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setSelectedUser] = useState(null);
  const [rowNumberSelection] = useState([
    2,
    5,
    10,
    15,
    20,
    50,
    100,
    { label: "ALL", value: data.length },
  ]);
  const {
    getTableProps,
    getTableBodyProps,
    setPageSize,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    gotoPage,
    state: { pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    usePagination
  );

  const handleChangePage = (event, newPage) => {
    setPaginatorPage(newPage);
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(Number(event.target.value));
  };

  const openDialogFunction = (userchoice) => {
    setOpenDialog(true);
    setSelectedUser({
      image_url: userchoice.row.original.image_url,
      user_id: userchoice.row.original.user_id,
      user_name: userchoice.row.original.user_name,
      user_email: userchoice.row.original.user_email,
      user_firstname: userchoice.row.original.first_name,
      user_lastname: userchoice.row.original.last_name,
      user_role: userchoice.row.original.role_name,
    });
  };

  return (
    <div>
      <UserDetailsDialog
        isOpen={openDialog}
        setOpen={setOpenDialog}
        userData={user}
      />
      <TableContainer>
        <MaUTable {...getTableProps()}>
          <TableHead className="user-table-head">
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell {...column.getHeaderProps()}>
                    <b>{column.render("Header")}</b>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <TableCell
                        {...cell.getCellProps()}
                        onClick={() => {
                          openDialogFunction(cell);
                        }}
                      >
                        {cell.render("Cell")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                className="paginator"
                count={data.length}
                page={paginatorPage}
                onPageChange={handleChangePage}
                rowsPerPage={pageSize !== undefined ? pageSize : 5}
                rowsPerPageOptions={rowNumberSelection}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </MaUTable>
      </TableContainer>
    </div>
  );
}
