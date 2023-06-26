import React, { useState } from "react"; 
import ArgonBox from "components/ArgonBox";
import {
  Card,
  CardContent,
  CardActions, 
} from "@mui/material";
import ArgonTypography from "components/ArgonTypography"; 
import ArgonButton from "components/ArgonButton";
import { Col, Row } from "reactstrap"; 
import Attend from "./Attend";
import Result from "./result";

const SimpleCard = ({ index, style, data }) => {
  const [attendData, setAttendData] = useState([]);
  const [checkData, setCheckData] = useState([]);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [id, setId] = useState();
 
  return (
    <>
      {open1 ? (
        <Result open={open1} setOpen={setOpen1} data={checkData} id={id} />
      ) : (
        <>
          {open ? (
            <Attend data={data} id={id} />
          ) : (
            <ArgonBox>
              {data?.map((item) => (
                <Card key={item} style={{ border: "1px solid #b931ce", marginBottom: "20px" }}>
                  <>
                    <CardContent>
                      <ArgonTypography variant="body2" color="textSecondary" component="p">
                        Assignment Name : {item?.assignment?.assignmentTitle}
                      </ArgonTypography>
                      <Row
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          borderStyle: "none",
                        }}
                      >
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
                      <Row
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          borderStyle: "none",
                        }}
                      >
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
                    <CardActions
                      disableSpacing
                      style={{ alignItems: "center", display: "flex", justifyContent: "center" }}
                    >
                      {item?.answers.length <= 0 ? (
                        <ArgonButton
                          variant="contained"
                          style={{
                            alignItems: "center",
                            display: "flex",
                            justifyContent: "center",
                          }}
                          onClick={() =>{
                            setOpen(true)
                            setId(item.assignment._id)
                          }}
                        >
                          Attend
                        </ArgonButton>
                      ) : (
                        <ArgonButton
                          variant="contained"
                          style={{
                            alignItems: "center",
                            display: "flex",
                            justifyContent: "center",
                          }}
                          onClick={() => { 
                            setId(item.assignment._id)
                            setOpen1(true);
                            setCheckData(item);
                          }}
                        >
                          View
                        </ArgonButton>
                      )}
                    </CardActions>
                  </>
                </Card>
              ))}
            </ArgonBox>
          )}
        </>
      )}
    </>
  );
};

export default SimpleCard;
