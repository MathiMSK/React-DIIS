import React, { useEffect, useState } from "react";
// import faker from "faker";
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
      console.log(response,"res");
      // let list = []
      // response?.data?.data.map((item) => {
      // list.push({
      //   assignmentTitle: item?.assignmentTitle,
      //   class: item?.class,
      //   subject: item?.subject,
      //   totalMarks: item?.totalMarks,
      //   totalQuestion: item?.totalQuestion,
      // })
      setData(response?.data?.data)
      //   console.log(list,"added");  
      // })
    
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
        get();
  }, []);

  // const [data, setData] = React.useMemo(() => {
  //   return Array.from({ length: 1000 }).map(() => {
  //     return faker.lorem.sentence();
  //   });
  // }, []);
  // if (!data) {
  //   return (
  //     <Button
  //       variant="contained"
  //       color="primary"
  //       disableElevation
  //       // onClick={handleLoadData}
  //     >
  //       Load Data
  //     </Button>
  //   );
  // }
  console.log(data.length);
  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          className="List"
          height={height}
          width={width}
          itemCount={data.length-(data.length/2)}
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
