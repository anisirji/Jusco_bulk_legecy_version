import React, { useState, useRef, useEffect } from "react";
import Iframe from "react-iframe";
import SignaturePad from "react-signature-canvas";
import { styles } from "./styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import OtpPopup from "./components/otpPopup";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';
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
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { FormLabel } from "@mui/material";
import { Navigate } from "react-router-dom";



export default function CustomerApplicationStatusEdit({ userData }) {
    let navigate = useNavigate();
    console.log("this is data:", userData);

    const divForScroll = useRef(null);

    const [loading, setLoading] = useState(false)

    const [open, setOpen] = useState(false); //for otp popup
    const [tncPopupOpen, setTncPopupOpen] = useState(false);

    const [salutation, setSalutaion] = useState(userData.salutation);
    const [doctype1, setDoctype1] = useState(userData.document_type_1);
    const [doctype2, setDoctype2] = useState(userData.document_type_2);
    const [doctype3, setDoctype3] = useState(userData.document_type_3);
    const [areaBa, setAreaBa] = useState(userData.billing_area);
    const [areaPa, setAreaPa] = useState(userData.pickup_area);

    const [docFile1, setDocFile1] = useState(userData.document_type_1
    );
    const [docFile2, setDocFile2] = useState(userData.document_type_2);
    const [docFile3, setDocFile3] = useState(userData.document_type_3);

    const [language, setLanguage] = useState(userData.medium_of_communication);

    const [signature, setSignature] = useState("");

    const [location, setLocation] = useState({ longitude: userData.longitude, latitude: userData.latitude });

    const [creds, setCreds] = useState({
        Fname: userData.first_name,
        Lname: userData.last_name,
        mobile: userData.mobile_no,
        cmobile: userData.mobile_no,
        email: userData.email_id,
        cemail: userData.email_id,
        designation: userData.designation,
        bp_no: userData.bp_no,
        doc1No: userData.document_no_1,
        doc2No: userData.document_no_2,
        doc3No: userData.document_no_3,
        nameBa: userData.billing_estb_name,
        streetHouseNoBa: userData.billing_street,
        postalCodeBa: userData.billing_postal_code,
        cityBa: userData.billing_city,
        regionBa: "Jharkhand",
        countryBa: "India",
        qty: userData.daily_wastage,
        remarks: userData.remarks,
        Longitude: userData.longitude,
        Latitude: userData.latitude,
        namePa: userData.pickup_zone,
        streetHouseNoPa: userData.pickup_street,
        postalCodePa: userData.pickup_postal_code,
        cityPa: userData.pickup_city,
        regionPa: userData.pickup_region,
        countryPa: userData.pickup_country,
    });

    const [areasBa, setAreasBa] = useState([]);
    const [LocalitiesBa, setLocalitiesBa] = useState([]);
    const [zones, setZones] = useState([]);
    const [zoneIdBa, setZoneIdBa] = useState("");
    const [areaIdBa, setAreaIdBa] = useState("");

    const [areasPa, setAreasPa] = useState([]);
    const [LocalitiesPa, setLocalitiesPa] = useState([]);
    const [zoneIdPa, setZoneIdPa] = useState("");
    const [areaIdPa, setAreaIdPa] = useState("");

    const [zoneBa, setZoneBa] = useState(userData.billing_zone);
    const [zonePa, setZonePa] = useState(userData.pickup_zone);
    const [localityBa, setLocalityBa] = useState(userData.billing_locality);
    const [localityPa, setLocalityPa] = useState(userData.pickup_locality);

    const [val, setVal] = useState({
        namePa: userData.pickup_zone,
        streetHouseNoPa: userData.pickup_street,
        postalCodePa: userData.pickup_postal_code,
        cityPa: userData.pickup_city,
        regionPa: userData.pickup_region,
        countryPa: userData.pickup_country,
    });

    const [btn, setBtn] = useState(false);
    const [btn2, setBtn2] = useState(false);

    const [otp, setOtp] = useState("");

    const [facilitatedBy, setFacilitatedBy] = useState("");
    const [facilitatedByList, setFacilitatedByList] = useState([]);

    const [area, setArea] = useState("");
    const [rate, setRate] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [subCategory, setSubCategory] = useState("");
    const [subCategories, setSubCategories] = useState([]);
    const [rates, setRates] = useState("");
    const [matrixId, setMatrixId] = useState("");

    const fetchCategory = async (e) => {
        axios
            .post("/cc", {
                token: localStorage.getItem("adminToken"),
            })
            .then((res) => setCategories(res.data?.data));
    };

    const fetchSubCategory = async (e) => {
        axios
            .post("/csc", {
                token: localStorage.getItem("adminToken"),
                category_id: category,
            })
            .then((res) => setSubCategories(res.data?.data));
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
    };

    const handleChange = (key) => {
        key.preventDefault();

        setCreds({ ...creds, [key.target.id]: key.target.value });
    };

    const handleChange2 = (key) => {
        key.preventDefault();
        setVal({ ...val, [key.target.id]: key.target.value });
    };

    const matchValue = (key) => {
        key.preventDefault();
        setVal({
            namePa: creds.nameBa,
            streetHouseNoPa: creds.streetHouseNoBa,
            postalCodePa: creds.postalCodeBa,
            cityPa: creds.cityBa,
            regionPa: creds.regionBa,
            countryPa: creds.countryBa,
        });

        setAreaPa(areaBa.toString());
        setZonePa(zoneBa);
        setLocalityPa(localityBa.toString());
    };



    const fetchAreaBa = async (e) => {
        axios
            .post("/getApi", {
                url: `https://tsapplications.in/api/v1/data/areas/${zoneIdBa}`,
            })
            .then((res) => {
                setAreasBa(res.data);
                setAreasPa(res.data);
            });
    };
    const fetchAreaPa = async (e) => {
        axios
            .post("/getApi", {
                url: `https://tsapplications.in/api/v1/data/areas/${zoneIdPa}`,
            })
            .then((res) => {
                setAreasPa(res.data);
            });
    };
    const fetchZones = async (e) => {
        axios
            .post("/getApi", {
                url: "https://tsapplications.in/api/v1/data/zones",
            })
            .then((res) => {
                setZones(res.data);
            });
    };

    const fetchLocalityBa = async (e) => {
        axios
            .post("/getApi", {
                url: `https://tsapplications.in/api/v1/data/locations/${areaIdBa}`,
            })
            .then((res) => {
                setLocalitiesBa(res.data);
                setLocalitiesPa(res.data);
            });
    };
    const fetchLocalityPa = async (e) => {
        axios
            .post("/getApi", {
                url: `https://tsapplications.in/api/v1/data/locations/${areaIdPa}`,
            })
            .then((res) => {
                setLocalitiesPa(res.data);
            });
    };

    useEffect(() => {
        if (zoneIdBa) {
            fetchAreaBa();
        }
    }, [zoneIdBa, zoneBa]);

    useEffect(() => {
        if (areaIdBa) {
            fetchLocalityBa();
        }
    }, [areaIdBa, areaBa]);

    useEffect(() => {
        if (zoneIdPa) {
            fetchAreaPa();
        }
    }, [zoneIdPa, zonePa]);

    useEffect(() => {
        if (areaIdPa) {
            fetchLocalityPa();
        }
    }, [areaIdPa, areaPa]);

    useEffect(() => {
        setZoneIdBa(
            zones?.filter((e) => {
                if (e?.name === zoneBa) {
                    return e;
                }
            })[0]?.zone_id
        );
    }, [zoneBa]);

    useEffect(() => {
        setAreaIdBa(
            areasBa.filter((e) => {
                if (e.name === areaBa) {
                    return e;
                }
            })[0]?.area_id
        );
    }, [areaBa]);

    useEffect(() => {
        setZoneIdPa(
            zones.filter((e) => {
                if (e.name === zonePa) {
                    return e;
                }
            })[0]?.zone_id
        );
    }, [zonePa]);

    useEffect(() => {
        setAreaIdPa(
            areasPa.filter((e) => {
                if (e.name === areaPa) {
                    return e;
                }
            })[0]?.area_id
        );
    }, [areaPa]);

    // const fetchLocation = async () => {
    //     navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             setLocation({
    //                 latitude: position.coords.latitude,
    //                 longitude: position.coords.longitude,
    //             });
    //         },
    //         () => {
    //             console.log("Unable to retrieve your location");
    //         }
    //     );
    // };
    const [houses, setHouses] = useState("");

    // useEffect(() => {
    //     fetchLocation();
    // }, []);
    const [houseRate, setHouseRate] = useState()
    const [houseCheck, setHouseCheck] = useState(0)
    const submitHandler = async (e) => {

        // e.preventDefault();
        setLoading(true)
        axios.post("/createApplication", {
            salutation: salutation,
            Fname: creds.Fname,
            Lname: creds.Lname,
            mobile: creds.mobile.substring(creds.mobile.length - 10),
            email: creds.email.toLowerCase(),
            designation: creds.designation,
            doctype1,
            bp_no: creds.bp_no,
            doc1No: creds.doc1No,
            docFile1: docFile1,
            doctype2,
            doc2No: creds.doc2No,
            docFile2: docFile2,
            doctype3,
            doc3No: creds.doc3No,
            docFile3: docFile3,
            nameBa: creds.nameBa,
            streetHouseNoBa: creds.streetHouseNoBa,
            zoneBa,
            areaBa,
            localityBa,
            postalCodeBa: creds.postalCodeBa,
            cityBa: creds.cityBa,
            regionBa: creds.regionBa,
            countryBa: creds.countryBa,
            namePa: val.namePa,
            streetHouseNoPa: val.streetHouseNoPa,
            postalCodePa: val.postalCodePa,
            cityPa: val.cityPa,
            regionPa: val.regionPa,
            countryPa: val.countryPa,
            zonePa,
            areaPa,
            localityPa,
            qty: creds.qty,
            remarks: houseCheck ? `Complex Selected : number of houses ${houses} and rate ${rate} + ${creds.remarks}` : creds.remarks,
            longitude: location.longitude,
            latitude: location.latitude,
            customer_category:
                doctype1 === 1 || doctype2 === 1 || doctype2 === 1 ? 1 : 2,
            docFile1: docFile1,
            docFile2: docFile2,
            docFile3: docFile3,
            medium_lang: language,
            signature_acknowledgement: signature,
            rate_proposed: houseCheck ? houseRate : rate,
            matrix_rate_id: matrixId,
            rate_category: "urban",

        })
            .then((res) => {
                console.log(res.data);
                //console.log(res.data?.message)
                setLoading(false)
                alert(res.data?.message);
                if (res.data.status) {
                    navigate("/trackYourApplication");
                }
            });

        // setOpen(true);
    };

    let sigPad = useRef({});
    let data = "";

    function clear() {
        sigPad.current.clear();
    }

    function show() {
        sigPad.current.fromDataURL(data);
    }

    function save() {
        data = sigPad.current.toDataURL();
        setSignature(data);
        show();
    }

    console.log(signature);

    const mediaQuery = window.matchMedia("(max-width: 650px)");

    const generateOtp = () => {
        setOtp(Math.floor(100000 + Math.random() * 900000));
    };

    const sendOtp = async () => {
        setOpen(true);
    };

    useEffect(() => {
        generateOtp();
        fetchZones();
    }, []);

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

    useEffect(() => {
        if (rates) {
            setRate(rates?.rate_urban);
        }
    }, [rates]);
    function complexSelect() {
        const complexSelect = <>
            <TextField
                id="no_of_houses"
                type="number"
                label="Number Of Houses"
                value={houses}
                onChange={(e) => {
                    setHouses(e.target.value);

                }}
                sx={styles.inputField}
            />
            <TextField
                readOnly
                id="rate_per_house"
                type="text"
                label="Rate"
                value={rate}
                onChange={(e) => {
                    // setRate(e.target.value);
                }}
                sx={styles.inputField}
            />
            <TextField
                readOnly
                id="rate"
                type="text"
                label="Pickup/Rate"
                value={rate * houses}
                onChange={(e) => {
                    setHouseCheck(1)
                    setHouseRate(e.target.value);
                }}
                sx={styles.inputField}
            />

        </>
        console.log(subCategory);
        console.log("salkdhfliadsgfldsaf daslf lads fsadulfy daslufadsfydaslfyladsiufydaslufyadsuiy daskfyads yoyadsoyfu");
        return subCategory == 46 ? complexSelect : <TextField
            id="rate"
            type="text"
            label="Pickup/Rate"
            value={rate}
            onChange={(e) => {
                setRate(e.target.value);
                setHouseCheck(0)
            }}
            sx={styles.inputField}
        />
    }
    return (
        <>


            <div ref={divForScroll}></div>
            <Container maxWidth="xl" sx={styles.container}>
                <img
                    style={mediaQuery.matches ? styles.imgLogoMobile : styles.imgLogo}
                    src={require("../../assets/image/logo.png")}
                    alt=""
                    srcset=""
                />
                <Typography sx={styles.head}>Bulk Generation System</Typography>
                <Typography sx={styles.dashboardText}>
                    Customer Application Form View/Edit
                </Typography>
                <Paper variant="outlined" sx={styles.fieldContainer}>
                    <Typography sx={styles.signupText}>Personal Info</Typography>
                    <Box sx={styles.row}>
                        <div style={mediaQuery.matches ? styles.flex : styles}>
                            <FormControl size="small" sx={styles.inputFieldSm} fullWidth>
                                <TextField
                                    required
                                    size="small"
                                    id="salutation"
                                    type="text"
                                    label="salutation"
                                    value={salutation || ""}
                                    onChange={(e) => {
                                        setSalutaion(e.target.value)
                                    }}

                                />
                                {/*}
                                {/* <InputLabel id="salutation">{"Salutation"}</InputLabel> */}
                                {/* <Select
                                    labelId="salutation"
                                    id="salutation"
                                    value={salutation}
                                    defaultValue={"Mr"}
                                    label="Salutation"
                                    onChange={(e) => {
                                        setSalutaion(e.target.value);
                                    }}
                                >
                                    <MenuItem value={"Mr"}>Mr.</MenuItem>
                                    <MenuItem value={"Miss"}>Miss</MenuItem>
                                    <MenuItem value={"Mrs"}>Mrs.</MenuItem>
                                    <MenuItem value={"Dr"}>Dr.</MenuItem>
                                    <MenuItem value={"Er"}>Er.</MenuItem>
                                </Select> */}
                            </FormControl>

                            <TextField
                                required
                                size="small"
                                id="Fname"
                                type="text"
                                label="First Name"
                                placeholder="First Name"
                                value={creds.Fname}
                                onChange={handleChange}
                                sx={styles.inputFieldSm2}
                            />
                        </div>
                        <TextField
                            required
                            size="small"
                            id="Lname"
                            type="text"
                            label="Last Name"
                            placeholder="Last Name"
                            value={creds.Lname || ""}
                            onChange={handleChange}
                            sx={styles.inputFieldSm2}
                        />
                    </Box>
                    <Box sx={styles.row}>
                        {/* <TextField
                            required
                            size="small"
                            error={creds.mobile !== creds.cmobile}
                            id="mobile"
                            type="password"
                            label="Mobile Number"
                            placeholder="Mobile Number"
                            value={creds.mobile || ""}
                            onChange={handleChange}
                            sx={styles.inputField}
                        /> */}

                        <TextField
                            required
                            size="small"

                            id="mobile"
                            type="number"
                            label="Mobile Number"
                            placeholder="Confirm Mobile Number"
                            value={creds.mobile || ""}
                            onChange={handleChange}
                            sx={styles.inputField}
                        />

                        <TextField

                            size="small"
                            error={creds.email !== creds.cemail}
                            id="email"
                            type="email"
                            label="email id"
                            placeholder="email id"
                            value={creds.email || ""}
                            onChange={handleChange}
                            sx={styles.inputField}
                        />


                    </Box>

                    <Box sx={styles.row}>
                        <TextField
                            size="small"
                            id="designation"
                            type="text"
                            label="Designation"
                            placeholder="Designation"
                            value={creds.designation || ""}
                            onChange={handleChange}
                            sx={styles.inputField}
                        />

                        <TextField
                            size="small"
                            id="bpNo"
                            type="text"
                            label="BP No."
                            placeholder="BP No."
                            value={creds.bpNo || ""}
                            onChange={handleChange}
                            sx={styles.inputField}
                        />
                    </Box>
                </Paper>

                <Paper variant="outlined" sx={styles.fieldContainer}>
                    <Typography sx={styles.signupText}>Documents Details</Typography>
                    <Box sx={styles.row}>
                        <FormControl required size="small"
                            sx={styles.inputField} fullWidth>
                            <InputLabel id="Document">{"Documet Type"}</InputLabel>
                            <Select
                                labelId="Document"
                                id="Document"
                                value={doctype1}
                                label="Documet Type"
                                onChange={(e) => {
                                    setDoctype1(e.target.value);
                                }}
                            >
                                <MenuItem value={1}>GSTIN</MenuItem>
                                <MenuItem value={2}>Vendor ID Card</MenuItem>
                                <MenuItem value={3}>Trade License</MenuItem>
                                <MenuItem value={4}>Electricity Bill</MenuItem>
                                <MenuItem value={5}>Aadhaar</MenuItem>
                                <MenuItem value={0}>None</MenuItem>
                            </Select>
                        </FormControl>
                        <Box sx={styles.inputField}></Box>
                    </Box>
                    <Box sx={styles.row}>
                        <TextField
                            required
                            size="small"
                            id="doc1No"
                            type="text"
                            label="Document No."
                            placeholder="Document No."
                            value={creds.doc1No || ""}
                            onChange={handleChange}
                            sx={styles.inputField}
                        />
                        <Box sx={styles.gstUploadRow}>
                            <Typography sx={styles.inputBtnText}>
                                Upload your document
                            </Typography>
                            <input
                                required
                                style={styles.inputBtn}
                                type={"file"}
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file.size > 6e6) {
                                        alert("Please upload a file smaller than 6 MB");
                                        e.target.value = null;
                                    } else {
                                        const Reader = new FileReader();
                                        Reader.readAsDataURL(file);
                                        Reader.onload = () => {
                                            if (Reader.readyState === 2) {
                                                setDocFile1(Reader.result);
                                            }
                                        };
                                    }
                                }}
                            />
                        </Box>
                    </Box>

                </Paper>

                <Paper variant="outlined" sx={styles.fieldContainer}>
                    <Typography sx={styles.signupText}>
                        Documents Details
                    </Typography>
                    <Box sx={styles.row}>
                        <FormControl size="small" sx={styles.inputField} fullWidth>
                            <InputLabel id="Document">{"Documet Type"}</InputLabel>
                            <Select
                                labelId="Document"
                                id="Document"
                                value={doctype2}
                                label="Documet Type"
                                onChange={(e) => {
                                    setDoctype2(e.target.value);
                                }}
                            >
                                <MenuItem value={1}>GSTIN</MenuItem>
                                <MenuItem value={2}>Vendor ID Card</MenuItem>
                                <MenuItem value={3}>Trade License</MenuItem>
                                <MenuItem value={4}>Electricity Bill</MenuItem>
                                <MenuItem value={5}>Aadhaar</MenuItem>
                                <MenuItem value={6}>PAN</MenuItem>
                                <MenuItem value={7}>Other</MenuItem>
                                <MenuItem value={0}>None</MenuItem>

                            </Select>
                        </FormControl>
                        <Box sx={styles.inputField}></Box>
                    </Box>
                    <Box sx={styles.row}>
                        <TextField
                            size="small"
                            id="doc2No"
                            type="text"
                            label="Document No."
                            placeholder="Document No."
                            value={creds.doc2No || ""}
                            onChange={handleChange}
                            sx={styles.inputField}
                        />
                        <Box sx={styles.gstUploadRow}>
                            <Typography sx={styles.inputBtnText}>
                                Upload your document
                            </Typography>
                            <input
                                style={styles.inputBtn}
                                type={"file"}
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];

                                    if (file.size > 6e6) {
                                        alert("Please upload a file smaller than 6 MB");
                                        e.target.value = null;
                                    } else {
                                        const Reader = new FileReader();
                                        Reader.readAsDataURL(file);
                                        Reader.onload = () => {
                                            if (Reader.readyState === 2) {
                                                setDocFile2(Reader.result);
                                            }
                                        };
                                    }
                                }}
                            />
                        </Box>
                    </Box>
                </Paper>

                <Paper variant="outlined" sx={styles.fieldContainer}>
                    <Typography sx={styles.signupText}>
                        Documents Details
                    </Typography>
                    <Box sx={styles.row}>
                        <FormControl size="small" sx={styles.inputField} fullWidth>
                            <InputLabel id="Document">{"Documet Type"}</InputLabel>
                            <Select
                                labelId="Document"
                                id="Document"
                                value={doctype3}
                                label="Documet Type"
                                onChange={(e) => {
                                    setDoctype3(e.target.value);
                                }}
                            >
                                <MenuItem value={1}>GSTIN</MenuItem>
                                <MenuItem value={2}>Vendor ID Card</MenuItem>
                                <MenuItem value={3}>Trade License</MenuItem>
                                <MenuItem value={4}>Electricity Bill</MenuItem>
                                <MenuItem value={5}>Aadhaar</MenuItem>
                                <MenuItem value={6}>PAN</MenuItem>
                                <MenuItem value={7}>Other</MenuItem>
                                <MenuItem value={0}>None</MenuItem>
                            </Select>
                        </FormControl>
                        <Box sx={styles.inputField}></Box>
                    </Box>
                    <Box sx={styles.row}>
                        <TextField
                            size="small"
                            id="doc3No"
                            type="text"
                            label="Document No."
                            placeholder="Document No."
                            value={creds.doc3No || ""}
                            onChange={handleChange}
                            sx={styles.inputField}
                        />
                        <Box sx={styles.gstUploadRow}>
                            <Typography sx={styles.inputBtnText}>
                                Upload your document
                            </Typography>
                            <input
                                style={styles.inputBtn}
                                type={"file"}
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file.size > 6e6) {
                                        alert("Please upload a file smaller than 6 MB");
                                        e.target.value = null;
                                    } else {
                                        const Reader = new FileReader();
                                        Reader.readAsDataURL(file);
                                        Reader.onload = () => {
                                            if (Reader.readyState === 2) {
                                                setDocFile3(Reader.result);
                                            }
                                        };
                                    }
                                }}
                            />
                        </Box>
                    </Box>
                </Paper>

                <Paper variant="outlined" sx={styles.fieldContainer}>
                    <Typography sx={styles.signupText}>Billing Address</Typography>
                    <Box sx={styles.row}>
                        <TextField
                            required
                            size="small"
                            id="nameBa"
                            type="text"
                            label="Business Name"
                            placeholder="Business Name"
                            value={creds.nameBa || ""}
                            onChange={handleChange}
                            sx={styles.inputField}
                            inputProps={{ maxLength: 20 }}
                            helperText="Max length is 20 character"
                        />
                        <TextField
                            required
                            size="small"
                            id="streetHouseNoBa"
                            type="text"
                            label="Street/House Number"
                            placeholder="Street/House Number"
                            value={creds.streetHouseNoBa || ""}
                            onChange={handleChange}
                            sx={styles.inputField}
                            inputProps={{ maxLength: 35 }}
                            helperText="Max length is 35 character"
                        />
                    </Box>
                    <Box sx={styles.row}>
                        <TextField
                            size="small"
                            id="zoneBa"
                            type="text"
                            label="Zone"
                            placeholder="Zone"
                            value={zoneBa}
                            onChange={(e) => { setZoneBa(e.target.value); }}
                            sx={styles.inputFieldRO}
                        />
                        <TextField
                            size="small"
                            id="areaBa"
                            type="text"
                            label="Area"
                            placeholder="Area"
                            value={areaBa}

                            sx={styles.inputFieldRO}
                        />
                    </Box>
                    <Box sx={styles.row}>
                        <TextField
                            size="small"
                            id="localityBa"
                            type="text"
                            label="Locality"
                            placeholder="Locality"
                            value={localityBa}
                            sx={styles.inputFieldRO}
                        />

                    </Box>

                    <Box sx={styles.row}>

                        <FormControl required size="small" sx={styles.inputField} fullWidth>
                            <InputLabel id="zoneBa">{"Zone"}</InputLabel>

                            <Select
                                labelId="zoneBa"
                                id="zoneBa"
                                value={zoneBa}
                                label="Zone"
                                onChange={(e) => {
                                    setZoneBa(e.target.value);
                                }}
                            >
                                {zones.map((e) => {
                                    return <MenuItem value={e?.name}>{e?.name}</MenuItem>;
                                })}
                            </Select>

                        </FormControl>

                        <FormControl required size="small" sx={styles.inputField} fullWidth>
                            <InputLabel id="areaBa">{"Area"}</InputLabel>

                            <Select
                                labelId="areaBa"
                                id="areaBa"
                                value={areaBa}
                                label="Area"
                                onChange={(e) => {
                                    setAreaBa(e.target.value);
                                    setAreaIdBa(
                                        areasBa.filter((e) => {
                                            if (e.name === areaBa) {
                                                return e;
                                            }
                                        })[0]?.area_id
                                    );
                                }}
                            >
                                {areasBa.map((ar) => {
                                    return <MenuItem value={ar?.name}>{ar?.name}</MenuItem>;
                                })}
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={styles.row}>
                        <FormControl required size="small" sx={styles.inputField} fullWidth>
                            <InputLabel id="localityBa">{"Locality"}</InputLabel>

                            <Select
                                labelId="localityBa"
                                id="localityBa"
                                value={localityBa}
                                label="Area"
                                onChange={(e) => {
                                    setLocalityBa(e.target.value);
                                }}
                            >
                                {LocalitiesBa.map((e) => {
                                    return <MenuItem value={e?.name}>{e?.name}</MenuItem>;
                                })}
                            </Select>
                        </FormControl>
                        <TextField
                            required
                            size="small"
                            id="postalCodeBa"
                            type="number"
                            label="Postal Code"
                            placeholder="Postal Code"
                            value={creds.postalCodeBa || ""}
                            onChange={handleChange}
                            sx={styles.inputField}
                        />
                    </Box>
                    <Box sx={styles.row}>
                        <TextField
                            size="small"
                            id="cityBa"
                            type="text"
                            label="City"
                            placeholder="Jamshedpur"
                            value={creds.cityBa || "Jamshedpur"}
                            onChange={handleChange}
                            sx={styles.inputFieldRO}
                        />
                        <TextField
                            size="small"
                            id="Region"
                            type="text"
                            label="Region"
                            placeholder="Jharkhand"
                            value="Jharkhand"
                            onChange={handleChange}
                            sx={styles.inputFieldRO}
                        />
                    </Box>

                    <Box sx={styles.row}>
                        <TextField
                            size="small"
                            id="countryBa"
                            type="text"
                            label="Country"
                            placeholder="India"
                            value={creds.countryBa || "India"}
                            onChange={handleChange}
                            sx={styles.inputFieldRO}
                        />
                        <Box sx={styles.inputField}></Box>
                    </Box>
                </Paper>

                <Paper variant="outlined" sx={styles.fieldContainer}>
                    <Typography sx={styles.signupText}>Garbage Pickup Address</Typography>



                    <Box sx={styles.row}>
                        <TextField
                            required
                            size="small"
                            id="namePa"
                            type="text"
                            label="Business Name"
                            placeholder="Business Name"
                            value={val.namePa || ""}
                            onChange={handleChange2}
                            sx={styles.inputField}
                        />

                        <TextField
                            required
                            size="small"
                            id="streetHouseNoPa"
                            type="text"
                            label="Street/House Number"
                            placeholder="Street/House Number"
                            value={val.streetHouseNoPa || ""}
                            onChange={handleChange2}
                            sx={styles.inputField}
                        />
                    </Box>
                    <Box sx={styles.row}>
                        <TextField
                            size="small"
                            id="zonePa"
                            type="text"
                            label="Zone"
                            placeholder="Zone"
                            value={zonePa}
                            sx={styles.inputFieldRO}
                        />
                        <TextField
                            size="small"
                            id="areaPa"
                            type="text"
                            label="Area"
                            placeholder="Area"
                            value={areaPa}
                            sx={styles.inputFieldRO}
                        />
                    </Box>
                    <Box sx={styles.row}>
                        <TextField
                            size="small"
                            id="localityPa"
                            type="text"
                            label="Locality"
                            placeholder="Locality"
                            value={localityPa}
                            sx={styles.inputFieldRO}
                        /></Box>

                    <Box sx={styles.row}>
                        <FormControl required size="small" sx={styles.inputField} fullWidth>
                            <InputLabel id="zonePa">{"Zone"}</InputLabel>

                            <Select
                                labelId="zonePa"
                                id="zonePa"
                                value={zonePa}
                                label="Zone"
                                onChange={(e) => {
                                    setZonePa(e.target.value);

                                }}
                            >
                                {zones.map((e) => {
                                    return <MenuItem value={e?.name}>{e?.name}</MenuItem>;
                                })}
                            </Select>
                        </FormControl>

                        <FormControl required size="small" sx={styles.inputField} fullWidth>
                            <InputLabel id="areaPa">{"Area"}</InputLabel>

                            <Select
                                labelId="areaPa"
                                id="areaPa"
                                defaultValue=""
                                value={areaPa}
                                label="Area"
                                onChange={(e) => {
                                    setAreaPa(e.target.value);

                                }}
                            >
                                {areasPa.map((ar) => {
                                    return <MenuItem value={ar?.name}>{ar?.name}</MenuItem>;
                                })}
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={styles.row}>
                        <FormControl required size="small" sx={styles.inputField} fullWidth>
                            <InputLabel id="localityPa">{"Locality"}</InputLabel>

                            <Select
                                labelId="localityPa"
                                id="localityPa"
                                defaultValue=""
                                value={localityPa}
                                label="Area"
                                onChange={(e) => {
                                    setLocalityPa(e.target.value);
                                }}
                            >
                                {LocalitiesPa.map((e) => {
                                    return <MenuItem value={e?.name}>{e?.name}</MenuItem>;
                                })}
                            </Select>
                        </FormControl>
                        <TextField
                            required
                            size="small"
                            id="postalCodePa"
                            type="number"
                            label="Postal Code"
                            placeholder="Postal Code"
                            value={val.postalCodePa || ""}
                            onChange={handleChange2}
                            sx={styles.inputField}
                        />
                    </Box>

                    <Box sx={styles.row}>
                        <TextField
                            size="small"
                            id="cityPa"
                            type="text"
                            label="City"
                            placeholder="Jamshedpur"
                            value={val.cityPa || "Jamshedpur"}
                            onChange={handleChange2}
                            sx={styles.inputFieldRO}
                        />
                        <TextField
                            size="small"
                            id="regionPa"
                            type="text"
                            label="Region"
                            placeholder="Jharkhand"
                            value={val.regionPa || "Jharkhand"}
                            onChange={handleChange2}
                            sx={styles.inputFieldRO}
                        />
                    </Box>
                    <Box sx={styles.row}>
                        <TextField
                            size="small"
                            id="country"
                            type="text"
                            label="Country"
                            placeholder="India"
                            value={val.countryPa || "India"}
                            onChange={handleChange2}
                            sx={styles.inputFieldRO}
                        />
                        <Box sx={styles.inputField}></Box>
                    </Box>
                </Paper>

                <Paper variant="outlined" sx={styles.fieldContainer}>
                    <Box sx={styles.row}>
                        <TextField
                            size="small"
                            id="qty"
                            type="number"
                            label=" Wastage (in kgs)"
                            placeholder=" Wastage (in kgs)"
                            value={creds.qty || ""}
                            onChange={handleChange}
                            sx={styles.inputField}
                        />
                        <TextField
                            size="small"
                            id="remarks"
                            type="text"
                            label="Remarks"
                            placeholder="Remarks"
                            value={creds.remarks || ""}
                            onChange={handleChange}
                            sx={styles.inputField}
                        />
                    </Box>
                    <Box sx={styles.row}>
                        <FormControl sx={styles.inputField}>
                            <FormLabel id="language" sx={styles.head2}>
                                Medium of communication
                            </FormLabel>
                            <RadioGroup
                                row
                                sx={styles.radioGroup}
                                aria-labelledby="Medium of communication"
                                defaultValue={language}
                                name="language"
                                value={language}
                                onChange={(e) => {
                                    setLanguage(e.target.value);
                                }}
                            >
                                <FormControlLabel
                                    value="English"
                                    control={<Radio />}
                                    label="English"
                                />
                                <FormControlLabel
                                    value="Hindi"
                                    control={<Radio />}
                                    label="Hindi"
                                />
                            </RadioGroup>
                        </FormControl>

                    </Box>
                </Paper>

                <Paper variant="outlined" sx={styles.fieldContainer}>
                    <Typography sx={styles.signupText}>Select Location</Typography>

                    <Box sx={styles.inputrow}>
                        <TextField
                            // InputProps={{
                            //     readOnly: true,
                            // }}
                            id="Longitude"
                            type="text"
                            label="Longitude"
                            value={creds.longitude}
                            onChange={handleChange}
                            sx={styles.inputField}
                        />
                        <TextField
                            // InputProps={{
                            //     readOnly: true,
                            // }}
                            id="Latitude"
                            type="text"
                            label="Latitude"
                            value={creds.latitude}
                            onChange={handleChange}
                            sx={styles.inputField}
                        />
                    </Box>
                    {/* <IconButton
                        onClick={() => {
                            fetchLocation();
                        }}
                        sx={{ mx: 4, my: 2 }}
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                    >
                        <MyLocationIcon />
                    </IconButton> */}

                </Paper>
                {//Need to do this............................................................
                }
                {/* <Paper variant="outlined" sx={styles.fieldContainer}>
                    <Typography sx={styles.signupText}>Nature of Business</Typography>
                    <Box sx={styles.row2}>
                        <FormControl sx={styles.inputField}>
                            <InputLabel id="rate">Category</InputLabel>
                            <Select

                                labelId="Category"
                                id="Category"
                                value={category}
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

                        <FormControl sx={styles.inputField}>
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
                    </Box>
                    <Box sx={styles.row2}>
                        <FormControl sx={styles.inputField} >
                            <InputLabel id="rate">Area</InputLabel>
                            <Select
                                readOnly
                                labelId="rate"
                                id="rate"
                                value={rate}
                                //value="urban"
                                label="Area"
                                // onRateChange={}
                                onChange={(e) => {
                                    setRate(e.target.value);
                                }}
                            >
                                <MenuItem value={rates.rate_rural}>Rural</MenuItem>
                                <MenuItem value={rates.rate_urban}>Urban</MenuItem>
                                <MenuItem value={rates.rate_semi_urban}>Semi Urban</MenuItem>
                            </Select>
                        </FormControl>

                        {
                            complexSelect()
                        }

                    </Box>
                </Paper> */}



                <Button

                    variant="contained"

                    onClick={() => {
                        axios.post("/updateManyCustomerData", {
                            customer_id: userData.customer_id
                            , updatedData: {
                                salutation: creds.salutation,
                                first_name: creds.Fname,
                                last_name: creds.Lname,
                                mobile_no: creds.mobile,
                                email_id: creds.email,
                                designation: creds.designation,
                                bp_no: creds.bp_no,
                                medium_of_communication: language,
                                document_type_1: creds.doctype1,
                                document_no_1: creds.doc1No,
                                // document_file_name_1: `/documents/${appliNo}/${doctype1}${doctype1}.png`,

                                document_type_2: creds.doctype2,
                                document_no_2: creds.doc2No,
                                // document_file_name_2: `/documents/${appliNo}/${doctype2}${doctype2}.png`,

                                document_type_3: creds.doctype3,
                                document_no_3: creds.doc3No,
                                // document_file_name_3: `/documents/${appliNo}/${doctype3}${doctype3}.png`,

                                billing_estb_name: creds.nameBa,
                                billing_street: creds.streetHouseNoBa,
                                billing_zone: creds.zoneBa,
                                billing_area: areaBa,
                                billing_locality: localityBa,
                                billing_postal_code: creds.postalCodeBa,
                                billing_city: creds.cityBa,
                                billing_region: creds.regionBa,
                                billing_country: creds.countryBa,
                                pickup_estb_name: creds.namePa,
                                pickup_street: creds.streetHouseNoPa,
                                pickup_zone: zonePa,
                                pickup_area: areaPa,
                                pickup_locality: localityPa,
                                pickup_postal_code: creds.postalCodePa,
                                pickup_city: creds.cityPa,
                                pickup_region: creds.regionPa,
                                pickup_country: creds.countryPa,
                                daily_wastage: creds.qty,
                                remarks: creds.remarks,
                                longitude: creds.Longitude.toString(),
                                latitude: creds.Latitude.toString(),
                                // customer_category: customer_category,
                                // signature_on_device: "no",
                                // signature_file_name: `/Documents/${appliNo}/signaturesignature.png`,
                                depot_area: zonePa,
                                // rate_proposed: rate,
                                // qr_code: "",
                                // qr_code_by: 1,
                                // qr_code_at: "",
                                // qr_code_time: `${new Date()
                                //     .toISOString()
                                //     .slice(0, 19)
                                //     .replace("T", " ")}`,
                                // qr_code_image: "",
                                // entry_date: daate,
                                // last_modified_by: 3,
                                // last_modified_date: daate,
                                // activity_log: `account Created on ${new Date()
                                //     .toISOString()
                                //     .slice(0, 19)
                                //     .replace("T", " ")}`,
                                // billing_category: 0,
                                status: 13
                                // rate_proposed: rate,
                            }
                        }).then(res => {
                            alert(res.data.message)
                        })
                    }
                    }
                >

                    Update Application

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
            </Container >

            {/* <OtpPopup
                otp={otp}
                loading={loading}
                submitHandler={submitHandler}
                phone={creds.mobile.substring(creds.mobile.length - 10)}
                email={creds.email}
                open={open}
                setOpen={setOpen}
            /> */}
        </>
    );
}
