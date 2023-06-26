import ArgonBox from 'components/ArgonBox';
import DTable from 'components/AroganTable/view';
import CustomSelect from 'components/select/CustomSelect';
import { useArgonController } from 'context';
import React, { useEffect, useState } from 'react'
import { Container } from 'reactstrap';
import { generatePDF } from 'utility/apiService';
import jwt_decode from "jwt-decode";  
import { stdViewTheirAllAssign } from 'utility/apiService';
import { getAllAssign } from 'utility/apiService';

const MIS = () => {

    const [controller] = useArgonController();
    const { miniSidenav } = controller;
    const [subject, setSubject] = useState("");
    console.log(subject,"subj");
    const [subjectVal, setSubjectVal] = useState("");

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

}

    const handleSubt = async () => {
      const Sub = await generatePDF(subjectVal);
      console.log(Sub,"sub");
      // const SubData = Sub.data?.data?.filter((item) => {
      //   return item.isBlock === false;
      // });
  
      // setSubject(
      //   SubData.map((item) => {
      //     return {
      //       value: item.subtName || "",
      //       label: item.subtName || "",
      //       subId: item._id || "",
      //     };
      //   })
      // );
  
    //   let desig = await getallDes();
    //   const desigData = desig.data?.data.filter((item) => {
    //     return (
    //       item.subjectId === workValues.subject?.subId &&
    //       item.isBlock === false
    //     );
    //   });
    //   if (workValues.subject) {
    //     // setDesignation("xyz")
    //     setDesignation(
    //       desigData?.map((item) => {
    //         return {
    //           value: item.designationName || "",
    //           label: item.designationName || "",
    //           desigId: item._id || "",
    //         };
    //       })
    //     );
    //   }
    }  

    useEffect(() => {
      handleSubt();
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
  <div>
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
                      wordWrap: "break-word",
                    }}
                  >
                    Reports
                  </h1>
                </div>
                <div>
              <CustomSelect 
                 option={subject}
                  selectedOptions={subjectVal}
                  setSelectedOptions={setSubjectVal}
                  isSearchable={true}
                  isMulti={false}
              />
                </div>
                <Container>
                  <DTable />
                </Container>

                
              </div>
           
  </div>
  </ArgonBox>
  )
}

export default MIS
