import React, { useState, useRef, useEffect } from "react";
import { styles } from "./styles";
import { useNavigate } from "react-router-dom";
import Iframe from "react-iframe";
import axios from "axios";
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
import UsrSign from "../signaturePad";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import DocumentView from "../../../document";
// import { loginUser } from "../../../../../../server/routes/userLogin";

export default  function ApplicationDetails({ applicantData }) {
  
  console.log(applicantData);

  let navigate = useNavigate();

  const mediaQuery = window.matchMedia("(max-width: 650px)");

  const [freq, setFreq] = useState(1);
  // const [category, setCategory] = useState("")
  const [mobileAck, setMobileAck] = useState(false);
  const [area, setArea] = useState("");
  const [rate, setRate] = useState("");

  const [creds, setCreds] = useState({
    Longitude: "1",
    Latitude: "",
    area: "",
    rate: "",
    remarks_depot:""
  });

  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [rates, setRates] = useState("");
  const [matrixId, setMatrixId] = useState("");
  const [finaldata,setFinalData] =useState("")
  const [monthly_billing_category, setMonthly_billing_category] =
    useState("BULK");

    async  function finalata(){
      console.log("asdfdsaf")
  const datas = await axios.post("/applicationsDetails",{"application_no":applicantData.application_no})
.then((res)=>{setFinalData(res.data)})
console.log(finaldata)
    }
   finalata()
  const handleChange = (key) => {
    key.preventDefault();
    setCreds({ ...creds, [key.target.id]: key.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    axios.post("/updateCustomerData",
    { applicantId:applicantData.customer_id, 
      updatedData:{
        frequency: parseInt(freq),
        remarks_depot:creds.remarks_depot,
        monthly_billing_category: monthly_billing_category,
        signature_on_device: mobileAck ? "yes" : "no",
        status:3
        
    }, token:localStorage.getItem("adminToken") }
  ).then((res)=>
  {
    alert(res.data.message)
    const a = res.data.flag?navigate("/depoManagerDashboard"):"continue";
  })
    // axios
    //   .post("/sendToHod", {
    //     id: applicantData.customer_id,
    //     token: localStorage.getItem("adminToken"),
    //     frequency: freq,
    //     signature_on_device: mobileAck ? "yes" : "no",
    //     deport_area: area,
    //     rate_proposed: rate,
    //     matrix_rate_id: matrixId,
    //     rate_category: "urban",
    //     monthly_billing_category: monthly_billing_category,
    //     remarks_depot:creds.remarks_depot
    //   })
    //   .then((res) => alert(res.data?.message));
    // navigate("/depoManagerDashboard")
  };



  const divForScroll = useRef(null);

  const fetchCategory = async (e) => {
    axios
      .post("/cc", {
        token: localStorage.getItem("adminToken"),
      })
      .then((res) => setCategories(res.data?.data));
    // navigate("/depoManagerDashboard")
  };

  const fetchSubCategory = async (e) => {
    axios
      .post("/csc", {
        token: localStorage.getItem("adminToken"),
        category_id: category,
      })
      .then((res) => setSubCategories(res.data?.data));
    // navigate("/depoManagerDashboard")
  };

  const fetchRate = async (e) => {
    axios
      .post("/rate", {
        token: localStorage.getItem("adminToken"),
        sub_category_id: subCategory,
      })
      .then((res) => {
        setRates(res.data?.data);
        setMatrixId(res.data?.data.id);
      });
    // navigate("/depoManagerDashboard")
  };
  console.log(rate);

  const docType = (n) => {
    if (n === 1) return "GSTIN";
    else if (n === 2) return "Vendor ID Card";
    else if (n === 3) return "Trade License";
    else if (n === 4) return "Electricity Bill";
    else if (n === 5) return "Aadhaar";
    else if (n === 6) return "PAN";
    else if (n === 7) return "Other";
    else return "";
  };
  const [docImg, setdocImg] = useState("")

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    if (category) {
      fetchSubCategory();
    }
  }, [category]);

  useEffect(() => {
    if (subCategory) {
      fetchRate();
    }
  }, [subCategory]);


  return (
    <>
    <DocumentView docImg={docImg} setdocImg={setdocImg}/>
      <div ref={divForScroll}></div>
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
          src={require("../../../../assets/image/logo.png")}
          alt=""
          srcset=""
        />
        <Typography sx={styles.head}>Bulk Generation System</Typography>
        <Typography sx={styles.dashboardText}>Application Details</Typography>

        <Paper variant="outlined" sx={styles.fieldContainer}>
          <Box sx={styles.row}>
            <div>
              <Typography sx={styles.dashboardText}>Personal Info</Typography>
              <Box sx={styles.detailsRow}>
                <Typography sx={styles.field}>Name</Typography>
                <Typography sx={styles.fieldData}>
                  {applicantData.salutation +
                    ". " +
                    applicantData.first_name +
                    " " +
                    applicantData.last_name}
                </Typography>
              </Box>

              <Box sx={styles.detailsRow}>
                <Typography sx={styles.field}>Mobile Number</Typography>
                <Typography sx={styles.fieldData}>
                  {applicantData.mobile_no}
                </Typography>
              </Box>

              <Box sx={styles.detailsRow}>
                <Typography sx={styles.field}>Email</Typography>
                <Typography sx={styles.fieldData}>
                  {applicantData.email_id}
                </Typography>
              </Box>

              <Box sx={styles.detailsRow}>
                <Typography sx={styles.field}>Designation</Typography>
                <Typography sx={styles.fieldData}>
                  {applicantData.designation}
                </Typography>
              </Box>
            </div>
            <div>
              <Typography sx={styles.dashboardText}>
                Document Details
              </Typography>
              <Box sx={styles.detailsRow}>
                <Typography sx={styles.field}>
                  {" "}
                  {docType(applicantData?.document_type_1)}
                </Typography>
        
                <Typography onClick={()=>{setdocImg(`${applicantData?.document_file_name_1}`)}} sx={styles.fieldData}>
                  {applicantData?.document_no_1}
                </Typography> 
              </Box>
              <Box sx={styles.detailsRow}>
            <Typography sx={styles.field}>
                  {" "}
                  {docType(applicantData?.document_type_2)}
                </Typography>
                <Typography onClick={()=>{setdocImg(`${applicantData?.document_file_name_2}`)}} sx={styles.fieldData}>
                  {applicantData?.document_no_2}
                </Typography>
              </Box>
              <Box sx={styles.detailsRow}>
                <Typography sx={styles.field}>
                  {" "}
                  {docType(applicantData?.document_type_3)}
                </Typography>
                <Typography onClick={()=>{setdocImg(`${applicantData?.document_file_name_3}`)}} sx={styles.fieldData}>
                  {applicantData?.document_no_3}
                </Typography>
              </Box>
            </div>
          </Box>
        </Paper>

        <Paper variant="outlined" sx={styles.fieldContainer}>
          <Box sx={styles.row}>
            <div>
              <Typography sx={styles.dashboardText}>Billing Address</Typography>
              <Box sx={styles.detailsRow}>
                <Typography sx={styles.field}>Name</Typography>
                <Typography sx={styles.fieldData}>
                  {applicantData.billing_estb_name}
                </Typography>
              </Box>

              <Box sx={styles.detailsRow}>
                <Typography sx={styles.field}>Street/ House No.</Typography>
                <Typography sx={styles.fieldData}>
                  {applicantData.billing_street}
                </Typography>
              </Box>

              <Box sx={styles.detailsRow}>
                <Typography sx={styles.field}>City</Typography>
                <Typography sx={styles.fieldData}>
                  {applicantData.billing_city}
                </Typography>
              </Box>

              <Box sx={styles.detailsRow}>
                <Typography sx={styles.field}>Region</Typography>
                <Typography sx={styles.fieldData}>
                  {applicantData.billing_region}
                </Typography>
              </Box>

              <Box sx={styles.detailsRow}>
                <Typography sx={styles.field}>Country</Typography>
                <Typography sx={styles.fieldData}>
                  {applicantData.billing_country}
                </Typography>
              </Box>
              <Box sx={styles.detailsRow}>
                <Typography sx={styles.field}>Postal Code</Typography>
                <Typography sx={styles.fieldData}>
                  {applicantData.billing_postal_code}
                </Typography>
              </Box>
            </div>

            <div>
              <Typography sx={styles.dashboardText}>Pickup Address</Typography>
              <Box sx={styles.detailsRow}>
                <Typography sx={styles.field}>Name</Typography>
                <Typography sx={styles.fieldData}>
                  {applicantData.pickup_estb_name}
                </Typography>
              </Box>

              <Box sx={styles.detailsRow}>
                <Typography sx={styles.field}>Street/ House No.</Typography>
                <Typography sx={styles.fieldData}>
                  {applicantData.pickup_street}
                </Typography>
              </Box>

              <Box sx={styles.detailsRow}>
                <Typography sx={styles.field}>City</Typography>
                <Typography sx={styles.fieldData}>
                  {applicantData.pickup_city}
                </Typography>
              </Box>

              <Box sx={styles.detailsRow}>
                <Typography sx={styles.field}>Region</Typography>
                <Typography sx={styles.fieldData}>
                  {applicantData.pickup_region}
                </Typography>
              </Box>

              <Box sx={styles.detailsRow}>
                <Typography sx={styles.field}>Country</Typography>
                <Typography sx={styles.fieldData}>
                  {applicantData.pickup_country}
                </Typography>
              </Box>
              <Box sx={styles.detailsRow}>
                <Typography sx={styles.field}>Postal Code</Typography>
                <Typography sx={styles.fieldData}>
                  {applicantData.pickup_postal_code}
                </Typography>
              </Box>
            </div>
          </Box>
        </Paper>
        {/* <Box sx={styles.row}>
          <div>
          <Typography sx={styles.dashboardText}></Typography>
        <Box sx={styles.detailsRow}>
          <Typography sx={styles.field}>Depot Area</Typography>
          <Typography sx={styles.fieldData}>Kashidih</Typography>
        </Box>

        <Box sx={styles.detailsRow}>
          <Typography sx={styles.field}>Frequency</Typography>
          <Typography sx={styles.fieldData}>Once</Typography>
        </Box>

        <Box sx={styles.detailsRow}>
          <Typography sx={styles.field}>Acknowledgement</Typography>
          <Typography sx={styles.fieldData}>Signature on Mobile Device</Typography>
        </Box>

        <Box sx={styles.detailsRow}>
          <Typography sx={styles.field}>Rate/ Pickup</Typography>
          <Typography sx={styles.fieldData}>₹15.00</Typography>
        </Box>
        </div>
        <div>
          <Typography sx={styles.dashboardText}></Typography>
        <Box sx={styles.detailsRow}>
          <Typography sx={styles.field}></Typography>
          <Typography sx={styles.fieldData}></Typography>
        </Box>
        </div>
        </Box> */}
        <Paper variant="outlined" sx={styles.fieldContainer}>
          <div style={styles.inputDiv}>
            <div style={styles.row}>
              <div>
                <Typography sx={styles.head2}>Select Location</Typography>
                {/* <Iframe
          url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117711.91484915413!2d86.17577080000002!3d22.7840284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e31989f0e2b5%3A0xeeec8e81ce9b344!2sJamshedpur%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1659242270720!5m2!1sen!2sin"
          width={mediaQuery.matches ? "90%" : "70%"}
          height="450px"
          id="map"
          className="myClassname"
          display="initial"
          position="relative"
          allow="fullscreen"
        /> */}
                <Box sx={styles.inputrow}>
                  <TextField
                    InputProps={{
                      readOnly: true,
                    }}
                    id="Longitude"
                    type="text"
                    label="Longitude"
                    value="22.804565"
                    onChange={handleChange}
                    sx={styles.inputField}
                  />
                  <TextField
                    InputProps={{
                      readOnly: true,
                    }}
                    id="Latitude"
                    type="text"
                    label="Latitude"
                    value="86.202873"
                    onChange={handleChange}
                    sx={styles.inputField}
                  />
                </Box>
                <Box sx={styles.inputrow}>
                  <Typography sx={styles.inputField}>
                    Customer Category{" "}
                    <Typography sx={{ color: "gray", ml: 3 }}>
                      {applicantData.customer_category === 1 ? "B2B" : "B2C"}
                    </Typography>
                  </Typography>

                  <Typography sx={styles.inputField}>
                    Daily Quantity{" "}
                    <Typography sx={{ color: "gray", ml: 3 }}>
                      {applicantData?.daily_wastage}
                    </Typography>
                  </Typography>
                </Box>
                <Box sx={styles.inputrow}>
                  <TextField
                    InputProps={{
                      readOnly: true,
                    }}
                    id="deport"
                    type="text"
                    label="Deport"
                    value={applicantData.pickup_zone}
                    onChange={handleChange}
                    sx={styles.inputField}
                  />
                </Box>
              </div>

              <div>
                <FormControl>
                  <FormLabel id="Frequency" sx={styles.head2}>
                    Frequency of Collection per day
                  </FormLabel>
                  <RadioGroup
                    row
                    sx={styles.radioGroup}
                    aria-labelledby="Frequency of Collection per day"
                    defaultValue={1}
                    name="frequency"
                    value={freq}
                    onChange={(e) => {
                      setFreq(e.target.value);
                    }}
                  >
                    <FormControlLabel
                      value={1}
                      control={<Radio />}
                      label="Once"
                    />
                    <FormControlLabel
                      value={2}
                      control={<Radio />}
                      label="Twice"
                    />
                    <FormControlLabel
                      value={3}
                      control={<Radio />}
                      label="On Call"
                    />
                  </RadioGroup>
                </FormControl>
                <br />
                <FormControl>
                  <FormLabel id="acknowledgement" sx={styles.head2}>
                    Mode of acknowledgement of pick ups
                  </FormLabel>
                  <RadioGroup
                    row
                    sx={styles.radioGroup}
                    aria-labelledby="Mode of acknowledgement of pick ups"
                    defaultValue="QR Code Scanning"
                    name="mode"
                  >
                    <FormControlLabel
                      value="QR Code Scanning"
                      control={<Radio />}
                      label="QR Code Scanning"
                    />
                    <FormControlLabel
                      value="Signature on Mobile"
                      control={
                        <Checkbox
                          checked={mobileAck}
                          onClick={() => {
                            setMobileAck(!mobileAck);
                          }}
                        />
                      }
                      label="Signature on Mobile"
                    />
                  </RadioGroup>
                </FormControl>
                <br />
                <FormControl>
                  <Typography sx={styles.head2}>
                    Monthly Billing Category
                  </Typography>
                  <RadioGroup
                    row
                    sx={styles.radioGroup}
                    aria-labelledby="Monthly Billing Category"
                    defaultValue={"BULK"}
                    name="Monthly Billing Category"
                    value={monthly_billing_category}
                    onChange={(e) => {
                      setMonthly_billing_category(e.target.value);
                    }}
                  >
                    <FormControlLabel
                      value={"BULK"}
                      control={<Radio />}
                      label="Bulk"
                    />
                    <FormControlLabel
                      value={"SEMI-BULK"}
                      control={<Radio />}
                      label="Semi-Bulk"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>

            <div>
              {/* <FormControl>
  <FormLabel id="Frequency" sx={styles.head2}>Priority of the customer</FormLabel>
  <RadioGroup
    row
    sx = {styles.radioGroup}
    aria-labelledby="Frequency of Collection per day"
    defaultValue="Once"
    name="frequency"
  >
    <FormControlLabel value="LOW" control={<Radio />} label="LOW" />
    <FormControlLabel value="MEDIUM" control={<Radio />} label="MEDIUM" />
    <FormControlLabel value="HIGH" control={<Radio />} label="HIGH" />
  </RadioGroup>
</FormControl> */}
              <br />
            </div>
          

            {/* <Box sx={styles.row2}> */}
              {/* <FormControl sx={styles.inputField} fullWidth>
                <InputLabel id="rate">Category</InputLabel>
                <Select
                  labelId="Category"
                  id="Category"
                  value={applicantData?.category_id}
                  label="Category"
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  {categories.map((e) => {
                    return (
                      <MenuItem value={e.id}>
                        {e.category[0].toUpperCase() + e.category.slice(1)}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <FormControl sx={styles.inputField} fullWidth>
                <InputLabel id="subCategory">Sub Category</InputLabel>
                <Select
                  labelId="subCategory"
                  id="subCategory"
                  value={subCategory}
                  label="subCategory"
                  onChange={(e) => {
                    setSubCategory(e.target.value);
                  }}
                >
                  {subCategories.map((e) => {
                    return <MenuItem value={e.id}>{e.sub_category}</MenuItem>;
                  })}
                </Select>
              </FormControl>

              <FormControl sx={styles.inputField} fullWidth>
                <InputLabel id="rate">Area</InputLabel>
                <Select
                  labelId="rate"
                  id="rate"
                  value={rate}
                  label="Area"
                  onChange={(e) => {
                    setRate(e.target.value);
                  }}
                >
                  <MenuItem value={rates.rate_rural}>Rural</MenuItem>
                  <MenuItem value={rates.rate_urban}>Urban</MenuItem>
                  <MenuItem value={rates.rate_semi_urban}>Semi Urban</MenuItem>
                </Select>
              </FormControl>

              <TextField
                id="rate"
                type="text"
                label="Pickup/Rate"
                value={rate}
                onChange={(e) => {
                  setRate(e.target.value);
                }}
                sx={styles.inputField}
              /> */}
            {/* </Box> */}   <Box sx={styles.row}>
            <div>
              {/* <Typography sx={styles.dashboardText}>Billing Address</Typography> */}
              <Box sx={styles.detailsRow}>
                <Typography sx={styles.field}>Customer remarks</Typography>
                <Typography sx={styles.fieldData}>
                {applicantData.remarks}
                </Typography>
              </Box>
              </div>
              <div>
              <Box sx={styles.detailsRow}>
                <Typography sx={styles.field}>Depot Manager Remarks</Typography>
                <Typography sx={styles.fieldData}>
                <TextField
                    InputProps={{
                    }}
                    id="remarks_depot"
                    type="text"
                    label="Depot Manager Remarks"
                    value={creds.remarks_depot}
                    onChange={handleChange}
                    sx={styles.inputField}
                  />
                </Typography>
              </Box>
              </div>
              </Box>
            <Typography sx={styles.field}></Typography>
                <Typography sx={styles.fieldData}>
                  
                </Typography>
            <br/>
            <Typography sx={styles.dashboardText}>
                Nature Of Business
              </Typography>
            <Box sx={styles.detailsRow}>
           
                <Typography sx={styles.field}>Category</Typography>
                <Typography sx={styles.fieldData}>
                  {applicantData.category}
                </Typography>
                <Typography sx={styles.field}>Sub-Category</Typography>
                <Typography sx={styles.fieldData}>
                  {applicantData.sub_category}
                </Typography>
                </Box>
                <Box sx={styles.detailsRow}>
                <Typography sx={styles.field}>Area</Typography>
                <Typography sx={styles.fieldData}>
                  {applicantData.rate_category}
                </Typography>
                <Typography sx={styles.field}>Rate</Typography>
                <Typography sx={styles.fieldData}>
                  {applicantData.rate_value}
                </Typography>
              </Box>
          </div>
        </Paper>

        <Button
          variant="contained"
          sx={styles.submitBtn}
          onClick={submitHandler}
        >
          Approve
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
