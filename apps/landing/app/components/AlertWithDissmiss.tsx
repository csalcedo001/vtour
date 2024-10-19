import React from "react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

interface AlertWithDissmissProps {
  message: string;
  type: "success" | "error";
  show: boolean;
  onClose: () => void;
}

const AlertWithDissmiss = ({
  message,
  type,
  show,
  onClose,
}: AlertWithDissmissProps) => {
  const getColorClass = (): string => {
    if (type === "success") {
      return "bg-green-50 text-green-800";
    } else if (type === "error") {
      return "bg-red-50 text-red-800";
    } else {
      return "";
    }
  };

  return (
    <>
      {show && (
        <div className={`rounded-md p-4 ${getColorClass()}`}>
          <div className="flex">
            <div className="flex-shrink-0">
              {type === "success" ? (
                <CheckCircleIcon
                  className="h-5 w-5 text-green-400"
                  aria-hidden="true"
                />
              ) : (
                <ExclamationCircleIcon
                  className="h-5 w-5 text-red-400"
                  aria-hidden="true"
                />
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{message}</p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  type="button"
                  onClick={onClose}
                  className={`inline-flex rounded-md p-1.5 ${
                    type === "success"
                      ? "bg-green-50 text-green-500 hover:bg-green-100 focus:ring-green-600 focus:ring-offset-green-50"
                      : "bg-red-50 text-red-500 hover:bg-red-100 focus:ring-red-600 focus:ring-offset-red-50"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50`}
                >
                  <span className="sr-only">Dismiss</span>
                  {type === "success" ? (
                    <XMarkIcon
                      className="h-5 w-5 text-green-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <XMarkIcon
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AlertWithDissmiss;
