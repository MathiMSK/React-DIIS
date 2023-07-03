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

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";
import { toast, Toaster } from "react-hot-toast";
// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";
// import bgImage from "assets/images/bg.png";
import bgImage from "assets/images/bg3.png";
// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";
import { userLogin } from "utility/apiService";
import facultyContext from "context/facultyContext";
import { getProfile } from "utility/apiService";

function Illustration() {
  const factContext = useContext(facultyContext);
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [facultyData, setFacultyData] = useState([]);
  const getProf = async () => {
    try {
      let response = await getProfile();
      setFacultyData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  factContext.isFaculty = facultyData?.isFaculty;

  useEffect(() => {
    getProf();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      return setEmailError("Enter Your Email Here");
    }
    if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{3}$/.test(email)) {
      return setEmailError("Email is invalid");
    } else {
      setEmailError("");
    }
    if (!password) {
      return setPasswordError("Enter Your password Here");
    } else {
      setPasswordError("");
    }

    try {
      let response = await userLogin({ email, password });
      console.log(response.data);
      if (!response?.ok) {
        return toast.error(response.data.message);
      } else {
        {
          response.data.isFaculty
            ? navigate("/assignments")
            : navigate("/studentassignments")
        }
        window.location.reload();
        localStorage.setItem("token", JSON.stringify(response.data.token));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <IllustrationLayout
      title="Login"
      illustration={{
        image: bgImage,
      }}
    >
      <ArgonBox component="form" role="form">
        <ArgonBox mb={2}>
          <ArgonTypography variant="h5" color="textPrimary">
            Email
          </ArgonTypography>
          <ArgonInput
            type="email"
            placeholder="Email"
            size="large"
            sx={{ boxShadow: "3px 4px 5px #877b7b" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError ? (
            <ArgonTypography
              style={{
                paddingLeft: "14px",
                color: "red",
                fontSize: "14px",
              }}
              color="red"
            >
              {emailError}
            </ArgonTypography>
          ) : null}
        </ArgonBox>
        <ArgonBox mb={2}>
          <ArgonTypography variant="h5" color="textPrimary">
            Password
          </ArgonTypography>
          <ArgonInput
            type="password"
            placeholder="Password"
            size="large"
            sx={{ boxShadow: "3px 4px 5px #877b7b" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError ? (
            <ArgonTypography
              style={{
                paddingLeft: "14px",
                color: "red",
                fontSize: "14px",
              }}
              color="red"
            >
              {passwordError}
            </ArgonTypography>
          ) : null}
        </ArgonBox>
        <ArgonBox mt={4} mb={1}>
          <ArgonButton color="info" size="large" fullWidth onClick={handleSubmit}>
            Login
          </ArgonButton>
        </ArgonBox>
      </ArgonBox>
      <Toaster />
    </IllustrationLayout>
  );
}

export default Illustration;
