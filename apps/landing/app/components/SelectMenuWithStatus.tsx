import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";

// Create enums for statuses INPROCESS, FINISHED, ERROR

enum Status {
  INPROCESS = "INPROCESS",
  FINISHED = "FINISHED",
  ERROR = "ERROR",
}

export interface OptionWithStatus {
  id: string;
  name: string;
  status: Status;
  // any other properties
}

interface SelectMenuWithStatus {
  label: string;
  selected?: OptionWithStatus;
  setSelected: (option: OptionWithStatus) => void;
  options: OptionWithStatus[];
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type StatusColorMap = { [key in OptionWithStatus["status"]]: string };

const statusColorMap: StatusColorMap = {
  FINISHED: "bg-green-400",
  INPROCESS: "bg-orange-400",
  ERROR: "bg-red-400",
};

const SelectMenuWithStatus = ({
  label,
  selected,
  setSelected,
  options,
}: SelectMenuWithStatus) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">
            {label}
          </Listbox.Label>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <div className="flex items-center">
                <span
                  aria-label={
                    selected
                      ? selected.status
                        ? "Online"
                        : "Offline"
                      : "Offline"
                  }
                  className={classNames(
                    selected
                      ? selected.status
                        ? "bg-green-400"
                        : "bg-gray-200"
                      : "bg-gray-200",
                    "inline-block h-2 w-2 flex-shrink-0 rounded-full"
                  )}
                />
                <span className="ml-3 block truncate">
                  {selected ? selected.name : "None selected"}
                </span>
              </div>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-indigo-600 text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(
                              statusColorMap[option.status] || "bg-gray-200",
                              "inline-block h-2 w-2 flex-shrink-0 rounded-full"
                            )}
                            aria-hidden="true"
                          />
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {option.name}
                            <span className="sr-only">
                              {" "}
                              is {option.status ? "listo" : "en proceso"}
                            </span>
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default SelectMenuWithStatus;
