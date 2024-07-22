import Workout from "./components/Workout/Workout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SignUp from "./pages/signUp";
import Login from "./pages/login";
import UserHome from "./pages/userHome";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/workout" element={<Workout />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/user" element={<UserHome />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
