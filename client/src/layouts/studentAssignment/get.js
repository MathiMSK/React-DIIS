import React, { useEffect, useState } from "react";
import "./styles.css"
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { Container } from "@mui/material";
import SimpleCard from "./utilis";
import { getAllAssign } from "utility/apiService";
import { stdViewTheirAllAssign } from "utility/apiService";


const ListContainer = props => {

  return <Container maxWidth="sm"  {...props} />;
};

const Get = () => {
  const [data, setData] = useState([]);
  
  
  const get = async () => {
    try {
      let response = await stdViewTheirAllAssign();
      setData(response?.data?.data)
    
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
