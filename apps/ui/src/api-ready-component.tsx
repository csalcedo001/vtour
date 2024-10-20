import React, { useEffect, ReactNode } from 'react';
import { useComponentApis } from './component-api-provider';

export default function ApiReadyComponent({ id, onPress, docstring, children }: {
  id: string;
  docstring: string;
  onPress: () => void;
  children: ReactNode;
}) {
  const { registerComponent } = useComponentApis();

  useEffect(() => {
    // Register the component with its ID and onPress function
    registerComponent(id, docstring, onPress);
  }, [id, docstring, onPress, registerComponent]);

  return (
    <div onClick={onPress}>
      {children}
    </div>
  );
}
