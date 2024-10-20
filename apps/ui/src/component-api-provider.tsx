import {createContext, useContext, useState, ReactNode} from 'react';

// Define the types for the context
interface AIContextType {
  registerComponent: (id: string, onPress: () => void) => void;
  clickComponent: (id: string) => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

// The provider component
export function AIProvider({children}: { children: ReactNode }) {
  const [components, setComponents] = useState<Record<string, () => void>>({});

  // Function to register a component
  const registerComponent = (id: string, onPress: () => void) => {
    setComponents(prev => ({...prev, [id]: onPress}));
  };

  // Function to click a registered component
  const clickComponent = (id: string) => {
    if (components[id]) {
      components[id](); // Call the onPress function of the component
    }
  };

  return (
    <AIContext.Provider value={{registerComponent, clickComponent}}>
      {children}
    </AIContext.Provider>
  );
}

// Custom hook to use the AI context
export function useAI(): AIContextType {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
}
