import React, {useState} from 'react'
import {Link} from "react-router-dom"
import { useUserInfo } from '../../Context/context'
import "./login.css"
function Login() {
 const [{user}] = useUserInfo()
const [login, setLogin ] = useState({email: user.email,password: '',navy: true})
const handleLogin = e => {
 const {value, name} = e.target
 setLogin(prev=> ({...prev, [name]: value}))
}
const handleSubmit = e =>{
 e.preventDefault()
 if (user.password===login.password) setLogin(prev =>({...prev, navy : false}))
 if (user.password!==login.password) setLogin(prev =>({...prev, navy : "incorrect"}))
}
  return (
    <section className="login_page">
     <h1 className="login_title">Login</h1>
    <section className="profile_img_container">
    <img src={user.photo} alt="profile" className='profile_image'/>
     </section>
     <form className="profile_info" onSubmit={e=>handleSubmit(e)}>
     <div className="input_div">
     <label htmlFor="email">email</label>
       <input type="email" id="email"name="email" onChange={(e)=>handleLogin(e)} value={login.email}/>
      </div> 
       <div className="input_div">
       <label htmlFor="password">password</label>
       <input type="password" id="password" name="password" onChange={(e)=>handleLogin(e)}/>
       {login.navy === "incorrect"&&<p>incorrect password.</p>}
      </div>
      <button  style={{padding: login.navy && "0.7rem"}}>{login.navy===false ? <Link to="/" className="btn_link">login</Link> :"login"}</button>
      <div className="login_links_cont">
      <Link to="/forgot_password" className="login_link">forgot password</Link>
      <Link to="/register" className="login_link">do not have account, register instead</Link>
     </div>
     </form>
    </section>
  )
}

export default Login