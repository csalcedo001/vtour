import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.aimlapi.com/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AIMLAPI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "flux/schnell",
        prompt,
        image_size: "landscape_4_3",
        num_inference_steps: 28,
        guidance_scale: 3.5,
        num_images: 1,
        safety_tolerance: "2",
      }),
    });

    const data = await response.json();

    console.log(`data: ${JSON.stringify(data)}`);

    const imageUrl = data.images[0].url;

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
