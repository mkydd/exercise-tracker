import Workout from "./components/Workout/Workout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/workout" element={<Workout />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
