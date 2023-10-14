import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <div className="w-10/12 h-16 m-auto bg-black flex justify-between items-center px-6 rounded-xl mt-4">
      <div className="logo">logo</div>
      <div className="flex justify-between items-center gap-10">
        <div className="room">room</div>
        <div className="add">add</div>
        <div className="user">user</div>
        <Button variant="secondary">Logout</Button>
      </div>
    </div>
  );
}
