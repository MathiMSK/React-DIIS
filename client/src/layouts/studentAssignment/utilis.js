import React, { useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import ArgonBox from "components/ArgonBox";
import {
  Card,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  CardHeader,
  CardMedia,
} from "@mui/material";
import ArgonTypography from "components/ArgonTypography";
import exam from "assets/images/exam.png";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Image } from "@mui/icons-material";
import ArgonButton from "components/ArgonButton";
import { Col, Row } from "reactstrap";
import Get from "./get";
import Attend from "./Attend";

const SimpleCard = ({ index, style, data }) => {
  const[attendData,setAttendData]=useState([]);
  const[checkData,setCheckData]=useState([]);
  const[open,setOpen]=useState(false)
  const[open1,setOpen1]=useState(false)
  // let arr=[]
  // data.forEach((item)=>{
  //   let found = false
  //   console.log(item);
  //   arr.forEach((items)=>{
  //     console.log(items);
  //     if(items.assignmentTitle == item.assignmentTitle,item.class == items.class,item.subject == items.subject){ 
  //       found = true
  //     }
  //   })
  //   if(found) arr.push(item)
  // })

  // console.log(arr);
  const uniqueIds = [];

const unique = data?.filter(element => {
  const isDuplicate = uniqueIds.includes(element.assignmentTitle);

  if (!isDuplicate) {
    uniqueIds.push(element.assignmentTitle);

    return true;
  }

  return false;
});

// console.log(unique);
const Attend=(i)=>{
  setAttendData(i)
  setOpen(true)
}
  return (
    <>
    {open1 ? <Get open={open1} setOpen={setOpen1} data={checkData} /> :
     <>
      {open ? <Attend data={data} id={attendData} />:
    <ArgonBox>
      {data?.map((item) => (
        <Card key={item} style={{border:"1px solid #b931ce" ,marginBottom:"20px"}}>
          <CardContent>
            <ArgonTypography variant="body2" color="textSecondary" component="p">
              Assignment Name : {item?.assignment?.assignmentTitle}
            </ArgonTypography>
            <Row style={{display:"flex",justifyContent:"space-between",borderStyle:"none"}}>
            <Col>
            <ArgonTypography variant="body2" color="textSecondary" component="p">
              Class : {item?.assignment?.class}
            </ArgonTypography>
            </Col>
            <Col>
            <ArgonTypography variant="body2" color="textSecondary" component="p">
              Subject :{item?.assignment?.subject}
            </ArgonTypography>
            </Col>
            </Row>
            <Row style={{display:"flex",justifyContent:"space-between",borderStyle:"none"}}>
            <Col>
            <ArgonTypography variant="body2" color="textSecondary" component="p">
              Total Marks :{item?.assignment?.totalMarks}
            </ArgonTypography>
            </Col>
            <Col>
            <ArgonTypography variant="body2" color="textSecondary" component="p">
              Total Question : {item?.assignment?.totalQuestion}
            </ArgonTypography>
            </Col>
            </Row>
          </CardContent>

          <CardActions disableSpacing style={{alignItems:"center",display:"flex",justifyContent:"center"}}>
          {/* <ArgonButton color="primary" variant="outlined" style={{alignItems:"center",display:"flex",justifyContent:"center"}}>
              Attend
            </ArgonButton> */}
            {/* <ArgonButton color="primary" variant="outlined" style={{margintop:"30px"}}>
              Attend
            </ArgonButton> */}
                 {item?.answers.length<=0 ? <ArgonButton variant="contained" style={{alignItems:"center",display:"flex",justifyContent:"center"}} onClick={()=>Attend(item)}>Attend</ArgonButton>:<ArgonButton variant="contained" style={{alignItems:"center",display:"flex",justifyContent:"center"}} onClick={()=>{
          setOpen1(true) 
          setCheckData(item)}}>View</ArgonButton>}
          </CardActions>
        </Card>
      ))}
    </ArgonBox>}
    </>}
    </>
  );
};

export default SimpleCard;
