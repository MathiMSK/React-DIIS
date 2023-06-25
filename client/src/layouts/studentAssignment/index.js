import ArgonBox from 'components/ArgonBox'
import { useArgonController } from 'context';
import React, { createContext, useEffect, useState } from 'react'
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Card, FormGroup, Input, Switch, Typography } from "@mui/material";
import { Col, Row, Label, Container, FormText, CardTitle, CardBody } from "reactstrap";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box/Box";
import { getAllAssign } from 'utility/apiService';
import { toast, Toaster } from "react-hot-toast";
import ArgonTypography from 'components/ArgonTypography';
import Get from './get';
export const DataContext =createContext({})
const studentAssignment = () => {
    const [controller, dispatch] = useArgonController(); 
      const { miniSidenav, darkMode } = controller;
      const [open, setOpen] = React.useState(false);
      const [open2, setOpen2] = React.useState(false);
      const [quesData, setQuesData] = React.useState([]);
      const[ques,setQues]=React.useState([])
      const [assign, setAssign] = useState("");
      const [className, setClassName] = useState("");
      const [marks, setMarks] = useState("");
      const [subject, setSubject] = useState("");
    
      const [noq, setNoq] = useState();
      const [datas, setDatas] = useState([]);
      const [assignData, setAssignData] = useState([])
    const [err, setErr]= useState("")
      const [asserr, setAssErr] = useState("");
      const[classerr,setClassErr]=useState("");
      const[subjecterr,setSubjectErr]=useState("");
      const[markserr,setMarksErr]=useState("");
      const[noqerr,setNoqErr]=useState("");
      const[questionerr,setQuestionErr]=useState("");
      const[optionerr,setOptionErr]=useState("");
      const[correcterr,setCorrectErr]=useState("");
      
    
      const handlechange = (e, index) => {
        console.log(index);
        const { name, value, indexForOption, optionName } = e.target;
        const list = [...datas];
        if (name === "options") {
          list[index][name][indexForOption][optionName] = value;
        } else {
          list[index][name] = value;
        }
        setDatas(list);
        console.log(datas);
      };
    
    
      // ***********************  api's  ***********************
    
      const getAssign = async () => {
        try {
          let response = await getAllAssign();
          console.log(response.data.data);
          if (!response.ok) {
            return toast.error(response.data.message);
          }
          setAssignData(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };

      // let arr = [];
      //   assignData?.map((item,index) => {
      //     arr.push(item);
      //     console.log(item);
          
      //       setQuesData(item)
        
      //     // item.question.map((j)=>{
      //     //     let cho=[]
      //     //     console.log(j);
      //     //     j.options.map((option)=>{
      //     //         cho.push(option.optionAns)
      //     //     })
      //     //     arr.push({question:j.question,choices:cho,correctAnswer:j.answer})
      //     //     cho=[]
      //     // })
      //   });
      
      useEffect(() => {
        getAssign();
        // assign1();
      }, []);
    
      const initiateAssign = async () => {
        if (!assign) {
           setAssErr("Assign is required");
        }
        setAssErr("");
        if (!noq) {
           setNoqErr("Number of questions is required");
        }
        setNoqErr("");
        if(!subject){
           setSubjectErr("Subject is required");
        }
        setSubjectErr("");
        if (!className) {
           setClassErr("Class name is required");
        }
        setClassErr("")
        if (!marks) {
           setMarksErr("Marks is required");
        }
        setMarksErr("");
        if(assign && noq && subject && className && marks){
        try {
          let response = await createAssign({ 
            assignmentTitle: assign, 
            class:className,
            totalMarks:marks,
            subject:subject,
            totalQuestion:noq,
            question:datas,
           });
          if (!response.ok) {
            return toast.error(response.data.message);
          }
          else{
            setOpen(!open)
            toast.success(response.data.message);
          }
        } catch (error) {
          console.log(error);
        }
      }
      else{
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
                    }}
                  >
                   Student Assignments
                  </h1>
                  {/* <Button
                    style={{
                      marginRight: "1rem",
                    }}
                    onClick={toggle}
                    variant="contained"
                    color={"primary"}
                  >
                    Create
                  </Button> */}
                </div>
                {/* <Container style={{marginTop:"5%",width:"80%",marginLeft:"10%"}}>
                <Get/>  
                <ArgonTable/>
                </Container> */}
                {/* <Container style={{marginTop:"5%",width:"80%",marginLeft:"10%"}}>
                </Container> */}
          <Get/>
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
                      <Row style={{ display: "flex", justifyContent: "normal" }}>
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
                          {asserr ? <ArgonTypography style={{ color: "red" }}>{asserr}</ArgonTypography> : null}
                        </Col>
                     
                      </Row>

                      <Row style={{ display: "flex" }}>
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
                          {classerr ? <ArgonTypography style={{ color: "red" }}>{classerr}</ArgonTypography> : null}
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
                          {markserr ? <ArgonTypography style={{ color: "red" }}>{markserr}</ArgonTypography> : null}
                        </Col>
                      </Row>
                      <Row style={{display:"flex"}}>
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
                          {subjecterr ? <ArgonTypography style={{ color: "red" }}>{subjecterr}</ArgonTypography> : null}
                        </Col>
                        <Col md={6} className="cusInpCon" style={{ width: "600px", marginLeft: "20px"  }}>
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
                          {noqerr ? <ArgonTypography style={{ color: "red" }}>{noqerr}</ArgonTypography> : null}
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
                      }}
                      color={"success"}
                      onClick={toggle2}
                    >
                      Next
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
                    <Row style={{ display: "flex" }}>
                      <Col md={6} className="cusInpCon" style={{width:"1220px"}} >
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
                          // id="exampleFormControlInput1"
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
                        {err ? <ArgonTypography style={{ color: "red" }}>{err}</ArgonTypography> : null}
                      </Col>
                    </Row>

                    <Row style={{ display: "flex", justifyContent: "normal" }}>
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
                          placeholder="Enter Date of submit"
                          // value={dos}
                          // onChange={(e) => setDos(e.target.value)}
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
                        {err ? <ArgonTypography style={{ color: "red" }}>{err}</ArgonTypography> : null}
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
                          placeholder="Enter Class Name"
                          // value={className}
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
                          // width="400px"
                        />
                        {err ? <ArgonTypography style={{ color: "red" }}>{err}</ArgonTypography> : null}
                      </Col>
                    </Row>
                    <Row style={{ display: "flex", justifyContent: "normal" }}>
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
                          placeholder="Enter Total Marks"
                          // value={marks}
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
                          // width="400px"
                        />
                        {err ? <ArgonTypography style={{ color: "red" }}>{err}</ArgonTypography> : null}
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
                          placeholder="Enter noq"
                          // value={noq}
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
                          // width="400px"
                        />
                        {err ? <ArgonTypography style={{ color: "red" }}>{err}</ArgonTypography> : null}
                      </Col>
                    </Row>
                    <Row style={{ display: "flex", justifyContent: "normal" }}>
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
                          placeholder="Enter noq"
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
                          // width="400px"
                        />
                        {err ? <ArgonTypography style={{ color: "red" }}>{err}</ArgonTypography> : null}
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
                          placeholder="Enter noq"
                          // value={noq}
                          type = "number"
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
                          // width="400px"
                        />
                        {err ? <ArgonTypography style={{ color: "red" }}>{err}</ArgonTypography> : null}
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
                  Reset
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
                  }}
                  color={"success"}
                  onClick={initiateAssign}
                >
                  Submit
                </Button>
              </Box>
            </div>
          </>
        )}
        <Toaster />
      </div>
    </ArgonBox>
  )
}

export default studentAssignment