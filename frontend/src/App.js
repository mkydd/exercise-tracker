import Workout from "./components/Workout/Workout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from "./pages/user/User";
import "./styles/app.css";
import "./styles/largeStyles.css";

import PrivateRoute from "./auth/ProtectedRoute";

// user Routes
import Exercises from "./pages/user/Exercises";
import History from "./pages/user/History";
import Profile from "./pages/user/Profile";
import UserHome from "./pages/user/StartNewWorkout";
import Home from "./pages/home";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<PrivateRoute />}>
            <Route path="user" element={<User />}>
              <Route path="home" element={<UserHome />} />
              <Route path="profile" element={<Profile />} />
              <Route path="history" element={<History />} />
              <Route path="exercises" element={<Exercises />} />
              <Route path="workout" element={<Workout />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
