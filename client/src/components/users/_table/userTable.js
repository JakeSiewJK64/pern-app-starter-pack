import React, { useState } from "react";
import User from "../../../shared/architecture-api";
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
    state: { pageIndex, pageSize },
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
    console.log("page suze: ", pageSize);
  };

  const openDialogFunction = (userchoice) => {
    setOpenDialog(true);
    setSelectedUser(
      new User(
        userchoice.row.original.user_name,
        userchoice.row.original.user_email
      )
    );
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
          <TableHead>
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
                rowsPerPage={pageSize != undefined ? pageSize : 5}
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
