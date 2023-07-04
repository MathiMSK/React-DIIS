import { Box, Button, FormLabel, Radio } from "@mui/material";
import { Col, Row, Label, Container, FormText, CardTitle, CardBody } from "reactstrap";
import { styled } from "@mui/material/styles";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import View from "./index.js";
import ArgonTypography from "components/ArgonTypography/index.js";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import HighlightOffSharpIcon from "@mui/icons-material/HighlightOffSharp";
import { viewStuAssById } from "utility/apiService.js";
import ArgonBox from "components/ArgonBox/index.js";
import { useArgonController } from "context/index.js";
import Get from "./get.js";

//******************************** */
const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 0 1px rgb(16 22 26 / 40%)"
      : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
      : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background: theme.palette.mode === "dark" ? "rgba(57,75,89,.5)" : "rgba(206,217,224,.5)",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#137cbd",
  backgroundImage: "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#106ba3",
  },
});

// Inspired by blueprintjs
function BpRadio(props) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}

export default function Result({ data, id }) {
  const [controller, dispatch] = useArgonController();
  const { miniSidenav, darkSidenav, layout } = controller;
  const [open1, setOpen1] = useState(false);
  const [answerData, setAnswerData] = useState([]);

  const handleAns = async () => {
    let res = await viewStuAssById(id);
    setAnswerData(res?.data?.data);
  };

  useEffect(() => {
    handleAns();
  }, []);

  return (
    <>
      <div
        style={{
          width: "100%",
          minHeight: "calc(100vh - 0px)",
          backgroundColor: "white",
          borderRadius: "20px",
        }}
      >
        {/* <ArgonBox
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        [breakpoints.up("xl")]: {
          transition: transitions.create(["margin-left", "margin-right"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}
    > */}
        {open1 ? (
          <Get />
        ) : (
          <>
            <div
              style={{
                flexDirection: "row",
                position: "relative",
                display: "flex",
                borderRadius: "20px",
                alignItems: "center",
                marginLeft: "-2rem",
              }}
            >
              <KeyboardArrowLeftIcon
                fontSize="large"
                style={{
                  marginTop: "1rem",
                  marginLeft: "1rem",
                  cursor: "pointer",
                }}
                onClick={() => setOpen1(!open1)}
              />
              <ArgonTypography
                style={{
                  filter: "drop-shadow(5px 5px 5px #b931ce)",
                  fontSize: "13px",
                  fontWeight: "bold",
                  width: "40%",
                  marginTop: "1.5%",
                  color: "#0070CD",
                }}
              >
                Create
              </ArgonTypography>
            </div>
            {answerData?.assignment?.question.map((i, index) =>
              i ? (
                <Container key={index} style={{}}>
                  <Row
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "flex-start",
                      border: "none",
                    }}
                  >
                    <Col style={{ marginTop: "2px", padding: "5px", marginLeft: "2px" }}>
                      <ArgonTypography color={darkSidenav ? "black" : "black"} style={{ fontSize: "35px" }}>{index + 1}.</ArgonTypography>
                    </Col>
                    <Col size="12" style={{ marginTop: "2px" }}>
                      <ArgonTypography
                      color={darkSidenav ? "black" : "black"}
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "start",
                        }}
                      >
                        {i?.question}
                      </ArgonTypography>
                    </Col>
                  </Row>
                  <FormControl style={{ margin: "1%" }}>
                    <RadioGroup
                      aria-labelledby="demo-customized-radios"
                      name="customized-radios"
                      defaultValue={answerData.answers[index].answer}
                    >
                      <FormControlLabel
                        value={i?.options[0]?.optionAns}
                        control={<BpRadio />}
                        color={darkSidenav ? "white" : "black"}
                        disabled={i?.options[0]?.optionAns !== answerData.answers[index].answer}
                        label={
                          i?.options[0]?.optionAns == i?.answer ? (
                            <Fragment>
                              {i?.options[0]?.optionAns}
                              <CheckCircleSharpIcon color="success" />
                            </Fragment>
                          ) : (
                            <Fragment>
                              {i?.options[0]?.optionAns}
                              <HighlightOffSharpIcon color="secondary" />
                            </Fragment>
                          )
                        }
                      />
                      <FormControlLabel
                        value={i?.options[1]?.optionAns}
                        control={<BpRadio />}
                        disabled={i?.options[1]?.optionAns !== answerData.answers[index].answer}
                        label={
                          i?.options[1]?.optionAns == i?.answer ? (
                            <Fragment>
                              {i?.options[1]?.optionAns}
                              <CheckCircleSharpIcon color="success" />
                            </Fragment>
                          ) : (
                            <Fragment>
                              {i?.options[1]?.optionAns}
                              <HighlightOffSharpIcon color="secondary" />
                            </Fragment>
                          )
                        }
                      />
                      <FormControlLabel
                        value={i?.options[2]?.optionAns}
                        control={<BpRadio />}
                        disabled={i?.options[2]?.optionAns !== answerData.answers[index].answer}
                        label={
                          i?.options[2]?.optionAns == i?.answer ? (
                            <Fragment>
                              {i?.options[2]?.optionAns}
                              <CheckCircleSharpIcon color="success" />
                            </Fragment>
                          ) : (
                            <Fragment>
                              {i?.options[2]?.optionAns}
                              <HighlightOffSharpIcon color="secondary" />
                            </Fragment>
                          )
                        }
                      />
                      <FormControlLabel
                        value={i?.options[3]?.optionAns}
                        control={<BpRadio />}
                        disabled={i?.options[3]?.optionAns !== answerData.answers[index].answer}
                        label={
                          i?.options[3]?.optionAns == i?.answer ? (
                            <Fragment>
                              {i?.options[3]?.optionAns}
                              <CheckCircleSharpIcon color="success" />
                            </Fragment>
                          ) : (
                            <Fragment>
                              {i?.options[3]?.optionAns}
                              <HighlightOffSharpIcon color="secondary" />
                            </Fragment>
                          )
                        }
                      />
                    </RadioGroup>
                    <br />
                    <FormLabel id="demo-radio-buttons-group-label">
                      <ArgonTypography color={darkSidenav ? "black" : "black"}>Correct Answer: {i?.answer}</ArgonTypography>

                      <ArgonTypography>
                        {i?.answer == answerData.answers[index].answer ? (
                          <>
                            <ArgonTypography key={i} style={{ fontSize: "15px", color: "green" }}>
                              Wonderful! Student
                            </ArgonTypography>
                          </>
                        ) : (
                          <>
                            <ArgonTypography key={i} style={{ fontSize: "15px", color: "red " }}>
                              Yowai Mo! Student
                            </ArgonTypography>
                          </>
                        )}
                      </ArgonTypography>
                    </FormLabel>
                  </FormControl>
                </Container>
              ) : null
            )}
            {/* <FormLabel id="demo-radio-buttons-group-label">
              TotalMarks:
                  <ArgonTypography
                      id="form1"
                      type="text"
                      disabled
                      value={i?.scored}
                    />
                  </FormLabel> */}
          </>
        )}
        {/* </ArgonBox> */}
      </div>
    </>
  );
}
