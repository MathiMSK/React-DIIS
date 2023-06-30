import React,{useContext} from "react";
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
// import facultyContext from "context/facultyContext";

const SimpleCard = ({ index, style, data }) => {
  // const faculty = useContext(facultyContext);
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

const unique = data.filter(element => {
  const isDuplicate = uniqueIds.includes(element.assignmentTitle);

  if (!isDuplicate) {
    uniqueIds.push(element.assignmentTitle);

    return true;
  }

  return false;
});

  return (
    <ArgonBox>
      {data?.map((item,index) => (
        <Card key={index} style={{border:"1px solid #b931ce" ,marginBottom:"20px"
        // ,borderRadius:0
        }}
        >
          <CardContent>
            <ArgonTypography variant="body2" color="textSecondary" component="p">
              Assignment Name : {item?.assignmentTitle}
            </ArgonTypography>
            <Row style={{display:"flex",justifyContent:"space-between",borderStyle:"none"}}>
            <Col>
            <ArgonTypography variant="body2" color="textSecondary" component="p">
              Class : {item?.class}
            </ArgonTypography>
            </Col>
            <Col>
            <ArgonTypography variant="body2" color="textSecondary" component="p">
              Subject :{item?.subject}
            </ArgonTypography>
            </Col>
            </Row>
            <Row style={{display:"flex",justifyContent:"space-between",borderStyle:"none"}}>
            <Col>
            <ArgonTypography variant="body2" color="textSecondary" component="p">
              Total Marks :{item?.totalMarks}
            </ArgonTypography>
            </Col>
            <Col>
            <ArgonTypography variant="body2" color="textSecondary" component="p">
              Total Question : {item?.totalQuestion}
            </ArgonTypography>
            </Col>
            </Row>
          </CardContent>
        </Card>
      ))}
    </ArgonBox>
  );
};

export default SimpleCard;
