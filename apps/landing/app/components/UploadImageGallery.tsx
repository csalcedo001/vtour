import { TrashIcon } from "@heroicons/react/24/solid";

interface ImageGalleryProps {
  files: any[];
  handleClick?: (file: any) => void;
  onDelete: (any) => void;
}

const UploadImageGallery = ({
  files,
  handleClick,
  onDelete,
}: ImageGalleryProps) => {
  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-6 xl:gap-x-8"
    >
      {files.map((file) => (
        <li key={file.title} className="relative">
          <div
            className="aspect-w-10 aspect-h-7 group block w-full overflow-hidden rounded-lg focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
            onClick={() => handleClick && handleClick(file)}
          >
            <img
              src={file.source}
              alt=""
              className="pointer-events-none object-cover group-hover:opacity-75"
            />
            <button
              type="button"
              className="absolute inset-0 focus:outline-none"
            >
              <span className="sr-only">View details for {file.title}</span>
            </button>
          </div>
          {/* <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
            {file.title}
          </p> */}
          <div className="absolute inset-0 hidden bg-black bg-opacity-30 group-hover:block"></div>
          {/* group-hover:opacity-50 */}
          <button
            type="button"
            className="absolute top-0 right-0 p-2 text-white opacity-100 hover:opacity-50"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(file);
            }}
          >
            {/* Replace with trash icon */}
            <span className="sr-only">Delete</span>
            <TrashIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          {/* <p className="pointer-events-none block text-sm font-medium text-gray-500">
            {file.size}
          </p> */}
        </li>
      ))}
    </ul>
  );
};

export default UploadImageGallery;
