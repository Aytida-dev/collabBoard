"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiCopy } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";

import { getAnnotionsByName } from "@/lib/utils";
import { useStore } from "@/lib/ZustandStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { joinedUser, roomId, userName, socket } = useStore();

  const router = useRouter();

  function handleCopy() {
    navigator.clipboard.writeText(roomId);
    toast.success("copied Room ID to clipboard");
  }

  function leaveRoom() {
    socket.emit("leave-room", { roomId: roomId, userName: userName });
    router.replace("/");
  }

  return (
    <div className=" h-16 m-auto bg-black flex md:w-10/12 justify-between items-center px-6 md:rounded-xl md:mt-4 ">
      <div className="logo">logo</div>
      {/* mobile view */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <RxHamburgerMenu />
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col justify-between h-full">
              <SheetHeader>
                <div className="flex justify-between items-center">
                  <Button>
                    <AiOutlineUserAdd />
                  </Button>
                  <Badge
                    variant={"secondary"}
                    onClick={() => handleCopy()}
                    className=" cursor-pointer"
                  >
                    <span>{roomId}</span>
                    <BiCopy className=" opacity-70 mx-3" />
                  </Badge>
                </div>
              </SheetHeader>
              <SheetDescription>
                <div className="grid grid-cols-3 gap-9">
                  {joinedUser.length > 0 &&
                    joinedUser.map(
                      ({ userName, id }: { userName: string; id: number }) => (
                        <div
                          key={id}
                          className={`w-11 border-2 rounded-full`}
                          style={{
                            borderColor: "red",
                          }}
                        >
                          <Avatar>
                            {/* <AvatarImage src={img} className="rounded-full" /> */}
                            <AvatarFallback className="rounded-full h-9">
                              {getAnnotionsByName(userName)}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      )
                    )}
                </div>
              </SheetDescription>

              <SheetFooter>
                <div className="flex justify-between items-center">
                  <Avatar>
                    {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                    <AvatarFallback>
                      {getAnnotionsByName(userName)}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant={"destructive"} onClick={() => leaveRoom()}>
                    leave Room
                  </Button>
                </div>
              </SheetFooter>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className=" hidden md:flex justify-between items-center gap-5">
        <div className="room cursor-pointer" onClick={() => handleCopy()}>
          <Badge variant={"secondary"}>
            <span>{roomId}</span>
            <BiCopy className=" opacity-70 mx-3" />
          </Badge>
        </div>

        <Button>
          <AiOutlineUserAdd />
        </Button>

        <Avatar>
          {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
          <AvatarFallback>{getAnnotionsByName(userName)}</AvatarFallback>
        </Avatar>
        <Button variant={"destructive"} onClick={() => leaveRoom()}>
          l
        </Button>
      </div>
    </div>
  );
}
