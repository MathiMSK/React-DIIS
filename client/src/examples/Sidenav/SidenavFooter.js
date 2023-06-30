/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Link from "@mui/material/Link";

// Argon Dashboard 2 MUI components
import ArgonButton from "components/ArgonButton";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI context
import { useArgonController } from "context";

// Images
import icon from "assets/images/illustrations/icon-documentation.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {FaPowerOff} from "react-icons/fa"
import {BiLogOutCircle} from "react-icons/bi"

function SidenavFooter() {
  const navigate = useNavigate();
  const [controller] = useArgonController();
  const { miniSidenav, darkSidenav } = controller;
  // const [Logout,setLogout]=useState(false)
  
  const handleLogout=(e)=>{
      e.preventDefault();  
      localStorage.removeItem("token")
      navigate("/authentication/sign-in")
      // setLogout(true)
    }

  return (
    <ArgonBox opacity={miniSidenav ? 0 : 1} sx={{ transition: "opacity 200ms linear" }}>
      <ArgonBox position="relative" textAlign="center">
      <ArgonBox sx={{display:"flex",marginLeft:"10%"}}>
      <ArgonBox>
      <BiLogOutCircle color="#FDD451" style={{filter: "drop-shadow(5px 5px 5px rgba(0,0,0,0.3))"}} />
      </ArgonBox>
      <ArgonTypography color="white" variant="h6" sx={{cursor:"pointer",marginLeft:"5%"}}
       onClick={handleLogout}>
           Logout
          </ArgonTypography>
          </ArgonBox>
        {/* <ArgonBox component="img" src={icon} alt="sidebar_illustration" width="60%" />
        <ArgonBox
          width="100%"
          pb={2}
          px={2}
          color={darkSidenav ? "white" : "dark"}
          textAlign="center"
          lineHeight={0}
        >
          <ArgonTypography color="inherit" variant="h6">
            Need help?
          </ArgonTypography>
          <ArgonTypography color="inherit" variant="caption">
            Please check our docs
          </ArgonTypography>
        </ArgonBox> */}
      </ArgonBox>
      {/* <ArgonBox display="flex" flexDirection="column">
        <ArgonButton
          component={Link}
          href="https://www.creative-tim.com/learning-lab/react/overview/argon-dashboard/"
          target="_blank"
          rel="noreferrer"
          color="dark"
          size="small"
          fullWidth
          sx={{ mb: 1 }}
        >
          Documentation
        </ArgonButton>
        <ArgonButton
          component={Link}
          href="https://www.creative-tim.com/product/argon-dashboard-material-ui"
          target="_blank"
          rel="noreferrer"
          color="info"
          size="small"
          fullWidth
          mb={2}
        >
          Upgrade to PRO
        </ArgonButton>
      </ArgonBox> */}
    </ArgonBox>
  );
}

export default SidenavFooter;
