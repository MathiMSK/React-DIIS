// import { cilChevronLeft } from "@coreui/icons";
// import CIcon from "@coreui/icons-react";
import { Box, Button, Input, Radio } from "@mui/material";
import { Col, Row, Label, Container, FormText, CardTitle, CardBody } from "reactstrap";
import React from "react";
import { useState, useEffect } from "react";
import View from "./index.js";
import { styled } from "@mui/material/styles";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { assAttend } from "utility/apiService.js";
// import { turn } from "core-js/core/array";
// import FormLabel from "@mui/material/FormLabel";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ArgonTypography from "components/ArgonTypography/index.js";
import { identifier } from "stylis";
import ArgonButton from "components/ArgonButton/index.js";
import { toast ,Toaster} from "react-hot-toast";
import ArgonBox from "components/ArgonBox/index.js";
import { useArgonController } from "context/index.js";
//******************************** */

// Inspired by blueprintjs
function BpRadio(props) {
  return (
    <Radio
      disableRipple
      color="default" 
      {...props}
    />
  );
}

export default function Attend({ data ,id }) {
  const [controller] = useArgonController();
  const { miniSidenav } = controller;
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState([]);
  const [val, setVal] = useState({
    answer: [],
  });
  useEffect(() => {
    data.map((i) => {
      if(i.assignment._id == id){
        setQuestion(i.assignment.question);
      }
    });
  }, [id]);

  const handleChange = (e, index) => {
    e.preventDefault();
    val.answer.map((item)=>{
      if (item.questionNo === index ){
        item.questionNo = 0;
      }
    })
    val?.answer.push({
      questionNo: index,
      answer: e.target.value,
    });
  };

  const handleSubmit=async()=>{
    let arr = {answers:[]}
    val.answer.map((i)=>{
      if (i.questionNo != 0){
        arr.answers.push(i)
      }
    })
    arr.answers?.sort((a,b)=> a.questionNo - b.questionNo ) 
    let res= await assAttend(id,arr)
    if(res.ok == false) return toast.error(res.data.message)  
    toast.success(res.data.message)
    setOpen(true) 
  }

  return (
    <>
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
    <div>
      {open ? (
        <View />
      ) : (
        <>  
          <div>
            <div
              style={{
                flexDirection: "row",
                position: "relative",
                display: "flex",
                borderRadius: "20px",
                alignItems: "center",
              }}
            >
              <KeyboardArrowLeftIcon
                fontSize="large"
                style={{
                  marginTop: "1rem",  
                  marginLeft: "1rem",
                  cursor: "pointer",
                }}
                onClick={() => setOpen(true)}
              />
              <ArgonTypography
                style={{
                  width: "40%",
                  marginTop: "1.5%",
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                Student Attend
              </ArgonTypography>
            </div>
            {/* <Divider style={{ backgroundColor: "black" }} /> */}
            {question?.map((i, index) =>
              i ? (
                <Container
                  key={index}
                  className="shadow-inner"
                  style={{ backgroundColor: "white", height: "320px" }}
                >
                  <Row style={{ height: "55px" }}>
                    <div style={{ marginTop: "10px", fontSize: "31px" }}>{index + 1},</div>
                    <Col size="12" style={{ marginTop: "20px" }}>
                      <ArgonTypography style={{ fontSize: "20px" }}>{i?.question}</ArgonTypography>
                    </Col>
                  </Row>
                  <FormControl style={{ margin: "5%" }} onChange={(e) => handleChange(e, index + 1)}>
                    <RadioGroup>
                      <FormControlLabel
                        value={i?.options[0]?.optionAns}
                        control={<BpRadio />}
                        label={i?.options[0]?.optionAns}
                      />
                      <FormControlLabel
                        value={i?.options[1]?.optionAns}
                        control={<BpRadio />}
                        label={i?.options[1]?.optionAns}
                      />
                      <FormControlLabel
                        value={i?.options[2]?.optionAns}
                        control={<BpRadio />}
                        label={i?.options[2]?.optionAns}
                      />
                      <FormControlLabel
                        value={i?.options[3]?.optionAns}
                        control={<BpRadio />}
                        label={i?.options[3]?.optionAns}
                      />
                    </RadioGroup>
                  </FormControl>
                </Container>
              ) : null
            )}
            <ArgonButton
              color="success"
              variant="contained"
              onClick={handleSubmit}
              style={{ marginLeft: "90%" }}
            >
              Submit
            </ArgonButton>
          </div>
        </>
      )}
  <Toaster/> 
  </div>
    </ArgonBox>
    </>
  );
}
