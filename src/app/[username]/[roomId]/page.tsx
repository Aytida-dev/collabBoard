import Canvas from "@/components/Canvas";
import Navbar from "@/components/Navbar";
import Toolbar from "@/components/Toolbar";
import Userbar from "@/components/Userbar";

export default function CanvasPage() {
  return (
    <div className="h-[calc(100vh-100px)]">
      <Navbar />
      <div className="flex justify-between  h-full md:gap-2 md:mt-2">
        <Toolbar />
        <Canvas />
        <Userbar />
      </div>
    </div>
  );
}
