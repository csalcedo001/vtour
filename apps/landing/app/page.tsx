"use client";

import { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import VirtualAssistant from "@/app/components/VirtualAssistant";
import GenerateImagesForm from "./view/GenerateImagesForm";
import { Image } from "@nextui-org/react";
import { useGlobalSingleton } from "@/app/global-singleton-provider";
import { AiImageEditor } from "@/app/ai-image-editor";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const globalSingleton = useGlobalSingleton();

  return (
    <div>
      <main>
        <div className="relative flex min-h-screen w-full flex-col">
          {/* 3 column wrapper */}
          <div className="w-full flex flex-row lg:flex lg:px-10">
            {/* Left sidebar & main wrapper */}
            <div className="flex flex-row w-full min-w-0 flex-1 xl:flex">
              <div>
                <div className="h-full overflow-y-auto py-6 pl-4 pr-6 sm:pl-6 lg:pl-8 xl:pl-0">
                  {/* Start left column area */}
                  <div className="relative h-full">
                    {/* <div className="absolute inset-0 rounded-lg border-2 border-dashed border-gray-200" /> */}
                    <div className="flex items-center justify-between">
                      <GenerateImagesForm />
                    </div>
                  </div>
                  {/* End left column area */}
                </div>
              </div>

              <div className="flex flex-row max-w-full w-full justify-center items-center mt-10">
                <div className="bg-white bg-opacity-20 w-[800px] h-[600px] flex items-center justify-center rounded-xl">
                  {globalSingleton.getImageUrl() ? (
                    <Image
                      src={globalSingleton.getImageUrl()}
                      width={800}
                      height={600}
                      alt="Generated image"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div className="text-gray-400 text-center w-[800px] h-[600px] flex flex-col items-center justify-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="mt-2 text-sm">No image generated yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*<AiImageEditor />*/}
        <VirtualAssistant />
      </main>
    </div>
  );
}
