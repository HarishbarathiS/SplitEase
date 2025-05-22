"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";

const page = () => {
  const router = useRouter();

  const handleCreateRoomClick = () => {
    router.push("/create");
  };

  const handleJoinRoomClick = () => {
    router.push("/join"); // You'll need to create this route and component
  };
  return (
    <div className="flex items-center justify-center min-h-dvh bg-gradient-to-r from-violet-500 to-indigo-600 p-4">
      <div className="flex h-100 w-full max-w-lg justify-center bg-gray-900 rounded-md">
        <div className="flex flex-col justify-center items-center text-center text-white text-xl p-4">
          <div className="mt-2 text-2xl underline">Welcome to SplitEase</div>
          <div className="flex flex-col mt-15 space-y-12">
            <div>
              <Button
                onClick={handleCreateRoomClick}
                className="text-xl p-5 bg-gradient-to-r from-violet-500 to-indigo-600 w-full hover:from-purple-700 hover:to-blue-800"
              >
                CREATE ROOM
              </Button>
            </div>
            <div>
              <Button
                onClick={handleJoinRoomClick}
                className="text-xl p-5 bg-gradient-to-r from-violet-500 to-indigo-600 w-full hover:from-purple-700 hover:to-blue-800"
              >
                JOIN ROOM
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
