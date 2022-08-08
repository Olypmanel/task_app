import React , {useState} from 'react'
import {useParams} from "react-router-dom"
import Header from '../Header/Header'
import toolArray from "../../Objects/object"
import "./tool.css"
function Tool() {
 const {tool} = useParams()
 const [input, setInput] = useState('')
 const [state, setState] = useState('')
 const [func,setFunc] = useState(true)
 const findTool = toolArray.find(item => item.link === tool)
 const {name,description, code, reverseCode, reverseName,reverseDescription, OBJ} = findTool
const handleClick= () => {
  setInput('')
  setFunc(prev => !prev)
  setState('result')
}
  return (
   <section className="tools_component">
    <Header />
    <div className="inner_tool_cont">
    <h1 className='tool_title'> {func ? name : reverseName ?reverseName:name} </h1>
    <p className='tool_description'>
      {func ? description : reverseDescription ? reverseDescription : description}
      </p>
    <div className="input_box">
     <textarea value={input} type="text" onChange={(e)=>setInput(e.target.value)} onKeyUpCapture={() => func ? code(input, setState, OBJ): reverseCode ? reverseCode(input, setState, OBJ) : code(input, setState, OBJ) }/>
    </div>
    <code className="tool_result">{state || "result"}</code>
    {reverseName && <button className="switch_btn" onClick={handleClick}>switch</button>}
    </div>
   </section>
 
  )
}

export default Tool