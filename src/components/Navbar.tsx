import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiCopy } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";

export default function Navbar() {
  return (
    <div className=" h-16 m-auto bg-black flex md:w-10/12 justify-between items-center px-6 md:rounded-xl md:mt-4">
      <div className="logo">logo</div>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <RxHamburgerMenu />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="h-full">
              <div className="flex flex-col justify-between h-full">
                <div className="flex justify-between items-center ">
                  <Button>
                    <AiOutlineUserAdd />
                  </Button>
                  <Badge variant={"secondary"}>
                    <span>12323em23ioj29342</span>
                    <BiCopy className=" opacity-70 mx-3" />
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Button variant={"destructive"}>logout</Button>
                </div>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className=" hidden md:flex justify-between items-center gap-5">
        <div className="room">
          <Badge variant={"secondary"}>
            <span>12323em23ioj29342</span>
            <BiCopy className=" opacity-70 mx-3" />
          </Badge>
        </div>

        <Button>
          <AiOutlineUserAdd />
        </Button>

        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
