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
import goku from "@/app/goku.jpg";
import scarlet from "@/app/scarlett.jpg";
import OpenAI from "openai";
import { useOnborda } from "onborda";
import {useGlobalSingleton} from "@/app/global-singleton-provider";
import {Input} from "@nextui-org/react";

const AIMLAPI_API_KEY = "d6f3a75d17774b748a1945adf772c472";

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

//  You can create a Model and with it generate images based on a prompt. Like a photographer.
// Always keep your answers short and concise. You have the following tools at hand always use the most appropriate one:

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
    image: scarlet,
    voiceId: "a67088f1-27bb-4837-9a22-8a0c3b3a4208",
  },
};

export function AnimatedAvatar({
  isSpeaking = false,
  imageSrc,
}: {
  isSpeaking: boolean;
  imageSrc: any;
}) {
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

// interface VirtualAssistantProps {
//   // openAIApiKey: string;
//   // ttsApiKey: string;
//   // avatarImage: any;
// }

const VirtualAssistant: React.FC = (
  {
    // openAIApiKey,
    // ttsApiKey,
    // avatarImage,
  }
) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isAvatar, setIsAvatar] = useState(true);
  const [userQuestion, setUserQuestion] = useState<string>("");
  const [tool, setTool] = useState<string>("");
  const [selectedCharacter, setSelectedCharacter] = useState("yoda");

  const { startOnborda } = useOnborda();

  const handleStartOnborda = () => {
    console.log("startOnborda");
    startOnborda("tour1");
  };

  const globalSingleton = useGlobalSingleton();

  const generateImage = async () => {
    const response = await fetch("https://api.aimlapi.com/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AIMLAPI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "flux/schnell",
        prompt: globalSingleton.getImagePrompt(),
        image_size: "landscape_4_3",
        num_inference_steps: 28,
        guidance_scale: 3.5,
        num_images: 1,
        safety_tolerance: "2",
      }),
    });

    console.log(`token: ${process.env.AIMLAPI_API_KEY}`)

    const data = await response.json();

    console.log(`data: ${JSON.stringify(data)}`);

    const imageUrl = data.images[0].url;

    globalSingleton.setImageUrl(imageUrl);
  }

  useEffect(() => {
    if (tool === "onboard-user") {
      const timer = setTimeout(() => {
        handleStartOnborda();
      }, 1000);

      return () => clearTimeout(timer);
    } else if (tool === "generate-images") {
      void generateImage();
    }
  }, [tool]);

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || "",
    dangerouslyAllowBrowser: true,
  });

  const tts = useTTS({
    apiKey: process.env.NEXT_PUBLIC_CARTESIA_API_KEY || "",
    sampleRate: 44100,
  });

  const askAssistant = async (prompt: string): Promise<ChatResponse> => {
    // Input validation
    if (!prompt?.trim()) {
      return {
        answer: "",
        error: new Error("Prompt cannot be empty"),
      };
    }

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-2024-08-06",
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT({
              character: selectedCharacter,
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

  const handlePlay = async ({ text }: { text: string }) => {
    // Begin buffering the audio.
    const response = await tts.buffer({
      model_id: "sonic-english",
      voice: {
        mode: "id",
        id: characterConfig[selectedCharacter as keyof typeof characterConfig]
          .voiceId,
      },
      transcript: text,
    });

    // Immediately play the audio. (You can also buffer in advance and play later.)
    await tts.play();
  };

  const toggleOpenMenu = () => {
    if (isAvatar) {
      setIsAvatar(false);
      setIsOpenMenu(true);
    } else {
      setIsOpenMenu(false);
      setIsAvatar(true);
    }
  };

  interface ChatResponse {
    answer: string;
    error?: Error;
  }

  const handleAskAssistant = async () => {
    if (userQuestion.trim()) {
      const question = userQuestion;
      setUserQuestion(""); // Clear the question after asking
      await askAssistant(question);
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
        <Input
          className="w-full outline-none"
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
