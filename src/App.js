import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import CreatePost from "./pages/CreatePost";
import Landing from "./pages/Landing";

// Wrapper to decide what to show on `/` route based on auth
const RootRedirect = () => {
  const { user } = useContext(AuthContext);
  return user ? <Navigate to="/home" replace /> : <Landing />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
