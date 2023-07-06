"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import FileInput from "@/components/FileInput";
import { Fragment, use, useRef, useState } from "react";
import InstructionsModal from "@/components/InstructionsModal";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Popover, Transition } from "@headlessui/react";

export default function Home() {
  const [powerpointFile, setPowerpointFile] = useState(null);

  const [excelFile, setExcelFile] = useState(null);

  const [nameIndex, setNameIndex] = useState(null);

  const [cpfIndex, setCpfIndex] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  async function fetchZip() {
    const formData = new FormData();

    if (!(excelFile || powerpointFile || nameIndex || cpfIndex)) return;

    formData.append("excel", excelFile);
    formData.append("powerpoint", powerpointFile);
    formData.append("name_index", nameIndex); // Add name_index to the form data
    formData.append("cpf_index", cpfIndex); // Add cpf_index to the form data

    setIsLoading(true);

    const response = await fetch("/api/process_files", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.blob())
      .then((blob) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "powerpoint_files.zip");

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        setIsLoading(false);

        // Clean up and remove the link
        link.parentNode.removeChild(link);
      });
  }

  return (
    <div className="flex w-full justify-center">
      <div className="bg-white grid md:grid-cols-2 pt-20 items-center">
        <div className="relative isolate px-6 lg:px-8">
          <div className="mx-auto max-w-2xl  lg:py-56">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Uma forma ágil e inteligente de preencher certificados.
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Você não precisa mais se preocupar em perder tempo com tarefas
                repetitivas. Com nossa solução inovadora, preencher certificados
                se torna uma tarefa simples e eficiente.
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center">
          <div>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full">
                    <div>
                      <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Efetivo
                      </h2>
                      <p className="mt-1 text-sm  text-gray-600">
                        Coloque aqui a planilha excel que será tomada como base.
                      </p>
                    </div>
                    <FileInput
                      accept={".xlsm, .xlsx, .xls"}
                      identifier={"excel"}
                      setFile={setExcelFile}
                    >
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                          <div>
                            {excelFile ? (
                              <div
                                className="mt-3 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
                                role="alert"
                              >
                                <div className="flex">
                                  <div className="py-1">
                                    <svg
                                      className="fill-current h-6 w-6 text-teal-500 mr-4"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                                    </svg>
                                  </div>
                                  <div>
                                    <p className="font-bold">Arquivo Enviado</p>
                                    <p className="text-sm">{excelFile.name}</p>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                  <div className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                    <span>Envie um arquivo</span>
                                  </div>
                                  <p className="pl-1">ou arraste até aqui</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">
                                  PPT ou PPTX, até 100mb
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </FileInput>
                  </div>
                  <div className="col-span-full">
                    <div>
                      <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Arquivo PowerPoint
                      </h2>
                      <p className="mt-1 text-sm  text-gray-600">
                        Coloque aqui o arquivo powerpoint com os certificados.
                      </p>
                    </div>
                    <FileInput
                      accept={".pptx, .ppt"}
                      identifier={"powerpoint"}
                      setFile={setPowerpointFile}
                    >
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                          <div>
                            {powerpointFile ? (
                              <div
                                className="mt-3 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
                                role="alert"
                              >
                                <div className="flex">
                                  <div className="py-1">
                                    <svg
                                      className="fill-current h-6 w-6 text-teal-500 mr-4"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                                    </svg>
                                  </div>
                                  <div>
                                    <p className="font-bold">Arquivo Enviado</p>
                                    <p className="text-sm">
                                      {powerpointFile.name}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                  <div className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                    <span>Envie um arquivo</span>
                                  </div>
                                  <p className="pl-1">ou arraste até aqui</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">
                                  PPT ou PPTX, até 100mb
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </FileInput>
                  </div>
                </div>
                <div className="flex gap-3 items-center justify-center pt-3">
                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="flex items-center text-sm font-medium leading-6 text-gray-900"
                    >
                      Posição do nome
                      <Popover className="relative">
                        {({ open }) => (
                          <>
                            <Popover.Button className="flex items-center px-1">
                              <InformationCircleIcon className="w-4 text-red-500 " />
                            </Popover.Button>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-200"
                              enterFrom="opacity-0 translate-y-1"
                              enterTo="opacity-100 translate-y-0"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100 translate-y-0"
                              leaveTo="opacity-0 translate-y-1"
                            >
                              <Popover.Panel className="absolute left-1/2 z-10 w-96 mt-3  -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                  <div className="bg-gray-50 p-4">
                                    Coloque aqui o número da coluna do nome, da
                                    esquerda para a direita, começando pelo
                                    número 1.
                                    <br />
                                    <span>
                                      Ex: | número | nascimento | nome | função
                                      | cpf
                                    </span>
                                    <br />
                                    Nesse caso a posição do nome seria 3, já a
                                    do CPF seria 5.
                                  </div>
                                </div>
                              </Popover.Panel>
                            </Transition>
                          </>
                        )}
                      </Popover>
                    </label>
                    <div className="">
                      <input
                        onChange={(e) => setNameIndex(e.target.value)}
                        type="text"
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="city"
                      className="flex items-center text-sm font-medium leading-6 text-gray-900"
                    >
                      Posição do CPF
                      <Popover className="relative">
                        {({ open }) => (
                          <>
                            <Popover.Button className="flex items-center px-1">
                              <InformationCircleIcon className="w-4 text-red-500 " />
                            </Popover.Button>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-200"
                              enterFrom="opacity-0 translate-y-1"
                              enterTo="opacity-100 translate-y-0"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100 translate-y-0"
                              leaveTo="opacity-0 translate-y-1"
                            >
                              <Popover.Panel className="absolute left-1/2 z-10 w-96 mt-3  -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                  <div className="bg-gray-50 p-4">
                                    Coloque aqui o número da coluna do CPF, da
                                    esquerda para a direita, começando pelo
                                    número 1.
                                    <br />
                                    <span>
                                      Ex: | número | nascimento | nome | função
                                      | cpf
                                    </span>
                                    <br />
                                    Nesse caso a posição do nome seria 3, já a
                                    do CPF seria 5.
                                  </div>
                                </div>
                              </Popover.Panel>
                            </Transition>
                          </>
                        )}
                      </Popover>
                    </label>
                    <div className="flex gap-4 items-center">
                      <div className="">
                        <input
                          onChange={(e) => setCpfIndex(e.target.value)}
                          type="text"
                          name="region"
                          id="region"
                          autoComplete="address-level1"
                          className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <div className=" flex items-center justify-end gap-x-6">
                        <button
                          onClick={() => fetchZip()}
                          type="submit"
                          disabled={isLoading}
                          className="rounded-md disabled:bg-indigo-300 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Enviar
                        </button>
                        <div>
                          {isLoading ? (
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                stroke-width="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
