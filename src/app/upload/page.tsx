"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Car } from "lucide-react";

// Dummy members list
const members = ["A", "B", "C"];

// Dummy extracted items
const mockItems = [
  { id: 1, name: "Milk", amount: 50 },
  { id: 2, name: "Bread", amount: 30 },
  { id: 3, name: "Eggs", amount: 100 },
];

interface OcrResult {
  ocr_contents: {
    items: {
      product_name: string;
      price: number;
    }[];
    shop_name: string;
    total: number;
    sgst: number;
    cgst: number;
  };
}

export default function UploadBillPage() {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [items, setItems] = useState(mockItems); // simulate extracted items
  const [selectedMembers, setSelectedMembers] = useState<{
    [key: number]: string[];
  }>({});
  const [ocrResult, setOcrResult] = useState<OcrResult>({
    ocr_contents: {
      items: [],
      shop_name: "",
      total: 0,
      sgst: 0,
      cgst: 0,
    },
  });
  const [priceInputs, setPriceInputs] = useState<{ [key: number]: string }>({});

  // const shop_name = ""
  // const Total_amt = ""
  // const sgst = ""
  // const cgst = ""

  const handleImageSubmit = async () => {
    if (uploadedImage) {
      const formData = new FormData();
      formData.append("file", uploadedImage);

      const res = await fetch("http://127.0.0.1:8000/handle_bill", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Response from server:", data);
        setOcrResult(data.data);
        console.log(data.data.ocr_contents.items); // Assuming the response contains the items
      } else {
        console.error("Error uploading image");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedImage(e.target.files[0]);

      // Simulate OCR -> In real case, call backend here
      setItems(mockItems);
    }
  };

  const toggleMember = (index: number, member: string) => {
    setSelectedMembers((prev) => {
      const current = prev[index] || [];
      return {
        ...prev,
        [index]: current.includes(member)
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
          <Button className="w-full mt-4" onClick={handleImageSubmit}>
            Submit
          </Button>
        </div>
      )}

      {ocrResult.ocr_contents.items.length > 0 && (
        <div className="space-y-4 mt-4">
          <Card className="p-3">
            <CardContent className="flex items-center justify-center">
              <div>
                {/* <p className="text-lg font-medium">Shop Name</p> */}
                <p className="text-xl font-semibold">
                  {ocrResult.ocr_contents.shop_name}
                </p>
              </div>
            </CardContent>
          </Card>
          {/* <div className="flex items-center justify-center gap-2">
            <h3 className="text-lg font-medium">
              {ocrResult.ocr_contents.shop_name}
            </h3>
          </div> */}

          {ocrResult.ocr_contents.items.map((item: any, index: any) => (
            <Card key={index}>
              <CardContent className="p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <Input
                      value={item.product_name}
                      onChange={(e) => {
                        const newItems = [...ocrResult.ocr_contents.items];
                        newItems[index].product_name = e.target.value;
                        setOcrResult((prev) => ({
                          ...prev,
                          ocr_contents: {
                            ...prev.ocr_contents,
                            items: newItems,
                          },
                        }));
                      }}
                      className="mb-2 text-gray-800 font-semibold"
                    />
                    <Input
                      type="text"
                      inputMode="decimal"
                      value={priceInputs[index] ?? item.price.toString()}
                      onChange={(e) => {
                        const newVal = e.target.value;

                        // Update input text
                        setPriceInputs((prev) => ({
                          ...prev,
                          [index]: newVal,
                        }));

                        // Optionally validate and update OCR result
                        if (!isNaN(parseFloat(newVal))) {
                          const newItems = [...ocrResult.ocr_contents.items];
                          newItems[index].price = parseFloat(newVal);
                          setOcrResult((prev) => ({
                            ...prev,
                            ocr_contents: {
                              ...prev.ocr_contents,
                              items: newItems,
                            },
                          }));
                        }
                      }}
                      className="mb-2 text-green-500 font-semibold"
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-2 flex-wrap">
                  {members.map((member) => (
                    <div
                      key={`${index}-${member}`}
                      className="flex items-center gap-2"
                    >
                      <Checkbox
                        id={`${index}-${member}`}
                        checked={(selectedMembers[index] || []).includes(
                          member
                        )}
                        onCheckedChange={() => toggleMember(index, member)}
                      />

                      <Label htmlFor={`${index}-${member}`}>{member}</Label>
                    </div>
                  ))}
                  <div
                    key={`${index}-split`}
                    className="flex items-center gap-2"
                  >
                    <Checkbox
                      id={`${index}-split`}
                      checked={
                        (selectedMembers[index] || []).length === members.length
                      }
                      onCheckedChange={(checked) => {
                        setSelectedMembers((prev) => ({
                          ...prev,
                          [index]: checked ? [...members] : [],
                        }));
                      }}
                    />
                    <Label htmlFor={`${index}-split`}>Split equally</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <Card>
            <CardContent className="p-3">
              <div className="flex justify-center items-center">
                <div className="flex flex-col gap-2">
                  <p className="font-bold text-2xl">Total Amount</p>
                  <div className="flex justify-center items-center mt-2">
                    <Input
                      type="number"
                      value={ocrResult.ocr_contents.total}
                      onChange={(e) => {
                        const newVal = e.target.value;
                        setOcrResult((prev) => ({
                          ...prev,
                          ocr_contents: {
                            ...prev.ocr_contents,
                            total: parseFloat(newVal),
                          },
                        }));
                      }}
                      className="text-3xl text-green-500 w-40 text-center"
                      placeholder="₹0.00"
                    />
                  </div>
                  <div className="flex flex-col items-center mt-2 gap-2">
                    <div className="flex gap-2">
                      <p className="text-md mt-1 text-gray-500">SGST : </p>
                      <Input
                        type="number"
                        value={ocrResult.ocr_contents.sgst}
                        onChange={(e) => {
                          const newVal = e.target.value;
                          setOcrResult((prev) => ({
                            ...prev,
                            ocr_contents: {
                              ...prev.ocr_contents,
                              sgst: parseFloat(newVal),
                            },
                          }));
                        }}
                        className="text-green-500 w-20 text-center"
                        placeholder="₹0.00"
                      />
                    </div>
                    <div className="flex gap-2">
                      <p className="text-md mt-1 text-gray-500">CGST : </p>
                      <Input
                        type="number"
                        value={ocrResult.ocr_contents.cgst}
                        onChange={(e) => {
                          const newVal = e.target.value;
                          setOcrResult((prev) => ({
                            ...prev,
                            ocr_contents: {
                              ...prev.ocr_contents,
                              sgst: parseFloat(newVal),
                            },
                          }));
                        }}
                        className="text-green-500 w-20 text-center"
                        placeholder="₹0.00"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Button className="w-full mt-4">Submit</Button>
        </div>
      )}
    </div>
  );
}
