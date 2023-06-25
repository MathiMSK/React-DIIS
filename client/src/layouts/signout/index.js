

import React from 'react'

const signout = () => {
    const [Logout,setLogout]=useState(false)
    const handellogout=(e)=>{
        e.preventDefault();  
        localStorage.removeItem("token")
        setLogout(true)
        navigate("/authentication/sign-in")
      }
  return (
    <div>
      
    </div>
  )
}

export default signout

