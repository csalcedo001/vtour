import ImageGallery from "../components/ImageGallery";
import SelectMenuWithStatus from "../components/SelectMenuWithStatus";
import type { OptionWithStatus } from "../components/SelectMenuWithStatus";
import SelectMenu from "../components/SelectMenu";
import { useEffect, useState } from "react";
import GlowingButton from "../components/GlowingButton";
import { XCircleIcon } from "@heroicons/react/24/solid";
import TrainModel from "./TrainModel";
import AlertWithDismiss from "../components/AlertWithDissmiss";
// import ModalOverlay from "@/components/ModalOverlay";
// import { Prompt } from "@/types";
const options = [
  { id: 1, name: "Copiar estilos" },
  { id: 2, name: "Escribe tus prompts" },
  // { id: 3, name: "Diseña tu sesión de fotos" },
  { id: 3, name: "Entrena a tu modelo 👩" },
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

const GenerateImages = ({
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
  const [formData, setFormData] = useState(new FormData());
  const [generatedImages, setGeneratedImages] = useState<GeneratedImages[]>([]);
  const [description, setDescription] = useState("");

  // Form state for Copy Style
  const [personModel, setPersonModel] = useState<OptionWithStatus>(null);

  // Form state for Create Image With Prompt
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [seed, setSeed] = useState(null);
  const [loraScale, setLoraScale] = useState(0.85);
  const [promptStrength, setPromptStrength] = useState(0.8);

  // Notifications
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  // payment
  const [openSubscribe, setOpenSubscribe] = useState(false);

  // tutorial
  const [showTutorial, setShowTutorial] = useState(false);

  //   const { data } = useGetModels(
  //     () => null,
  //     () => null
  //   );

  //   useEffect(() => {
  //     if (copyPrompt) {
  //       setPrompt(copyPrompt.text);
  //       setNegativePrompt(copyPrompt.negativeText);
  //     }
  //   }, [copyPrompt]);

  //   useEffect(() => {
  //     if (!data) return;
  //     // Transform data, remove all models that don't have a model inside
  //     // Convert to OptionWithStatus
  //     const modelOptions = data.map((model) => ({
  //       id: model.id,
  //       name: model.name,
  //       status: model.status,
  //     }));
  //     setPersonModelOptions(modelOptions);
  //   }, [data]);

  //   const onFileChange = async (e) => {
  //     const files = e.target.files;

  //     Array.from(files).forEach((file) => {
  //       if (file instanceof Blob && file.size > 5) {
  //         setFormImage(file);
  //         formData.append("image", file);
  //         const reader = new FileReader();
  //         reader.onload = (e) => {
  //           setImageToCopy({
  //             source: e.target.result,
  //             title: file.name,
  //             size: file.size,
  //           });
  //         };
  //         reader.readAsDataURL(file);
  //       }
  //     });
  //   };

  //   const handleDragOver = (e) => {
  //     e.preventDefault();
  //   };

  //   const handleDrop = (e) => {
  //     e.preventDefault();
  //     const droppedFiles = e.dataTransfer.files;
  //     onFileChange({ target: { files: droppedFiles } });
  //   };

  //   const handleDeleteImage = () => {
  //     setImageToCopy(null);
  //   };

  //   const {
  //     data: copiedStyle,
  //     isLoading,
  //     mutate,
  //   } = useCopyStyle(
  //     () => {
  //       console.log("Copied style successfully");
  //       queryClient.invalidateQueries("getImages");
  //     },
  //     (e: any) => {
  //       const errorMessage =
  //         e.response?.data?.detail?.message ||
  //         e.response?.data?.detail ||
  //         "An error occurred";
  //       setAlertType("error");
  //       setAlertMessage(errorMessage);
  //       setShowAlert(true);
  //       (e.response?.data?.detail as any)?.reason === "not_premium" &&
  //         setOpenSubscribe(true);
  //     }
  //   );

  //   const {
  //     data: generatedImageWithPrompt,
  //     isLoading: isLoadingGeneratedImageWithPrompt,
  //     mutate: mutateGenerateImageWithPrompt,
  //   } = useCreateImageWithPrompt(
  //     () => {
  //       console.log("Generated image with prompt successfully");
  //       queryClient.invalidateQueries("getImages");
  //     },
  //     (e: any) => {
  //       const errorMessage =
  //         e.response?.data?.detail?.message ||
  //         e.response?.data?.detail ||
  //         "An error occurred";
  //       setAlertType("error");
  //       setAlertMessage(errorMessage);
  //       setShowAlert(true);
  //       (e.response?.data?.detail as any)?.reason === "not_premium" &&
  //         setOpenSubscribe(true);
  //     }
  //   );

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     // If Copy Style
  //     if (mode.id === 1) {
  //       // Validate form
  //       if (!formImage) {
  //         setAlertType("error");
  //         setAlertMessage("Please upload an image");
  //         setShowAlert(true);
  //         return;
  //       }

  //       if (!description) {
  //         setAlertType("error");
  //         setAlertMessage("Please add a description");
  //         setShowAlert(true);
  //         return;
  //       }

  //       mutate({
  //         image: formImage,
  //         description,
  //         model: personModel.id,
  //       });
  //     }

  //     // If Create Image With Prompt
  //     if (mode.id === 2) {
  //       if (!prompt) {
  //         setAlertType("error");
  //         setAlertMessage("Please add a prompt");
  //         setShowAlert(true);
  //         return;
  //       }
  //       mutateGenerateImageWithPrompt({
  //         prompt,
  //         model: personModel.id,
  //         seed,
  //         negativePrompt,
  //         loraScale,
  //         promptStrength,
  //       });
  //     }

  //     ampli.generateImage({
  //       base_model: personModel.name,
  //       image_description: description || prompt,
  //     });

  //     // invalidate query promptCounts
  //     queryClient.invalidateQueries("promptCounts");
  //   };

  //   useEffect(() => {
  //     if (!copiedStyle) return;
  //     // Set generated images and push the previous ones
  //     setGeneratedImages((prev) => [
  //       {
  //         id: copiedStyle.id,
  //         source: `data:image/jpeg;base64,${copiedStyle?.response?.images[0]}`,
  //       },
  //       ...prev,
  //     ]);
  //   }, [copiedStyle]);

  return (
    <div>
      <div className="fixed bottom-0 left-0 z-50 p-4">
        <AlertWithDismiss
          message={alertMessage}
          show={showAlert}
          type={alertType}
          onClose={() => {
            setShowAlert(false);
          }}
        />
      </div>
      <div className="space-y-5">
        <div className="space-y-5">
          <div className="flex justify-center">
            <button
              onClick={() => {
                setShowTutorial(true);
              }}
              type="button"
              className="mr-2 mb-2 rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800"
            >
              No sabes qué hacer? Mira el tutorial
            </button>
          </div>

          <div>
            <h3 className="text-lg font-medium leading-6 text-white">
              Genera tus imágenes
            </h3>
            <p className="mt-1 text-sm text-white">
              Selecciona una opción y comienza a crear!
            </p>
          </div>
          <div className="pt-0">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4">
              <div className="sm:col-span-3">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-white"
                >
                  ¿Qué quieres hacer?
                </label>

                <SelectMenu
                  label=""
                  options={options}
                  selected={mode}
                  setSelected={setMode}
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
                          Selecciona un modelo
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
                      Arrastra o sube una imagen para copiar su estilo
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
                          <ImageGallery files={[imageToCopy]} />
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
                    {personModelOptions && (
                      <>
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-white"
                        >
                          Selecciona un modelo
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
                      htmlFor="prompt"
                      className="block text-sm font-medium text-white"
                    >
                      Escribe tu prompt
                    </label>
                    <div className="mt-1">
                      <textarea
                        rows={4}
                        name="text"
                        id="text"
                        onChange={(e) => setPrompt(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        defaultValue={""}
                        value={prompt}
                        placeholder="{{modelo}} con un sombrero y una camisa roja en una playa"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="prompt"
                      className="block text-sm font-medium text-white"
                    >
                      Escribe tu prompt negativo (opcional)
                    </label>
                    <div className="mt-1">
                      <textarea
                        rows={4}
                        name="text"
                        id="text"
                        onChange={(e) => setNegativePrompt(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        defaultValue={""}
                        value={negativePrompt}
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-white"
                    >
                      Seed (opcional)
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        // onChange={(e) => setSeed(e.target.value)}
                        // value={seed}
                        name="seed"
                        id="seed"
                        defaultValue={"-1"}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-white"
                    >
                      Resemblance
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        min="0"
                        max="1"
                        step={0.01}
                        name="lora-input"
                        id="lora-input"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        defaultValue={0.85}
                        value={loraScale}
                        onChange={(e) => setLoraScale(Number(e.target.value))}
                      />
                      <input
                        id="lora-slider"
                        type="range"
                        min="0"
                        max="1"
                        name="lora-slider"
                        defaultValue={0.85}
                        value={loraScale}
                        onChange={(e) => setLoraScale(Number(e.target.value))}
                        step="0.01"
                        className="h-3 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-white"
                    >
                      Fuerza del Prompt
                    </label>
                    <div className="mt-1">
                      <input
                        name="prompt-strength"
                        id="prompt-strength"
                        type="number"
                        min="0"
                        max="1"
                        step={0.01}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        defaultValue={0.8}
                        value={promptStrength}
                        onChange={(e) =>
                          setPromptStrength(Number(e.target.value))
                        }
                      />
                      <input
                        id="prompt-strength-slider"
                        name="prompt-strength-slider"
                        type="range"
                        min="0"
                        max="1"
                        defaultValue={0.8}
                        value={promptStrength}
                        onChange={(e) =>
                          setPromptStrength(Number(e.target.value))
                        }
                        step="0.01"
                        className="h-3 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
                      />
                    </div>
                  </div>
                </>
              )}
              {/* TRAIN YOUR MODEL */}
              {mode.id === 3 && <TrainModel />}
            </div>
          </div>
        </div>
        {mode.id !== 3 ? (
          <div className="pt-5">
            <div className="flex justify-start">
              <div className="fixed left-8 bottom-5 z-40 flex w-full bg-transparent">
                <GlowingButton
                //   onClick={handleSubmit}
                //   isLoading={isLoading || isLoadingGeneratedImageWithPrompt}
                >
                  <span>Genera una imagen (~60s)</span>
                </GlowingButton>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GenerateImages;
