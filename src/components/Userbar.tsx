"use client";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "./ui/avatar";
import { users } from "../lib/testData";
import { getAnnotionsByName } from "@/lib/utils";

interface User {
  id: number;
  name: string;
  img: string;
  color: string; // hex colors
}

export default function Userbar() {
  return (
    <div className=" hidden w-16 h-full bg-black my-auto rounded-l-xl md:flex flex-col justify-between items-center py-10 ">
      {users.map(({ name, img, id, color }) => (
        <div
          key={id}
          className={`w-10 border-2 rounded-full`}
          style={{
            borderColor: color,
          }}
        >
          <Avatar>
            <AvatarImage src={img} className="rounded-full" />
            <AvatarFallback className="rounded-full h-9">
              {getAnnotionsByName(name)}
            </AvatarFallback>
          </Avatar>
        </div>
      ))}
    </div>
  );
}
