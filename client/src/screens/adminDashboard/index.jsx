import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { Container } from "@mui/material";
import { styles } from "./styles";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import ApplicationTable from "./components/ApplicationTable";
// import AllData from "./TableData/allData";

export default function AdminDashboard(props) {
  let navigate = useNavigate();

  const mediaQuery = window.matchMedia("(max-width: 650px)");
  const [Link, setLink] = useState("/accountsApplicationDetails")
  const [applicants, setApplicants] = useState([]);
  const [check, setCheck] = useState(0);
  const [loding, setLoading] = useState(true)
  const [Table, setTable] = useState(
    <ApplicationTable
      data={applicants}
      actionLink={"/accountsApplicationDetails"}
    />
  );

  // console.log(applicants)

  const [tableName, setTableName] = useState("Under level 3 review");

  function handleClickPop(e) {
    setTableName(e.target.innerText);
    setTable(
      <ApplicationTable
        // data={AllData[e.target.id]}
        actionLink={"/accountsApplicationDetails"}
      />
    );
    console.log(e.target.id);
  }

  const fetchApplicants = async (e) => {
    const a = await axios
      .post("/getApplications", {
        token: localStorage.getItem("adminToken"),
      })
      .then((res) => {
        console.log(res.data?.data);
        setApplicants(res.data?.data);
        setLoading(false)
      });
  };

  const fetchApi = async (check) => {
    setLoading(true)
    console.log(check == 0);
    if (check == 0) {
      setLink("/accountsApplicationDetails")
      fetchApplicants();

    } else {
      const a = await axios
        .get(`/read-application-by-status/${check}`)
        .then((res) => {
          setApplicants(res.data?.data);
          setLink("/Details")
          setApplicants(res.data?.data);
          setLoading(false)
          console.log("aaaaaaa::", applicants);
          console.log("AAA:", res.data?.data);
        });
      console.log("aaaaaaa::", applicants);
    }
  };

  useEffect(() => {
    fetchApi(check);
  }, [check]);

  return (
    <div>
      <Container maxWidth="xl" sx={styles.container}>
        <Button
          sx={styles.logoutBtn}
          onClick={() => {
            localStorage.setItem("adminToken", "");
            navigate("/somewhere/in/www/admin");
          }}
          variant="text"
        >
          Logout
          {/* {props.userName} */}
        </Button>
        {/* <Button onClick={()=>{navigate("/createInvoice")}} color="primary">Create invoice</Button> */}

        <img
          style={mediaQuery.matches ? styles.imgLogoMobile : styles.imgLogo}
          src={require("../../assets/image/logo.png")}
          alt=""
          srcset=""
        />

        <Typography sx={styles.head}>Bulk Generation System</Typography>
        <Typography sx={styles.dashboardText}>Admin Dashboard</Typography>
        <p style={{ alignSelf: "flex-end", marginTop: "-40px", fontWeight: "bolder" }}>{props.userName} | Admin </p>
        <Box sx={styles.tabItemContainer}>
          {/* <PopupState
            sx={styles.tabItem}
            variant="popover"
            popupId="demo-popup-menu"
          >
            {(popupState) => (
              <React.Fragment>
                <Button
                  sx={styles.tabItem}
                  variant="contained"
                  {...bindTrigger(popupState)}
                >
                  {tableName}
                  <KeyboardArrowDownIcon />
                </Button>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem
                    id="application"
                    onClick={() => {
                      popupState.close();
                      setCheck(0);
                      setTableName("Under level 3 review");
                      console.log("fetching new applications");
                      // setApplicants("wating for new data");
                    }}
                  >
                    Under level 3 review
                  </MenuItem>
                  <MenuItem
                    id="under_l1"
                    onClick={(e) => {
                      setCheck(1);
                      setTableName("Under level 1 review");
                      popupState.close();
                      console.log("fetching new under_l1");
                      // handleClickPop(e);
                    }}
                  >
                    Under level 1 review
                  </MenuItem>
                  <MenuItem
                    id="under_l2"
                    onClick={(e) => {
                      setCheck(3);
                      setTableName("Under level 2 review");
                      console.log("fetching new under_l2");
                      popupState.close();
                      // handleClickPop(e);
                    }}
                  >
                    Under level 2 review
                  </MenuItem>
                  <MenuItem
                    id="pending_C_A"
                    onClick={(e) => {
                      setCheck(4);
                      setTableName("Pending customer acceptance");
                      console.log("fetching new Pending customer acceptance");
                      popupState.close();
                      // handleClickPop(e);
                    }}
                  >
                    Pending customer acceptance
                  </MenuItem>
                  <MenuItem
                    id="approved"
                    onClick={(e) => {
                      setCheck(6);
                      setTableName("Approved");
                      console.log("fetching new approved");
                      popupState.close();
                      // handleClickPop(e);
                    }}
                  >
                    Approved
                  </MenuItem>
                  <MenuItem
                    id="rejected"
                    onClick={(e) => {
                      setCheck(7);
                      setTableName("rejected");
                      console.log("fetching new Pending rejected");
                      popupState.close();
                      // handleClickPop(e);
                    }}
                  >
                    Application Rejected
                  </MenuItem>
                  <MenuItem
                    id="under_l2_wr"
                    onClick={(e) => {
                      setCheck(9);
                      setTableName(" Under level 2 review with reason");
                      console.log("fetching new Pending rejected");
                      popupState.close();
                    }}
                  >
                    Under level 2 review with reason
                  </MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState> */}

          {/* <PopupState
            sx={styles.tabItem}
            variant="popover"
            popupId="demo-popup-menu"
          >
            {(popupState) => (
              <React.Fragment>
                <Button
                  sx={styles.tabItem}
                  variant="outlined"
                  {...bindTrigger(popupState)}
                >
                  CUSTOMERS
                  <KeyboardArrowDownIcon />
                </Button>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem onClick={() => {
                    setCheck(12)
                    popupState.close()
                  }}>Active</MenuItem>
                  <MenuItem onClick={() => {
                    popupState.close()
                    setCheck(13)
                  }}>InActive</MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState> */}

          {/* <PopupState
            sx={styles.tabItem}
            variant="popover"
            popupId="demo-popup-menu"
          >
            {(popupState) => (
              <React.Fragment>
                <Button
                  sx={styles.tabItem}
                  variant="outlined"
                  {...bindTrigger(popupState)}
                >
                  FINANCE
                  <KeyboardArrowDownIcon />
                </Button>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem sx={{}} >Billing Debtor Ageing</MenuItem>

                  <MenuItem sx={{ ml: 2 }} onClick={popupState.close}>0-30 days</MenuItem>
                  <MenuItem sx={{ ml: 2 }} onClick={popupState.close}>30-60 days</MenuItem>
                  <MenuItem sx={{ ml: 2 }} onClick={popupState.close}>60-90 days</MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState> */}

          {props.isAdmin === "yes" ||
            props.isAdmin === "Yes" ||
            props.isAdmin === "YES" ? (
            <PopupState
              sx={styles.tabItem}
              variant="popover"
              popupId="demo-popup-menu"
            >
              {(popupState) => (
                <React.Fragment>
                  <Button
                    sx={styles.tabItem}
                    variant="outlined"
                    {...bindTrigger(popupState)}
                  >
                    USERS
                    <KeyboardArrowDownIcon />
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem
                      onClick={() => {
                        navigate("/createUser");
                      }}
                    >
                      Create User
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/editUser");
                      }}
                    >
                      Edit User
                    </MenuItem>
                    <MenuItem onClick={popupState.close}>User List</MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/depo_zone");
                      }}
                    >
                      Assign Depo
                    </MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          ) : (
            ""
          )}
        </Box>
        <Box sx={styles.table}>
          {
            loding ? "Loading..." : <ApplicationTable
              data={applicants}
              setApplicantData={props.setApplicantData}
              actionLink={Link}
            />
          }
        </Box>
        <br />
        <br />
        <br />
        <br />
      </Container>
    </div>
  );
}
