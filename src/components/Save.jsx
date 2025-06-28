import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromSave } from "../redux/saveSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Save = () => {
  const save = useSelector((state) => state.save.save);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const filterData = save
    .filter((save) => save.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const dateFormat = { day: "2-digit", month: "long", year: "numeric" };

  function handleDelete(saveId) {
    dispatch(removeFromSave(saveId));
  }
function handleCopy(content) {
  if (navigator.clipboard && window.isSecureContext) {
 
    navigator.clipboard
      .writeText(content)
      .then(() => toast.success("Copied to Clipboard!"))
      .catch(() => toast.error("Failed to Copy"));
  } else {
  
    const textArea = document.createElement("textarea");
    textArea.value = content;
    textArea.style.position = "fixed"; 
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      toast.success("Copied to Clipboard!");
    } catch (err) {
      toast.error("Failed to Copy");
    }
    document.body.removeChild(textArea);
  }
}

  function handleShare(saveId) {
  const shareableLink = `${window.location.origin}/save/${saveId}`;

  if (navigator.clipboard && window.isSecureContext) {

    navigator.clipboard
      .writeText(shareableLink)
      .then(() => toast.success("Link copied to clipboard!"))
      .catch(() => toast.error("Failed to copy link."));
  } else {
    
    const textArea = document.createElement("textarea");
    textArea.value = shareableLink;
    textArea.style.position = "fixed"; 
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link.");
    }
    document.body.removeChild(textArea);
  }
}

  function truncateWords(text = "", limit = 10) {
    const words = text.trim().split(/\s+/);
    return words.length > limit
      ? `${words.slice(0, limit).join(" ")}...`
      : text;
  }

  return (
    <div className="w-full overflow-x-hidden bg-[#09090b] px-3 ">
      <div className="flex justify-center mt-4 mb-12 w-full">
        <div className="w-full max-w-4xl flex flex-col items-center p-2">
          <div className="flex items-center gap-2 border border-[#27272a] rounded-lg px-3 py-2 min- w-full focus-within:border-white ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-gray-400 flex-shrink-0"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="search"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent focus:outline-none focus:ring-0 placeholder-gray-400 text-white"
            />
          </div>

          <div className="border border-[#4b5563] rounded-lg w-full mt-4">
            <div className="p-5 border-b border-[#4b5563]">
              <h1 className="text-lg font-semibold">All Notes</h1>
            </div>
            {filterData.length > 0 ? (
              filterData.map((save) => (
                <div
                  key={save._id}
                  className="m-5 border border-[#4b5563] rounded-lg p-5 text-pretty flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
                >
                  <div className="flex-1 min-w-[250px] max-w-full truncate">
                    <h1 className="font-semibold truncate text-lg">
                      {truncateWords(save?.title, 5)}
                    </h1>
                    <p className="text-sm text-gray-400 truncate mt-1">
                      {truncateWords(save?.content, 10)}
                    </p>
                  </div>

                  <div className="flex-1 min-w-[250px] max-w-full flex flex-col items-start sm:items-end gap-3">
                    <div className="w-full flex flex-wrap justify-start sm:justify-end gap-3">
                      <Link
                        className=" hover:text-[#57A0D5]"
                        to={`/?saveid=${save?._id}`}
                        aria-label="Edit note"
                        title="Edit note"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="white"
                          className="w-6 h-6 hover:stroke-[#57A0D5]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                          />
                        </svg>
                      </Link>

                      <button
                        onClick={() => handleCopy(save?.content)}
                        aria-label="Copy content"
                        title="Copy content"
                        className="hover:text-[#5cb85c] hover:stroke-[#5cb85c]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="white"
                          className="w-6 h-6 hover:stroke-[#5cb85c] bg-[#09090b]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                          />
                        </svg>
                      </button>

                      <Link
                        className="underline text-white hover:text-[#3F51B5]"
                        to={`/save/${save?._id}`}
                        aria-label="View note"
                        title="View note"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 hover:stroke-[#3F51B5]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      </Link>

                      <button
                        className="hover:text-red-500 hover:stroke-red-500"
                        onClick={() => handleDelete(save?._id)}
                        aria-label="Delete note"
                        title="Delete note"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="white"
                          className="w-6 h-6 hover:stroke-red-500 bg-[#09090b]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>

                      <button
                        className="hover:text-amber-500 hover:stroke-amber-500"
                        onClick={() => handleShare(save?._id)}
                        aria-label="Share note"
                        title="Share note"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="white"
                          className="w-6 h-6 hover:stroke-amber-500 bg-[#09090b]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="w-auto text-sm text-gray-500 flex items-center gap-1 leading-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4 align-middle"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="align-middle">
                        {new Date(save.createdAt).toLocaleDateString(
                          "en-GB",
                          dateFormat
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="p-5 text-center text-gray-500">No notes found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Save;
