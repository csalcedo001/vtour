import {createContext, useContext, useRef, useCallback, ReactNode} from 'react';

interface ComponentApiContextType {
  registerComponent: (id: string, docstring: string, onPress: () => void, ref: React.RefObject<HTMLDivElement>) => void; // Updated signature
  unregisterComponent: (id: string) => void;
  clickComponent: (id: string) => void;
  getComponentApiDescription: () => { [key: string]: string };
  goToComponent: (id: string) => void; // Ensure this is included

  /**
   * Executes an instruction.
   *
   * This is analogous to "running one line of code".
   *
   * An instruction can press call some function on some component, for example.
   *
   * The ISA here follows RISC design in spirit;
   * each instruction can only call one API function in one component under the hood.
   *
   * Each instruction has a string return value (i.e., "destination register content").
   *
   * (Right now can only call the `onPress` callback)
   *
   * An instruction follows the following syntax:
   * <id-of-the-component-on-which-to-invoke-the-onPress-callback>
   *
   * For example:
   *
   * ```asm
   * counter-incrementer
   * ```
   *
   * This type of instruction always returns "".
   * @param instruction
   */
  executeInstruction: (instruction: string) => string;
}

const ComponentApiContext = createContext<ComponentApiContextType | undefined>(undefined);

export function ComponentApiProvider({children}: { children: ReactNode }) {
  const componentsRef = useRef<Record<string, { docstring: string, callback: () => void, ref: React.RefObject<HTMLDivElement> }>>({});

  // Function to register a component
  const registerComponent = useCallback((id: string, docstring: string, onPress: () => void, ref: React.RefObject<HTMLDivElement>) => {
    componentsRef.current[id] = {
      docstring: docstring,
      callback: onPress,
      ref: ref
    }
  }, []);

  // Function to unregister a component
  const unregisterComponent = useCallback((id: string) => {
    delete componentsRef.current[id];
  }, []);

  // Function to click a registered component
  const clickComponent = useCallback((id: string) => {
    if (componentsRef.current[id]) {
      componentsRef.current[id].callback(); // Call the onPress function of the component
    }
  }, []);

  const getComponentApiDescription = useCallback(() => {
    const documentation: { [key: string]: string } = {};

    for (const key of Object.keys(componentsRef.current)) {
      documentation[key] = componentsRef.current[key].docstring;
    }

    return documentation;
  }, []);

  const goToComponent = useCallback((id: string) => {
    if (componentsRef.current[id] && componentsRef.current[id].ref.current) {
      componentsRef.current[id].ref.current.focus();
    }
  }, []);

  // instruction parsing and execution logic
  const executeInstruction = useCallback((instruction: string) => {
    instruction = instruction.trim();

    const componentId = instruction;

    componentsRef.current[componentId].callback();

    return "";
  }, []);

  return (
    <ComponentApiContext.Provider
    value={{
      registerComponent,
      unregisterComponent,
      clickComponent,
      getComponentApiDescription,
      executeInstruction,
      goToComponent, // Include the new function in the context value
    }}>
      {children}
    </ComponentApiContext.Provider>
  );
}

export function useComponentApis(): ComponentApiContextType {
  const context = useContext(ComponentApiContext);
  if (!context) {
    throw new Error('useComponentApis must be used within a ComponentApiProvider');
  }
  return context;
}
