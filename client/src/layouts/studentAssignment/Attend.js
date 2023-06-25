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
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#137cbd",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
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

export default function Attend({ data, id }) {
  //  console.log(id);
  const [open,setOpen] = useState(false);
  const [question, setQuestion] = useState([]);
  // const [answer, setAnswer] = useState("");
  const [post, setPost] = useState({
    answer: [],
  });
  useEffect(() => {
    setQuestion(id?.assignment?.question);
  }, []);
  console.log(open);

  const add = (e, index) => {
    e.preventDefault();
    post.answer.map((item)=>{
      if (item.questionNo === index ){
        item.questionNo = 0;
      }
    })
    post?.answer.push({
      questionNo: index,
      answer: e.target.value,
    });
    post
  };

  // console.log(id._id);
  const handel=async()=>{
    let arr = {answers:[]}
    post.answer.map((i)=>{
      if (i.questionNo != 0){
        arr.answers.push(i)
      }
    })
    arr.answers?.sort((a,b)=> a.questionNo - b.questionNo ) 
    let res= await assAttend(arr,id.assignment._id)
    if(!res.data.ok){
     alert(res.data.message)
     setOpen(true)
    }
    alert(res.data.message)
     console.log(open);
  }
  // useEffect(()=>{
  //   handel()
  // },[])

  return (
    <>
      {open ? (
        <View />
      ) : (
        <>
          {/* <CIcon
            icon={cilChevronLeft}
            size="xl"
            style={{
              marginTop: "1rem",
              marginLeft: "1rem",
              cursor: "pointer",
            }}
            onClick={() => setOpen(true)}
          /> */}
           <KeyboardArrowLeftIcon
                        fontSize="large"
                        style={{
                          marginTop: "1rem",
                          marginLeft: "1rem",
                          cursor: "pointer",
                        }}
                        onClick={() => setOpen(true)}
                      />
          <h1 style={{ marginLeft: "3rem", marginTop: "-3rem" }}>
            Write Answer
          </h1>
          {/* <Divider style={{ backgroundColor: "black" }} /> */}
          {question?.map((i, index) =>
            i ? (
              <Container
                key={index}
                className="shadow-inner"
                style={{ backgroundColor: "white", height: "320px" }}
              >
                <Row style={{ height: "55px" }}>
                  <div style={{ marginTop: "10px", fontSize: "31px" }}>
                    {index + 1}
                  </div>
                  <Col size="12" style={{ margin: "4%" }}>
                    <Input
                      placeholder="Question No"
                      id="form1"
                      type="text"
                      disabled
                      value={i?.question}
                      style={{ width: "95%", marginTop: "-75px" }}
                    />
                  </Col>
                </Row>
                <FormControl
                  style={{ margin: "5%" }}
                  onChange={(e) => add(e, index + 1)}
                >
                  <RadioGroup
                    aria-labelledby="demo-customized-radios"
                    name="customized-radios"
                  >
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
          <Button
            variant="contained"
             onClick={handel}
            style={{ marginTop: "10%", marginLeft: "90%" }}
          >
            Submit
          </Button>
        </>
      )}
    </>
  );
}

// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Radio from '@mui/material/Radio';

// export default function CustomizedRadios() {
//   return (

//   );
// }
