import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface ModalOverlayProps {
  open: boolean;
  setOpen?: (open: boolean) => void;
  children: React.ReactNode;
  dialogClassName?: string;
  className?: string;
}

const ModalOverlay = ({
  open = false,
  setOpen,
  dialogClassName,
  className,
  children,
}: ModalOverlayProps) => {
  const handleClose = () => {
    if (setOpen) {
      setOpen(false);
    }
    return null;
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={handleClose}
      >
        <div
          className={`flex ${
            dialogClassName ? dialogClassName : "h-[75%]"
          } items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0`}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-20 backdrop-blur-sm transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={`inline-block transform overflow-hidden text-left align-bottom shadow-xl transition-all sm:w-full sm:align-middle ${
                className ? className : "bg-white sm:max-w-sm"
              }`}
            >
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalOverlay;
