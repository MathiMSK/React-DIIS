// // import "./styles.css";
// // import React, { useState, useEffect } from "react";
// // import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from "react-virtualized";
// // import { getAllAssign } from "utility/apiService";
// // import { toast, Toaster } from "react-hot-toast";

// // const listHeight = 400;
// // const rowHeight = 50;
// // const rowWidth = 700;
// // const rowCount = 0;
// // let list=[]
// // const get = async () => {
// //   const count=1
// //   for (let i = 0; i < count; i++) {
// //   let response = await getAllAssign();
// //   response.data.data.map((item) => {
// //   list.push({
// //     id: i,
// //     assignmentTitle: item?.assignmentTitle,
// //     class: item?.class,
// //     subject: item?.subject,
// //     totalMarks: item?.totalMarks,
// //     totalQuestion: item?.totalQuestion,
// //   });
// // })
// // }
// // console.log(list);
// // return list;
// // };
// //   get();

//   // const list = Array(rowCount)
// //   .fill()
// //   .map((val, idx) => {
// //     return {
// //       id: idx,
// //       name: {asignData},
// //       image: "http://via.placeholder.com/40",
// //     //   text: loremIpsum({
// //     //     count: 10,
// //     //     units: "sentences",
// //     //     sentenceLowerBound: 4,
// //     //     sentenceUpperBound: 8,
// //     //   }),
// //     };
// //   });

// //   const getAssign = async () => {
// //     const [asignData, setAsignData] = useState([]);

// //       try {
// //         let response = await getAllAssign();
// //         console.log(response.data.data);
// //         if (!response.ok) {
// //           return toast.error(response.data.message);
// //         }
// //         else{
// //           setAsignData(response.data.data);
// //         }
// //       } catch (error) {
// //         console.log(error);
// //       }
// //     };

// //     useEffect(() => {
// //       getAssign();
// //     }, []);
// //   }

// // const list = Array(rowCount)
// //   .fill()
// //   .map((val, idx) => {
// //     return {
// //       id: idx,
// //       name: {asignData},
// //       image: "http://via.placeholder.com/40",
// //     //   text: loremIpsum({
// //     //     count: 10,
// //     //     units: "sentences",
// //     //     sentenceLowerBound: 4,
// //     //     sentenceUpperBound: 8,
// //     //   }),
// //     };
// //   });

// // function renderRow({ index, key, style }) {
// //   return (
// //   <div key={key} style={style} className="row">
// //   {/* <div className="image">
// //   <img src={list.image} alt="" />
// //   </div> */}
// //   <div className="content">
// //   <div>{list.assignmentTitle}</div>
// //   <div>{list.subject}</div>
// //   </div>
// //   </div>
// //   );
// //   }
// // const Get = () => {

// //   return (
// //     <div className="App">
// // <div className="list">
// // <List
// // width={rowWidth}
// // height={listHeight}
// // rowHeight={rowHeight}
// // rowRenderer={renderRow}
// // rowCount={list.length}
// // overscanRowCount={3} />
// // </div>
// // </div>
// //   );
// // };

// // export default Get;

// import * as React from 'react';

// import {
//   FilteredVTable,
//   GivenVTable
// } from 'react-virtualized-table'


// import './styles.css';
// import { getAllAssign } from 'utility/apiService';

// const initFakeItems = async(n = 1) => {
//   let list = []
//   for (let i = 0; i < n; i++) {
//     let response = await getAllAssign();
//       response?.data?.data.map((item) => {
//       list.push({
//         id: i,
//         assignmentTitle: item?.assignmentTitle,
//         class: item?.class,
//         subject: item?.subject,
//         totalMarks: item?.totalMarks,
//         totalQuestion: item?.totalQuestion,
//       });
//         console.log(list,"added");  
//       })
//   }
//   return list
// }

// const Get = () => {
//   const columns = GivenVTable.columns()
//     .addSortableColumnFor('assignmentTitle')
//     .addColumnFor('class')
//     .addSortableColumnFor('subject')
//     .addSortableColumnFor('totalMarks')
//     .addSortableColumnFor('totalQuestion')
//     .result

//     return (
//       <div className="container">
//         <p>
//           Start editing to see some magic happen :)
//         </p>
//         <FilteredVTable
//         items={initFakeItems()}
//         columns={columns}/>
//       </div>
//     );
// }

// export default Get



