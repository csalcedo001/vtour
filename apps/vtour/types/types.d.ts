import React from 'react';

export interface MyData {
  id: number;
  name: string;
}

export interface OnboardingStepProps {
  stepId: string;
  children: React.ReactNode;
}

export const OnboardingStep: React.FC<OnboardingStepProps>;