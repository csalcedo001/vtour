import { NextRequest, NextResponse } from 'next/server';
import { getComponentFromInstruction } from './utils'; // Import the new function

export async function POST(req: NextRequest) {
  const { instruction, components } = await req.json(); // Update to match the new request structure

  try {
    const componentId = await getComponentFromInstruction(instruction, components); // Call the new function
    console.log('POST /api/instruction: componentId', componentId);
    return new NextResponse(JSON.stringify({
      componentId: componentId, // Return the component ID
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}