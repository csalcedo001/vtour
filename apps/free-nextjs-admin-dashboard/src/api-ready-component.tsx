import React, { useEffect, useImperativeHandle, forwardRef, ReactNode, useRef } from 'react';
import { useComponentApis } from './component-api-provider';

const ApiReadyComponent = forwardRef(({ id, onPress, docstring, children }: {
  id: string;
  docstring: string;
  onPress: () => void;
  children: ReactNode;
}, ref) => {
  const { registerComponent, unregisterComponent, currentComponent, openModal, closeModal } = useComponentApis();
  const componentRef = useRef<HTMLDivElement>(null);

  const handleOnClick = () => {
    // Open the modal overlay via the context's openModal function, passing `children` as content
    openModal(id, children);
  };

  useEffect(() => {
    if (currentComponent === id) {
      openModal(id, children);  // Opens the modal if this component is the current one
    }
  }, [currentComponent, id, openModal, children]);

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (componentRef.current) {
        componentRef.current.focus();
      }
    }
  }));

  useEffect(() => {
    // Register the component with the context on mount and unregister on unmount
    registerComponent(id, docstring, onPress, componentRef);

    return () => {
      unregisterComponent(id);
      closeModal();  // Close the modal overlay when the component is unmounted
    };
  }, [id, docstring, onPress, registerComponent, unregisterComponent, closeModal]);

  return (
    <div
      ref={componentRef}
      tabIndex={-1}
      onClick={handleOnClick}
      style={{ position: 'relative', zIndex: 'auto' }}
    >
      {children}
    </div>
  );
});

export default ApiReadyComponent;
