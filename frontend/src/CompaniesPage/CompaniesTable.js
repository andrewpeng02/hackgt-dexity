/* eslint-disable */
import React from "react";
import DataTable from "react-data-table-component";
import Paper from "@mui/material/Paper";
import SortIcon from "@mui/icons-material/ArrowDownward";

const columns = [
  {
    name: "COMPANY NAME",
    selector: "name",
    sortable: true,
  },
  {
    name: "STOCK TICKER",
    selector: "ticker",
    sortable: true,
  },
  {
    name: "CAPITAL ($)",
    selector: "capital",
    sortable: true,
  },
  {
    name: "% CHANGE TODAY",
    selector: "percentDayChange",
    sortable: true,
  },
  {
    name: "% CHANGE THIS MONTH",
    selector: "percentMonthChange",
    sortable: true,
  },
];

const customStyles = {
  rows: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
      borderRadius: "0px",
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
      fontFamily: "Avenir Next",
      fontStyle: "semibold",
      fontSize: "11px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
      fontFamily: "Avenir Next",
    },
  },
};

function CompaniesTable({ data }) {
  return (
    <div>
      <DataTable
        customStyles={customStyles}
        columns={columns}
        data={data}
        defaultSortField="title"
        sortIcon={<SortIcon />}
        striped
      />
    </div>
  );
}

export default CompaniesTable;
