/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.
  Once you add a new route on this file it will be visible automatically on
  the Sidenav.
  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Argon Dashboard 2 MUI layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import VirtualReality from "layouts/virtual-reality";
import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Assignments from "layouts/assignments";
import StudentAssignment from "layouts/studentAssignment";
import Mis from "layouts/MIS";
import ArgonBox from "components/ArgonBox";
import {MdAssignment,MdOutlineAssignmentInd} from "react-icons/md";
import {RiUserAddFill} from "react-icons/ri";
import {BsFillInfoCircleFill} from "react-icons/bs";
import Students from "layouts/Students";

let token;
let getToken=localStorage.getItem('token') 
if(getToken){
  token=JSON.parse(getToken)
}
const routes = [
  
  {
    type:"route",
    name: "Assignments",
    key: "assignments",
    route: "/assignments",
    token: token,
    icon: <MdAssignment color="#FDD451" style={{filter: "drop-shadow(5px 5px 5px rgba(0,0,0,0.3))" }}/>,
    component: <Assignments />,
  },
  {
    type:"route",
    name: "Student Creation",
    key: "studentcreation",
    route: "/studentcreation",
    token: token,
    icon: (
     <RiUserAddFill color="#FDD451" style={{filter: "drop-shadow(5px 5px 5px rgba(0,0,0,0.3))" }}/>
    ),
    component: <Students />,
  },
  {
    type:"route",
    name: "Student Assignments",
    key: "stuassign",
    route: "/studentassignments",
    token: token,
    icon: <MdOutlineAssignmentInd color="#FDD451" style={{filter: "drop-shadow(5px 5px 5px rgba(0,0,0,0.3))" }}/>,
    component: <StudentAssignment />,
  },
  {
    type:"route",
    name: "MIS",
    key: "mis",
    token: token,
    route: "/mis",
    icon:  <BsFillInfoCircleFill style={{width:"17px",filter: "drop-shadow(5px 5px 5px rgba(0,0,0,0.3))"}} color="#FDD451" />,
    component: <Mis />,
  },
  {
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    token: token,
    icon: (
      <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-single-copy-04" />
    ),
    component: <SignIn />,
  },
 
  // {
  //   name: "Sign Up",
  //   key: "sign-up",
  //   route: "/authentication/sign-up",
  //   icon: <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-collection" />,
  //   component: <SignUp />,
  // },
];

export default routes;
