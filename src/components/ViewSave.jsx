import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LZString from "lz-string";

const ViewSave = () => {
  const navigate = useNavigate();
  const { id, data } = useParams();
  const save = useSelector((state) => state.save.save);

  let note = null;
  if (data) {
    try {
      note = JSON.parse(LZString.decompressFromEncodedURIComponent(data));
    } catch {
      return <div className="p-4 text-red-500 text-center">Invalid shared note.</div>;
    }
  } else if (id) {
    note = save.find((item) => item._id === id);
  }

  if (!note) return <div className="p-4 text-red-500 text-center">Note not found.</div>;

  const handleCopy = () => {
    navigator.clipboard.writeText(note.content)
      .then(() => toast.success("Copied!"))
      .catch(() => toast.error("Failed to copy."));
  };

  return (
    <div className="min-h-screen bg-[#09090b] p-4 flex flex-col items-center transition-colors duration-300">
      <div className="w-full max-w-4xl flex flex-col gap-4">
        
        {/* Header Section */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center p-3 rounded-lg border 
              border-[#27272a] 
             bg-[#09090b] 
             text-zinc-400 
             hover:bg-[#1f1f1f] 
             hover:text-white transition-all cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </button>

          <input
            className="flex-1 px-4 py-3 rounded-lg border border-[#27272a] bg-[#0f0f0f] text-white focus:outline-none"
            type="text"
            disabled
            value={note.title}
          />
        </div>

        {/* Content Section */}
        <div className="relative w-full">
          <textarea
            className="w-full rounded-lg borderborder-[#27272a] bg-black text-zinc-300 p-6 resize-none focus:outline-none custom-scrollbar"
            rows={20}
            value={note.content}
            disabled
          ></textarea>

          {/* Integrated Copy Button */}
          <button
            onClick={handleCopy}
            className="absolute top-4 right-4 p-2 rounded-md border 
             border-[#27272a] 
              bg-[#18181b]/80 backdrop-blur-sm
              text-zinc-400 
              hover:text-white transition-all cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewSave;