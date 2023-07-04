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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";
import { Card } from "@mui/material";

function IllustrationLayout({ color, header, title, description, button, illustration, children }) {
  return (
    <PageLayout background="#0070CD">
      {/* <DefaultNavbar
        action={{
          type: "external",
          route: "https://creative-tim.com/product/argon-dashboard-material-ui",
          label: "Free Download",
          ...button,
        }}
      /> */}
      <Grid container >
        <Grid item xs={12} lg={6}>
          <div>
            <ArgonBox 
              display={{ lg: "flex" }}
              // backgroundColor={color}
              marginLeft="25%"
                marginTop="27%"
              width="50%"
              sx={{ backgroundColor: "#0070CD" }}
            >
              <ArgonBox
                component="img"
                alt="background"
                // marginLeft="50%"
                // marginTop="50%"
                src={illustration.image}
                width="100%"
                height="100%"
                // sx={{marginTop: "50%"}}
              />
            </ArgonBox>
          </div>
        </Grid>
        <Grid item xs={11} sm={8} md={6} lg={4} xl={3} sx={{ mx: "auto" }}>
          <Card sx={{ height: "50vh", marginTop: "50%", justifyContent: "center", width: "80%" }}>
            <ArgonBox display="flex" flexDirection="column" justifyContent="center" height="100vh">
              <ArgonBox pt={3} px={3}>
                {!header ? (
                  <>
                    <ArgonBox mb={1}>
                      <ArgonTypography variant="h4" fontWeight="bold">
                        {title}
                      </ArgonTypography>
                    </ArgonBox>
                    <ArgonTypography variant="body2" fontWeight="regular" color="text">
                      {description}
                    </ArgonTypography>
                  </>
                ) : (
                  header
                )}
              </ArgonBox>
              <ArgonBox p={3}>{children}</ArgonBox>
            </ArgonBox>
          </Card>
        </Grid>
      </Grid>
    </PageLayout>
  );
}

// Setting default values for the props of IllustrationLayout
IllustrationLayout.defaultProps = {
  color: "info",
  header: "",
  title: "",
  description: "",
  button: { color: "info" },
  illustration: {},
};

// Typechecking props for the IllustrationLayout
IllustrationLayout.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  header: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  button: PropTypes.object,
  children: PropTypes.node.isRequired,
  illustration: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default IllustrationLayout;
