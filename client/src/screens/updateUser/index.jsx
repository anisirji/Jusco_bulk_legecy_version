import React, { useState, useRef, useEffect } from "react";
import { styles } from "./style";
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

export default function UpdateUserData() {

  let navigate = useNavigate()

  const [role, setRole] = useState(0);
  const [isActive, setIsActive] = useState("yes");
  const [userId, setUserId] = useState("");

  const [creds, setCreds] = useState({
    user_name: "",
    password: "",
    user_role: role,
    active: isActive,
    email: "",
    phoneNo: "",
    isAdmin: "",
    entry_by: 1,
    mod_by: 1,
  });

  const [userDetails, setUserDetails] = useState("");

  const fetchUser = async (e) => {
    const login = await axios
      .post("/login", { username: userId, password: "" })
      .then((res) => {
        console.log(res?.data);
        localStorage.setItem("adminToken", res.data?.token);
        setCreds(res.data?.data);
        setRole(res.data?.data?.user_role);
      });
  };

  // console.log(creds)

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const handleChange = (key) => {
    key.preventDefault();
    setCreds({ ...creds, [key.target.id]: key.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    creds.user_role = parseInt(creds.user_role);
    axios
      .post("/updateUserData", {
        login_id: userId,
        updatedData: creds,
        token: localStorage.getItem("adminToken"),
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
        <Typography sx={styles.dashboardText}>Update user data</Typography>
        <Paper variant="outlined" sx={styles.fieldContainer}>
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
            size="small"
            id="phone_no"
            type="text"
            label="Mobile number"
            placeholder="Phone number"
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
            }}
            sx={styles.inputField}
          />
          <TextField
            size="small"
            id="user_name"
            type="text"
            label="Name"
            placeholder="Name"
            value={creds?.user_name || ""}
            onChange={handleChange}
            sx={styles.inputField}
          />

          <TextField
            size="small"
            id="email"
            type="email"
            label="Email Id"
            placeholder="email id"
            value={creds?.email || ""}
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
              <MenuItem value={"1"}>admin</MenuItem>
              <MenuItem value={"2"}>depot manager</MenuItem>
              <MenuItem value={"3"}>hod</MenuItem>
              <MenuItem value={"4"}>accounts</MenuItem>
              <MenuItem value={"5"}>customer</MenuItem>
              <MenuItem value={"6"}>d2d</MenuItem>
              <MenuItem value={"7"}>fw</MenuItem>
            </Select>
          </FormControl>

          {/* <FormControl size="small" sx={styles.inputField} fullWidth>
            <InputLabel id="user role">Active</InputLabel>
            <Select
              labelId="Active"
              id="user role"
              value={isActive}
              label="active"
              onChange={(e) => {
                setIsActive(e.target.value);
              }}
            >
              <MenuItem value={"yes"}>Yes</MenuItem>
              <MenuItem value={"no"}>No</MenuItem>
            </Select>
          </FormControl> */}
        </Paper>

        <Button
          variant="contained"
          sx={styles.submitBtn}
          onClick={submitHandler}
          disabled={creds?.phoneNo === ""}
        >
          Update Data
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
