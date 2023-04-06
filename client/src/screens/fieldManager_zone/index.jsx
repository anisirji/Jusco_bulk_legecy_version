import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styles } from "./styles";
import Iframe from "react-iframe";
import axios from "axios";
import Stack from '@mui/material/Stack';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Checkbox, FormLabel } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
export default function Field_zone() {

  let navigate = useNavigate()

  const mediaQuery = window.matchMedia("(max-width: 650px)");

  const [users, setUsers] = useState([])

  const [zones, setZones] = useState([])

  // const handleChange = (key) => {
  //   key.preventDefault();
  //   setCreds({ ...creds, [key.target.id]: key.target.value });
  // };

  const fetchZones = async (e) => {
    axios.post("/getApi", {
      url: "https://tsapplications.in/api/v1/data/zones"
    }).then((res) => { setZones(res.data) })
  }

  console.log(zones)

  const fetchUsers = async (e) => {
    axios
      .post("/get-all-user-by-role", {
        user_role: 7
      })
      .then((res) => {
        console.log("This is users", res.data);
        setUsers(res.data?.data)
        // sendOtp()
      });

  };

  const updateUser = async (login_id, zone, newZone) => {
    axios
      .post("/updateUserData", {
        login_id: login_id,
        updatedData: {
          zones: zone + "," + newZone
        },
        token: localStorage.getItem("adminToken"),
      })
      .then((res) => {
        // alert(res.data?.message);
        fetchUsers()
      });
  };

  const removeUser = async (login_id, zone, newZone) => {
    axios
      .post("/updateUserData", {
        login_id: login_id,
        updatedData: {
          zones: zone.filter((e) => { if (e !== newZone) return e }).toString()
        },
        token: localStorage.getItem("adminToken"),
      })
      .then((res) => {
        //alert(res.data?.message);
        fetchUsers()
      });
  };


  useEffect(() => {
    fetchUsers()
    fetchZones()
  }, [])


  const divForScroll = useRef(null);

  return (
    <>
      <div ref={divForScroll}></div>
      <Container maxWidth="xl" sx={styles.container}>
        <IconButton color="primary" aria-label="upload picture" component="label" onClick={() => { navigate(-1) }} sx={{ position: "absolute", top: "10px", left: "20px" }}>
          <ArrowBackIcon />
        </IconButton>
        <img
          style={mediaQuery.matches ? styles.imgLogoMobile : styles.imgLogo}
          src={require("./../../assets/image/logo.png")}
          alt=""
          srcset=""
        />
        <Typography sx={styles.head}>Bulk Generation System</Typography>
        <Typography sx={styles.dashboardText}>Deport Manager List</Typography>

        <Paper variant="outlined" sx={styles.fieldContainer}>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Users/Zones</TableCell>
                  {zones.map((e) => {
                    return <TableCell align="right">{e?.name}</TableCell>
                  })}

                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((row) => (
                  <TableRow
                    key={row?.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row?.first_name}
                    </TableCell>
                    {zones.map((e) => {
                      return <TableCell align="right">{row?.zones.split(",").includes(e?.name) ? <Button
                        variant="contained"
                        sx={styles.submitBtn}
                        color="error"
                        onClick={() => { removeUser(row?.login_id, row?.zones.split(","), e?.name) }}
                      >
                        remove
                      </Button> : <Button
                        variant="contained"
                        sx={styles.submitBtn}
                        onClick={() => { updateUser(row?.login_id, row?.zones, e?.name) }}
                      >
                        add
                      </Button>}</TableCell>
                    })}

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </Paper>
        <IconButton
          onClick={() => {
            divForScroll.current.scrollIntoView({ behavior: "smooth" });
          }}
          sx={styles.topScrollBtn}
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <KeyboardArrowUpIcon />
        </IconButton>
      </Container>
    </>
  );
}
