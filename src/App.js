import React, { useEffect } from "react";
// import Login from "./Login";
// import Signup from "./signup";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import SearchRoutes from "./components/SearchRoutes";

function App() {
  const [user, loading] = useAuthState(auth);

  // useEffect(() => {
  //   if (loading) return;

  // }, [user]);

  return (
    <SearchRoutes />
    // <Router>
    //   <Routes>
    //     <Route exact path="/login" element={<Login />} />
    //     <Route exact path="/" element={<Signup />} />
    //   </Routes>
    // </Router>
  );
}

export default App;
