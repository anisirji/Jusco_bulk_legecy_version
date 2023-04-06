import React, { useState, useRef, useEffect } from "react";
import { styles } from "./styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { createChainedFunction, FormLabel } from "@mui/material";
import { Navigate } from "react-router-dom";
// {"user_name": "test",
// "password": "root",
// "user_role": 2,
// "active":"yes",
// "email":"myemail",
// "phoneNo":"7409192002",
// "isAdmin":"no",
// "entry_by":1,
// "mod_by": 1
// }

export default function CreateUser() {

  let navigate = useNavigate()

  const [creds, setCreds] = useState({
    first_name:"",
    last_name: "",
    password: "nulli_Ka_Pani",
    user_role: "",
    email: "",
    phone_no: "",
    isAdmin: "",
    login_id: "",
  });
  const [role, setRole] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  console.log(isAdmin);
  const handleChange = (key) => {
    key.preventDefault();
    setCreds({ ...creds, [key.target.id]: key.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    axios
      .post("/createUser", {
        first_name: creds.first_name,
        last_name: creds.last_name,
        password: creds.password,
        user_role: role,
        active: "YES",
        entry_by: 1,
        mod_by: 1,
        email: creds.email,
        phone_no: creds.phone_no,
        isAdmin: "NO",
        login_id: creds.phone_no.toString(),
      })
      .then((res) => {
        console.log(res.data);
        alert(res.data?.message);
      });

    // setOpen(true);
  };

  const mediaQuery = window.matchMedia("(max-width: 650px)");

  const divForScroll = useRef(null);

  return (
    <>
      <Container maxWidth="xl" sx={styles.container}>
      <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          onClick={() => {
            navigate(-1);
          }}
          sx={{ position: "absolute", top: "10px", left: "20px" }}
        >
          <ArrowBackIcon />
        </IconButton>
        <img
          style={mediaQuery.matches ? styles.imgLogoMobile : styles.imgLogo}
          src={require("../../assets/image/logo.png")}
          alt=""
          srcset=""
        />
        <Typography sx={styles.head}>Bulk Generation System</Typography>
        <Typography sx={styles.dashboardText}>New User</Typography>
        <Paper variant="outlined" sx={styles.fieldContainer}>
          <TextField
            required
            size="small"
            id="first_name"
            type="text"
            label="First Name"
            placeholder="first Name"
            value={creds.first_name || ""}
            onChange={handleChange}
            sx={styles.inputField}
          />
          
          <TextField
            required
            size="small"
            id="last_name"
            type="text"
            label="Last Name"
            placeholder="Last Name"
            value={creds.last_name || ""}
            onChange={handleChange}
            sx={styles.inputField}
          />

          {/* <TextField
            required
              size="small"
              id="password"
              type="text"
              label="Password"
              placeholder="Password"
              value={creds.password || ""}
              onChange={handleChange}
              sx={styles.inputField}
            /> */}

          <TextField
            required
            size="small"
            id="phone_no"
            type="text"
            label="Mobile number"
            placeholder="Phone number"
            value={creds.phone_no || ""}
            onChange={handleChange}
            sx={styles.inputField}
          />
          <TextField
            required
            size="small"
            id="email"
            type="email"
            label="Email Id"
            placeholder="email id"
            value={creds.email || ""}
            onChange={handleChange}
            sx={styles.inputField}
          />

          <FormControl size="small" sx={styles.inputField} fullWidth>
            <InputLabel id="user role">{"User Role"}</InputLabel>
            <Select
              labelId="user role"
              id="user role"
              value={role}
              label="user role"
              onChange={(e) => {
                setRole(e.target.value);
              }}
            >
              {/* <MenuItem value={1}>Admin</MenuItem> */}
              <MenuItem value={2}>Depot Manager</MenuItem>
              <MenuItem value={3}>HOD</MenuItem>
              <MenuItem value={4}>Accounts</MenuItem>
              {/* <MenuItem value={5}>Customer</MenuItem> */}
              <MenuItem value={6}>d2d</MenuItem>
              <MenuItem value={7}>Field Worker</MenuItem>
            </Select>
          </FormControl>

          <FormGroup>
            {/* <FormControlLabel
              control={<Checkbox
              value={isAdmin}
                 onChange={(e)=>{setIsAdmin(e.target.checked)}} />}
              label="is Admin"
            /> */}
          </FormGroup>
        </Paper>

        <Button
          variant="contained"
          sx={styles.submitBtn}
          onClick={submitHandler}
        >
          Create User
        </Button>
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
