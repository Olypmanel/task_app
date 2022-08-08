import React , {useState} from 'react'
function Input() {
 const [input, setInput] = useState('')
  return (
    <div>
     <textarea type="text" onChange={(e)=>setInput(e.target.value)} value={input}/>
    </div>
  )
}

export default Input