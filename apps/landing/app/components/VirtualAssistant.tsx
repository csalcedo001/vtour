"use client";

import * as dotenv from "dotenv";
dotenv.config();

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  AudioLines,
  HelpCircleIcon,
  HomeIcon,
  MessagesSquareIcon,
  Send,
  SettingsIcon,
} from "lucide-react";
import { useTTS } from "@cartesia/cartesia-js/react";
import yoda from "@/app/yoda.jpg";
import {useComponentApis} from "@/app/component-api-provider";

// Define avatar configurations
const avatars = [
  {
    name: "Yoda",
    src: yoda,
    voiceId: "9121bf7e-1e22-4c06-a3dc-6ebd3d3bb1ec"
  },
  goku: {
    image: goku,
    voiceId: "bbe2c928-b008-43c0-801a-570dd6600cb3",
  },
  {
    name: "Scarlett",
    src: scarlett,
    voiceId: "a67088f1-27bb-4837-9a22-8a0c3b3a4208"
  }
];

interface AnimatedAvatarProps {
  isSpeaking: boolean;
  imageSrc: string;
  isHovered?: boolean;
}

const AnimatedAvatar: React.FC<AnimatedAvatarProps> = ({
  isSpeaking,
  imageSrc,
  isHovered = false
}) => {
  return (
    <motion.div
      className="relative h-40 w-40"
      animate={isSpeaking ? "speaking" : "idle"}
      variants={{
        speaking: {
          scale: [1, 1.02, 1],
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        },
        idle: {
          scale: 1,
        },
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={isSpeaking ? "speaking" : "idle"}
        variants={{
          speaking: {
            boxShadow: [
              "0 0 10px 2px rgba(0, 255, 0, 0.3)",
              "0 0 20px 4px rgba(0, 255, 0, 0.3)",
              "0 0 10px 2px rgba(0, 255, 0, 0.3)",
            ],
            transition: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          },
          idle: {
            boxShadow: "0 0 0px 0px rgba(0, 255, 0, 0)",
          },
        }}
      />
      <div className="h-40 w-40 rounded-full overflow-hidden relative z-10">
        <Image
          src={imageSrc}
          alt="avatar"
          width={400}
          height={400}
          className="object-cover w-full h-full"
        />
      </div>
    </motion.div>
  );
}


const VirtualAssistant: React.FC = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isButtonVisible, setButtonVisible] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState("Yoda");
  const [userInput, setUserInput] = useState("");
  const componentApis = useComponentApis();

  const handleMouseEnter = () => setButtonVisible(true);
  const handleMouseLeave = () => setButtonVisible(false);
  const handleSendMessage = () => {
    if (userInput.trim()) {
      componentApis.takeAction(userInput)    

      // Handle message sending logic here
      console.log("Sending message:", userInput);
      setUserInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAskAssistant();
    }
  };

  return (
    <div className="fixed bottom-0 z-50 right-0 flex flex-col items-end justify-end w-screen pr-4 pb-4">
      <div className="flex items-center gap-3 flex-row border border-gray-400 w-1/2 absolute right-1/4 rounded-lg py-1 pl-4 pr-1">
        <input
          className="w-full bg-black text-white outline-none focus:outline-none border-transparent focus:border-transparent focus:ring-0"
          placeholder="Ask any question to the assistant!"
          onChange={(e) => setUserQuestion(e.target.value)}
          onKeyPress={handleKeyPress}
          value={userQuestion}
        />
        <Button variant="outline" color="primary" onClick={handleAskAssistant}>
          <Send />
        </Button>
      </div>
      {isAvatar && (
        <AnimatedAvatar
          isSpeaking={true}
          imageSrc={
            characterConfig[selectedCharacter as keyof typeof characterConfig]
              .image
          }
        />
      )}
      {isOpenMenu && (
        <Card className="w-max h-max mb-4 mr-4 bg-white">
          <CardHeader>
            <CardTitle>vTour</CardTitle>
            <Select onValueChange={(value) => setSelectedCharacter(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a character" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="yoda">Yoda</SelectItem>
                <SelectItem value="goku">Goku</SelectItem>
                <SelectItem value="scarlet">Scarlet Johansson</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <Image
              src={
                characterConfig[
                  selectedCharacter as keyof typeof characterConfig
                ].image
              }
              alt="vTour"
              width={320}
              height={400}
              className="object-cover rounded-md"
              style={{ objectFit: "cover" }}
            />
          </CardContent>
          <CardFooter className="flex justify-between w-full">
            <Button variant="ghost" className="flex flex-col items-center h-18">
              <HomeIcon />
              <span className="text-sm font-medium">Home</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center h-18">
              <MessagesSquareIcon />
              <span className="text-sm font-medium">Messages</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center h-18">
              <HelpCircleIcon />
              <span className="text-sm font-medium">Help</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center h-18">
              <SettingsIcon />
              <span className="text-sm font-medium">Settings</span>
            </Button>
          </CardFooter>
        </Card>
      )}
      <Button
        className="rounded-full w-10 h-10 transition-transform duration-200 hover:scale-110 hover:bg-white bg-white"
        onClick={toggleOpenMenu}
      >
        <AudioLines className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default VirtualAssistant;
