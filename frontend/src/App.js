import Workout from "./components/Workout/Workout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home";
import PrivateRoute from "./components/Auth/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route element={<PrivateRoute />}>
            <Route path="/workout" element={<Workout />}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
