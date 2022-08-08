import React, {useState} from 'react'
import "./register.css"
import { useUserInfo } from '../../Context/context'
const regEx = {
  user_name: /^[a-z]{3,}\d*$/i,
  name: /^[a-z]{3,}\s[a-z]{3,}$/i,
  password: /[\d+a-z+\W+A-Z+]{8,25}/,
  email : /^[+\-a-z]+@[a-z]{3,10}.[a-z]{2,8}(.[a-z]{2,8})?$/i
}
function Register() {
  const [state, dispatch] = useUserInfo()
  const [user, setUser] = useState({name:'', user_name:'',password:'',email: "",photo: state.user.photo})
  const [ver,setVer] = useState('')
 const [isIt,setIsIt] = useState(false)
 const file = document.querySelector("#file");
  if (isIt) {
   file?.addEventListener("change", function () {
     if (this.files[0]) {
       const reader = new FileReader();
       reader.addEventListener("load", () => setUser(prevState => ({...prevState, photo: reader?.result})))
       reader?.readAsDataURL(this.files[0]);
     }
   });
  }
  const handleChange = e => {
    const {name,value} = e.target
    setUser(prevState => ({...prevState, [name]:value}))
  }
 const handleSubmit = e =>{
  e.preventDefault()
  const ARRAY = []
  for(let reg in regEx) ARRAY.push(regEx[reg].test(user[reg]))
 if (ARRAY.every(item => item)){
   dispatch({type: "SET_USER", payload: user})
   localStorage.setItem('user', JSON.stringify(user))
  setUser((prevState)=>({...prevState, name:'',user_name:'',password:'',email: ""}))
  }
  setVer(ARRAY)
 }
  return (
    <section className="register_section">
<header className="register__top_bar">
 <h1 className='profile_title'>Set your profile</h1>
<section className="profile_img_container">
 <img src={user.photo} alt="profile" className='profile_image'/>
 <input type="file" id="file" accept='image/png, image/jpg, image/svg' onClick={()=>setIsIt(prev=>true)} />
 <label htmlFor="file" className='file_label' onClick={()=>setIsIt(prev=>true)}>choose</label>
</section>
<form className="profile_info" onSubmit={e=>handleSubmit(e)}>
  <div className="input_div">
<label htmlFor="name">full name</label>
<input type="text" id='name' name='name' onChange={(e)=>handleChange(e)} value={user.name} />
{ver[1] === false && <p>name must be alphanumeric </p>}
</div>
<div className="input_div">
<label htmlFor="user_name">username</label>
<input type="text" id='user_name' name='user_name'onChange={(e)=>handleChange(e)} value={user.user_name} />
{ver[0] === false && <p>user name must be alphanumeric</p>}
</div>
<div className="input_div">
<label htmlFor="email">email</label>
<input type="email" id='email' name='email' onChange={(e)=>handleChange(e)} value={user.email} />
</div>
<div className="input_div">
<label htmlFor="password">password</label>
<input type="password" id='password' name='password'  onChange={(e)=>handleChange(e)} value={user.password}/>
{ver[2] === false && <p>password is not strong enough</p>}
</div>
<button>submit</button>
</form>
</header>
</section>
  )
}

export default Register