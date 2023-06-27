import ArgonBox from 'components/ArgonBox';
import DTable from 'components/AroganTable/view';
import CustomSelect from 'components/select/CustomSelect';
import { useArgonController } from 'context';
import React, { useEffect, useRef, useState } from 'react'
import { generatePDF } from 'utility/apiService';
import jwt_decode from "jwt-decode";  
import { getAllAssign,pdfDownload } from 'utility/apiService';
import ArgonButton from 'components/ArgonButton';
import {toast,Toaster } from 'react-hot-toast';
import { useReactToPrint } from "react-to-print";
import { saveAs } from 'file-saver'
import { Col, Container, Row } from 'reactstrap';
const MIS = () => {
    const [ open, setOpen ] = useState(false);
    const [controller] = useArgonController();
    const { miniSidenav } = controller;
    const [data, setData] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [subject, setSubject] = useState("");
    const [subjectVal, setSubjectVal] = useState("");
    const [className, setClassName] = useState("");
    const [classNameVal, setClassNameVal] = useState("");

          let token = localStorage.getItem("token");
          let decoded;
          if (token) {
            token = JSON.parse(token);
            decoded = jwt_decode(token);
          }
          let stdid = decoded?.id;

const values =async()=>{
   let response = await getAllAssign();
   let data = response.data?.data?.filter((item)=>{
      console.log(item,"item");
      return item
    })
    setSubject(
      data.map((item) => {
        return {
          value: item.subject || "",
          label: item.subject || "",
        };
      })
    );

   let res = await getAllAssign();
   let clasdata = res.data?.data?.filter((item)=>{
      console.log(item,"item");
      return item
    })
    setClassName(
      clasdata.map((item) => {
        return {
          value: item.class || "",
          label: item.class || "",
        };
      })
    );

}
const columns = [
  {
    name: 'Student Name',
    selector: row => row.name,
    sortable: true,
},
  {
      name: 'Assignment Name',
      selector: row => row.assignmentName,
      sortable: true,
  },
  {
      name: 'Class',
      selector: row => row.class,
      sortable: true,
  },

  {
      name: 'Marks',
      selector: row => row.scoredMarks,
      sortable: true,
  },
  {
      name: 'Subject',
      selector: row => row.subject,
      sortable: true,
  },
];
const componentPdf = useRef();
 const generatePdf = useReactToPrint({
    content: () => componentPdf.current,
    documentTitle: "Assignment",
    onAfterPrint: () => {
     toast.success("Assignment Printed Successfully");
    }
  });

    const handleSubt = async () => {
      const Sub = await generatePDF(subjectVal?.value);
      setData(Sub?.data?.data?.tableData);
      setChartData(Sub?.data?.data?.chartImg);
    }  

    const handlePdf = async(e) => {
      e?.preventDefault();
      const {data1} = await pdfDownload(subjectVal?.value);
      const blob = new Blob([data1], { type: 'application/pdf' })
      saveAs(blob, "result.pdf")
    };
    useEffect(() => {
      // handleSubt();
      // handlePdf()
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
                    }}
                  >
                    Reports
                  </h1>
                  <ArgonButton onClick={()=>{
                    handleSubt()
                    setOpen(true)}} >
                    <span style={{ marginRight: "10px" }}>Download</span>
                    <i className="fas fa-download"></i>
                  </ArgonButton>
                </div>
                <Container>
                  <Row>
                    <Col>
              <CustomSelect 
                 option={subject}
                  selectedOptions={subjectVal}
                  setSelectedOptions={setSubjectVal}
                  isSearchable={true}
                  isMulti={false}
              />
              </Col>
              <Col>
              <CustomSelect 
                 option={className}
                  selectedOptions={classNameVal}
                  setSelectedOptions={setClassNameVal}
                  isSearchable={true}
                  isMulti={false}
              />
              </Col>
              </Row>
                </Container >
                </>
                ) : (
              <>
               <ArgonButton 
               onClick={handlePdf}
                >
                    <span style={{ marginRight: "10px" }}>Download</span>
                    <i className="fas fa-download"></i>
                  </ArgonButton>
                <div ref={componentPdf} >
                  <DTable columns={columns} data={data}  />
                  <img style={{width:"100%"}} src={chartData} ></img>
                </div>

                
              </>
         )}
           
  </div>
  </ArgonBox>
  )
}

export default MIS
