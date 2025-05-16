"use client";
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast, Toaster } from "sonner";
import BottomNav from "@/components/BottomNav";

const page = () => {
  const [members, setMembers] = useState<string[]>([""]);

  const handleMemberChange = (index: number, value: string) => {
    const updated = [...members];

    updated[index] = value;
    setMembers(updated);
  };

  const addMemberField = () => {
    if (members[members.length - 1] === "") {
      toast.error("Please fill the last member field before adding a new one.");
      return;
    }
    setMembers([...members, ""]);
  };

  const removeMemberField = (index: number) => {
    const updated = members.filter((_, i) => i !== index);
    setMembers(updated);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-violet-500 to-indigo-600">
      <div className="flex flex-col items-center pt-10 px-4">
        <h1 className="font-bold  text-4xl mb-10 underline">Members</h1>
        <div className="w-full max-w-md space-y-5">
          <h2 className="text-2xl font-semibold font-white">Add Members</h2>
          {members.map((member, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={member}
                onChange={(e) => handleMemberChange(index, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addMemberField();
                  }
                }}
                placeholder={`Member ${index + 1}`}
                className="flex-1 bg-black text-xl text-white p-5 border border-gray-300 rounded-md placeholder-white"
              />

              {members.length > 1 && (
                <Button
                  variant="destructive"
                  onClick={() => removeMemberField(index)}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button onClick={addMemberField} className="text-lg">
            Add Member
          </Button>
        </div>
        <BottomNav />
        <Toaster
          toastOptions={{
            unstyled: true,
            classNames: {
              error: "bg-red-400",
              success: "text-green-400",
              warning: "text-yellow-400",
              info: "bg-blue-400",
            },
          }}
        />
      </div>
    </div>
  );
};

export default page;
