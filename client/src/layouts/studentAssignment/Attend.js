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
import Get from "./get.js";


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

export default function Attend({data, id }) {
  const [controller] = useArgonController();
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState([]);
  const [val, setVal] = useState({
    answer: [],
  });

  useEffect(() => {
    data?.map((i) => {
      if(i?.assignment?._id == id){
        setQuestion(i?.assignment?.question);
      }
    });
  }, [id]);

  const handleChange = (e, index) => {
    e.preventDefault();
    val?.answer?.map((item)=>{
      if (item?.questionNo === index ){
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
      <div
        style={{
          width: "100%",
          minHeight: "calc(100vh - 0px)",
          backgroundColor: "white",
          borderRadius: "20px",
        }}
      >
      {open ? (
          <Get/>
      ) : (
        <>  
          <div>
            <div
              style={{
                flexDirection: "row",
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
                onClick={() => setOpen(!open)}
              />
              <ArgonTypography
                style={{
                  width: "40%",
                  marginTop: "1.5%",
                  display: "flex",
                  justifyContent: "start",
                  color: "#0070CD",
                }}
              >
                Student Attend
              </ArgonTypography>
            </div>
            {question?.map((i, index) =>
              i ? (
                <Container
                  key={i}
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
              style={{ marginLeft: "90%" ,
              color: "#b931ce",
              border:"1px solid #b931ce"}}
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
            </ArgonButton>
          </div>
        </>
      )}
  <Toaster/> 

    {/* </ArgonBox> */}
    </div>
    </>
  );
}
