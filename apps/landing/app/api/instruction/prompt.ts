import { BaseMessage, SystemMessage, } from "@langchain/core/messages";

export interface Component {
  id: string;
  description: string;
}

export function getComponentFromInstructionPrompt(
  instruction: string,
  components: Component[],
): BaseMessage[]  {
  function formatQuery(instruction: string, components: Component[]) {
    const componentsStr = components.map((component, i) => 
      `<component-${i}>${component.description}</component-${i}>`
    ).join('\n')

    return `\
<instruction>
${instruction}
</instruction>

<components>
${componentsStr}
</components>`;
  }

  const query = formatQuery(instruction, components);

  const task = `\
You receive an instruction and a list of components. Your task is to read the \
instruction, evaluate which component best fits the instruction, and output \
the index of the corresponding component.

You are given the instruction and components enclosed in XML tags. \
Answer with the numeric index that corresponds to the component and \
NOTHIN ELSE.

${query}
`

  return [
    new SystemMessage(task),
  ]
}