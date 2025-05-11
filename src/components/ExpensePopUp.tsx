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

export default function ExpensePopup() {
  const router = useRouter();
  return (
    <Dialog>
      <DialogTrigger asChild>
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
