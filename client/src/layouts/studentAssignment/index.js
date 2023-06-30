import ArgonBox from "components/ArgonBox";
import { useArgonController } from "context";
import React, { createContext, useEffect, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Card, FormGroup, Input, Switch, Typography } from "@mui/material";
import { Col, Row, Label, Container, FormText, CardTitle, CardBody } from "reactstrap";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box/Box";
import { getAllAssign } from "utility/apiService";
import { toast, Toaster } from "react-hot-toast";
import ArgonTypography from "components/ArgonTypography";
import Get from "./get";
import SimpleCard from "./utilis";
export const DataContext = createContext({});
const studentAssignment = () => {
  const [controller, dispatch] = useArgonController();
  const { miniSidenav, darkMode } = controller;
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [quesData, setQuesData] = React.useState([]);
  const [ques, setQues] = React.useState([]);
  const [assign, setAssign] = useState("");
  const [className, setClassName] = useState("");
  const [marks, setMarks] = useState("");
  const [subject, setSubject] = useState("");

  const [noq, setNoq] = useState();
  const [datas, setDatas] = useState([]);
  const [assignData, setAssignData] = useState([]);
  const [err, setErr] = useState("");
  const [asserr, setAssErr] = useState("");
  const [classerr, setClassErr] = useState("");
  const [subjecterr, setSubjectErr] = useState("");
  const [markserr, setMarksErr] = useState("");
  const [noqerr, setNoqErr] = useState("");
  const [questionerr, setQuestionErr] = useState("");
  const [optionerr, setOptionErr] = useState("");
  const [correcterr, setCorrectErr] = useState("");

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
            Student Assignments
          </h1>
        </div>
        <div style={{ border: "1px solid #0070CD", marginBottom: "20px" }} />
        <Get /> 
      </div>
    </ArgonBox>
  );
};

export default studentAssignment;
