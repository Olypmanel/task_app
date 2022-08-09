import "./App.css";
import { useUserInfo } from "./Context/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Components/Register/Register";
import Tasks from "./Components/Task/Tasks";
import Tool from "./Components/Tools/Tool";
import Login from "./Components/Login/Login";
import { Link } from "react-router-dom";
// localStorage.clear();
const App = () => {
  const [
    {
      user: { name },
    },
  ] = useUserInfo();
  // localStorage.clear();
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path={name ? "/login" : "/"} element={<Login />} />
          <Route exact path={name && "/"} element={<Tasks />} />
          <Route path="/task/:tool" element={<Tool />} />
          <Route exact path={"/login"} element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
