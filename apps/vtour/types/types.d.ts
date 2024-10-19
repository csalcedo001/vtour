declare module 'vtour' {
  import React from 'react';

  export interface OnboardingStepProps {
    stepId: string;
    children: React.ReactNode;
  }

  export const OnboardingStep: React.FC<OnboardingStepProps>;
}