"use client";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import GenerateImagesForm from "./view/GenerateImagesForm";
import GalleryArea from "./view/GalleryArea";
import Image from "next/image";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
export default function Home() {
  return (
    <div>
      <Disclosure
        as="nav"
        className="fixed top-0 left-0 right-0 z-10 border-b border-gray-200 bg-black"
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex">
                  <div className="flex flex-shrink-0 items-center">
                    {/* <Image
                src={FotosAIPROLogoText}
                alt="FotosAI"
                className="block h-8 w-auto lg:hidden"
              /> */}
                    <Image
                      src={"/assets/logo-text-pro.png"}
                      alt="FotosAI Text"
                      className="hidden h-8 w-auto lg:block"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                    {/* {navigation &&
                navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                      "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </a>
                ))} */}
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  <button
                    type="button"
                    className="rounded-full bg-black p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  ></button>
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        {/* <Gravatar
                    className="h-8 w-8 rounded-full"
                    email={
                      userData ? userData.email : "default@email.com"
                    }
                    avatarSize={100}
                    size={70}
                  /> */}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {[{ name: "Logout", onClick: () => {}, href: "/" }].map(
                          (item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                  onClick={item.onClick}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          )
                        )}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <div className="-mr-2 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 pt-2 pb-3">
                {[{ name: "Home", href: "/", current: true }].map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                        : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800",
                      "block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    {/* <Gravatar
                className="h-10 w-10 rounded-full"
                email={userData ? userData.email : "default@email.com"}
                avatarSize={100}
                size={70}
              /> */}
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      You
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {/* {userData ? userData.email : "default@email.com"} */}
                      default@email.com
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 space-y-1">
                  {[{ name: "Logout", onClick: () => {} }].map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      onClick={item.onClick}
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <main>
        <div className="relative mt-16 flex min-h-screen w-full flex-col bg-black">
          {/* 3 column wrapper */}
          <div className="w-full flex-grow lg:flex lg:px-10">
            {/* Left sidebar & main wrapper */}
            <div className="min-w-0 flex-1 bg-white xl:flex">
              <div className="border-b border-gray-200 bg-black xl:w-80 xl:flex-shrink-0 xl:border-b-0 xl:border-r xl:border-gray-200">
                <div className="h-full overflow-y-auto py-6 pl-4 pr-6 sm:pl-6 lg:pl-8 xl:pl-0">
                  {/* Start left column area */}
                  <div className="relative h-full">
                    {/* <div className="absolute inset-0 rounded-lg border-2 border-dashed border-gray-200" /> */}
                    <div className="flex items-center justify-between">
                      <GenerateImagesForm
                      // imageToCopy={imageToCopy}
                      // setImageToCopy={setImageToCopy}
                      // formImage={formImage}
                      // setFormImage={setFormImage}
                      // description={description}
                      // setDescription={setDescription}
                      // copyPrompt={prompt}
                      />
                    </div>
                  </div>
                  {/* End left column area */}
                </div>
              </div>

              <div className="bg-black lg:min-w-0 lg:flex-1">
                <div className="h-full px-4 sm:px-6 lg:px-8">
                  {/* Start main area*/}
                  <div
                    className="relative h-full"
                    style={{ minHeight: "36rem" }}
                  >
                    {/* <div className="absolute inset-0 rounded-lg border-2 border-dashed border-gray-200" /> */}
                    <GalleryArea />
                  </div>
                  {/* End main area */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
