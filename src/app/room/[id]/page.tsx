"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ExpensePopup from "@/components/ExpensePopUp";
import { toast, Toaster } from "sonner";
import BottomNav from "@/components/BottomNav";
import Currency from "@/components/Currency";

const Page = () => {
  const [members, setMembers] = useState<string[]>([""]);
  const [totalAmt, setTotalAmt] = useState(0);
  const [currency, setCurrency] = useState("");

  const handleCurrencyChange = (currency: string) => {
    setCurrency(currency);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-violet-500 to-indigo-600 text-black">
      <div className="flex flex-col items-center pt-10 px-4">
        <h1 className="font-bold underline text-black p-5 rounded-full text-4xl mb-10">
          Expenses
        </h1>
        <Currency onCurrencyChange={handleCurrencyChange} />

        <div className="flex flex-col mt-5 w-full max-w-md border-2 rounded-lg border-gray-300 p-15 flex items-center justify-center space-y-3">
          <div className="flex flex-row items-center justify-between space-x-1">
            <span className="text-4xl font-monospace">{currency}</span>
            <h1 className="text-5xl">
              {/* {currency} */}
              {totalAmt}
            </h1>
          </div>
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
