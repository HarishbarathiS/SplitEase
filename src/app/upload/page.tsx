import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function ExpensePage() {
  const expenses = [
    { payer: "A", amount: 0, splitWith: "B, C", description: "Description" },
    { payer: "A", amount: 0, splitWith: "B, C", description: "Description" },
    { payer: "A", amount: 0, splitWith: "B, C", description: "Description" },
  ];

  const settlements = [
    { from: "A", to: "C", amount: 0 },
    { from: "B", to: "A", amount: 0 },
  ];

  return (
    <div className="max-w-md mx-auto p-4 rounded-xl border shadow bg-white space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Expense</h2>
        <div className="flex gap-2 text-sm text-gray-500">
          <span className="cursor-pointer">Filter</span>
          <span className="cursor-pointer">Export</span>
        </div>
      </div>

      {/* Expense Cards */}
      <div className="space-y-2">
        {expenses.map((exp, idx) => (
          <Card key={idx}>
            <CardContent className="p-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{exp.payer} paid</p>
                  <p className="text-sm text-gray-600">
                    ₹{exp.amount} &nbsp;&nbsp;{exp.splitWith}
                  </p>
                  <p className="text-sm text-gray-500">{exp.description}</p>
                </div>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Settlement Summary */}
      <div className="border-t pt-2 text-sm space-y-1">
        <p className="font-medium">Amounts:</p>
        {settlements.map((s, i) => (
          <div key={i} className="flex justify-between px-1">
            <span>
              {s.from} owes {s.to}
            </span>
            <span>₹{s.amount}</span>
          </div>
        ))}
      </div>

      {/* Settle Up Button */}
      <Button className="w-full mt-2">SETTLE UP</Button>
    </div>
  );
}
