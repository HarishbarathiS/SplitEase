"use client";
import { useState, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const CreateRoom = () => {
  const [name, setName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomCode, setRoomCode] = useState("");

  const router = useRouter();

  // Generate a random 6-digit code on component mount
  useEffect(() => {
    generateRoomCode();
  }, []);

  const CopyRoomCode = () => {
    var copyText = roomCode;
    if (copyText) {
      document.getElementById("default-icon")!.classList.add("hidden");
      document.getElementById("success-icon")!.classList.remove("hidden");
    }
    console.log("Copied the text: " + copyText);
    navigator.clipboard.writeText(copyText);
  };
  // Function to generate a random 6-digit code
  const generateRoomCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const url = process.env.NEXT_PUBLIC_PRODUCTION_URL + "/room/";
    setRoomCode(url + code);
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Add your logic to create the room with the entered data
    console.log("Creating room with:", { name, roomName, roomCode });
  };

  return (
    <div className="flex items-center justify-center min-h-dvh bg-gradient-to-r from-violet-500 to-indigo-600 p-4">
      <div className="flex h-120 w-full max-w-lg justify-center bg-gray-900 rounded-md">
        <div className="flex flex-col justify-center items-center text-center text-white text-xl p-4 w-full">
          <div className="flex flex-col mt-2 space-y-4 w-full max-w-md">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col space-y-6 w-full"
            >
              {/* Name Input */}
              <div className="flex flex-col items-start w-full">
                <label htmlFor="name" className="mb-2 text-xl">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 rounded-md  bg-gray-700 text-white"
                  required
                />
              </div>

              {/* Room Name Input */}
              <div className="flex flex-col items-start w-full">
                <label htmlFor="roomName" className="mb-2 text-xl">
                  Room Name
                </label>
                <input
                  id="roomName"
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder="Enter room name"
                  className="w-full px-4 py-2 rounded-md bg-gray-700 text-white"
                  required
                />
              </div>

              {/* Room Code Display */}
              <div className="flex flex-col items-start w-full">
                <label className="mb-2 text-xl">Room link</label>
                <div className="flex w-full">
                  <input
                    type="text"
                    value={roomCode}
                    readOnly
                    className="w-full px-4 py-2 rounded-l-md bg-gray-700 text-white font-mono"
                  />
                  <button
                    type="button"
                    onClick={CopyRoomCode}
                    className="flex bg-indigo-500 hover:bg-indigo-600 items-center px-3 py-2 rounded-r-md"
                    title="Generate new code"
                  >
                    <span id="default-icon">
                      <svg
                        className="w-3.5 h-3.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 20"
                      >
                        <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                      </svg>
                    </span>
                    <span id="success-icon" className="hidden">
                      <svg
                        className="w-3.5 h-3.5 text-white-700 dark:text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 12"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5.917 5.724 10.5 15 1.5"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  Share it with your friends to invite them to the room!
                </p>
              </div>

              {/* Create Button */}
              <Button
                type="submit"
                className="bg-gradient-to-r p-5 mb-2 text-lg from-violet-500 to-indigo-600 w-full"
                onClick={() => {
                  router.push("/room/" + roomCode.split("/").pop());
                }}
              >
                GO TO ROOM
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
