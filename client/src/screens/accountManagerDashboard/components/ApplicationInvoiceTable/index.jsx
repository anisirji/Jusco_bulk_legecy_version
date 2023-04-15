import React from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import FilterListIcon from "@mui/icons-material/FilterList";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1b84e7",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

//Hey rohit i created a seperate table component so that we can easily use same table with diffferent data.. see index.jsx page of depo manager dashboard

// <ApplicationTable
//     data={All the data in the form of object}
//     link = {link for page you want to go after clicking action btn}
//     />

// function createData(name, mobile, email, area, gstNo,isReturn,expiration) {
//   return { name, mobile, email, area, gstNo,isReturn,expiration };
// }

export default function ApplicationInvoiceTable({ data, actionLink, setApplicantData }) {
  let navigate = useNavigate();
  // console.log(data)
  // console.log(actionLink);
  return (
    <>
      <TableContainer component={Paper}>
        <div className="line"></div>
        {/* <FilterListIcon /> Sort */}
        <Table sx={{ minWidth: "700" }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Sl.No</StyledTableCell>
              <StyledTableCell align="center">Invoice Id</StyledTableCell>
              <StyledTableCell align="center">UOM</StyledTableCell>
              <StyledTableCell align="center">Quantity</StyledTableCell>
              <StyledTableCell align="center">Rate</StyledTableCell>
              <StyledTableCell align="center">Value</StyledTableCell>
              <StyledTableCell align="center">taxable</StyledTableCell>
              <StyledTableCell align="center">Total Value</StyledTableCell>
              <StyledTableCell align="center">Downloads</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, i) => (
              <StyledTableRow key={row?.invoice_id}>
                <StyledTableCell align="center">{i + 1}</StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  {row?.invoice_id}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  {row?.uom}
                </StyledTableCell>
                <StyledTableCell align="center">{row.quantiy}</StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  {row?.rate_per_unit}
                </StyledTableCell>
                <StyledTableCell align="center">{row?.value}</StyledTableCell>
                <StyledTableCell align="center">{row?.taxable}</StyledTableCell>
                <StyledTableCell align="center">{row?.total_value}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    onClick={() => {
                      setApplicantData(row)
                      navigate(actionLink);
                    }}
                    variant="text"
                  >
                    Download
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
