"use client";

import { Button } from "@/components/ui/button"

import ApiReadyComponent from "@/lib/api-ready-component";
import {useComponentApis} from "@/lib/component-api-provider";
import {useCallback, useState} from "react";

export default function Page() {
  const componentApis = useComponentApis();

  const [counter, setCounter] = useState<number>(0);
  const [docs, setDocs] = useState<string>('');
  const [inputValue, setInputValue] = useState("")

  const handleClick = () => {
    componentApis.takeAction(inputValue)
  }

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
          onPress={programmaticallyIncrementCounter}
        >
          <Button>
            Programmatically increment counter 5 times by executing instructions
          </Button>
        </ApiReadyComponent>

        <ApiReadyComponent
          id="api-description"
          docstring="Retrieve and show API descriptions"
          onPress={retrieveAndShowApiDescription}
        >
          <Button>
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
          <Button>
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
        <Button onClick={() => componentApis.goToComponent('increment-counter')}>
          Go To increment-counter
        </Button>
        <Button onClick={() => componentApis.goToComponent('increment-counter-by-5')}>
          Go To increment-counter-by-5
        </Button>
        <Button onClick={() => componentApis.goToComponent('api-description')}>
          Go To api-descriptions
        </Button>
      </div>

      {/* New Input Section */}
      <div className="mb-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border p-2 mr-2"
          placeholder="Enter action"
        />
        <Button onClick={handleClick}>
          Take Action
        </Button>
      </div>
    </div>
  );
}
