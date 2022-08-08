import React from 'react'
import Header from '../Header/Header'
import object from "../../Objects/object"
import {Link} from "react-router-dom"
import "./tasks.css"
function Tasks() {
  return (
   <section className="tasks_section">
    <Header />
    <div className="all_tools">
    {object.map(item => (
     <Link to={`/task/${item.link}`} key={item.id} className="links">
     <section className="each_tool">
     <h1 className="each_task">{item.name}</h1>
     <p className="description">{item.description}</p>
     </section>
    </Link>
    ))}
    </div>
   </section>
  )
}
export default Tasks