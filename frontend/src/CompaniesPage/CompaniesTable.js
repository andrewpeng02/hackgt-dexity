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
      name: "STOCK TICKER",
      selector: "ticker",
      sortable: true
    },
    {
      name: "CAPITAL ($)",
      selector: "capital",
      sortable: true
    },
    {
      name: "% CHANGE TODAY",
      selector: "changeToday",
      sortable: true,
    },
    {
      name: "% CHANGE THIS MONTH",
      selector: "changeMonth",
      sortable: true,
    }
  ];

const fakeData = [
      {
        companyName: "Walmart",
        ticker: "WMT",
        capital: 4542,
        changeToday: 0.32,
        changeMonth: 10.11
      },
      {
        companyName: "Apple",
        ticker: "AAPL",
        capital: 3142,
        changeToday: 1.01,
        changeMonth: 12.02
      },
      {
        companyName: "Google",
        ticker: "GOOG",
        capital: 2621,
        changeToday: -3.14,
        changeMonth: 19.91
      },
      {
        companyName: "Microsoft",
        ticker: "MSFT",
        capital: 340,
        changeToday: -0.03,
        changeMonth: -0.01
      },
      {
        companyName: "PG&E",
        ticker: "PGE",
        capital: 112,
        changeToday: 0.13,
        changeMonth: 1.13
      },
      {
        companyName: "Walmart",
        ticker: "WMT",
        capital: 4542,
        changeToday: 0.32,
        changeMonth: 10.11
      },
      {
        companyName: "Apple",
        ticker: "AAPL",
        capital: 3142,
        changeToday: 1.01,
        changeMonth: 12.02
      },
      {
        companyName: "Google",
        ticker: "GOOG",
        capital: 2621,
        changeToday: -3.14,
        changeMonth: 19.91
      },
      {
        companyName: "Microsoft",
        ticker: "MSFT",
        capital: 340,
        changeToday: -0.03,
        changeMonth: -0.01
      },
      {
        companyName: "PG&E",
        ticker: "PGE",
        capital: 112,
        changeToday: 0.13,
        changeMonth: 1.13
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
            fontSize: '11px'
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
            fontFamily: 'Avenir Next'
        },
    },
};
  
function CompaniesTable() {
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

export default CompaniesTable;