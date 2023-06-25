import { Box, FormGroup } from '@mui/material';
import { MDBBtn, MDBCard, MDBContainer, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader, MDBModalTitle } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react'
import CustomTable from 'src/custom/Table';
import { getuserByIdFoodrequest, getUserFoodRequests } from 'src/utility/apiService';

const View=(props)=>{
    const [data,setData]=useState([])
    const { open1, setOpen1,id} = props;
    const toggleShow = () => setOpen1(!open1);
    // let data=[]
    let columns = [
        {
          Header: "SI No",
          id: "index",
          accessor: (row, index) => (
            <div style={{ textAlign: "center" }}>{index + 1}</div>
          ),
        },
        {
          Header: "Employee Name",
          accessor: "EmployeeName",
        },
        {
          Header: "Shop Name",
          accessor: "ShopName",
        },
        {
          Header: "Catagory",
          accessor: "Catagory",
        },
        {
          Header: "Time",
          accessor: "time",
        },
        {
          Header: "Status",
          accessor: "status",
         
        },
        {
          Header: "Date",
          accessor: "Date",
        },
      ];
      const FoodRequest=async()=>{
        let arr=[];
        let response= await getuserByIdFoodrequest(id)
        response?.data?.foodRequest.map((i)=>{
        arr.push({
          ...i,
          EmployeeName:i.userId.firstName+" "+i.userId.lastName,
          ShopName:i.shopId.shopName,
          Catagory:i.categoryId.foodcategory,
          time:i.mealType,
          status:(
            <center>
                  <h6 style={{color:i.status=="Pending"?"orange":i.status=="Approved"?"green":"red"}} >
                    {i.status}
                    </h6>
                </center>
          )


        })

        })
        setData(arr)
      }
      useEffect(()=>{
        FoodRequest()
      },[])
    return(
        <div className="w-75 p-3">
      <MDBModal
        style={{ display: "flex", alignItems: "center", marginTop: "85px" }}
        show={open1}
        setShow={setOpen1}
      >
        <MDBModalDialog scrollable style={{ minWidth: "70%" }}>
          <MDBModalContent
            style={{ minHeight: "80%" }}
            className="modelRoleMenuTable"
          >
            <MDBModalHeader>
              <MDBModalTitle>User Food Requests</MDBModalTitle>
              <MDBBtn
                type="button"
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{ width: "100%" }}>
                  <CustomTable columns={columns} data={data} />
                </Box>
              </Box>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      </div>
    )
}
export default View;