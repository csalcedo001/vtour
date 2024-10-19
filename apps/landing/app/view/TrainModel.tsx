import React from "react";
import AlertWithDissmiss from "../components/AlertWithDissmiss";
import GlowingButton from "../components/GlowingButton";
import UploadImageGallery from "../components/UploadImageGallery";

const TrainModel = () => {
  return (
    <>
      <div className="fixed bottom-0 left-0 z-50 p-4">
        <AlertWithDissmiss
          message=""
          show={false}
          type="success"
          onClose={() => {}}
        />
      </div>

      <div className="space-y-5">
        <div className="space-y-5">
          <div>
            <h3 className="text-lg font-medium leading-6 text-white">
              Entrena tu modelo
            </h3>
            <p className="mt-1 text-sm text-white">
              Aquí podrás crear un modelo con tus propias imágenes.
            </p>
          </div>

          <div className="pt-0 lg:pt-0">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
              <div className="sm:col-span-3">
                <label
                  htmlFor="model-name"
                  className="block text-sm font-medium text-white"
                >
                  Nombre del modelo
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="model-name"
                    id="model-name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-white"
                >
                  Género
                </label>
                <div className="mt-1">
                  <select
                    id="gender"
                    name="gender"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="man">Hombre</option>
                    <option value="woman">Mujer</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="imagenes"
                  className="block text-sm font-medium text-white"
                >
                  Sube tus imágenes
                </label>
              </div>
            </div>
          </div>
          <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-5">
            <label
              htmlFor="file-upload"
              className="relative flex w-full cursor-pointer rounded-md font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2"
            >
              <div className="text-center">
                {/* SVG and text content */}
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  multiple
                />
              </div>
            </label>
          </div>
          <div className="h-96 max-w-4xl overflow-auto">
            <UploadImageGallery files={[]} onDelete={() => {}} />
          </div>
        </div>
        <div className="relative flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="comments1"
              name="comments1"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <p id="comments-description1" className="text-gray-200">
              Entiendo que fotos de baja calidad{" "}
              <span className="font-bold text-red-700">NO </span> aplican para
              devoluciones y que he seguido todas las instrucciones y leí la{" "}
              <a
                className="text-gray-100 underline"
                target="_blank"
                href="/refund-policy"
              >
                {" "}
                política de devoluciones
              </a>
            </p>
          </div>
        </div>
        <div className="relative flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="comments2"
              name="comments2"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <p id="comments-description2" className="text-gray-200">
              Confirmo que las imágenes son mías y que tengo los derechos de
              autor para usarlas
            </p>
          </div>
        </div>
        <div className="pt-5">
          <div className="fixed left-1/4 bottom-5 flex items-center justify-center sm:static">
            <div className="bg-transparent">
              <GlowingButton onClick={() => {}} isLoading={false}>
                <span>Enviar Fotos</span>
              </GlowingButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainModel;
