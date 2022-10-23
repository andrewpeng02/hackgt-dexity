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
    name: "CAPITAL ($)",
    selector: "capital",
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
      fontSize: "15px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
      fontFamily: "Avenir Next",
      fontSize: "15px",
    },
  },
};

function BreakdownTable({ data }) {
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

export default BreakdownTable;
