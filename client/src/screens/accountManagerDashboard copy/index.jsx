import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

export default function Supervisor(props) {
  let navigate = useNavigate();

  const mediaQuery = window.matchMedia("(max-width: 650px)");

  const [applicants, setApplicants] = useState([]);

  const [Table, setTable] = useState(
    <ApplicationTable
      data={applicants}
      actionLink={props.link || "/applicationDetails"}
    />
  );

  console.log(applicants);

  const [tableName, setTableName] = useState("Applications");

  function handleClickPop(e) {
    setTableName(e.target.innerText);
    setTable(
      <ApplicationTable
        actionLink={props.link || "/applicationDetails"}
      />
    );
    console.log(e.target.id);
  }

  const fetchApplicants = async (e) => {
    axios
      .post("/getApplications", {
        token: localStorage.getItem("adminToken"),
      })
      .then((res) => setApplicants(res.data?.data));
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

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
          Logout {props.userName}
        </Button>
        {/* <Button onClick={()=>{navigate("/createInvoice")}} color="primary">Create invoice</Button> */}

        <img
          style={mediaQuery.matches ? styles.imgLogoMobile : styles.imgLogo}
          src={require("../../assets/image/logo.png")}
          alt=""
          srcset=""
        />

        <Typography sx={styles.head}>Bulk Generation System</Typography>
        <Typography sx={styles.dashboardText}>Supervisor Dashboard</Typography>
        <Box sx={styles.tabItemContainer}>
          <PopupState
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
                    onClick={(e) => {
                      popupState.close();
                      handleClickPop(e);
                    }}
                  >
                    Applications
                  </MenuItem>
                  <MenuItem
                    id="under_l1"
                    onClick={(e) => {
                      popupState.close();
                      handleClickPop(e);
                    }}
                  >
                    Under level 1 review
                  </MenuItem>
                  <MenuItem
                    id="under_l2"
                    onClick={(e) => {
                      popupState.close();
                      handleClickPop(e);
                    }}
                  >
                    Under level 2 review
                  </MenuItem>
                  <MenuItem
                    id="pending_C_A"
                    onClick={(e) => {
                      popupState.close();
                      handleClickPop(e);
                    }}
                  >
                    Pending customer acceptance
                  </MenuItem>
                  <MenuItem
                    id="approved"
                    onClick={(e) => {
                      popupState.close();
                      handleClickPop(e);
                    }}
                  >
                    Approved
                  </MenuItem>
                  <MenuItem
                    id="rejected"
                    onClick={(e) => {
                      popupState.close();
                      handleClickPop(e);
                    }}
                  >
                    Application Rejected
                  </MenuItem>
                  <MenuItem
                    id="under_l2_wr"
                    onClick={(e) => {
                      popupState.close();
                      handleClickPop(e);
                    }}
                  >
                    Under level 2 review with reason
                  </MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>

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
                  CUSTOMERS
                  <KeyboardArrowDownIcon />
                </Button>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem onClick={popupState.close}>Active</MenuItem>
                  <MenuItem onClick={popupState.close}>InActive</MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>

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
          </PopupState>

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
          <ApplicationTable
            data={applicants}
            setApplicantData={props.setApplicantData}
            actionLink={props.link || "/accountsApplicationDetails"}
          />
        </Box>
        <br />
        <br />
        <br />
        <br />
        {/* <button onClick={() => {navigate('/createuser')}}>
        Create User
      </button>
      <br />
      <button onClick={() => {navigate('/updateUserData')}}>
        Update User
      </button> */}
      </Container>
    </div>
  );
}
