import { Button, Card, Input } from '@mui/material'
import ArgonBox from 'components/ArgonBox'
import ArgonTypography from 'components/ArgonTypography'
import React, { useEffect, useState } from 'react'
import { Col, Container, Label, Row } from 'reactstrap'
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useArgonController } from 'context'
import { createUser } from 'utility/apiService'
import { toast,Toaster } from 'react-hot-toast'
import { getProfile } from 'utility/apiService'
import { getAllUser } from 'utility/apiService'
import DTable from 'components/AroganTable/view'

const Students = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [facultyData, setFacultyData] = useState([]);

    const [stuname, setStuName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [className, setClassName] = useState("");

    const [stuerr, setStuerr] = useState("")
    const [emailerr, setEmailerr] = useState("")
    const [passerr, setPasserr] = useState("")
    const [classerr, setClasserr] = useState("")

    const [controller, dispatch] = useArgonController();
    const { miniSidenav, darkMode } = controller;

    const toggle = () => setOpen(!open);

    const getProf = async () => {
        try {
          let response = await getProfile();
          setFacultyData(response.data.data);
        } catch (error) {
          console.log(error);
        }
    }

    const getUsers = async () => {
        try {
            let response = await getAllUser();
            let std = response.data?.data.filter((item) => {
              return item.isFaculty==false
            });
            setData(std);
        } catch (error) {
            console.log(error);
        }
    }

    const columns = [
      {
        name: 'Student Name',
        selector: row => row.name,
        sortable: true,
    },
      {
          name: 'Class',
          selector: row => row.class,
          sortable: true,
      },
    
      {
          name: 'Email',
          selector: row => row.email,
          sortable: true,
      },
    ];

    useEffect(() => {
        getProf();
        getUsers();
    }, []);

    const handleSubmit = async() => {
        if (!stuname) {
            setStuerr("Student Name is required");
         }
         setStuerr("");
         if (!className) {
            setClasserr("Class Detail is required");
         }
         setClasserr("");
         if(!email){
            setEmailerr("Email is required");
         }
         setEmailerr("");
         if (!password) {
            setPasserr("Password is required");
         }
         setPasserr("");
    try {
        let response = await createUser({
            name: stuname,
            email: email,
            password: password,
            class: className
        })
        if(!response.ok) {
            return toast.error(response.data.message);
          }
          toast.success(response.data.message);
          setOpen(!open)
       
    } catch (error) {
        console.log(error);
    }
  }


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
        }}>
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
                      color: "#0070CD",
                    }}
                  >
                    Student Creation
                  </h1>
                  <div>

                  {facultyData?.isFaculty == true ? (
                  <Button
                    style={{
                      marginRight: "1rem",
                      border:"1px solid #b931ce",
                      color: "#b931ce",
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
            ) :  null}

                  </div>
                </div>
                <div style={{border:"1px solid #0070CD",marginBottom:"20px"}}/>  

                <Card style={{display:'flex',justifyContent:"center",width:"50%",marginLeft:"20%",border:"1px solid #b931ce"}}>
               <Container  >
                <DTable data={data} columns={columns} title="Students List" />
               </Container>
               </Card>
              </>
            ) :
            <>
                <div>
                  <div
                    style={{
                      flexDirection: "row",
                      position: "relative",
                      marginTop: "1rem",
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
                        Create Student
                      </h1>
                    </Container>
                  </div>
                    <div style={{border:"1px solid #0070CD"}}/>
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
                      <Row style={{ display: "flex",border:"none" }}>
                        <Col md={6} className="cusInpCon" style={{ width: "600px" }}>
                        <Label>
                            Student Name
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
                            placeholder="Enter Studnet Name"
                            value={stuname}
                            onChange={(e) => setStuName(e.target.value)}
                          />
                          {stuerr ? <p style={{ color: "red" }}>{stuerr}</p> : null}
                        </Col>
                        <Col
                          md={6}
                          className="cusInpCon"
                          style={{ width: "600px", marginLeft: "20px" }}
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
                          />
                          {classerr ? <p style={{ color: "red" }}>{classerr}</p> : null}
                        </Col>
                      </Row>
                      <Row style={{display:"flex",border:"none"}}>
                        <Col md={6} className="cusInpCon" style={{ width: "600px" }}>
                        <Label>
                           Email
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
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          {emailerr ? <p style={{ color: "red",fontSize:"10px" }}>{emailerr}</p> : null}
                        </Col>
                        <Col md={6} className="cusInpCon" style={{ width: "600px", marginLeft: "20px"  }}>
                        <Label>
                           Password
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
                            placeholder="Enter password Name"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                           {passerr ? (
                          <p
                            className="error"
                            style={{
                              paddingLeft: "14px",
                              color: "red",
                              fontSize: "14px",
                            }}
                          >
                            {passerr}
                          </p>
                            ) : null}
                        </Col>
                      </Row>
                    </Container>
                  </div>
                  <ArgonBox
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
                        border:"1px solid #b931ce",
                        color: "#b931ce",
                      }}
                      color={"success"}
                      onClick={handleSubmit}
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
                  </ArgonBox>
                </div>
              </>
            }
<Toaster/>
    </div>
    </ArgonBox>
  )
}

export default Students
