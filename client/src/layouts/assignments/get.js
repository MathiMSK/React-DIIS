import React, { useEffect, useState } from "react";
// import faker from "faker";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { Container } from "@mui/material";
import SimpleCard from "./utilis";
import { getAllAssign } from "utility/apiService";


const ListContainer = props => {

  return <Container maxWidth="sm"  {...props} />;
};

const Get = () => {
  const [data, setData] = useState([]);
  
  
  const get = async () => {
    try {
      let response = await getAllAssign();
      let list = []
      response?.data?.data.map((item) => {
      list.push({
        assignmentTitle: item?.assignmentTitle,
        class: item?.class,
        subject: item?.subject,
        totalMarks: item?.totalMarks,
        totalQuestion: item?.totalQuestion,
      })
      setData(list)
      })
    
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
        get();
  }, []);

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          className="List"
          height={height}
          width={width}
          itemCount={data?.length-(data?.length/2)}
          itemSize={220}
          itemData={data}
          innerElementType={ListContainer}
        >
          {SimpleCard}
        </List>
      )}
    </AutoSizer>
  );
};

export default Get;
