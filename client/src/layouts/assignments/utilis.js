import React from "react";
import ArgonBox from "components/ArgonBox";
import {
  Card,
  CardContent
} from "@mui/material";
import ArgonTypography from "components/ArgonTypography";
import { Col, Row } from "reactstrap";

const SimpleCard = ({ index, style, data }) => {
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
