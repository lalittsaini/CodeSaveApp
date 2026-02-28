import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ViewSave = () => {
  const navigate = useNavigate();
  const { id,data } = useParams();
  const save = useSelector((state) => state.save.save);
  // const note = save.find((item) => item._id === id);

  let note = null;

  if (data) {
    try {
      note = JSON.parse(decodeURIComponent(atob(data)));
    } catch {
      return <div className="p-4 text-red-500">Invalid shared note.</div>;
    }
  } else if (id) {
    note = save.find((item) => item._id === id);
  }

  if (!note) {
    return <div className="p-4 text-red-500">Note not found.</div>;
  }

  const handleCopy = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(note.content)
        .then(() => toast.success("Content copied to clipboard!"))
        .catch(() => toast.error("Failed to copy content."));
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = note.content;
      textArea.style.position = "fixed";
      textArea.style.top = "-1000px";
      textArea.style.left = "-1000px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand("copy");
        if (successful) {
          toast.success("Content copied to clipboard!");
        } else {
          throw new Error("Copy command failed");
        }
      } catch (err) {
        toast.error("Clipboard not supported on this device.");
      } finally {
        document.body.removeChild(textArea);
      }
    }
  };

  return (
    <div className="mt-1 bg-[#09090b] flex flex-col justify-center items-center min-h-fit p-3">
      <div className="flex mr-4 flex-col items-center min-h-screen w-full max-w-4xl p-4">
        <div className="flex justify-between items-center ml-3 w-full">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-16 h-12 ml-2 rounded-lg text-white border border-[#27272a] 
              hover:bg-[#1f1f1f] hover:scale-105 transition-all duration-200 ease-in-out 
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-600 cursor-pointer"
            aria-label="Go back"
            title="Go back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="black"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>

          <input
            className="px-4 py-3 rounded-lg m-2 border border-[#27272a] w-full focus:outline-none focus:ring-0 bg-[#0f0f0f] text-white"
            type="text"
            disabled
            value={note.title}
            aria-label="Note title"
          />
        </div>

        <div className="w-full ml-3 relative">
          <textarea
            className="m-2 w-full rounded-lg bg-black text-white p-4 px-6 resize-none overflow-auto 
              focus:border-[#4b5563] focus:outline-none focus:ring-0 custom-scrollbar"
            rows={20}
            value={note.content}
            disabled
            aria-label="Note content"
          ></textarea>

          <button
            onClick={handleCopy}
            className="absolute top-4 right-1 text-white px-1 py-1 rounded-md 
              hover:bg-[#1f1f1f] hover:scale-105 transition-all duration-200 ease-in-out 
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-600 cursor-pointer"
            aria-label="Copy note content"
            title="Copy note content"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="black"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewSave;
