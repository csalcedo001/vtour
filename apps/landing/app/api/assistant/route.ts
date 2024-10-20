import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

export async function POST(req: NextRequest) {
  const { prompt, selectedAvatar } = await req.json();
  try {
    const chatCompletion = await openai.chat.completions.create({
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
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return NextResponse.json({
      data: chatCompletion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error:", error);
  }
}
