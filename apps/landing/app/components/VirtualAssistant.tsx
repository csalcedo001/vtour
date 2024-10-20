"use client";
import { useState } from "react";
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
import OpenAI from "openai";

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
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant. For onboarding a user to a new platform. Keep your answers short and concise.",
          },
          {
            role: "user",
            content: prompt.trim(),
          },
        ],
        temperature: 0.7,
        max_tokens: 300,
      });

      const answer = completion.choices[0]?.message?.content || "";
      console.log("answer", answer);
      await handlePlay({ text: answer });
      return {
        answer,
      };
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
        id: "a0e99841-438c-4a64-b679-ae501e7d6091",
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

  return (
    <div className="fixed bottom-0 z-50 right-0 flex flex-col items-end justify-end w-screen pr-4 pb-4">
      <div className="flex flex-row border border-gray-400 w-1/2 absolute right-1/4 rounded-lg py-1 pl-4 pr-1">
        <input
          className="w-full outline-none"
          placeholder="Ask any question to the assistant!"
          onChange={(e) => setUserQuestion(e.target.value)}
        />
        <Button onClick={() => askAssistant(userQuestion)}>
          <Send />
        </Button>
      </div>
      {isAvatar && <AnimatedAvatar isSpeaking={true} imageSrc={yoda} />}
      {isOpenMenu && (
        <Card className="w-max h-max mb-4 mr-4">
          <CardHeader>
            <CardTitle>vTour</CardTitle>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yoda">Yoda</SelectItem>
                <SelectItem value="goku">Goku</SelectItem>
                <SelectItem value="scarlet">Scarlet Johanson</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <Image
              // src={"https://cdn.prod.website-files.com/63b2f566abde4cad39ba419f%2F66bc17f4f868bc9ce77ddf71_Option-1-Website-Main-Demo-Carter-Silent-poster-00001.jpg"}
              src={yoda}
              alt="vTour"
              width={320} // 20% cut from 400
              height={400}
              className="object-cover rounded-md"
              style={{ objectFit: "cover" }} // Ensuring object cover is applied
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
        className="rounded-full w-10 h-10 transition-transform duration-200 hover:scale-110"
        onClick={toggleOpenMenu}
      >
        <AudioLines className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default VirtualAssistant;
