import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Notes from "./components/notes/Notes";
import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";

const App = () => {

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login/>}  />
        <Route path="/signup" element={<Signup/>}  />
        <Route path="/notes" element={<Notes/>}  />
      </Routes>
      <Footer/>
    </div>

  );
};

export default App;
