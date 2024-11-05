import React, { useEffect, useImperativeHandle, forwardRef, ReactNode, useRef } from 'react';
import { useComponentApis } from './component-api-provider';

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
    if (currentComponent === id) {
      setIsModalOpen(true);
    }
  }, [currentComponent, id]);

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (componentRef.current) {
        componentRef.current.focus();
      }
    }
  }));

  useEffect(() => {
    registerComponent(id, docstring, onPress, componentRef);

    return () => {
      unregisterComponent(id);
    };
  }, [id, docstring, onPress, registerComponent, unregisterComponent]);

  return (
    <>
      {isModalOpen && (
        <div
          style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 900 }}
          onClick={handleCloseModal}
        />
      )}
      <div
        ref={componentRef}
        tabIndex={-1}
        onClick={handleOnClick}
        style={{ position: 'relative', zIndex: isModalOpen ? 999 : 'auto' }} // Set higher z-index only when modal is open
      >
        {children}
      </div>
    </>
  );
});

export default ApiReadyComponent;
