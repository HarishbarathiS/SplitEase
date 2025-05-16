"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ExpensePopup from "@/components/ExpensePopUp";
import { toast, Toaster } from "sonner";
import BottomNav from "@/components/BottomNav";

const Page = () => {
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
    <div className="min-h-screen w-full bg-gradient-to-r from-violet-500 to-indigo-600 text-black">
      <div className="flex flex-col items-center pt-10 px-4">
        <h1 className="font-bold underline text-black p-5 rounded-full text-4xl mb-10">
          Expenses
        </h1>

        <div className="flex flex-col mt-5 w-full max-w-md border-2 rounded-lg border-gray-300 p-15 flex items-center justify-center space-y-3">
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
      <Toaster />
      <BottomNav />
    </div>
  );
};

export default Page;
