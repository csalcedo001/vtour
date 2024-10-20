"use client";
import { Menu, MessageSquareDotIcon, MessageSquareIcon, MessageSquareText} from 'lucide-react'
import Image from 'next/image';
import { motion } from "framer-motion";
import yoda from "@/app/yoda.jpg"
import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Avatar, Button } from "@nextui-org/react";
import { MessageSquare, Settings, HelpCircle } from 'lucide-react';

const messages = [
  {
    id: 1,
    sender: "Yoda",
    message: "Hi, How can I help you?",
    avatar: "/api/placeholder/48/48",
    time: "13h ago"
  },
  {
    id: 2,
    sender: "Goku",
    message: "Hi, How can I help you?",
    avatar: "/api/placeholder/48/48",
    time: "13h ago"
  },
  {
    id: 3,
    sender: "Yoda",
    message: "Hi, How can I help you?",
    avatar: "/api/placeholder/48/48",
    time: "13h ago"
  }
];

export function MessageInterface() {
  return (
    <Card className="w-[400px] h-[500px] rounded-xl">
      <CardHeader className="bg-black text-white font-medium p-3">
        Messages
      </CardHeader>
      
      <CardBody className="p-0 flex flex-col justify-between">
        <div className="flex-grow overflow-auto">
          {messages.map((msg) => (
            <Button
              key={msg.id}
              variant="light"
              className="w-full justify-start p-3 h-auto"
            >
              <div className="flex items-center gap-3">
                <Avatar
                  src={msg.avatar}
                  size="md"
                  className="flex-shrink-0"
                />
                <div className="flex flex-col items-start">
                  <p className="text-base">{msg.message}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">{msg.sender}</span>
                    <span className="text-gray-500">{msg.time}</span>
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </div>

        <div className="border-t border-gray-200 p-4">
          <div className="flex justify-around text-gray-600">
            <Button variant="light" className="flex flex-col items-center gap-1">
              <MessageSquare size={24} />
              <span>Messages</span>
            </Button>
            <Button variant="light" className="flex flex-col items-center gap-1">
              <HelpCircle size={24} />
              <span>Help</span>
            </Button>
            <Button variant="light" className="flex flex-col items-center gap-1">
              <Settings size={24} />
              <span>Settings</span>
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

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


const Page = () => {
    const [isButtonVisible, setButtonVisible] = useState(false);

    const handleMouseEnter = () => {
        setButtonVisible(true);
    };

    const handleMouseLeave = () => {
        setButtonVisible(false);
    };

    return (
        <div
            className='fixed bottom-5 right-5 flex flex-col items-end -space-y-4'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <MessageInterface/>
            <AnimatedAvatar
                imageSrc={yoda}
                isSpeaking={true}
                isHovered={isButtonVisible}
            />
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
                    className='rounded-full'
                    variant='faded'
                    isIconOnly
                >
                    <Menu className='text-gray-300' size={15} />
                </Button>
            </motion.div>
        </div>
    );
};

export default Page;