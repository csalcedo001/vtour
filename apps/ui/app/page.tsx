"use client";

import {Button} from "@nextui-org/react";

import ApiReadyComponent from "@/src/api-ready-component";
import {useComponentApis} from "@/src/component-api-provider";
import {useCallback, useState} from "react";

export default function Page() {
  const componentApis = useComponentApis();

  const [counter, setCounter] = useState<number>(0);
  const [docs, setDocs] = useState<string>('');

  const instructions = `increment-counter
increment-counter
increment-counter
increment-counter
increment-counter`

  const incrementCounter = useCallback(() => {
    setCounter((prevCounter) => prevCounter + 1);
  }, []);

  async function programmaticallyIncrementCounter() {
    const instructionList = instructions.split("\n");

    for (const instruction of instructionList) {
      componentApis.executeInstruction(instruction);

      await new Promise(resolve => setTimeout(resolve, 200));

    }
  }

  async function retrieveAndShowApiDescription() {
    const documentation = componentApis.getComponentApiDescription();

    setDocs(JSON.stringify(documentation));
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex flex-row justify-center items-center space-x-4">
        <ApiReadyComponent
          id="increment-counter-by-5"
          docstring="Programatically increments counter by 5"
          onPress={incrementCounter}
        >
          <Button onPress={programmaticallyIncrementCounter}>
            Programmatically increment counter 5 times by executing instructions
          </Button>
        </ApiReadyComponent>

        <ApiReadyComponent
          id="api-description"
          docstring="Retrieve and show API descriptions"
          onPress={incrementCounter}
        >
          <Button onPress={retrieveAndShowApiDescription}>
            Retrieve and show API descriptions
          </Button>
        </ApiReadyComponent>
      </div>
      <div className="flex flex-row justify-center items-center space-x-4">
        <ApiReadyComponent
          id="increment-counter"
          docstring="Increments the counter by 1"
          onPress={incrementCounter}
        >
          <Button onPress={incrementCounter}>
            Increment Counter
          </Button>
        </ApiReadyComponent>
        <p className="text-large">{counter}</p>
      </div>
      <div className="flex flex-col space-y-2">
        <p className="text-lg">AI Accessible Component API Documentation</p>
        {
          docs && <p>{docs}</p>
        }
      </div>

      <div className='flex flex-row gap-3'>
        <Button onPress={() => componentApis.goToComponent('increment-counter')}>
          Go To increment-counter
        </Button>
        <Button onPress={() => componentApis.goToComponent('increment-counter-by-5')}>
          Go To increment-counter-by-5
        </Button>
        <Button onPress={() => componentApis.goToComponent('api-description')}>
          Go To api-descriptions
        </Button>
      </div>
    </div>
  );
}
