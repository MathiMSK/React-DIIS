import React, { useContext, useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
// import CIcon from "@coreui/icons-react";
// import { cilArrowCircleLeft } from "@coreui/icons";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Input, Switch } from "@mui/material";
import { Col, Row, Label,Container,FormText} from "reactstrap";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box/Box";
import "./styles.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useArgonController, setLayout } from "context";
import ArgonBox from "components/ArgonBox";
const Assign = () => {
    const [controller, dispatch] = useArgonController();
    const { miniSidenav, darkMode } = controller;
  const [open, setOpen] = useState(false);
  const [getAccess, setGetAccess] = useState();
  const [id, setId] = useState({});
  const [active, setActive] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [modal, setModal] = useState(false);
  const [update, setUpdate] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [recover, setRecover] = useState(false);
  const [assign, setAssign] = useState("");
  const [className, setClassName] = useState("")
  const [dos, setDos] = useState("")
  const [noq, setNoq] = useState("")
  const [marks, setMarks] = useState("")

  const [err, setErr] = useState("");
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [columns, setColumns] = useState([
    {
      Header: "SI No",
      id: "index",
      accessor: (row, index) => (
        <div style={{ textAlign: "center" }}>{index + 1}</div>
      ),
    },
    {
      Header: "Assign Name",
      accessor: "assignName",
    },
    {
      Header: "Assign Code",
      accessor: "assignCode",
    },
    {
      Header: "Status",
      accessor: "status",
      disableSortBy: true,
    },
    {
      Header: "Edit",
      accessor: "edit",
      disableSortBy: true,
    },
    {
      Header: "Delete",
      accessor: "delete",
      disableSortBy: true,
    },
  ]);
  // columns2
  let columns2 = [
    {
      Header: "SI No",
      id: "index",
      accessor: (row, index) => (
        <div style={{ textAlign: "center" }}>{index + 1}</div>
      ),
    },
    {
      Header: "Assign Name",
      accessor: "assignName",
    },
    {
      Header: "Assign Code",
      accessor: "assignCode",
    },
    {
      Header: "Recover",
      accessor: "edit",
      disableSortBy: true,
    },
  ];

  const toggle = () => setOpen(!open);
  const reset = () => {
    setErr("");
    setAssign("");
  };

 


  // ***********************  api's  ***********************

  

  const initiateAssign = async () => {
    if (!assign) {
      return setErr("Assign is required");
    }
    setErr("");
    try {
      let response = await createAssign({ assignName: assign,menuId  });
      if (!response.ok) {
        return toast.error(response.data.message);
      }
      toast.success(response.data.message);
      setOpen(!open);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async () => {
    let response = await updateAssign(id._id, { assignName: assign,menuId });
    console.log(response);
  };
  // console.log("data", id._id);
  return (
    // <DashboardLayout>
    <ArgonBox
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
       

        [breakpoints.up("xl")]: {
          marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
          transition: transitions.create(["margin-left", "margin-right"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}>
    <div
      style={{
        width: "100%",
        minHeight: "calc(100vh - 0px)",
        backgroundColor: "white",
        borderRadius: "20px",
      }}
      
    >
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
                      }}
                    >
                      Assignments
                    </h1>
                    <Button
                      style={{
                        marginRight: "1rem",
                      }}
                      onClick={toggle}
                      variant="contained"
                      color={"primary"}
                    >Create</Button>
                  </div>
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
                          }}
                        >
                          Create Assignment
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
                      <Container
                        className="cusInpFullWrap"
                        style={{ marginLeft: "3.2rem", marginTop: "1rem" }}
                      >
                        <Row style={{display:"flex",justifyContent:"normal"}}>
                          <Col
                            md={6}
                            className="cusInpCon"
                            style={{ width:"500px" }}
                            
                          >
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
                            {err ? <p style={{ color: "red" }}>{err}</p> : null}
                          </Col>
                          <Col
                            md={6}
                            className="cusInpCon"
                            style={{ width:"500px",marginLeft:"20px" }}
                          >
                            <Label>
                              Date of submit
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
                              placeholder="Enter Date of submit"
                              value={dos}
                              onChange={(e) => setDos(e.target.value)}
                              // width="400px"
                            />
                            {err ? <p style={{ color: "red" }}>{err}</p> : null}
                          </Col>
                          </Row>
                          
                          <Row style={{display:"flex"}}>  
                          <Col
                            md={6}
                            className="cusInpCon"
                            style={{ width:"500px" }}
                          >
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
                            {err ? <p style={{ color: "red" }}>{err}</p> : null}
                          </Col>
                          <Col
                            md={6}
                            className="cusInpCon"
                            style={{width:"500px",marginLeft:"20px" }}
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
                            {err ? <p style={{ color: "red" }}>{err}</p> : null}
                          </Col>
                          </Row>
                          <Row>
                            
                          <Col
                            md={6}
                            className="cusInpCon"
                            style={{ width:"500px" }}
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
                            {err ? <p style={{ color: "red" }}>{err}</p> : null}
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
                      {/* <Button
                        type="reset"
                        variant="outlined"
                        aria-label="fingerprint"
                        sx={{
                          display: "flex",
                          margin: "12px",
                          alignSelf: "left",
                        }}
                        color={"primary"}
                        onClick={reset}
                      >
                        Reset
                      </Button> */}
                      <Button
                      autoCapitalize="none"
                        variant="contained"
                        endIcon={<KeyboardArrowRightIcon/>}
                        aria-label="fingerprint"
                        sx={{
                          display: "flex",
                          margin: "12px",
                          alignSelf: "left",
                        }}
                        color={"success"}
                        // onClick={initiateRole}
                      >
                        Next
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
