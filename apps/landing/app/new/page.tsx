"use client";
import goku from "@/app/goku.png";
import scarlett from "@/app/scarlett.jpg";
import yoda from "@/app/yoda.jpg";
import { useTTS } from "@cartesia/cartesia-js/react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { motion } from "framer-motion";
import { Menu, Send } from 'lucide-react';
import Image from 'next/image';
import { useOnborda } from "onborda";
import OpenAI from "openai";
import { useEffect, useState } from 'react';
import { useComponentApis } from "../component-api-provider";
import { useGlobalSingleton } from "../global-singleton-provider";
import { generateImage } from "../utils";
const tools = [
  {
    name: "generate-images",
    description: "Generate images with AI using a prompt",
  },
  {
    name: "onboard-user",
    description: "Onboard a user to the platform",
  },
];

const SYSTEM_PROMPT = ({
  character,
}: {
  character: string;
}) => `You are a helpful assistant that talks like ${character} for the platform FotosAI which is an AI Photo Studio. After you answer the question, choose the tool that best answers the question and output the word json followed by the tool name and the arguments.

These are the tools:

${tools.map((tool) => `- ${tool.name}: ${tool.description}`).join("\n")}

Choose the tool that best answers the question and output the word json followed by the tool name and the arguments like this:

An example output in case the user said "generate an image of a truck":

answer Generate an image of a truck, you wish to? Done, it shall be.

json
{
  "tool": "generate-images",
  "args": {
    "prompt": "an image of a truck"
  }
}`;

const characterConfig = {
  yoda: {
    image: yoda,
    voiceId: "9121bf7e-1e22-4c06-a3dc-6ebd3d3bb1ec",
  },
  goku: {
    image: goku,
    voiceId: "bbe2c928-b008-43c0-801a-570dd6600cb3",
  },
  scarlet: {
    image: scarlett,
    voiceId: "a67088f1-27bb-4837-9a22-8a0c3b3a4208",
  },
};

