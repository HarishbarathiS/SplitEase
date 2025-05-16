import { redirect } from "next/navigation";

export default function Page() {
  return (
    // <div className="min-h-screen flex justify-center items-center">
    // <h1 className=" flex text-xl">Home page</h1>
    redirect("/main")
    // </div>
  );
}
