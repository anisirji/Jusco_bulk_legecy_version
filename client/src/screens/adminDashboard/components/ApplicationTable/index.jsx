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

export default function ApplicationTable({ data, actionLink, setApplicantData }) {
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
              <StyledTableCell align="center">Application Id</StyledTableCell>
              <StyledTableCell align="center">Business Name</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Mobile No.</StyledTableCell>
              <StyledTableCell align="center">Zone</StyledTableCell>
              <StyledTableCell align="center">Area</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">
                Entry/Application Date
              </StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, i) => (
              <StyledTableRow key={row?.application_no}>
                <StyledTableCell align="right">{i + 1}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row?.application_no}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" align="left">
                  {row?.billing_estb_name}
                </StyledTableCell>
                <StyledTableCell align="left"> {row?.salutation + ". " + row?.first_name + " " + row?.last_name}</StyledTableCell>
                <StyledTableCell component="th" scope="row" align="left">
                  {row?.billing_zone}
                </StyledTableCell>
                <StyledTableCell align="right">{row?.mobile_no}</StyledTableCell>
                <StyledTableCell align="left">{row?.billing_area}</StyledTableCell>
                <StyledTableCell align="left">{row?.status}</StyledTableCell>
                <StyledTableCell align="right">
                  {row?.entry_date}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    onClick={() => {
                      setApplicantData(row)
                      navigate(actionLink);
                    }}
                    variant="text"
                  >
                    View
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
