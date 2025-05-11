"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ExpensePopup from "@/components/ExpensePopUp";

const Page = () => {
  const [members, setMembers] = useState<string[]>([""]);

  const handleMemberChange = (index: number, value: string) => {
    const updated = [...members];
    updated[index] = value;
    setMembers(updated);
  };

  const addMemberField = () => {
    setMembers([...members, ""]);
  };

  const removeMemberField = (index: number) => {
    const updated = members.filter((_, i) => i !== index);
    setMembers(updated);
  };

  return (
    <div className="min-h-screen w-full bg-red-50">
      <div className="flex flex-col items-center pt-10 px-4">
        <h1 className="font-bold text-4xl mb-10">Home</h1>

        <div className="w-full max-w-md space-y-5">
          <h2 className="text-2xl font-bold">Members</h2>
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
                className="font-mono text-lg flex-1"
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
          <Button onClick={addMemberField}>Add Member</Button>
        </div>

        <div className="flex flex-col mt-10 w-full max-w-md border-2 rounded-lg border-gray-300 p-15 flex items-center justify-center space-y-3">
          <h1 className="text-5xl">₹ 50</h1>
          <h1 className="text-xl font-monospace">Total Expenses</h1>
        </div>
        <div className="w-auto mt-10">
          {/* <Button  className="w-full p-7 text-xl ">
            ADD EXPENSE
          </Button> */}
          <ExpensePopup />
        </div>
      </div>
    </div>
  );
};

export default Page;
