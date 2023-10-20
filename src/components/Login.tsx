"use client";

import { use, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useStore } from "@/lib/ZustandStore";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

export default function Login() {
  const { setUserName, setRoomId, socket } = useStore();
  const [inputUserName, setInputUserName] = useState<string>("");
  const [inputRoomId, setInputRoomId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const parentRef = useRef<HTMLDivElement>(null);

  function getRandomColor() {
    // Generate a random number between 0 and 16777215 (2^24 - 1) and convert it to a hexadecimal string
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

    return randomColor;
  }

  useEffect(() => {
    const parent = parentRef.current;

    if (parent) {
      parent.style.backgroundImage = `linear-gradient(to right, ${getRandomColor()}, ${getRandomColor()})`;
    }
  }, []);

  const user = z.object({
    inputUserName: z
      .string()
      .regex(/^[A-Za-z0-9\s]*$/, {
        message: "Only characters and numbers are allowed",
      })
      .min(5, {
        message: "minimum length is 5",
      })
      .max(20, {
        message: "maximum length is 20 ",
      }),
    inputRoomId: z
      .string()
      .regex(/^[A-Za-z0-9]*$/, {
        message: "Only characters and numbers are allowed",
      })
      .min(5, {
        message: "minimum length is 5",
      })
      .max(20, {
        message: "maximum length is 20 ",
      }),
  });

  function updateUserName() {
    setUserName(inputUserName);
  }

  function createRoom() {
    try {
      user.parse({ inputUserName, inputRoomId });
      setLoading(true);
      updateUserName();
      setRoomId(inputRoomId);
      socket.emit("create-room", {
        roomId: inputRoomId,
        userName: inputUserName,
      });
      router.push(`/${inputUserName}/${inputRoomId}`);
    } catch (error: any) {
      const allError = { ...error }.issues;
      allError.map((err: any) => toast.error(err.message));
    }
  }

  return (
    <div
      ref={parentRef}
      className="absolute top-0 right-0 left-0 bottom-0 bg-black flex justify-center items-center  "
    >
      <div className="border w-full h-full px-10 py-40 border-gray-600 md:w-[500px] md:h-[600px] rounded-md flex flex-col justify-between items-center md:py-10 md:px-20 group ">
        <div className="flex flex-col gap-3">
          <span className=" text-5xl w-full text-center">Collab Slate</span>
          <span className=" text-md w-full text-center">
            Build Ideas Together
          </span>
        </div>
        <div className="w-full flex flex-col justify-between items-start gap-2 ">
          <span className=" opacity-70 group-hover:opacity-100 transition-opacity">
            How you are going to say hii,
          </span>
          <Input
            placeholder="Your name"
            value={inputUserName}
            onChange={(e) => setInputUserName(e.target.value)}
            className="bg-transparent placeholder:text-white"
          />
        </div>
        <div className="w-full flex flex-col justify-between items-start gap-2 group">
          <span className="opacity-70 group-hover:opacity-100 transition-opacity">
            Enter a room ID,
          </span>
          <Input
            placeholder="Room Id"
            value={inputRoomId}
            onChange={(e) => setInputRoomId(e.target.value)}
            className="bg-transparent placeholder:text-white"
          />
        </div>
        <div className="w-full flex flex-col justify-between items-center gap-5 ">
          <Button
            className="w-full"
            variant={"secondary"}
            onClick={() => createRoom()}
          >
            {loading ? (
              <Loader className=" animate-spin" size={20} />
            ) : (
              "Create Room"
            )}
          </Button>
          <span>OR</span>
          <Button className="w-full" onClick={() => createRoom()}>
            {loading ? (
              <Loader className=" animate-spin" size={20} />
            ) : (
              "Join Room"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
