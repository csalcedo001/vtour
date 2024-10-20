"use client";
import { Button, Card, CardBody } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import { Video, Users, MessageSquare, Key, Home, PlayCircle, Folder, UserPlus, Library, User, Settings, HelpCircle, SidebarIcon } from "lucide-react";
import goku from "@/app/goku.png";
import scarlett from "@/app/scarlett.jpg";
import yoda from "@/app/yoda.jpg";
import { Input, Select, SelectItem, Switch } from "@nextui-org/react";
import { motion } from "framer-motion";
import { Menu, SearchIcon, Send } from 'lucide-react';
import Image from 'next/image';
import { useState } from "react";

export default function Dashboard() {
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
    <div className="flex h-screen bg-gray-100 light text-black">
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
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-white shadow-md transition-all duration-300 overflow-hidden relative flex flex-col`}>
        <div className="p-4">
          <h1 className="text-2xl font-bold text-purple-600">tavus</h1>
        </div>
        <nav className="mt-6 flex-grow">
          <SidebarSection title="Home" icon={Home} active />
          <SidebarSection title="VIDEO">
              <SidebarItem icon={PlayCircle} label="Video Generation"/>
            <SidebarItem icon={Folder} label="Video Library" />
          </SidebarSection>
          <SidebarSection title="REPLICA">
            <SidebarItem icon={UserPlus} label="Replica Generation" />
            <SidebarItem icon={Library} label="Replica Library" />
          </SidebarSection>
          <SidebarSection title="CONVERSATION">
            <SidebarItem icon={MessageSquare} label="Create Conversation" />
            <SidebarItem icon={Folder} label="Conversation Library" />
            <SidebarItem icon={User} label="Persona Library" />
          </SidebarSection>
          <SidebarItem icon={Key} label="API Keys" />
        </nav>
        <div className={`${sidebarOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 p-4 border-t`}>
          <Button
            variant="bordered"
            className="w-full justify-start"
            startContent={<Settings className="h-4 w-4" />}
          >
            Upgrade Plan
          </Button>
          <Button
            variant="light"
            className="w-full justify-start mt-2"
            startContent={<HelpCircle className="h-4 w-4" />}
          >
            Support
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {/* Toggle Button */}
        <Button
          variant="light"
          isIconOnly
          className="m-4"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <SidebarIcon className="h-6 w-6" />
        </Button>

        <div className="p-8">
          {/* Banner */}
          <div className="bg-gradient-to-r from-purple-700 to-pink-500 rounded-lg p-6 text-white mb-6">
            <span className="bg-pink-600 text-xs font-semibold px-2 py-1 rounded-full">New Product</span>
            <h1 className="text-3xl font-bold mt-2">Introducing Conversational Video</h1>
            <p className="mt-2 mb-4">You can now build live conversational experiences, with real-time digital twins that speak, see, & hear.</p>
            <Button color="secondary">Create New Conversation</Button>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { title: "Create Video", description: "Generate a video with a replica", icon: Video, color: "text-pink-500" },
              { title: "Create Replica", description: "Clone yourself in minutes", icon: Users, color: "text-orange-500" },
              { title: "Create Conversation", description: "Talk with a replica in real-time", icon: MessageSquare, color: "text-purple-500" },
              { title: "Create API Key", description: "Start building with an API Key", icon: Key, color: "text-blue-500" },
            ].map((item, index) => (
              <Card key={index} isPressable>
                <CardBody className="flex flex-col items-start p-4">
                  <item.icon className={`${item.color} w-8 h-8 mb-2`} />
                  <h3 className="font-semibold">{item.title} →</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>

          {/* Stock Replicas */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Try stock replica</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "Nathan", context: "Conference Room" },
                { name: "Anna", context: "" },
                { name: "Jackie", context: "" },
                { name: "Laura", context: "Pink" },
              ].map((replica, index) => (
                <Card key={index} isPressable>
                  <CardBody className="p-4">
                    <div className="bg-gray-200 h-40 rounded-md mb-2"></div>
                    <h3 className="font-semibold">{replica.name}{replica.context && ` - ${replica.context}`}</h3>
                    <Link className="text-pink-500 cursor-pointer">Create →</Link>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function SidebarSection({ title, children, icon: Icon, active }: { title: string; children?: React.ReactNode; icon?: React.ComponentType<any>; active?: boolean }) {
  return (
    <div className="mb-4">
      {Icon ? (
        <SidebarItem icon={Icon} label={title} active={active} />
      ) : (
        <h2 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</h2>
      )}
      {children}
    </div>
  )
}

function SidebarItem({ icon: Icon, label, active }: { icon: React.ComponentType<any>; label: string; active?: boolean }) {
  return (
    <Button
      as="a"
      href="#"
      variant={active ? "flat" : "light"}
      className={`w-full justify-start rounded-none ${active ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-gray-100'
        }`}
      startContent={Icon && <Icon className="h-5 w-5" />}
    >
      {label}
    </Button>
  )
}