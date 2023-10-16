import Navbar from "@/components/Navbar";
import Toolbar from "@/components/Toolbar";
import Userbar from "@/components/Userbar";

export default function Home() {
  return (
    <div className="h-[calc(100vh-100px)]  ">
      <Navbar />
      <div className="flex justify-between  h-full ">
        <Toolbar />
        <Userbar />
      </div>
    </div>
  );
}
