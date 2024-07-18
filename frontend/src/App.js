import Workout from "./components/Workout/Workout";
import LoginButton from "./components/Auth/Login";
import LogoutButton from "./components/Auth/Logout";

function App() {
  return (
    <div className="App">
      <Workout />
      <LoginButton />
      <LogoutButton />
    </div>
  );
}

export default App;
