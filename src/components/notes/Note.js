import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Editor from "./Editor";

const Note = ({}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const [title, setTitle] = useState("");

  const getNote = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/notes/${id}`, {
        headers: {
          auth: token,
        },
      });
      const {
        data: {
          success,
          message,
          data: { note },
        },
      } = response;
      if (success) {
        setTitle(note.title);
        setContent(note.content);
        return toast.success(message);
      } else {
        return toast.error(message);
      }
    } catch (error) {
      console.log(error);
      return toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      getNote();
    }
  }, [token]);

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
            {title}
          </p>
          <div className="w-full flex items-center justify-between py-5">
            <hr className="w-full bg-gray-400" />
            <p className="text-base font-medium leading-4 px-2.5 text-gray-400">
              +
            </p>
            <hr className="w-full bg-gray-400  " />
          </div>
          <p
            dangerouslySetInnerHTML={{ __html: content }}
            className="text-gray-800 dark:text-gray-100 text-sm"
          ></p>
        </div>
      </div>
    </div>
  );
};

export default Note;
