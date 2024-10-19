import { useState, Fragment } from "react";
import { Tab } from "@headlessui/react";
import PreviewImageOverlay from "../components/PreviewImageOverlay";
import { ArrowDownTrayIcon, HeartIcon } from "@heroicons/react/24/solid";
import ImageGalleryExample from "../components/ImageGalleryExample";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Gallery = () => {
  const [openImage, setOpenImage] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  return (
    <>
      <PreviewImageOverlay open={openImage} setOpen={setOpenImage}>
        <a className="group relative flex items-center justify-center">
          <div className="absolute hidden flex-col items-center justify-center group-hover:flex">
            <ArrowDownTrayIcon className="hidden h-20 w-20 text-black group-hover:block" />
            <p className="hidden text-2xl font-bold text-black group-hover:block">
              Descargar
            </p>
          </div>
          <div
            aria-hidden="true"
            className="aspect-w-3 aspect-h-2 lg:aspect-w-5 lg:aspect-h-6 overflow-hidden group-hover:opacity-50"
          >
            <img
              src={previewImage}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </a>
      </PreviewImageOverlay>

      <Tab.Group as="div" defaultIndex={0}>
        <div>
          <Tab.List className="-mb-px flex space-x-8 px-4">
            {["Ejemplos", "Tus Fotos", "Favoritas"].map((tabName) => (
              <Tab
                key={tabName}
                className={({ selected }) =>
                  classNames(
                    selected
                      ? "border-white text-white"
                      : "border-transparent text-gray-400",
                    "flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-lg font-extrabold"
                  )
                }
              >
                {tabName === "Favoritas" ? (
                  <div>
                    {tabName} <HeartIcon className="inline-block h-6 w-6" />
                  </div>
                ) : (
                  tabName
                )}
              </Tab>
            ))}
          </Tab.List>
        </div>
        <Tab.Panels as={Fragment}>
          {["Ejemplos", "Tus Fotos", "Favoritas"].map((tabName) => (
            <Tab.Panel key={tabName} className="py-2">
              <ImageGalleryExample
                images={[]}
                handleClick={() => {}}
                onFavorite={() => {}}
                onDelete={() => {}}
                onCopy={() => {}}
                actions={tabName !== "Favoritas"}
              />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </>
  );
};

export default Gallery;
