import  React from 'react';
import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getAllAssign } from 'utility/apiService';

let list = []

const get = async () => {
    let response = await getAllAssign();
      response?.data?.data.map((item) => {
      list.push({
        assignmentTitle: item?.assignmentTitle,
        class: item?.class,
        subject: item?.subject,
        totalMarks: item?.totalMarks,
        totalQuestion: item?.totalQuestion,
      });
        console.log(list,"added");  
      })
    }
   
        get();

   

export default function ArgonTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow  sx={{display:"flex",justifyContent: 'space-around',alignItems: 'center' }}>
            <TableCell>Assignment Name</TableCell>
            <TableCell >class</TableCell>
            <TableCell >Subject</TableCell>
            <TableCell >TotalMarks</TableCell>
            <TableCell >TotalQuestion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item) => (
            <TableRow
              key={item.assignmentTitle}
            sx={{display:"flex",justifyContent: 'space-around',alignItems: 'center',textAlign:'center'}}
            >
              <TableCell component="th" scope="row">
                {item.assignmentTitle}
              </TableCell>
              <TableCell>{item.class}</TableCell>
              <TableCell>{item.subject}</TableCell>
              <TableCell>{item.totalMarks}</TableCell>
              <TableCell>{item.totalQuestion}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


// import React,{useState,useEffect} from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { getAllAssign } from 'utility/apiService';
// const columns = [
//   { field: "id", headerName: 'ID', width: 70 ,type: 'number'},
//   { field: 'assignmentTitle', headerName: 'Assignment name', width: 180 },
//   { field: 'class', headerName: 'Class', width: 60 },
//   {
//     field: 'subject',
//     headerName: 'Subject',
//     type: 'number',
//     width: 90,
//   },
//   {
//     field: 'totalMarks',
//     headerName: 'Total Marks',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 170,
   
//   },
// ];


// const get = async () => {
//     try {
//         let add = []
//         let response = await getAllAssign();
//         response?.data?.data.map((item,index) => {
//         add.push({
//             ...item,
//           id:index + 1,
//           assignmentTitle: item?.assignmentTitle,
//           class: item?.class,
//           subject: item?.subject,
//           totalMarks: item?.totalMarks,
//           totalQuestion: item?.totalQuestion,
//         });
//         setRows(add)
//     })
//     } catch (error) {
//         console.log(error);
//     }
 
//     }
//         get();


// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

// export default function ArgonTable() {
    
//   return (
//     <div style={{ height: 400, width: '50%' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         initialState={{
//         //   pagination: {
//         //     paginationModel: { page: 0, pageSize: 5 },
//         //   },
//         }}
//         pageSizeOptions={[5, 10]}
//       />
//     </div>
//   );
// }