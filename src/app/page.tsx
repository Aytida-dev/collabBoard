import Canvas from "@/components/Canvas";
import Navbar from "@/components/Navbar";
import Toolbar from "@/components/Toolbar";
import Userbar from "@/components/Userbar";

export default function Home() {
  return (
    <div className="h-[calc(100vh-100px)]  ">
      <Navbar />
      <div className="flex justify-between  h-full gap-2 mt-2">
        <Toolbar />
        <Canvas />
        <Userbar />
      </div>
    </div>
  );
}
