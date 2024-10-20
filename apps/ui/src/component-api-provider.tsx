import { createContext, useContext, useRef, useCallback, ReactNode } from 'react';

interface ComponentApiContextType {
  registerComponent: (id: string, docstring: string, onPress: () => void) => void;
  clickComponent: (id: string) => void;
  getComponentApiDescription: () => { [key: string]: string };
}

const ComponentApiContext = createContext<ComponentApiContextType | undefined>(undefined);

export function ComponentApiProvider({ children }: { children: ReactNode }) {
  const componentsRef = useRef<Record<string, { docstring: string, callback: () => void}>>({});

  // Function to register a component
  const registerComponent = useCallback((id: string, docstring: string, onPress: () => void) => {
    componentsRef.current[id] = {
      docstring: docstring,
      callback: onPress,
    }
  }, []);

  // Function to click a registered component
  const clickComponent = useCallback((id: string) => {
    if (componentsRef.current[id]) {
      componentsRef.current[id].callback(); // Call the onPress function of the component
    }
  }, []);

  const getComponentApiDescription = useCallback(() => {
    const documentation: {[key: string]: string} = {};

    for (const key of Object.keys(componentsRef.current)) {
      documentation[key] = componentsRef.current[key].docstring;
    }

    return documentation;
  }, []);

  return (
    <ComponentApiContext.Provider value={{ registerComponent, clickComponent, getComponentApiDescription }}>
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
