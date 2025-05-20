"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Toaster } from "sonner";
import ScanningAnimation from "@/components/ScanningAnimation";
import { useEffect } from "react";

// Dummy members list
const members = ["A", "B", "C"];

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
    other_tax: number;
    net_total: number;
  };
}

export default function UploadBillPage() {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [showImage, setShowImage] = useState<boolean>(false);
  const [showImageAlone, setShowImageAlone] = useState<boolean>(false);

  const loading_msgs = [
    "Processing...",
    "Extracting Content...",
    "Structuring the results...",
    "Almost done...",
  ];

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
      other_tax: 0,
      net_total: 0,
    },
  });
  const [priceInputs, setPriceInputs] = useState<{ [key: number]: string }>({});
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!showAnimation) return;
    DisplayMessages();
  }, [showAnimation]);

  const DisplayMessages = async () => {
    for (var i = 0; i < loading_msgs.length; i++) {
      setMessageIndex(i);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  };

  const handleImageSubmit = async () => {
    setShowAnimation(true);
    setShowImage(false);
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
        setShowAnimation(false);
        setShowImageAlone(true);
        console.log(data.data.ocr_contents.items); // Assuming the response contains the items
      } else {
        // console.log(result);
        toast.error("Error uploading image");
        console.error("Error uploading image");
        setShowAnimation(false);
        setShowImageAlone(true);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedImage(e.target.files[0]);
      setShowImage(true);
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
    <div className="min-h-screen w-full bg-gradient-to-r from-violet-500 to-indigo-600">
      <div className="max-w-md mx-auto  p-4 space-y-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Upload Bill</h2>
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="
          
          text-white placeholder:text-white"
        />
        {/* <Toaster
          toastOptions={{
            unstyled: true,
            classNames: {
              error: "bg-red-400",
              success: "text-green-400",
              warning: "text-yellow-400",
              info: "bg-blue-400",
            },
          }}
        /> */}
        {showAnimation && (
          <div className="flex flex-col items-center justify-center">
            <ScanningAnimation />
            <p className="mt-4 text-lg font-semibold text-white">
              {loading_msgs[messageIndex]}
            </p>
          </div>
        )}
        {/* <div className="flex flex-col items-center justify-center">
          <ScanningAnimation />
        </div> */}

        {showImage && uploadedImage && (
          <div className="border p-2 rounded-md border-white">
            <p className="text-sm text-gray-600">
              <img src={URL.createObjectURL(uploadedImage)} alt="Uploaded" />
            </p>
            <Button
              className="w-full mt-4 bg-gradient-to-r from-slate-700 to-slate-800 text-white transition duration-300 ease-in-out transform hover:scale-102 hover:brightness-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-500"
              onClick={() => {
                handleImageSubmit();
                toast.success("Image submitted!");
              }}
            >
              Submit
            </Button>
          </div>
        )}
        {showImageAlone && uploadedImage && (
          <div className="border p-2 rounded-md border-white">
            <p className="text-sm text-gray-600">
              <img src={URL.createObjectURL(uploadedImage)} alt="Uploaded" />
            </p>
          </div>
        )}
        {ocrResult.ocr_contents.items.length > 0 && (
          <div className="space-y-4 mt-4">
            <div className="flex items-center justify-center">
              <h2 className="text-2xl font-semibold underline"> Shop Name </h2>
            </div>
            <Card className="p-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white">
              <CardContent className="flex items-center justify-center ">
                <div>
                  {/* <p className="text-lg font-medium">Shop Name</p> */}
                  <p className="text-xl font-semibold">
                    {ocrResult.ocr_contents.shop_name}
                  </p>
                </div>
              </CardContent>
            </Card>
            <div className="flex items-center justify-center">
              <h2 className="text-2xl font-semibold underline"> Items </h2>
            </div>
            {ocrResult.ocr_contents.items.map((item: any, index: any) => (
              <Card
                key={index}
                className="bg-gradient-to-r from-slate-700 to-slate-800 text-white"
              >
                <CardContent className="p-3">
                  <div className="flex justify-between items-center ">
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
                        className="mb-2 text-white font-semibold"
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
                          (selectedMembers[index] || []).length ===
                          members.length
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

            <Card className="bg-gradient-to-r from-slate-700 to-slate-800">
              <CardContent className="p-4">
                <div className="flex flex-col gap-5">
                  {/* Total Before Tax */}
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-md font-semibold text-white">
                      Total (before taxes)
                    </p>
                    <Input
                      type="number"
                      value={ocrResult.ocr_contents.total.toFixed(2)}
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
                      className="text-xl text-green-500 font-semibold w-30 text-center"
                      placeholder="₹0.00"
                    />
                  </div>

                  {/* Tax Fields */}
                  <div className="grid grid-cols-2 gap-4 px-4">
                    {/* SGST */}
                    <div className="flex flex-col items-center">
                      <p className="text-sm text-white">SGST</p>
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
                        className="text-green-500 w-24 font-semibold text-center"
                        placeholder="₹0.00"
                      />
                    </div>

                    {/* CGST */}
                    <div className="flex flex-col items-center">
                      <p className="text-sm text-white">CGST</p>
                      <Input
                        type="number"
                        value={ocrResult.ocr_contents.cgst}
                        onChange={(e) => {
                          const newVal = e.target.value;
                          setOcrResult((prev) => ({
                            ...prev,
                            ocr_contents: {
                              ...prev.ocr_contents,
                              cgst: parseFloat(newVal),
                            },
                          }));
                        }}
                        className="text-green-500 w-24 font-semibold text-center"
                        placeholder="₹0.00"
                      />
                    </div>

                    {/* Other Tax */}
                    <div className="flex flex-col items-center col-span-2">
                      <p className="text-sm text-white">Other Tax</p>
                      <Input
                        type="number"
                        value={ocrResult.ocr_contents.other_tax}
                        onChange={(e) => {
                          const newVal = e.target.value;
                          setOcrResult((prev) => ({
                            ...prev,
                            ocr_contents: {
                              ...prev.ocr_contents,
                              other_tax: parseFloat(newVal),
                            },
                          }));
                        }}
                        className="text-green-500 w-24 font-semibold text-center"
                        placeholder="₹0.00"
                      />
                    </div>
                  </div>

                  {/* Net Total */}
                  <div className="flex flex-col items-center mt-4 border-t pt-4 space-y-2">
                    <p className="text-2xl font-bold text-white">Net Total</p>
                    <Input
                      type="number"
                      value={ocrResult.ocr_contents.net_total}
                      onChange={(e) => {
                        const newVal = e.target.value;
                        setOcrResult((prev) => ({
                          ...prev,
                          ocr_contents: {
                            ...prev.ocr_contents,
                            net_total: parseFloat(newVal),
                          },
                        }));
                      }}
                      className="w-45 p-6 text-4xl text-green-400 font-semibold text-center"
                      placeholder="₹0.00"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Button className="w-full mt-4 bg-gradient-to-r from-slate-700 to-slate-800">
              Submit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
