"use client";

import { useRouter } from "next/navigation";
import { Home, Users, Wallet, List } from "lucide-react";

export default function BottomNavBar() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="fixed bottom-1 left-1/2 transform -translate-x-1/2 w-[97%] md:w-[600px] bg-black rounded-full text-white py-3 z-50 shadow-lg">
        <div className="flex justify-evenly items-center">
          {[
            { icon: Home, label: "Home", route: "/home" },
            { icon: Users, label: "Members", route: "/users" },
            { icon: Wallet, label: "Expenses", route: "/manual" },
            { icon: List, label: "Transactions", route: "/home" },
          ].map(({ icon: Icon, label, route }, index) => (
            <button
              key={index}
              onClick={() => router.push(route)}
              className="flex flex-col items-center text-white hover:text-blue-400 transition-all duration-200"
            >
              <Icon className="w-6 h-6 mb-1 hover:scale-110 transition-transform" />
              <span className="text-xs">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
