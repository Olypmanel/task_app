import React from 'react'
import { useUserInfo } from '../../Context/context'
import {Link} from "react-router-dom"
import "./header.css"
function Header() {
 const [{user}] =useUserInfo()
  return (
    <section className="header_sec">
     <div className="header_div">
      <div className="image_user_name">
      <img src={user.photo} className="image_profile" alt="profile" />
      <h4 className="user_name">{user.user_name}</h4>
      </div>
      <div className="links_div" >
       <Link to="/register">register</Link> 
       <form className="reloader">
          <button className="logout_btn" onClickCapture={() => localStorage.clear()}>log out </button>
        </form>
       {/* <button onClick={()=> localStorage.clear()}>log out</button> */}
       {/* <Link to="/profile">profile</Link> */}
      </div>
     </div>
    </section>
  )
}

export default Header