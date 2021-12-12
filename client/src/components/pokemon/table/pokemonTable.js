import React, { useState } from "react";
import {
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
  TableCell,
  TableRow,
} from "@material-ui/core";
import MaUTable from "@material-ui/core/Table";
import { usePagination, useTable } from "react-table";
import TablePagination from "@material-ui/core/TablePagination/TablePagination";
import './pokemonTable.css';


export default function PokemonTable({ columns, data }) {
  const [paginatorPage, setPaginatorPage] = useState(0);
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

  return (
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
                    <TableCell {...cell.getCellProps()} className="pokemonRow">
                      <p>{cell.render("Cell")}</p>
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
  );
}
