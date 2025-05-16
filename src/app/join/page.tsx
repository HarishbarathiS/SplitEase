"use client";
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";

const JoinRoom = () => {
  const [name, setName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const router = useRouter();
  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Joining room with:", { name, roomCode });
  };
  return (
    <div className="flex items-center justify-center min-h-dvh bg-gradient-to-r from-violet-500 to-indigo-600 p-4">
      <div className="flex h-90 w-full max-w-lg justify-center bg-gray-900 rounded-md">
        <div className="flex flex-col justify-center items-center text-center text-white text-xl p-4 w-full">
          <div className="flex flex-col mt-2 space-y-4 w-full max-w-md">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col space-y-6 w-full"
            >
              {/* Name Input */}
              <div className="flex flex-col items-start w-full">
                <label htmlFor="name" className="mb-2 text-xl">
                  Name :
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

              {/* Room Code */}
              <div className="flex flex-col items-start w-full">
                <label htmlFor="name" className="mb-2 text-xl">
                  Room Code :
                </label>
                <input
                  id="name"
                  type="text"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value)}
                  placeholder="Enter room code"
                  className="w-full px-4 py-2 rounded-md  bg-gray-700 text-white"
                  required
                />
              </div>

              {/* Create Button */}
              <Button
                type="submit"
                className="bg-gradient-to-r p-5 mt-6 text-lg from-violet-500 to-indigo-600 w-full"
                onClick={() => {
                  if (roomCode === "") {
                    alert("Please enter a room code");
                    return;
                  }
                  router.push("/room/" + roomCode);
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

export default JoinRoom;
