import React, { useEffect } from 'react';

interface OnboardingStepProps {
  stepId: string; // A unique identifier for the step
  children: React.ReactNode;
}

export const OnboardingStep: React.FC<OnboardingStepProps> = ({ stepId, children }) => {
  useEffect(() => {
    // Register the step in the onboarding process when the component mounts
    console.log(`Registering onboarding step: ${stepId}`);
    
    // Cleanup on unmount
    return () => {
      console.log(`Unregistering onboarding step: ${stepId}`);
    };
  }, [stepId]);

  return <div>{children}</div>;
};