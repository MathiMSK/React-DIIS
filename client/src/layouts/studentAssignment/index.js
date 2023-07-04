import ArgonBox from "components/ArgonBox";
import { useArgonController } from "context";
import React, { createContext, useEffect, useState } from "react";
import Get from "./get";
export const DataContext = createContext({});
const studentAssignment = () => {
  const [controller, dispatch] = useArgonController();
  const { miniSidenav, darkMode } = controller;

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
              color: "#0070CD",
            }}
          >
            Student Assignments
          </h1>
        </div>
        <div style={{ border: "1px solid #0070CD", marginBottom: "20px" }} />
        <Get />
      </div>
    </ArgonBox>
  );
};

export default studentAssignment;
