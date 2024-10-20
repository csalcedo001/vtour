"use client";
import React from "react";
import type { CardComponentProps } from "onborda";
import { useOnborda } from "onborda";

const CustomCard: React.FC<CardComponentProps> = ({
  step,
  currentStep,
  totalSteps,
  nextStep,
  prevStep,
  arrow,
}) => {
  const { closeOnborda } = useOnborda();

  function handleConfetti() {
    closeOnborda();
    // confetti({
    //   particleCount: 100,
    //   spread: 70,
    //   origin: { y: 0.6 },
    // });
  }

  return (
    <div className="border-0 rounded-3xl max-w-vw">
      <div className="p-4">
        <div className="flex items-start justify-between w-full">
          <div>
            <h3 className="mb-2 text-lg font-bold">
              {step.icon} {step.title}
            </h3>
            <p className="text-sm text-gray-500">
              {currentStep + 1} of {totalSteps}
            </p>
          </div>
          <button
            className="p-2 rounded-full hover:bg-gray-100"
            onClick={() => closeOnborda()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      <div className="p-4">{step.content}</div>
      <div className="p-4">
        <div className="flex justify-between w-full">
          {currentStep !== 0 && (
            <button
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => prevStep()}
            >
              Previous
            </button>
          )}
          {currentStep + 1 !== totalSteps && (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-auto"
              onClick={() => nextStep()}
            >
              Next
            </button>
          )}
          {currentStep + 1 === totalSteps && (
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ml-auto"
              onClick={() => handleConfetti()}
            >
              🎉 Finish!
            </button>
          )}
        </div>
      </div>
      <span className="text-card">{arrow}</span>
    </div>
  );
};

export default CustomCard;
