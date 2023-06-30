import React, { useContext, useEffect, useState, createContext, useRef } from "react";
import { toast, Toaster } from "react-hot-toast";
// import CIcon from "@coreui/icons-react";
// import { cilArrowCircleLeft } from "@coreui/icons";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Input, Switch } from "@mui/material";
import { Col, Row, Label, Container, FormText } from "reactstrap";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box/Box";
import "./styles.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useArgonController } from "context";
import ArgonBox from "components/ArgonBox";
import { createAssign } from "utility/apiService";
import { getAllAssign } from "utility/apiService";
import Get from "./get";
import ArgonTable from "components/AroganTable";
import ArgonTypography from "components/ArgonTypography";
// import facultyContext from "context/facultyContext.js";
import { useReactToPrint } from "react-to-print";
import { getProfile } from "utility/apiService";

const Assign = () => {
  const [controller, dispatch] = useArgonController();
  const { miniSidenav, darkMode } = controller;
  const [open, setOpen] = useState(false);

  const [open2, setOpen2] = useState(false);

  const [assign, setAssign] = useState("");
  const [className, setClassName] = useState("");
  const [marks, setMarks] = useState("");
  const [subject, setSubject] = useState("");

  const [noq, setNoq] = useState();
  const [datas, setDatas] = useState([]);
  const [assignData, setAssignData] = useState([]);
  const [asserr, setAssErr] = useState("");
  const [classerr, setClassErr] = useState("");
  const [subjecterr, setSubjectErr] = useState("");
  const [markserr, setMarksErr] = useState("");
  const [noqerr, setNoqErr] = useState("");

  const [facultyData, setFacultyData] = useState([]);
  // let faculty = useContext(facultyContext);
  const componentPdf = useRef();
  const generatePdf = useReactToPrint({
    content: () => componentPdf.current,
    documentTitle: "Assignment",
    onAfterPrint: () => {
      toast.success("Assignment Printed Successfully");
    },
  });

  const toggle = () => setOpen(!open);
  const toggle2 = () => {
    setOpen2(!open2);
  };
  const reset = () => {
    setAssign("");
  };

  let arr = [];
  for (let i = 1; i <= noq; i++) {
    if (arr?.length < noq) {
      arr.push(i);
      if (datas?.length < noq) {
        datas.push({
          question: "",
          questionNo: i,
          options: [
            {
              optionNo: 1,
              optionAns: "",
            },
            {
              optionNo: 2,
              optionAns: "",
            },
            {
              optionNo: 3,
              optionAns: "",
            },
            {
              optionNo: 4,
              optionAns: "",
            },
          ],
          answer: "",
          markForThisQuestion: 0,
        });
      }
    }
  }
  const handlechange = (e, index) => {
    const { name, value, indexForOption, optionName } = e.target;
    const list = [...datas];
    if (name === "options") {
      list[index][name][indexForOption][optionName] = value;
    } else {
      list[index][name] = value;
    }
    setDatas(list);
  };

  // ***********************  api's  ***********************

  const getAssign = async () => {
    try {
      let response = await getAllAssign();
      if (!response.ok) {
        return toast.error(response.data.message);
      }
      setAssignData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProf = async () => {
    try {
      let response = await getProfile();
      setFacultyData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAssign();
    getProf();
  }, []);
  assignData?.map((item) => {});
  const initiateAssign = async () => {
    if (!assign) {
      setAssErr("Assign is required");
    }
    setAssErr("");
    if (!noq) {
      setNoqErr("Number of questions is required");
    }
    setNoqErr("");
    if (!subject) {
      setSubjectErr("Subject is required");
    }
    setSubjectErr("");
    if (!className) {
      setClassErr("Class name is required");
    }
    setClassErr("");
    if (!marks) {
      setMarksErr("Marks is required");
    }
    setMarksErr("");
    if (assign && noq && subject && className && marks) {
      try {
        let response = await createAssign({
          assignmentTitle: assign,
          class: className,
          totalMarks: marks,
          subject: subject,
          totalQuestion: noq,
          question: datas,
        });
        if (!response.ok) {
          return toast.error(response.data.message);
        } else {
          setOpen(!open);
          toast.success(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      return toast.error("Please fill all the fields");
    }
  };

  return (
    <ArgonBox
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        [breakpoints.up("xl")]: {
          marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
          transition: transitions.create(["margin-left", "margin-right"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}
    >
      <div
        style={{
          width: "100%",
          minHeight: "calc(100vh - 0px)",
          backgroundColor: "white",
          borderRadius: "20px",
        }}
      >
        {!open2 ? (
          <>
            {!open ? (
              <>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <h1
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "500",
                      padding: "20px",
                      paddingRight: "5px",
                      wordWrap: "break-word",
                      color: "#0070CD",
                    }}
                  >
                    Assignments
                  </h1>
                  <div>
                    {facultyData?.isFaculty == true ? (
                      <Button 
                      className="btn1"
                        style={{
                          marginRight: "1rem",
                          color: "#b931ce",
                          border: "1px solid #b931ce",
                        }}
                        onClick={toggle}
                        variant="contained"
                        color={"error"}
                      >
                        <ArgonTypography
                          style={{
                            filter: "drop-shadow(5px 5px 5px #b931ce)",
                            fontSize: "13px",
                            color: "#b931ce",
                            fontWeight: "bold",
                          }}
                        >
                          Create
                        </ArgonTypography>
                      </Button>
                    ) : null}
                  </div>
                </div>
                <div style={{ border: "1px solid #0070CD", marginBottom: "20px" }} />

                <Get />
              </>
            ) : (
              <>
                <div>
                  <div
                    style={{
                      flexDirection: "row",
                      position: "relative", 
                      display: "flex",
                      borderRadius: "20px",
                      marginLeft: "0.5rem",
                      alignItems: "center",
                    }}
                  >
                    <Container style={{ display: "contents" }}>
                      <KeyboardArrowLeftIcon
                        fontSize="large"
                        style={{
                          marginTop: "1rem",
                          marginLeft: "1rem",
                          cursor: "pointer",
                        }}
                        onClick={toggle}
                      />
                      <h1
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: "500",
                          marginLeft: "3.8rem",
                          position: "absolute",
                          top: "13px",
                          color: "#0070CD",
                        }}
                      >
                        Create Assignment
                      </h1>
                    </Container>
                  </div>
                  <div style={{ border: "1px solid #0070CD" }} />
                  <div
                    className="cusInpFullCon"
                    style={{
                      position: "relative",
                      marginTop: "3rem",
                      marginRight: "5rem",
                    }}
                  >
                    <Container
                      className="cusInpFullWrap"
                      style={{ marginLeft: "3.2rem", marginTop: "1rem" }}
                    >
                      <Row style={{ display: "flex", justifyContent: "normal", border: "none" }}>
                        <Col md={6} className="cusInpCon" style={{ width: "600px" }}>
                          <Label>
                            Assignment Name
                            <span
                              style={{
                                paddingLeft: "5px",
                                color: "red",
                                fontSize: "15px",
                              }}
                            >
                              *
                            </span>
                          </Label>
                          <Input
                            id="exampleFormControlInput1"
                            placeholder="Enter Assignment Name"
                            value={assign}
                            onChange={(e) => setAssign(e.target.value)}
                            // width="400px"
                          />
                          {asserr ? (
                            <ArgonTypography style={{ color: "red" }}>{asserr}</ArgonTypography>
                          ) : null}
                        </Col>
                      </Row>

                      <Row style={{ display: "flex", border: "none" }}>
                        <Col md={6} className="cusInpCon" style={{ width: "600px" }}>
                          <Label>
                            Class
                            <span
                              style={{
                                paddingLeft: "5px",
                                color: "red",
                                fontSize: "15px",
                              }}
                            >
                              *
                            </span>
                          </Label>
                          <Input
                            id="exampleFormControlInput1"
                            placeholder="Enter Class Name"
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                            // width="400px"
                          />
                          {classerr ? (
                            <ArgonTypography style={{ color: "red" }}>{classerr}</ArgonTypography>
                          ) : null}
                        </Col>
                        <Col
                          md={6}
                          className="cusInpCon"
                          style={{ width: "600px", marginLeft: "20px" }}
                        >
                          <Label>
                            Total Marks
                            <span
                              style={{
                                paddingLeft: "5px",
                                color: "red",
                                fontSize: "15px",
                              }}
                            >
                              *
                            </span>
                          </Label>
                          <Input
                            id="exampleFormControlInput1"
                            placeholder="Enter Total Marks"
                            value={marks}
                            onChange={(e) => setMarks(e.target.value)}
                            // width="400px"
                          />
                          {markserr ? (
                            <ArgonTypography style={{ color: "red" }}>{markserr}</ArgonTypography>
                          ) : null}
                        </Col>
                      </Row>
                      <Row style={{ display: "flex", border: "none" }}>
                        <Col md={6} className="cusInpCon" style={{ width: "600px" }}>
                          <Label>
                            Subject
                            <span
                              style={{
                                paddingLeft: "5px",
                                color: "red",
                                fontSize: "15px",
                              }}
                            >
                              *
                            </span>
                          </Label>
                          <Input
                            id="exampleFormControlInput1"
                            placeholder="Enter subject Name"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            // width="400px"
                          />
                          {subjecterr ? (
                            <ArgonTypography style={{ color: "red" }}>{subjecterr}</ArgonTypography>
                          ) : null}
                        </Col>
                        <Col
                          md={6}
                          className="cusInpCon"
                          style={{ width: "600px", marginLeft: "20px" }}
                        >
                          <Label>
                            No. of Questions
                            <span
                              style={{
                                paddingLeft: "5px",
                                color: "red",
                                fontSize: "15px",
                              }}
                            >
                              *
                            </span>
                          </Label>
                          <Input
                            id="exampleFormControlInput1"
                            placeholder="Enter noq"
                            value={noq}
                            onChange={(e) => setNoq(e.target.value)}
                            // width="400px"
                          />
                          {noqerr ? (
                            <ArgonTypography style={{ color: "red" }}>{noqerr}</ArgonTypography>
                          ) : null}
                        </Col>
                      </Row>
                    </Container>
                  </div>
                  <Box
                    mt={"30px"}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "end",
                    }}
                  >
                    <Button
                      autoCapitalize="none"
                      variant="contained"
                      endIcon={<KeyboardArrowRightIcon />}
                      aria-label="fingerprint"
                      sx={{
                        display: "flex",
                        margin: "12px",
                        alignSelf: "left",
                        color: "#b931ce",
                        border: "1px solid #b931ce",
                      }}
                      color={"success"}
                      onClick={toggle2}
                    >
                      <ArgonTypography
                        style={{
                          filter: "drop-shadow(5px 5px 5px #b931ce)",
                          fontSize: "13px",
                          color: "#b931ce",
                          fontWeight: "bold",
                        }}
                      >
                        Next
                      </ArgonTypography>
                    </Button>
                  </Box>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div>
              <div
                style={{
                  flexDirection: "row",
                  position: "relative",
                  display: "flex",
                  borderRadius: "20px",
                  marginLeft: "0.5rem",
                  alignItems: "center",
                }}
              >
                <Container style={{ display: "contents" }}>
                  <KeyboardArrowLeftIcon
                    fontSize="large"
                    style={{
                      marginTop: "1rem",
                      marginLeft: "1rem",
                      cursor: "pointer",
                    }}
                    onClick={toggle2}
                  />
                  <h1
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "500",
                      marginLeft: "3.8rem",
                      position: "absolute",
                      top: "13px",
                    }}
                  >
                    Assignment Name
                  </h1>
                </Container>
              </div>
              <div
                className="cusInpFullCon"
                style={{
                  position: "relative",
                  marginTop: "3rem",
                  marginRight: "5rem",
                }}
              >
                {arr?.map((item, index) => (
                  <Container
                    key={index}
                    className="cusInpFullWrap"
                    style={{ marginLeft: "3.2rem", marginTop: "1rem" }}
                  >
                    <Row style={{ display: "flex", border: "none" }}>
                      <Col md={6} className="cusInpCon" style={{ width: "1220px" }}>
                        <Label>
                          {index + 1}. Question Name
                          <span
                            style={{
                              paddingLeft: "5px",
                              color: "red",
                              fontSize: "15px",
                            }}
                          >
                            *
                          </span>
                        </Label>
                        <Input
                          className="quesname"
                          placeholder="Enter Question Name"
                          name="question"
                          onChange={(e) =>
                            handlechange(
                              {
                                target: {
                                  name: "question",
                                  value: e.target.value,
                                },
                              },
                              index
                            )
                          }
                        />
                      </Col>
                    </Row>

                    <Row style={{ display: "flex", justifyContent: "normal", border: "none" }}>
                      <Col md={6} className="cusInpCon" style={{ width: "600px" }}>
                        <Label>
                          option 1
                          <span
                            style={{
                              paddingLeft: "5px",
                              color: "red",
                              fontSize: "15px",
                            }}
                          >
                            *
                          </span>
                        </Label>
                        <Input
                          id="exampleFormControlInput1"
                          placeholder="Enter option 1"
                          onChange={(e) =>
                            handlechange(
                              {
                                target: {
                                  name: "options",
                                  value: e.target.value,
                                  optionName: "optionAns",
                                  indexForOption: 0,
                                },
                              },
                              index
                            )
                          }
                          // width="400px"
                        />
                      </Col>
                      <Col
                        md={6}
                        className="cusInpCon"
                        style={{ width: "600px", marginLeft: "20px" }}
                      >
                        <Label>
                          option 2
                          <span
                            style={{
                              paddingLeft: "5px",
                              color: "red",
                              fontSize: "15px",
                            }}
                          >
                            *
                          </span>
                        </Label>
                        <Input
                          id="exampleFormControlInput1"
                          placeholder="Enter option 2"
                          onChange={(e) =>
                            handlechange(
                              {
                                target: {
                                  name: "options",
                                  value: e.target.value,
                                  optionName: "optionAns",
                                  indexForOption: 1,
                                },
                              },
                              index
                            )
                          }
                        />
                      </Col>
                    </Row>
                    <Row style={{ display: "flex", justifyContent: "normal", border: "none" }}>
                      <Col md={6} className="cusInpCon" style={{ width: "600px" }}>
                        <Label>
                          option 3
                          <span
                            style={{
                              paddingLeft: "5px",
                              color: "red",
                              fontSize: "15px",
                            }}
                          >
                            *
                          </span>
                        </Label>
                        <Input
                          id="exampleFormControlInput1"
                          placeholder="Enter option 3"
                          onChange={(e) =>
                            handlechange(
                              {
                                target: {
                                  name: "options",
                                  value: e.target.value,
                                  optionName: "optionAns",
                                  indexForOption: 2,
                                },
                              },
                              index
                            )
                          }
                        />
                      </Col>
                      <Col
                        md={6}
                        className="cusInpCon"
                        style={{ width: "600px", marginLeft: "20px" }}
                      >
                        <Label>
                          option 4
                          <span
                            style={{
                              paddingLeft: "5px",
                              color: "red",
                              fontSize: "15px",
                            }}
                          >
                            *
                          </span>
                        </Label>
                        <Input
                          id="exampleFormControlInput1"
                          placeholder="Enter option 4"
                          onChange={(e) =>
                            handlechange(
                              {
                                target: {
                                  name: "options",
                                  value: e.target.value,
                                  optionName: "optionAns",
                                  indexForOption: 3,
                                },
                              },
                              index
                            )
                          }
                        />
                      </Col>
                    </Row>
                    <Row style={{ display: "flex", justifyContent: "normal", border: "none" }}>
                      <Col md={6} className="cusInpCon" style={{ width: "600px" }}>
                        <Label>
                          Correct Answer
                          <span
                            style={{
                              paddingLeft: "5px",
                              color: "red",
                              fontSize: "15px",
                            }}
                          >
                            *
                          </span>
                        </Label>
                        <Input
                          id="exampleFormControlInput1"
                          placeholder="Enter Correct Answer"
                          // value={noq}
                          onChange={(e) =>
                            handlechange(
                              {
                                target: {
                                  name: "answer",
                                  value: e.target.value,
                                },
                              },
                              index
                            )
                          }
                        />
                      </Col>

                      <Col
                        md={6}
                        className="cusInpCon"
                        style={{ width: "600px", marginLeft: "20px" }}
                      >
                        <Label>
                          Mark
                          <span
                            style={{
                              paddingLeft: "5px",
                              color: "red",
                              fontSize: "15px",
                            }}
                          >
                            *
                          </span>
                        </Label>
                        <Input
                          id="exampleFormControlInput1"
                          placeholder="Enter Marks"
                          type="number"
                          onChange={(e) =>
                            handlechange(
                              {
                                target: {
                                  name: "markForThisQuestion",
                                  value: e.target.value,
                                },
                              },
                              index
                            )
                          }
                        />
                      </Col>
                    </Row>
                  </Container>
                ))}
              </div>
              <Box
                mt={"30px"}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "end",
                }}
              >
                <Button
                  type="reset"
                  variant="contained"
                  // aria-label="fingerprint"
                  sx={{
                    display: "flex",
                    margin: "12px",
                    alignSelf: "left",
                  }}
                  color={"primary"}
                  onClick={reset}
                >
                  <ArgonTypography
                    style={{
                      filter: "drop-shadow(5px 5px 5px #b931ce)",
                      fontSize: "13px",
                      color: "#b931ce",
                      fontWeight: "bold",
                    }}
                  >
                    Reset
                  </ArgonTypography>
                </Button>
                <Button
                  autoCapitalize="none"
                  variant="contained"
                  endIcon={<KeyboardArrowRightIcon />}
                  aria-label="fingerprint"
                  sx={{
                    display: "flex",
                    margin: "12px",
                    alignSelf: "left",
                    border: "1px solid #b931ce",
                    color: "#b931ce",
                  }}
                  color={"success"}
                  onClick={initiateAssign}
                >
                  <ArgonTypography
                    style={{
                      filter: "drop-shadow(5px 5px 5px #b931ce)",
                      fontSize: "13px",
                      color: "#b931ce",
                      fontWeight: "bold",
                    }}
                  >
                    Submit
                  </ArgonTypography>
                </Button>
              </Box>
            </div>
          </>
        )}
        <Toaster />
      </div>
    </ArgonBox>
    // </DashboardLayout>
  );
};

export default Assign;
