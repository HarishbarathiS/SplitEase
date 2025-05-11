"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

// Dummy members list
const members = ["A", "B", "C"];

// Dummy extracted items
const mockItems = [
  { id: 1, name: "Milk", amount: 50 },
  { id: 2, name: "Bread", amount: 30 },
  { id: 3, name: "Eggs", amount: 100 },
];

export default function UploadBillPage() {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [items, setItems] = useState(mockItems); // simulate extracted items
  const [selectedMembers, setSelectedMembers] = useState<{
    [key: number]: string[];
  }>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedImage(e.target.files[0]);

      // Simulate OCR -> In real case, call backend here
      setItems(mockItems);
    }
  };

  const toggleMember = (itemId: number, member: string) => {
    setSelectedMembers((prev) => {
      const current = prev[itemId] || [];
      return {
        ...prev,
        [itemId]: current.includes(member)
          ? current.filter((m) => m !== member)
          : [...current, member],
      };
    });
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h2 className="text-xl font-semibold">Upload Bill</h2>

      <Input type="file" accept="image/*" onChange={handleFileChange} />

      {uploadedImage && (
        <div className="border p-2 rounded-md">
          <p className="text-sm text-gray-600">
            Image Uploaded: {uploadedImage.name}
          </p>
        </div>
      )}

      {items.length > 0 && (
        <div className="space-y-4 mt-4">
          <h3 className="text-lg font-medium">Assign Items to Members</h3>

          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">₹{item.amount}</p>
                  </div>
                </div>

                <div className="flex gap-4 mt-2 flex-wrap">
                  {members.map((member) => (
                    <div key={member} className="flex items-center gap-2">
                      <Checkbox
                        id={`${item.id}-${member}`}
                        checked={(selectedMembers[item.id] || []).includes(
                          member
                        )}
                        onCheckedChange={() => toggleMember(item.id, member)}
                      />

                      <Label htmlFor={`${item.id}-${member}`}>{member}</Label>
                    </div>
                  ))}
                  <Checkbox
                    id={`${item.id}-split`}
                    checked={
                      (selectedMembers[item.id] || []).length === members.length
                    }
                    onCheckedChange={(checked) => {
                      setSelectedMembers((prev) => ({
                        ...prev,
                        [item.id]: checked ? [...members] : [],
                      }));
                    }}
                  />
                  <Label htmlFor={`${item.id}-split`}>Split equally</Label>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button className="w-full mt-4">Submit</Button>
        </div>
      )}
    </div>
  );
}
