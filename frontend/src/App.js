import Workout from "./components/Workout/Workout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SignUp from "./pages/signUp";
import UserHome from "./pages/user/UserHome";
import Home from "./pages/home";


import LoginButton from "./auth/login";
import PrivateRoute from "./auth/ProtectedRoute";

// user Routes
import Exercises from "./pages/user/Exercises";
import History from './pages/user/History';
import Profile from './pages/user/Profile';
import StartWorkout from './pages/user/StartWorkout';

function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<PrivateRoute/>}>
            <Route path="user">
              <Route index element={<UserHome />} />
              <Route path="profile" element={<Profile />} />
              <Route path="history" element={<History />} />
              <Route path="startworkout" element={<StartWorkout />} />
              <Route path="exercises" element={<Exercises />} />
            </Route>
          </Route>
          <Route path="/workout" element={<Workout />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginButton />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
