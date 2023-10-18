"use client";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "./ui/avatar";
import { useStore } from "@/lib/ZustandStore";
import { getAnnotionsByName } from "@/lib/utils";

interface User {
  id: number;
  name: string;
  img: string;
  color: string; // hex colors
}

export default function Userbar() {
  const { joinedUser } = useStore();
  return (
    <div className=" hidden w-16 h-full bg-black my-auto rounded-l-xl md:flex flex-col justify-between items-center py-10 ">
      {joinedUser.length > 0 &&
        joinedUser.map(({ userName, id }: { userName: string; id: number }) => (
          <div
            key={id}
            className={`w-10 border-2 rounded-full`}
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
        ))}
    </div>
  );
}
