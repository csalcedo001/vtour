"use client";
import { Button, Switch } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { ChevronDown, Copy, Home, ImageIcon, MessageSquare, Settings, Users, Video } from "lucide-react";
import { Link } from "@nextui-org/react";
import goku from "@/app/goku.png";
import scarlett from "@/app/scarlett.jpg";
import yoda from "@/app/yoda.jpg";
import { motion } from "framer-motion";
import { Menu, SearchIcon, Send } from 'lucide-react';
import Image from 'next/image';
import { useState } from "react";
export default function Component() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isButtonVisible, setButtonVisible] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
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

  const AnimatedAvatar = ({
    isSpeaking = false,
    imageSrc,
    isHovered,
  }: {
    isSpeaking: boolean;
    imageSrc: any;
    isHovered: boolean;
  }) => {
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
      <div className="w-[400px] min-h-[300px] bg-white rounded-xl mb-5 shadow-2xl z-30">
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
        <div className="px-10 my-5">
          <Switch className="text-black">
            Voice mode
          </Switch>
        </div>
      </div>
    );
  };

  const handleMouseEnter = () => {
    setButtonVisible(true);
  };

  const handleMouseLeave = () => {
    setButtonVisible(false);
  };
  return (
    <div className="flex h-screen bg-gray-50 light">
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
      {/* Sidebar */}
      <div className="w-16 bg-white p-3 flex flex-col items-center space-y-4 border-r border-gray-200">
        <Button isIconOnly variant="light" className="rounded-full">
          <Home className="h-6 w-6 text-gray-500" />
        </Button>
        <Button isIconOnly variant="light" className="rounded-full bg-pink-100">
          <Video className="h-6 w-6 text-pink-500" />
        </Button>
        <Button isIconOnly variant="light" className="rounded-full">
          <ImageIcon className="h-6 w-6 text-gray-500" />
        </Button>
        <Button isIconOnly variant="light" className="rounded-full">
          <MessageSquare className="h-6 w-6 text-gray-500" />
        </Button>
        <Button isIconOnly variant="light" className="rounded-full">
          <Users className="h-6 w-6 text-gray-500" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-semibold text-gray-800">Video Generation</h1>
            <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">POST</span>
            <span className="text-sm text-gray-500">/v2/videos</span>
          </div>
          <Button variant="bordered" className="text-gray-600">Read Docs</Button>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Input Section */}
          <Card>
            <CardBody className="p-6">
              <h2 className="mb-4 text-sm font-medium text-gray-500">Input</h2>
              <div className="space-y-4">
                <Select 
                  placeholder="Nathan - Conference Room (default)"
                  className="w-full"
                >
                  <SelectItem value="nathan" key={"nathan"}>Nathan - Conference Room (default)</SelectItem>
                </Select>
                <div className="flex space-x-2">
                  <Button variant="bordered" className="flex-1 bg-white border-gray-300 text-gray-700 font-normal">
                    <Copy className="mr-2 h-4 w-4" />
                    Script to Video
                  </Button>
                  <Button variant="bordered" className="flex-1 bg-white border-gray-300 text-gray-400 font-normal">
                    Audio to Video
                  </Button>
                </div>
                <Textarea 
                  placeholder="Type your text here" 
                  minRows={4}
                  className="min-h-[200px]"
                />
                <div className="flex items-center justify-between">
                  <Button variant="light" className="px-0 text-gray-600">
                    Additional Settings
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                  <Button color="primary" className="bg-pink-500 hover:bg-pink-600">
                    Generate →
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Preview Section */}
          <Card>
            <CardBody className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-medium text-gray-500">Preview</h2>
                <Tabs 
                  aria-label="Preview options"
                  className="w-auto"
                  defaultSelectedKey="video"
                >
                  <Tab key="video" title="Video" />
                  <Tab key="code" title="Code" />
                </Tabs>
              </div>
              <div className="aspect-video bg-gray-100 mb-4 rounded-lg overflow-hidden relative">
                <img
                  src="/api/placeholder/400/320"
                  alt="Video preview"
                  className="w-full h-full object-cover"
                />
                <div className="bg-black bg-opacity-50 text-white text-sm p-2 absolute bottom-0 left-0 right-0">
                  In preview mode, sound and face animations are off
                </div>
              </div>
              <h3 className="font-medium text-sm mb-2 text-gray-700">Generated Videos</h3>
              <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500 border border-gray-200">
                <Video className="mx-auto h-8 w-8 mb-2 text-gray-400" />
                <p className="text-sm">Your generated videos will appear here</p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}