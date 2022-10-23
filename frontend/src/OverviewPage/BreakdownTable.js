/* eslint-disable */
import React from "react";
import DataTable from "react-data-table-component";
import Paper from "@mui/material/Paper";
import SortIcon from "@mui/icons-material/ArrowDownward";


const columns = [
    {
      name: "COMPANY NAME",
      selector: "companyName",
      sortable: true
    },
    {
      name: "CAPITAL ($)",
      selector: "capital",
      sortable: true
    }
  ];

const fakeData = [
      {
        companyName: "Company 1",
        capital: 459,
        growth: "up"
      },
      {
        companyName: "Company 2",
        capital: 336,
        growth: "down"
      },
      {
        companyName: "Company 3",
        capital: 229,
        growth: "same"
      }
  ]

  const customStyles = {
    rows: {
        style: {
          paddingLeft: '8px', // override the cell padding for head cells
          paddingRight: '8px',
          borderRadius: '0px'

        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
            fontFamily: 'Avenir Next',
            fontStyle: 'semibold',
            fontSize: '15px'
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
            fontFamily: 'Avenir Next',
            fontSize: '15px'
        },
    },
};
  
function BreakdownTable() {
    return (
      <div>
            <DataTable
              customStyles={customStyles}
              columns={columns}
              data={fakeData}
              defaultSortField="title"
              sortIcon={<SortIcon />}
              striped
            />
        </div>
    )
   }

export default BreakdownTable;