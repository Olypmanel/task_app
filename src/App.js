import "./App.css";
import { useUserInfo } from "./Context/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Components/Register/Register";
import Tasks from "./Components/Task/Tasks";
import Tool from "./Components/Tools/Tool";
const App = () => {
  const [
    {
      user: { name },
    },
  ] = useUserInfo();
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path={name ? "/register" : "/"} element={<Register />} />
          <Route exact path={name && "/"} element={<Tasks />} />
          <Route path="/task/:tool" element={<Tool />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
