/* eslint-disable */
import React from "react";
import DataTable from "react-data-table-component";
import Paper from "@mui/material/Paper";
import SortIcon from "@mui/icons-material/ArrowDownward";


const columns = [
    {
      name: "SECTOR NAME",
      selector: "sectorName",
      sortable: true
    },
    {
      name: "CAPITAL ($)",
      selector: "capital",
      sortable: true
    },
    {
      name: "BIGGEST COMPANY",
      selector: "biggestCompany",
      sortable: true,
    }
  ];

const fakeData = [
      {
        sectorName: "Financials",
        capital: 4592,
        biggestCompany: "Blackrock"
      },
      {
        sectorName: "Energy",
        capital: 3365,
        biggestCompany: "PG&E"
      },
      {
        sectorName: "Consumer Staples",
        capital: 2296,
        biggestCompany: "Walmart"
      },
      {
        sectorName: "Utilities",
        capital: 597,
        biggestCompany: "Southern Company"
      },
      {
        sectorName: "Technology",
        capital: 332,
        biggestCompany: "Apple"
      },
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
  
function SectorTable() {
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

export default SectorTable;