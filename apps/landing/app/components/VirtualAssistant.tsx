"use client";
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Send, Menu, AudioLines } from 'lucide-react';
import { Button, Input, Select, SelectItem, Switch } from "@nextui-org/react";
import goku from "@/app/goku.png";
import scarlett from "@/app/scarlett.jpg";
import yoda from "@/app/yoda.jpg";
import {useComponentApis} from "@/app/component-api-provider";

// Define avatar configurations
const avatars = [
  {
    name: "Yoda",
    src: yoda,
    voiceId: "9121bf7e-1e22-4c06-a3dc-6ebd3d3bb1ec"
  },
  {
    name: "Goku",
    src: goku,
    voiceId: "bbe2c928-b008-43c0-801a-570dd6600cb3"
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
      className="relative"
      animate={
        isHovered
          ? {
            y: -20,
            transition: { duration: 0.3 }
          }
          : {
            y: 0,
            transition: { duration: 0.3 }
          }
      }
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={isSpeaking ? "speaking" : "idle"}
        variants={{
          speaking: {
            boxShadow: [
              "0 0 10px 2px rgba(255, 255, 255, 0.3)",
              "0 0 20px 4px rgba(255, 255, 255, 0.3)",
              "0 0 10px 2px rgba(255, 255, 255, 0.3)",
            ],
            transition: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          },
          idle: {
            boxShadow: "0 0 0px 0px rgba(255, 255, 255, 0)"
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
};

const MenuSection: React.FC = () => {
  const [selectedAvatar, setSelectedAvatar] = useState("Yoda");
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  return (
    <div className="w-[400px] min-h-[300px] bg-white rounded-xl mb-5 shadow-2xl">
      <div className="bg-black flex items-center justify-center py-4 rounded-t-xl">
        <h3 className="text-xl font-medium text-white">Settings</h3>
      </div>
      <div className="light px-10 py-8 flex gap-5">
        <div>
          <Image src={avatars.find(a => a.name === selectedAvatar)?.src || avatars[0].src} alt="avatar" className="h-20 w-20 rounded-full" />
        </div>
        <div className="flex-grow">
          <Select
            label="Select an avatar"
            className="max-w-lg light"
            value={selectedAvatar}
            onChange={(e) => setSelectedAvatar(e.target.value)}
          >
            {avatars.map((avatar) => (
              <SelectItem key={avatar.name} value={avatar.name}>
                {avatar.name}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <div className="light px-10 flex flex-col gap-5">
        <Select
          label="Select language"
          className="max-w-lg light"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          <SelectItem key="Spanish" value="Spanish">Spanish</SelectItem>
          <SelectItem key="English" value="English">English</SelectItem>
          <SelectItem key="Mandarin" value="Mandarin">Mandarin</SelectItem>
        </Select>
      </div>
      <div className="px-10 my-5">
        <Switch className="text-black">
          Voice mode
        </Switch>
      </div>
    </div>
  );
};

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
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-0 right-0 flex flex-col items-end justify-end w-screen pr-4 pb-4">
      <Input
        className="light hidden md:flex absolute bottom-0 left-1/3 mb-3"
        classNames={{
          base: "max-w-full sm:max-w-[40rem] h-12",
          mainWrapper: "h-full",
          input: "text-small focus:outline-none border-transparent focus:border-transparent focus:ring-0",
          inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
        }}
        placeholder="Set your prompt here..."
        size="sm"
        variant="flat"
        isClearable={false}
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyPress={handleKeyPress}
        endContent={
          <Button isIconOnly variant="solid" color="default" onClick={handleSendMessage}>
            <Send strokeWidth={1.5}/>
          </Button>
        }
      />
      
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isMenuVisible ? (
          <MenuSection />
        ) : (
          <AnimatedAvatar
            imageSrc={avatars.find(a => a.name === selectedAvatar)?.src || avatars[0].src}
            isSpeaking={true}
            isHovered={isButtonVisible}
          />
        )}
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isButtonVisible ? 1 : 0,
            scale: isButtonVisible ? 1 : 0.8,
            y: isButtonVisible ? 0 : 20
          }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 right-0 transform translate-y-full mt-2"
        >
          <Button
            onClick={() => setIsMenuVisible(!isMenuVisible)}
            className="rounded-full bg-gray-200"
            isIconOnly
          >
            {isMenuVisible ? <AudioLines className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default VirtualAssistant;
