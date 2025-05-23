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

  const handleSubmit = async () => {
    console.log(members);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-violet-500 to-indigo-600">
      <div className="flex flex-col items-center pt-10 px-4 space-y-5">
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
                className="flex-1 bg-primary text-lg text-white p-5 border border-gray-300 rounded-md placeholder-white"
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
          <Button onClick={addMemberField} className="bg-primary">
            Add Member
          </Button>
        </div>
        <Button onClick={handleSubmit} className="text-lg w-full">
          Submit
        </Button>
        <BottomNav />
        <Toaster
          toastOptions={{
            unstyled: true,
            classNames: {
              error:
                "bg-red-300 border border-red-400 text-red-700 px-4 py-3 rounded shadow",
              success:
                "bg-green-300 border border-green-400 text-green-700 px-4 py-3 rounded shadow",
              warning:
                "bg-yellow-300 border border-yellow-400 text-yellow-700 px-4 py-3 rounded shadow",
              info: "bg-blue-300 border border-blue-400 text-blue-700 px-4 py-3 rounded shadow",
            },
          }}
        />
      </div>
    </div>
  );
};

export default page;