const avatars = [
  {
    "name": "Yoda",
    "src": yoda,
    "voiceId": "9121bf7e-1e22-4c06-a3dc-6ebd3d3bb1ec"
  },
  {
    "name": "Goku",
    "src": goku,
    "voiceId": "bbe2c928-b008-43c0-801a-570dd6600cb3"
  },
  {
    "name": "Scarlett Johanson",
    "src": scarlett,
    "voiceId": "a67088f1-27bb-4837-9a22-8a0c3b3a4208"
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
const MenuSection = ({ selectedAvatar = "Yoda", setSelectedAvatar, selectedLanguage, setSelectedLanguage }: { selectedAvatar?: string, setSelectedAvatar: (avatar: string) => void, selectedLanguage: string, setSelectedLanguage: (language: string) => void }) => {
  return (
    <div className="w-[400px] min-h-[200px] bg-white rounded-xl mb-5 shadow-2xl">
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
            defaultSelectedKeys={[selectedAvatar]}
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

      {/* Language selection */}
      {/* <div className="light px-10 flex flex-col gap-5">
        <Select
          label="Select language"
          className="max-w-lg light"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          <SelectItem key="English" value="English">English</SelectItem>
          <SelectItem key="Spanish" value="Spanish">Spanish</SelectItem>
          <SelectItem key="Mandarin" value="Mandarin">Mandarin</SelectItem>
        </Select>
      </div> */}
      {/* <div className="px-10 my-5">
        <Switch className="text-black">
          Voice mode
        </Switch>
      </div> */}
    </div>
  );
};

const VirtualAssistant = () => {
  const [isButtonVisible, setButtonVisible] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState("Yoda");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isOnboarding, setIsOnboarding] = useState(true);
  const [tool, setTool] = useState("");
  const [userInput, setUserInput] = useState("");
  const { getComponentApiDescription } = useComponentApis();

  const { startOnborda } = useOnborda();
  const globalSingleton = useGlobalSingleton();
  useEffect(() => {
    const handleToolEffect = async () => {
      if (tool === "") return;
      if (tool === "onboard-user") {
        const timer = setTimeout(() => {
          handleStartOnborda();
        }, 1000);
        setTool("");
        return () => clearTimeout(timer);
      } else if (tool === "generate-images") {
        console.log("tool called generateImage");
        const img_url = await generateImage(globalSingleton.getImagePrompt());
        globalSingleton.setImageUrl(img_url);
      }
      setTool("");
    };
    console.log(`effecttool: ${tool}`);
    handleToolEffect();
  }, [tool]);

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || "",
    dangerouslyAllowBrowser: true,
  });

  const tts = useTTS({
    apiKey: process.env.NEXT_PUBLIC_CARTESIA_API_KEY || "",
    sampleRate: 44100,
  });


  const handleStartOnborda = () => {
    console.log("startOnborda");
    // startOnborda("tour1");
  };

  const handleMouseEnter = () => {
    setButtonVisible(true);
  };

  const handleMouseLeave = () => {
    setButtonVisible(false);
  };

  const handleSendMessage = () => {
    if (userInput.trim()) {
      // Handle message sending logic here
      console.log("Sending message:", userInput);
      setUserInput("");
      setIsOnboarding(false);
    }
  };

  
  const askAssistant = async (prompt: string) => {
    // Input validation
    if (!prompt?.trim()) {
      return {
        answer: "",
        error: new Error("Prompt cannot be empty"),
      };
    }

    console.log(
      `selectedCharacter: ${SYSTEM_PROMPT({
        character: selectedAvatar,
      })}`
    );
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-2024-08-06",
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT({
              character: selectedAvatar,
            }),
          },
          {
            role: "user",
            content: prompt.trim(),
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });

      const answer = completion.choices[0]?.message?.content || "";
      console.log("answer", answer);

      // Safely split the answer into text and JSON parts
      let textAnswer = answer;
      let jsonAnswer = "";

      const jsonIndex = answer.lastIndexOf("json");
      if (jsonIndex !== -1) {
        textAnswer = answer.slice(0, jsonIndex).trim();
        jsonAnswer = answer.slice(jsonIndex + 4).trim();
      }

      // Validate JSON if present
      const parsedJson = JSON.parse(jsonAnswer);
      if (jsonAnswer) {
        try {
          if (jsonAnswer.includes("onboard-user")) {
            setTool("onboard-user");
          } else if (jsonAnswer.includes("generate-images")) {
            globalSingleton.setImagePrompt(parsedJson.args.prompt);

            setTool("generate-images");
          }
        } catch (error) {
          console.warn("Failed to parse JSON from answer:", error);
        }
      }

      await handlePlay({ text: textAnswer });
    } catch (error) {
      // Proper error handling
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Error in askAssistant:", errorMessage);

      return {
        answer: "",
        error: error instanceof Error ? error : new Error(errorMessage),
      };
    }
  };

  const toggleOpenMenu = () => {
    if (isMenuVisible) {
      setIsMenuVisible(false);
    } else {
      setIsMenuVisible(true);
    }
  };

  const handleAskAssistant = async () => {
    if (userInput.trim()) {
      const question = userInput;
      setUserInput(""); // Clear the question after asking
      await askAssistant(question);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAskAssistant();
    }
  };

  const handlePlay = async ({ text }: { text: string }) => {
    // Begin buffering the audio.
    const response = await tts.buffer({
      model_id: "sonic-english",
      voice: {
        mode: "id",
        id: characterConfig[selectedAvatar as keyof typeof characterConfig]
          .voiceId,
      },
      transcript: text,
    });

    // Immediately play the audio. (You can also buffer in advance and play later.)
    await tts.play();
  };



  return (
    <div className='relative w-full h-full dark'>
        <div>
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
                <Send strokeWidth={1.5} />
              </Button>
            }
          />
        </div>
      <div
        className='fixed bottom-5 right-5 flex flex-col items-end -space-y-4'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {
          isMenuVisible ? (
            <MenuSection
              selectedAvatar={selectedAvatar}
              setSelectedAvatar={setSelectedAvatar}
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
            />
          ) : (
            <AnimatedAvatar
              imageSrc={avatars.find(a => a.name === selectedAvatar)?.src || avatars[0].src}
              isSpeaking={true}
              isHovered={isButtonVisible}
            />
          )
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

const Page = () => {
  return (
    <div className='min-h-screen w-full bg-white'>
      <h1 className="text-3xl font-bold text-center py-8">Welcome to Virtual Assistant</h1>
      <VirtualAssistant />
    </div>
  );
};

export default Page;
