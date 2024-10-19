import type { StaticImageData } from "next/image";
export interface People {
  id: number;
  name: string;
  token: string;
  avatar: string;
}

export type NavProp = {
  name: string;
  current: boolean;
  href?: string;
};

export interface Image {
  id: string;
  name: string;
  href: string;
  imageSrc: StaticImageData;
  description?: string;
}

declare global {
  interface Window {
    MercadoPago: any;
    paymentBrickController: any;
  }
}

export interface TrainingSet {
  id: string;
  name: string;
  status: Status;
  trainingImages: any[];
  userId: string;
  model: Model | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
}

export interface Model {
  id: string;
  name: string;
  coverUrl: string | null;
  modelUrl: string;
  modelType: string;
  isPublic: boolean;
  userId: string;
  trainingSetId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
}

export enum Status {
  FINISHED = "FINISHED",
  INPROCESS = "INPROCESS",
}

export interface ImageResponse {
  id: string;
  url: string;
  user: null;
  userId: string;
  prompt?: Prompt;
  promptId?: string;
  model: null;
  modelId: string;
  isPublic: boolean;
  isSaved: boolean;
  isExample: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
}

export interface PendingReviews {
  missing_review_count: number;
  pending_review: boolean;
  products: [{ paymentId: string; productId: string }];
}

export interface Prompt {
  id: string;
  text: string;
  negativeText?: string;
  seed?: string;
  cfgScale?: number;
  denoisingStrength?: number;
  model: null;
  generatedImages: null;
  user: null;
  userId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
