import React, { useEffect, useImperativeHandle, forwardRef, ReactNode, useRef } from 'react';
import { useComponentApis } from './component-api-provider';
import { getComponentFromInstructionPrompt } from './api/instruction/prompt';

const ApiReadyComponent = forwardRef(({ id, onPress, docstring, children }: {
  id: string;
  docstring: string;
  onPress: () => void;
  children: ReactNode;
}, ref) => {
  const { registerComponent, unregisterComponent, currentComponent } = useComponentApis();
  const componentRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleOnClick = () => {
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log(currentComponent)
    if (currentComponent === id) {
      setIsModalOpen(true);
    }
  }, [currentComponent])
  

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (componentRef.current) {
        componentRef.current.focus();
      }
    }
  }));

  useEffect(() => {
    // Register the component with its ID and onPress function
    registerComponent(id, docstring, onPress, componentRef);

    // Unregister the component on component unmount
    return () => {
      unregisterComponent(id);
    };
  }, [id, docstring, onPress, registerComponent, unregisterComponent]);

  return (
    <>
      {isModalOpen && (
        <div
          className="fixed inset-0 w-screen h-screen bg-black bg-opacity-50 z-40"
          onClick={handleCloseModal}
        />
      )}
      <div
        ref={componentRef}
        tabIndex={-1}
        onClick={handleOnClick}
        className={`${isModalOpen && 'z-50'}`}
      >
        {children}
      </div>
    </>
  );
});

export default ApiReadyComponent;