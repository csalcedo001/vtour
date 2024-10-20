import React, {useEffect, ReactNode} from 'react';
import {useAI} from './component-api-provider';

export default function AIWrapper({id, onPress, children}: {
  id: string;
  onPress: () => void;
  children: ReactNode;
}) {
  const {registerComponent} = useAI();

  useEffect(() => {
    // Register the component with its ID and onPress function
    registerComponent(id, onPress);
  }, [id, onPress, registerComponent]);

  return (
    <div onClick={onPress}>
      {children}
    </div>
  );
};
