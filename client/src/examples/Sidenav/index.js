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

import { useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
// react-router-dom components
import { useLocation, NavLink, useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI example components
import SidenavItem from "examples/Sidenav/SidenavItem";
import SidenavFooter from "examples/Sidenav/SidenavFooter";

// Custom styles for the Sidenav
import SidenavRoot from "examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";
import "./styles.css";
// Argon Dashboard 2 MUI context
import { useArgonController, setMiniSidenav } from "context";
import { sturoutes } from "routes";
// import dp from "assets/images/dp.jpg";
// import dp from "assets/images/dp1.jpg";
import dp1 from "assets/images/dp2.jpg";
import dp from "assets/images/dp3.jpg";
import { getById } from "utility/apiService";
import facultyContext from "context/facultyContext";
import { getProfile } from "utility/apiService";

function Sidenav({ color, brand, brandName, routes, ...rest }) {
  const [controller, dispatch] = useArgonController();
  const { miniSidenav, darkSidenav, layout } = controller;
  const [user, setUser] = useState("");
  const location = useLocation();
  const { pathname } = location;
  const itemName = pathname.split("/").slice(1)[0];
  const [facultyData, setFacultyData] = useState([]);

  let factContext = useContext(facultyContext);

  const getProf = async () => {
    try {
      let response = await getProfile();
      setFacultyData(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  factContext.isFaculty = facultyData?.isFaculty;

  useEffect(() => {
    getProf();
  }, []);
  const closeSidenav = () => setMiniSidenav(dispatch, true);

  let getToken = localStorage.getItem("token");
  let token;
  let decoded;
  if (getToken) {
    token = JSON.parse(getToken);
    decoded = jwt_decode(token);
  }

  
  let id = decoded?.id;
  const getUser = async () => {
    try {
      let result = await getById(id);
      setUser(result?.data?.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  const renderRoutes = routes.map(({ type, name, icon, title, key, href, route, token }) => {
    let returnValue;

    if (type === "route") {
      if (href) {
        returnValue = (
          <Link href={href} key={key} target="_blank" rel="noreferrer">
            <SidenavItem
              name={name}
              icon={icon}
              active={key === itemName}
              noCollapse={noCollapse}
              token={token}
            />
          </Link>
        );
      } else {
        returnValue = (
          <NavLink to={route} key={key}>
            <SidenavItem name={name} icon={icon} active={key === itemName} />
          </NavLink>
        );
      }
    } else if (type === "title") {
      returnValue = (
        <ArgonTypography
          key={key}
          color={darkSidenav ? "white" : "dark"}
          display="block"
          variant="caption"
          fontWeight="bold"
          textTransform="uppercase"
          opacity={0.6}
          pl={3}
          mt={2}
          mb={1}
          ml={1}
        >
          {title}
        </ArgonTypography>
      );
    } else if (type === "divider") {
      returnValue = <Divider key={key} light={darkSidenav} />;
    }

    return returnValue;
  });

  const sturenderRoutes = sturoutes.map(({ type, name, icon, title, key, href, route, token }) => {
    let returnValue;

    if (type === "route") {
      if (href) {
        returnValue = (
          <Link href={href} key={key} target="_blank" rel="noreferrer">
            <SidenavItem
              name={name}
              icon={icon}
              active={key === itemName}
              noCollapse={noCollapse}
              token={token}
            />
          </Link>
        );
      } else {
        returnValue = (
          <NavLink to={route} key={key}>
            <SidenavItem name={name} icon={icon} active={key === itemName} />
          </NavLink>
        );
      }
    } else if (type === "title") {
      returnValue = (
        <ArgonTypography
          key={key}
          color={darkSidenav ? "white" : "dark"}
          display="block"
          variant="caption"
          fontWeight="bold"
          textTransform="uppercase"
          opacity={0.6}
          pl={3}
          mt={2}
          mb={1}
          ml={1}
        >
          {title}
        </ArgonTypography>
      );
    } else if (type === "divider") {
      returnValue = <Divider key={key} light={darkSidenav} />;
    }

    return returnValue;
  });

  return (
    <>
      <SidenavRoot {...rest} variant="permanent" ownerState={{ darkSidenav, miniSidenav, layout }}>
        <ArgonBox pt={3} pb={1} px={4} textAlign="center">
          <ArgonBox
            display={{ xs: "block", xl: "none" }}
            position="absolute"
            top={0}
            right={0}
            p={1.625}
            onClick={closeSidenav}
            sx={{ cursor: "pointer" }}
          >
            <ArgonTypography variant="h6" color="secondary">
              <Icon sx={{ fontWeight: "bold" }}>close</Icon>
            </ArgonTypography>
          </ArgonBox>
          <ArgonBox display="flex" justifyContent="center" alignItems="center" mt={3} mb={4}>
            <div className="outer-circle">
              {factContext?.isFaculty ? (
                <ArgonBox
                  className="vitto"
                  sx={{
                    width: "8rem",
                    height: "8rem",
                  }}
                  component="img"
                  src={dp1}
                />
              ) : (
                <ArgonBox
                  className="vitto"
                  sx={{
                    width: "8rem",
                    height: "8rem",
                  }}
                  component="img"
                  src={dp}
                />
              )}
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </ArgonBox>
          <ArgonTypography
            className="hover"
            component="h1"
            variant="button"
            fontWeight="medium"
            fontSize="1rem"
            style={{ filter: "drop-shadow(5px 5px 5px #5F693B)" }}
            color={darkSidenav ? "white" : "white"}
          >
            {user?.name}
          </ArgonTypography>
        </ArgonBox>
        <Divider light={darkSidenav} />
        {factContext.isFaculty == true ? (
          <List sx={{ marginTop: "50%" }}>{renderRoutes}</List>
        ) : (
          <List sx={{ marginTop: "50%" }}>{sturenderRoutes}</List>
        )}
        <ArgonBox pt={1} mt="auto" mb={2} mx={2}>
          <SidenavFooter />
        </ArgonBox>
      </SidenavRoot>
    </>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
