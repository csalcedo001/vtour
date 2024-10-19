import React from "react";
import type { ImageResponse } from "../types";
import {
  HeartIcon,
  TrashIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/solid";

interface ImageGalleryExampleProps {
  images: ImageResponse[];
  onFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  onCopy: (image: ImageResponse) => void;
  onMakeExample?: (id: string) => void;
  handleClick?: (file: any) => void;
  className?: string;
  actions?: boolean;
}

const ImageGalleryExample: React.FC<ImageGalleryExampleProps> = ({
  images,
  onFavorite,
  onDelete,
  onCopy,
  handleClick,
  onMakeExample,
  actions,
  className,
}) => {
  return (
    <ul
      role="list"
      className={`${
        className
          ? className
          : "grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      }`}
    >
      {images.map((image) => (
        <li key={image.id} className="relative">
          <div
            className="group relative block aspect-square overflow-hidden rounded-lg focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
            onClick={() => handleClick && handleClick(image)}
          >
            <img
              src={image.url}
              alt=""
              className="pointer-events-none object-cover group-hover:opacity-75"
            />
            {actions ? (
              <>
                <div className="absolute inset-0 hidden bg-black bg-opacity-30 group-hover:block"></div>
                <button
                  type="button"
                  className="absolute top-0 left-0 p-2 text-white opacity-0 hover:opacity-100 group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    onFavorite(image.id);
                  }}
                >
                  <span className="sr-only">Favorite</span>
                  <HeartIcon
                    className={`h-6 w-6 ${image.isSaved ? "text-red-500" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                <button
                  type="button"
                  className="absolute top-0 right-0 p-2 text-white opacity-0 hover:opacity-100 group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(image.id);
                  }}
                >
                  <span className="sr-only">Delete</span>
                  <TrashIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                <button
                  id={`duplicate-${image.id}`}
                  type="button"
                  className="absolute top-2/4 left-0 right-0 bottom-0 mx-auto my-0 flex h-1/4 w-1/4 items-center justify-center rounded-full p-2 text-white opacity-0 hover:opacity-100 group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCopy(image);
                  }}
                >
                  <span className="sr-only">Copy</span>
                  <DocumentDuplicateIcon
                    className="h-12 w-12"
                    aria-hidden="true"
                  />
                </button>
                {onMakeExample && (
                  <div className="absolute bottom-0 mb-1 flex w-full justify-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onMakeExample(image.id);
                      }}
                      className={`rounded-lg bg-gradient-to-br ${
                        image.isExample
                          ? "from-gray-500 to-blue-400"
                          : "from-pink-500 to-orange-400"
                      } px-5 py-2.5 text-center text-sm font-medium text-white opacity-0 hover:bg-gradient-to-bl hover:opacity-100 focus:outline-none focus:ring-4 focus:ring-pink-200 group-hover:opacity-100 dark:focus:ring-pink-800`}
                    >
                      {image.isExample ? "Remove Example" : "Make Example"}
                    </button>
                  </div>
                )}
              </>
            ) : null}
          </div>

          {/* <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
            {image?.prompt?.text ?? ""}
          </p> */}
        </li>
      ))}
    </ul>
  );
};

export default ImageGalleryExample;
