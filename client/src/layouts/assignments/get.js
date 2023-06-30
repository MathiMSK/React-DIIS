import React, { useEffect, useMemo, useState } from "react";
// import faker from "faker";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { Container } from "@mui/material";
import SimpleCard from "./utilis";
import { getAllAssign } from "utility/apiService";

const ListContainer = (props) => {
  return <Container maxWidth="sm" {...props} />;
};

const Get = () => {
  const [data, setData] = useState([]);
  const calc = useMemo(() => data, [data]);
  useEffect(() => {
    const get = async () => {
      try {
        let list = [];
        let response = await getAllAssign();
        response?.data?.data.map((item) => {
          list?.push({
            assignmentTitle: item?.assignmentTitle,
            class: item?.class,
            subject: item?.subject,
            totalMarks: item?.totalMarks,
            totalQuestion: item?.totalQuestion,
          });
          setData(list);
        });
      } catch (error) {
        console.log(error);
      }
    };
    get();
  }, []);
  const length = calc?.length - (calc.length - 1);
  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          className="List"
          height={height}
          width={width}
          itemCount={length}
          itemSize={220}
          itemData={calc}
          innerElementType={ListContainer}
        >
          {SimpleCard}
        </List>
      )}
    </AutoSizer>
  );
};

export default Get;
