import React, { useEffect, useImperativeHandle, forwardRef, ReactNode, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useComponentApis } from './component-api-provider';

const ApiReadyComponent = forwardRef(({ id, onPress, docstring, children }: {
  id: string;
  docstring: string;
  onPress: () => void;
  children: ReactNode;
}, ref) => {
  const { registerComponent, unregisterComponent, currentComponent } = useComponentApis();
  const componentRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [componentBounds, setComponentBounds] = useState<{ top: number; left: number; width: number; height: number }>({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  const handleOnClick = () => {
    const rect = componentRef.current!.getBoundingClientRect();
    setComponentBounds({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
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

  const modalOverlay = (
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
        onClick={handleCloseModal}
      />
      <div
        style={{
          position: 'absolute',
          top: componentBounds.top,
          left: componentBounds.left,
          width: componentBounds.width,
          height: componentBounds.height,
          zIndex: 10000,
        }}
      >
        {children}
      </div>
    </>
  );

  return (
    <>
      {isModalOpen && createPortal(modalOverlay, document.body)}
      <div
        ref={componentRef}
        tabIndex={-1}
        onClick={handleOnClick}
        style={{ position: 'relative', zIndex: 'auto' }}
      >
        {children}
      </div>
    </>
  );
});

export default ApiReadyComponent;
