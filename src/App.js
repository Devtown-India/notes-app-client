import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import AddNote from "./components/notes/AddNote";
import EditNote from "./components/notes/EditNote";
import Notes from "./components/notes/Notes";
import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";


const App = () => {

  const dispatch = useDispatch()

  const setAuth = ()=>{
    const auth = JSON.parse(localStorage.getItem('auth'))
    if(auth){
      dispatch({
        type:"SET_AUTH",
        payload:auth
      })
    }
  }

  useEffect(() => {
    setAuth()
  }, [])
  

  return (
    <div>
      <Navbar/>
      <div><Toaster/></div>
      <Routes>
        <Route path="/login" element={<Login/>}  />
        <Route path="/signup" element={<Signup/>}  />
        <Route path="/notes" element={<Notes/>}  />
        <Route path="/notes/add" element={<AddNote/>}  />
        <Route path="/note/edit/:id" element={<EditNote/>}  />
      </Routes>
      <Footer/>
    </div>

  );
};

export default App;
