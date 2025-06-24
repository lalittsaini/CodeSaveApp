import React, { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToSave, updateToSave } from "../redux/saveSlice";
import toast from "react-hot-toast";


const Home = () => {
  const [title, setTitle] = useState("");
 
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const saveId = searchParams.get("saveid");

  const dispatch = useDispatch();
  const save = useSelector((state) => state.save.save);

  const containerRef = useRef(null);

  const existingNote = useMemo(() => {
    return save.find((item) => item._id === saveId);
  }, [save, saveId]);

  useEffect(() => {
    if (saveId && existingNote) {
      setTitle(existingNote.title);
      setValue(existingNote.content);
    } else {
      setTitle("");
      setValue("");
    }

    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [saveId, existingNote]);

  function createSave() {
    const saveNote = {
      title,
      content: value,
      _id: saveId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (saveId) {
      dispatch(updateToSave(saveNote));
     
    } else {
      dispatch(addToSave(saveNote));
      
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div
      ref={containerRef}
      className="mt-3 flex flex-col justify-center items-center min-h-fit p-3"
    >
      <div className="w-full max-w-4xl flex flex-col sm:flex-row sm:items-center sm:justify-between px-3 gap-3">
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="
            px-4 py-3
            rounded-lg
            border border-[#27272a]
            w-full
            sm:flex-1
            focus:outline-none focus:ring-2 
          "
        />
        <button
          onClick={createSave}
          className="
            px-4 py-3
            rounded-lg
            
            sm:w-auto
            text-black
            bg-white
            hover:bg-gray-200
            transition-colors duration-300
          "
        >
          {saveId ? "Update" : "Create"}
        </button>

        {saveId && (
          <button
            onClick={() => setSearchParams({})}
            aria-label="Reset"
            title="Reset"
            className="
              flex items-center justify-center
              w-full sm:w-16 h-12
              rounded-lg
              text-white
              border border-[#27272a]
              hover:bg-[#181a1b]
              transition-colors duration-300
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="w-full max-w-4xl mt-4">
        <textarea
          rows={20}
          placeholder="Enter the content..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="
            w-full
            rounded-lg
            bg-black
            text-white
            p-4
            resize-none
            overflow-auto
            focus:outline-none focus:border-[#4b5563] focus:ring-0
            custom-scrollbar
          "
        />
      </div>
    </div>
  );
};

export default Home;
