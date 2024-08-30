import Workout from "./components/Workout/Workout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SignUp from "./pages/signUp";
import UserHome from "./pages/user/StartNewWorkout";
import Home from "./pages/home";
import User from "./pages/user/User";
import './styles/app.css'


import LoginButton from "./auth/login";
import PrivateRoute from "./auth/ProtectedRoute";

// user Routes
import Exercises from "./pages/user/Exercises";
import History from './pages/user/History';
import Profile from './pages/user/Profile';

function App() {
  
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<PrivateRoute/>}>
            <Route path="user" element={<User />}>
              <Route path="home" element={<UserHome />} />
              <Route path="profile" element={<Profile />} />
              <Route path="history" element={<History />} />
              <Route path="exercises" element={<Exercises />} />
              <Route path="workout" element={<Workout />} />
            </Route>
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginButton />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
