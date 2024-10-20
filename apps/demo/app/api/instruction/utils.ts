import { ChatOpenAI } from "@langchain/openai";
import { 
  getComponentFromInstructionPrompt,
  Component,
} from './prompt'



// const structuredOutputModel = new ChatOpenAI({
//   model: 'gpt-4o-2024-08-06',
//   temperature: 0.3,
// });

const chatModel = new ChatOpenAI({
  model: 'gpt-4o',
  temperature: 0,
});

export async function getComponentFromInstruction(title: string, components: Component[]): Promise<string> {
  const prompt = getComponentFromInstructionPrompt(title, components);
  console.info('getComponentFromInstructionPrompt: prompt', prompt);

  const maxTries = 3;
  let componentIndex: number | undefined;

  for (let attempt = 0; attempt < maxTries; attempt++) {
    const aiMessage = await chatModel.invoke(prompt);
    const answer = aiMessage.content as string;

    console.log('answer:', answer);

    // Attempt to parse the answer as a number
    const index = parseInt(answer, 10);

    // Validate that the index is a valid number and within the range of components
    if (!isNaN(index) && index >= 0 && index < components.length) {
      componentIndex = index;
      break;
    } else {
      console.error(`Attempt ${attempt + 1}: Invalid index received:`, answer);
    }
  }

  if (componentIndex !== undefined) {
    return components[componentIndex].id;
  } else {
    throw new Error('Failed to determine a valid component index from the instruction.');
  }
}