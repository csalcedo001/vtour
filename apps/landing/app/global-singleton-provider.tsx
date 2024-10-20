"use client";

import {createContext, useContext, useRef, ReactNode, useCallback, useState} from 'react';

interface GlobalSingletonType {
  setImagePrompt: (prompt: string) => void;
  getImagePrompt: () => string;
  setImageUrl: (url: string) => void;
  getImageUrl: () => string;
}

const GlobalSingleton = createContext<GlobalSingletonType | undefined>(undefined);

export function GlobalSingletonProvider({children}: { children: ReactNode }) {
  const [prompt, setPrompt] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  // const singletonDataRef = useRef<{imagePrompt: string, imageUrl: string}>({
  //   imagePrompt: "",
  //   imageUrl: "",
  // });

  const setImagePrompt = useCallback((prompt: string) => {
    // singletonDataRef.current.imagePrompt = prompt;
    setPrompt(prompt);
  }, []);

  const getImagePrompt = useCallback(() => {
    // return singletonDataRef.current.imagePrompt;
    return prompt;
  }, [prompt])

  const setImageUrl = useCallback((url: string) => {
    // singletonDataRef.current.imageUrl = url;
    setUrl(url);
  }, []);

  const getImageUrl = useCallback(() => {
    // return singletonDataRef.current.imageUrl;
    return url;
  }, [url])

  return (
    <GlobalSingleton.Provider
      value={{setImagePrompt, getImagePrompt, setImageUrl, getImageUrl}}>
      {children}
    </GlobalSingleton.Provider>
  );
}

export function useGlobalSingleton(): GlobalSingletonType {
  const context = useContext(GlobalSingleton);
  if (!context) {
    throw new Error('useGlobalSingleton must be used inside a GlobalSingletonProvider!');
  }
  return context;
}
