import SelectMenuWithStatus from "../components/SelectMenuWithStatus";
import type {OptionWithStatus} from "../components/SelectMenuWithStatus";
import SelectMenu from "../components/SelectMenu";
import {useCallback, useEffect, useState} from "react";
import GlowingButton from "../components/GlowingButton";
import {XCircleIcon} from "@heroicons/react/24/solid";
import TrainModel from "./TrainModel";
import AlertWithDismiss from "../components/AlertWithDissmiss";
import {useOnborda} from "onborda";
import {Image, Select, SelectItem} from "@nextui-org/react";
import {useGlobalSingleton} from "@/app/global-singleton-provider";
// import ModalOverlay from "@/components/ModalOverlay";
// import { Prompt } from "@/types";
const options = [
  {id: 1, name: "Copy styles"},
  {id: 2, name: "Write your prompts"},
  // { id: 3, name: "Diseña tu sesión de fotos" },
  {id: 3, name: "Train your model 👩"},
];

interface GeneratedImages {
  id: string;
  source: string;
}

interface GenerateImagesProps {
  imageToCopy?: any;
  setImageToCopy?: (image: any) => void;
  formImage?: any;
  setFormImage?: (image: any) => void;
  //   description?: string;
  //   setDescription?: (description: string) => void;
  copyPrompt?: null;
}

const GenerateImages = (
  {
    imageToCopy,
    setImageToCopy,
    formImage,
    setFormImage,
    //   description,
    //   setDescription,
    copyPrompt,
  }: GenerateImagesProps) => {
  const [mode, setMode] = useState(options[1]);
  const [personModelOptions, setPersonModelOptions] = useState<
    OptionWithStatus[]
  >([]);
  const [description, setDescription] = useState("");
  const globalSingleton = useGlobalSingleton();

  // Form state for Copy Style
  const [personModel, setPersonModel] = useState<OptionWithStatus>(null);

  // Form state for Create Image With Prompt
  const [seed, setSeed] = useState<number>(0);
  const [loraScale, setLoraScale] = useState<number>(0.85);
  const [promptStrength, setPromptStrength] = useState(0.8);

  // Notifications
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  const {startOnborda} = useOnborda();
  const handleStartOnborda = () => {
    console.log("startOnborda");
    startOnborda("tour1");
  };

  return (
    <div>
      <div className="space-y-5">
        <div className="space-y-5">
          <div className="flex justify-center">
            <button
              onClick={() => {
                // setShowTutorial(true);
                handleStartOnborda();
              }}
              type="button"
              className="mr-2 mb-2 rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800"
            >
              Don&apos;t know what to do? Watch the tutorial
            </button>
          </div>

          <div>
            <h3
              className="text-lg font-medium leading-6 text-white"
            >
              Generate your images
            </h3>
            <p className="mt-1 text-sm text-white">
              Select and option and start to create!
            </p>
          </div>
          <div className="pt-0">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4">
              <div className="sm:col-span-3">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-white"
                  id="onborda-step-menu-"
                >
                  What do you want to do?
                </label>

                <SelectMenu
                  label=""
                  options={options}
                  selected={mode}
                  // setSelected={setMode}
                />
              </div>
              {/* COPY STYLE FORM */}
              {mode.id === 1 && (
                <>
                  <div className="sm:col-span-3">
                    {personModelOptions && (
                      <>
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-white"
                        >
                          Select a model
                        </label>
                        <SelectMenuWithStatus
                          label=""
                          options={personModelOptions}
                          selected={personModel}
                          setSelected={setPersonModel}
                        />
                      </>
                    )}
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="copy-style"
                      className="block text-sm font-medium text-white"
                    >
                      Drag or upload an image to copy its style
                    </label>
                    <div>
                      {/*  Image Select/Dropzone */}
                      {imageToCopy ? (
                        <div className="relative">
                          <div className="absolute top-[-10px] left-[-10px] z-10">
                            <button
                              type="button"
                              className="rounded-xl bg-white text-black hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              //   onClick={handleDeleteImage}
                            >
                              <span className="sr-only">Close</span>
                              <XCircleIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                          {/*<ImageGallery files={[imageToCopy]} />*/}
                        </div>
                      ) : (
                        <div
                          className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300"
                          //   onDragOver={handleDragOver}
                          //   onDrop={handleDrop}
                        >
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-transparent font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2"
                          >
                            <div className="text-center">
                              <svg
                                className="mx-auto mt-5 h-12 w-12 text-white"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                              >
                                <path
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div className="mb-5 flex items-center justify-center text-sm text-white">
                                <span className="text-xs text-white dark:text-white">
                                  PNG, JPG, AVIF, WEBP (MAX. 2000x2000px) hasta
                                  2MB
                                </span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                  //   onChange={onFileChange}
                                />
                              </div>
                            </div>
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-white"
                    >
                      Describe la imagen a copiar
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="description"
                        id="description"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="una persona con un sombrero y una camisa roja en una playa"
                      />
                    </div>
                  </div>
                </>
              )}
              {/* GENERATE IMAGE WITH PROMPT FORM */}
              {mode.id === 2 && (
                <>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="prompt"
                      className="block text-sm font-medium text-white"
                    >
                      Write your prompt
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="onborda-step1"
                        rows={4}
                        name="text"
                        onChange={(e) => globalSingleton.setImagePrompt(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        defaultValue={""}
                        value={globalSingleton.getImagePrompt()}
                        placeholder="{{modelo}} with a hat and a red shirt on the beach"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="prompt"
                      className="block text-sm font-medium text-white"
                    >
                      Write your negative prompt (optional)
                    </label>
                    <div className="mt-1">
                      <textarea
                        rows={4}
                        name="text"
                        id="text"
                        // onChange={(e) => setNegativePrompt(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        // defaultValue={""}
                        // value={negativePrompt}
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="pt-5">
                    <div className="flex justify-start">
                      <div className="fixed left-8 z-40 flex w-full bg-transparent">
                        <GlowingButton
                          id="onborda-step2"
                        >

                          <span>Generate an image (~60s)</span>
                        </GlowingButton>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateImages;
