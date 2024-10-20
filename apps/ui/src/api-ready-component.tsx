import React, { useEffect, ReactNode } from 'react';
import { useComponentApis } from './component-api-provider';

export default function ApiReadyComponent({ id, onPress, docstring, children }: {
  id: string;
  docstring: string;
  onPress: () => void;
  children: ReactNode;
}) {
  const { registerComponent, unregisterComponent } = useComponentApis();

  useEffect(() => {
    // Register the component with its ID and onPress function
    registerComponent(id, docstring, onPress);

    // Unregister the component on component unmount
    return () => {
      unregisterComponent(id);
    };
  }, [id, docstring, onPress, registerComponent, unregisterComponent]);

  return (
    <div onClick={onPress}>
      {children}
    </div>
  );
}
