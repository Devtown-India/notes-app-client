import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Card from "./Card";
import Overview from "./Overview";

const Notes = (props) => {
  const [notes, setNotes] = useState([]);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate()

    useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);
  const getUserNotes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/notes", {
        headers: {
            auth:token
        }
      });
      const {
        data: { success, message, data },
      } = response;
      if (success) {
        // navigate("/login")
        setNotes(data.notes)
        return toast.success(message);
      } else {
        // return toast.error(message);
      }
    } catch (error) {
      console.log(error);
      return toast.error(error.message);
    }
  };


  useEffect(()=>{
    getUserNotes();
  },[token])

  return (
    <div style={{minHeight:"90vh"}}  className=" bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
      <div className="mx-auto container py-10 px-6">
        <Overview />
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* <div className="rounded"> */}
            {
                notes.map(({title,content,updatedAt,_id:id,color}) => <Card title={title} content={content} color={color} id={id} updatedAt={updatedAt} />)
            }
            {/* </div> */}
        </div>
      </div>
    </div>
  );
};
export default Notes;
