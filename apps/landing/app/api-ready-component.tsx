import React, {
  useEffect,
  useImperativeHandle,
  forwardRef,
  ReactNode,
  useRef,
} from "react";
import { useComponentApis } from "./component-api-provider";

const ApiReadyComponent = forwardRef(function ApiReadyComponent(
  {
    id,
    onPress,
    docstring,
    children,
  }: {
    id: string;
    docstring: string;
    onPress: () => void;
    children: ReactNode;
  },
  ref
) {
  const { registerComponent, unregisterComponent } = useComponentApis();
  const componentRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (componentRef.current) {
        componentRef.current.focus();
      }
    },
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
    <div ref={componentRef} tabIndex={-1} onClick={onPress}>
      {children}
    </div>
  );
});

export default ApiReadyComponent;
