import ArgonBox from "components/ArgonBox";
import DTable from "components/AroganTable/view";
import CustomSelect from "components/select/CustomSelect";
import { useArgonController } from "context";
import React, { useEffect, useRef, useState } from "react";
import { generatePDF } from "utility/apiService";
import jwt_decode from "jwt-decode";
import { getAllAssign, pdfDownload } from "utility/apiService";
import ArgonButton from "components/ArgonButton";
import { toast, Toaster } from "react-hot-toast";
import { useReactToPrint } from "react-to-print";
import { saveAs } from "file-saver";
import { Col, Container, Row } from "reactstrap";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { getTicketsPdf } from "utility/apiService";
import Modal from "@mui/material/Modal";
import { getById } from "utility/apiService";
import { getAllUser } from "utility/apiService";
import ArgonTypography from "components/ArgonTypography";
const MIS = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [controller] = useArgonController();
  const { miniSidenav } = controller;
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [subject, setSubject] = useState("");
  const [subjectVal, setSubjectVal] = useState("");
  const [className, setClassName] = useState("");
  const [classNameVal, setClassNameVal] = useState("");
  const [stdid, setStdid] = useState("");
  const [stdidVal, setStdidVal] = useState("");
  const [ass,setAss] = useState("");
  const [assVal,setAssVal] = useState("");

  const values = async () => {
    let response = await getAllAssign();
    let data = response.data?.data?.filter((item) => {
      return item;
    });
    const uniqueSub = [...new Set(data.map(item => item.subject))];
    setSubject(
      uniqueSub?.map((index) => {
        return {
          value: index || "",
          label: index || "",
        }
      })
     
    );
    setAss(
      data?.map((item) => {
        console.log(item);
        return {
          id: item._id,
          value: item.assignmentTitle || "",
          label: item.assignmentTitle || "",
        }
      })
    )

    let res = await getAllAssign();
    let clasdata = res.data?.data?.filter((item) => {
      return item;
    });
    const uniqueClass = [...new Set(clasdata.map(item => item.class))];
    setClassName(
      uniqueClass.map((index) => {
        return {
          value: index || "",
          label: index || "",
        };
      })
    );

    let resp = await getAllUser();
    let std = resp.data?.data.filter((item) => {
      return item.isFaculty == false;
    });
    setStdid(
      std.map((item) => {
        return {
          id: item._id,
          value: item.name || "",
          label: item.name || "",
        };
      })
    );
  };
  const columns = [
    {
      name: "Student Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Assignment Name",
      selector: (row) => row.assignmentName,
      sortable: true,
    },
    {
      name: "Class",
      selector: (row) => row.class,
      sortable: true,
    },

    {
      name: "Marks",
      selector: (row) => row.scoredMarks,
      sortable: true,
    },
    {
      name: "Subject",
      selector: (row) => row.subject,
      sortable: true,
    },
  ];
  const componentPdf = useRef();
  const generatePdf = useReactToPrint({
    content: () => componentPdf.current,
    documentTitle: "Assignment",
    onAfterPrint: () => {
      toast.success("Assignment Printed Successfully");
    },
  });
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleSubt = async () => {
    const Sub = await generatePDF(subjectVal?.value, classNameVal?.value, stdidVal?.id,assVal?.id);
    setData(Sub?.data?.data?.tableData);
    setChartData(Sub?.data?.data?.chartImg);
  };

  const handlePdf = async (e) => {
    e?.preventDefault();
    const { data } = await getTicketsPdf(subjectVal?.value, classNameVal?.value, stdidVal?.id,assVal?.id);
    const blob = new Blob([data], { type: "application/pdf" });
    saveAs(blob, "Student Result.pdf");
  };
  useEffect(() => {
    values();
  }, []);
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
                  color: "#0070CD",
                }}
              >
                Reports
              </h1>
              <ArgonButton
                onClick={() => {
                  handleSubt();
                  setOpen(true);
                }}
                style={{
                  border:"1px solid #b931ce",
                  color: "#b931ce",
                  marginRight: "15px",
                  
                }}
              >
              <ArgonTypography style={{filter: "drop-shadow(5px 5px 5px #b931ce)",fontSize:"13px",color: "#b931ce",fontWeight:"bold"}}>
               Generate
               </ArgonTypography>
                
              </ArgonButton>
            </div>
            <div style={{ border: "1px solid #0070CD" }} />
            <marquee>
              <ArgonTypography style={{ fontSize: "10px" }}>
                If you want to view all Students report,then hit the download button without
                selecting...
              </ArgonTypography>
            </marquee>
            <div
              className="cusInpFullCon"
              style={{
                position: "relative",
                marginTop: "3rem",
                marginRight: "5rem",
              }}
            >
              <Container
                style={{
                  marginLeft: "3.2rem",
                  marginTop: "1rem",
                  display: "flex",
                  justifyContent: "center",
                  border: "1px solid #b931ce",
                  height: "500px",
                }}
              >
                <Row style={{ display: "flex", justifyContent: "center", border: "none" }}>
                  <Col md={6} style={{ width: "200px" }}>
                    <CustomSelect
                      option={subject}
                      selectedOptions={subjectVal}
                      setSelectedOptions={setSubjectVal}
                      placeholder="Select Subject"
                      isSearchable={true}
                      isMulti={false}
                    />
                  </Col>
                  <Col md={6} style={{ width: "200px", marginLeft: "5px" }}>
                    <CustomSelect
                      option={className}
                      selectedOptions={classNameVal}
                      setSelectedOptions={setClassNameVal}
                      placeholder="Select Class"
                      isSearchable={true}
                      isMulti={false}
                    />
                  </Col>
                </Row>
                <Row style={{ display: "flex", justifyContent: "center", border: "none" }}>
                  <Col md={6} style={{ width: "200px", marginLeft: "5px" }}>
                    <CustomSelect
                      option={stdid}
                      selectedOptions={stdidVal}
                      setSelectedOptions={setStdidVal}
                      placeholder="Select Student"
                      isSearchable={true}
                      isMulti={false}
                    />
                  </Col>
                  <Col md={6} style={{ width: "200px", marginLeft: "5px" }}>
                    <CustomSelect
                      option={ass}
                      selectedOptions={assVal}
                      setSelectedOptions={setAssVal}
                      placeholder="Select Assign"
                      isSearchable={true}
                      isMulti={false}
                    />
                  </Col>
                </Row>
              </Container>
            </div>
          </>
        ) : (
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
              <Container style={{ display: "contents" }}>
                <KeyboardArrowLeftIcon
                  fontSize="large"
                  style={{
                    marginTop: "1rem",
                    marginLeft: "1rem",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setOpen(!open);
                  }}
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
                  Report Preview
                </h1>
              </Container>
            </div>
            <div style={{ border: "1px solid #0070CD" }} />
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <ArgonBox sx={style}>
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
                    <div ref={componentPdf}>
                      <DTable columns={columns} data={data} />
                      <img style={{ width: "100%" }} src={chartData}></img>
                    </div>

                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <ArgonButton variant="outlined" color="error" onClick={handlePdf}>
                        <span style={{ marginRight: "10px" }}>
                        <ArgonTypography
                          style={{
                            filter: "drop-shadow(5px 5px 5px #b931ce)",
                            fontSize: "13px",
                            color: "#b931ce",
                            fontWeight: "bold",
                          }}
                        >
                          Download
                        </ArgonTypography>
                        </span>
                        <i className="fas fa-download"></i>
                      </ArgonButton>
                    </div>
                  </Container>
                </div>
              </ArgonBox>
            </Modal>
          </>
        )}
      </div>
    </ArgonBox>
  );
};

export default MIS;
