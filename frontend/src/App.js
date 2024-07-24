import Workout from "./components/Workout/Workout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SignUp from "./pages/signUp";
// import Login from "./pages/login";
import UserHome from "./pages/user/UserHome";
import LoginButton from "./auth/login";
import Home from "./pages/home";
import PrivateRoute from "./auth/ProtectedRoute";
// import { useAuth0 } from "@auth0/auth0-react"

function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route element={<PrivateRoute/>}>
            <Route path="/user" element={<UserHome />}>
              <Route path="/profile" element={<Home />}/>
              <Route path="/history" element={<Home />}/>
              <Route path="/startworkout" element={<Home />}/>
              <Route path="/exercises" element={<Home />}/>
            </Route>
          </Route>
          <Route path="/workout" element={<Workout />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/login" element={<LoginButton />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
