import { useState, createContext, useContext, useRef, useCallback, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ComponentApiContextType {
  registerComponent: (id: string, docstring: string, onPress: () => void, ref: React.RefObject<HTMLDivElement>) => void;
  unregisterComponent: (id: string) => void;
  clickComponent: (id: string) => void;
  getComponentApiDescription: () => { [key: string]: string };
  goToComponent: (id: string) => void;
  findComponent: (instruction: string) => Promise<string | null>;
  currentComponent: string | null;
  openModal: (id: string, content: ReactNode) => void;
  closeModal: () => void;
  executeInstruction: (instruction: string) => string;
}

const ComponentApiContext = createContext<ComponentApiContextType | undefined>(undefined);

export function ComponentApiProvider({ children }: { children: ReactNode }) {
  const componentsRef = useRef<Record<string, { docstring: string, callback: () => void, ref: React.RefObject<HTMLDivElement> }>>({});
  const [currentComponent, setCurrentComponent] = useState<string | null>(null);
  const [modalData, setModalData] = useState<{ top: number; left: number; width: number; height: number } | null>(null);
  const [modalContent, setModalContent] = useState<ReactNode>(null);

  const registerComponent = useCallback((id: string, docstring: string, onPress: () => void, ref: React.RefObject<HTMLDivElement>) => {
    componentsRef.current[id] = { docstring, callback: onPress, ref };
  }, []);

  const unregisterComponent = useCallback((id: string) => {
    delete componentsRef.current[id];
  }, []);

  const clickComponent = useCallback((id: string) => {
    if (componentsRef.current[id]) {
      componentsRef.current[id].callback();
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
      setCurrentComponent(id);
    }
  }, []);

  const executeInstruction = useCallback((instruction: string) => {
    const componentId = instruction.trim();
    componentsRef.current[componentId]?.callback();
    return "";
  }, []);

  const findComponent = useCallback((instruction: string) => {
    return fetch('/api/instruction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        instruction,
        components: Object.keys(componentsRef.current).map(id => ({
          id,
          description: componentsRef.current[id].docstring,
        })),
      }),
    })
      .then(response => response.json())
      .then(data => {
        goToComponent(data.componentId);
        return data;
      })
      .catch((error) => {
        console.error('Error:', error);
        throw new Error('Failed to find component');
      });
  }, [goToComponent]);

  const openModal = useCallback((id: string, content: ReactNode) => {
    const component = componentsRef.current[id];
    if (component && component.ref.current) {
      const rect = component.ref.current.getBoundingClientRect();
      setModalData({ top: rect.top, left: rect.left, width: rect.width, height: rect.height });
      setModalContent(content);
    }
  }, []);

  const closeModal = useCallback(() => {
    setModalData(null);
    setModalContent(null);
  }, []);

  return (
    <ComponentApiContext.Provider
      value={{
        registerComponent,
        unregisterComponent,
        clickComponent,
        getComponentApiDescription,
        executeInstruction,
        goToComponent,
        findComponent,
        currentComponent,
        openModal,
        closeModal,
      }}
    >
      {children}
      {modalData && modalContent && createPortal(
        <>
          <div
            style={{
              position: 'fixed',
              inset: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 9999,
            }}
            onClick={closeModal}
          />
          <div
            style={{
              position: 'absolute',
              top: modalData.top,
              left: modalData.left,
              width: modalData.width,
              height: modalData.height,
              zIndex: 10000,
            }}
          >
            {modalContent}
          </div>
        </>,
        document.body
      )}
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
