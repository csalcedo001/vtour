"use client";
import goku from "@/app/goku.png";
import scarlett from "@/app/scarlett.jpg";
import yoda from "@/app/yoda.jpg";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { motion } from "framer-motion";
import { Menu, SearchIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const avatars = [
  {
    "name": "Yoda",
    "src": yoda
  },
  {
    "name": "Goku",
    "src": goku
  },
  {
    "name": "Scarlett Johanson",
    "src": scarlett
  }
]

export function AnimatedAvatar({
  isSpeaking = false,
  imageSrc,
  isHovered,
}: {
  isSpeaking: boolean;
  imageSrc: any;
  isHovered: boolean;
}) {
  return (
    <motion.div
      className=""
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
}


// Menu section component
const MenuSection = () => {
  const [selectedAvatar, setSelectedAvatar] = useState("Goku");
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  return (
    <div className="w-[400px] h-[300px] bg-white rounded-xl mb-5 shadow-2xl">
      {/* Header */}
      <div className="bg-black flex items-center justify-center py-4 rounded-t-xl">
        <h3 className="text-xl font-medium text-white">Settings</h3>
      </div>

      {/* Avatar selection */}
      <div className="light px-10 py-8 flex gap-5">
        <div>
          <Image src={avatars.find(a => a.name === selectedAvatar)?.src || avatars[0].src} alt="avatar" className="h-20 w-20 rounded-full" />
        </div>
        <div className="flex-grow">
          <Select
            label="Select an avatar"
            className="max-w-lg light"
            value={selectedAvatar}
            onChange={(value) => setSelectedAvatar(value.target.value)}
          >
            {avatars.map((avatar) => (
              <SelectItem key={avatar.name} value={avatar.name}>
                {avatar.name}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      {/* Language selection */}
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
    </div>
  );
};

const Page = () => {
  const [isButtonVisible, setButtonVisible] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleMouseEnter = () => {
    setButtonVisible(true);
  };

  const handleMouseLeave = () => {
    setButtonVisible(false);
  };

  return (
    <div className='min-h-screen w-full bg-white'>
        <Input
          className="light hidden md:flex absolute bottom-0 left-1/3 mb-3"
          classNames={{
            base: "max-w-full sm:max-w-[40rem] h-10",
            mainWrapper: "h-full",
            input: "text-small focus:outline-none border-transparent focus:border-transparent focus:ring-0",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Set your prompt here..."
          size="sm"
          variant="faded"
          isClearable={false}
          type="search"
        />
      <div
        className='fixed bottom-5 right-5 flex flex-col items-end -space-y-4'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {
          isMenuVisible ? <MenuSection /> : <AnimatedAvatar
            imageSrc={yoda}
            isSpeaking={true}
            isHovered={isButtonVisible}
          />
        }
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isButtonVisible ? 1 : 0,
            scale: isButtonVisible ? 1 : 0.8,
            y: isButtonVisible ? 0 : 20
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut"
          }}
        >
          <Button
            onClick={() => { setIsMenuVisible(!isMenuVisible) }}

            className='rounded-full bg-gray-200'
            variant="solid"
            isIconOnly
          >
            <Menu className='text-black' size={15} />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Page;
