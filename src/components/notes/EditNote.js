import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Editor from "./Editor";

const EditNote = ({}) => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [editor, setEditor] = useState(null);
  const [content, setContent] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState(null);

  const getNote = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/notes/${id}`, {
        headers: {
          auth: token,
        },
      });
      const {
        data: { success, message, data:{note} },
      } = response;
      if (success) {
        setTitle(note.title);
        setColor(note.color);
        setContent(note.content);
        return toast.success(message);
      } else {
        return toast.error(message);
      }
    } catch (error) {
      console.log(error);
      return toast.error(error.message);
    }
  }

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }else{
        getNote();
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
     try {
      e.preventDefault();

      const response = await axios.put(`http://localhost:8080/notes/${id}`, {
        title,
        content:editor.current.value,
        color
      },{
        headers:{
          auth:token
        }
      });
      const {
        data: { success, message,data },
      } = response;
      if (success) {
        navigate('/notes');
        return toast.success(message);
      } else {
        return toast.error(message);
      }
    } catch (error) {
      console.log(error);
      return toast.error(error.message);
    }
  };

  return (
    <div
      style={{ minHeight: "85vh" }}
      className="h-full  bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 w-full py-10 px-4"
    >
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white shadow rounded lg:w-2/3  w-full p-10 mt-16">
          <p
            tabIndex={0}
            role="heading"
            aria-label="Login to your account"
            className="text-2xl font-extrabold leading-6 text-gray-800"
          >
            Edit Note
          </p>
          <div className="w-full flex items-center justify-between py-5">
            <hr className="w-full bg-gray-400" />
            <p className="text-base font-medium leading-4 px-2.5 text-gray-400">
              +
            </p>
            <hr className="w-full bg-gray-400  " />
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <lable className="text-md font-medium leading-none text-gray-800">
                Title
              </lable>
              <input
              required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                aria-label="Enter Title  of the note"
                role="input"
                type="text"
                className="bg-gray-200 border rounded focus:outline-none text-md font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
              />
            </div>
            <div className="mt-6  w-full">
              <lable className="text-md font-medium leading-none text-gray-800">
                Color
              </lable>
              <input
                style={{height:"50px"}}
                onChange={(e) => setColor(e.target.value)}
                role="input"
                value={color}
                type="color"
                className="bg-gray-200 border rounded focus:outline-none text-md font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
              />
            </div>
            <div className="mt-6  w-full">
              <lable className="text-sm font-medium leading-none text-gray-800">
                Content
              </lable>
              <div className="relative flex items-center justify-center">
                <Editor prevContent={content} setEditor={setEditor} />
              </div>
            </div>
            <div className="mt-8">
              <button
                type="submit"
                role="button"
                aria-label="create my account"
                className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
              >
                Edit Note
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditNote;
