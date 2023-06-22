import ArgonBox from 'components/ArgonBox'
import { useArgonController } from 'context';
import React from 'react'
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
    <div>
      <h1>ho</h1>
    </div>
    </ArgonBox>
  )
}

export default studentAssignment
