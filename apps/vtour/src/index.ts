export { OnboardingStep } from './OnboardingStep';

export const generateRandomNumber = (min: number, max: number): number => {
  // Ensure min is less than max, swap values if needed
  if (min > max) {
    [min, max] = [max, min];
  }

  // Generate a random number within the specified range
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}