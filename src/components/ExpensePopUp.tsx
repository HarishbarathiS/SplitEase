import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ExpensePopup({
  checkCurrencySelected,
}: {
  checkCurrencySelected: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    if (!checkCurrencySelected) {
      alert("Please select a currency first");
      return;
    }
    setOpen(true);
  };
  return (
    <Dialog open={open}>
      <DialogTrigger asChild onClick={handleClick}>
        <Button className="p-6 text-xl ">Add Expense</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Select how to add the expense</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => {
              router.push("/manual");
            }}
          >
            Add Manually
          </Button>
          <Button
            variant="default"
            className="w-full"
            onClick={() => {
              router.push("/upload");
            }}
          >
            Upload Bill
          </Button>
        </div>

        {/* <DialogFooter>
          <Button variant="ghost">Cancel</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
