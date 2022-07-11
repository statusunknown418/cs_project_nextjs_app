import { Dialog, Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { NextPage } from "next";
import { Fragment, useState } from "react";
import { TApiResponse } from "../pages";
import { ActionButton } from "./ActionButton";

type Props = Pick<TApiResponse, "data">;

export const LogsModal: NextPage<Props> = ({ data: { log } }) => {
  const [open, setOpen] = useState(false);

  const closeModal = () => setOpen(false);

  const openModal = () => setOpen(true);

  return (
    log && (
      <div className="flex items-center justify-center">
        <section>
          <ActionButton
            title="Show Logs"
            action={openModal}
            hasIcon={<CheckCircleIcon className="w-4 h-4 fill-current" />}
            designation="secondary"
          />
        </section>

        <Transition appear show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-200"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-xl flex flex-col gap-4 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <div className="flex flex-col gap-2">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                        Simulation logs
                      </Dialog.Title>

                      <p className="text-sm text-neutral-500">
                        The following logs were generated during the simulation.
                      </p>
                    </div>

                    <section className="h-80 overflow-scroll flex flex-col gap-1 text-xs border p-4 rounded-lg bg-neutral-800">
                      <pre className="text-neutral-200"># /bin/zsh</pre>
                      {log.map((message, idx) => (
                        <pre key={idx} className="text-neutral-200 flex gap-2 items-center">
                          <span className="text-green-500">{">"}</span>
                          {message}
                        </pre>
                      ))}
                    </section>

                    <div>
                      <ActionButton
                        title="Nice!"
                        action={closeModal}
                        hasIcon={<CheckCircleIcon className="w-4 h-4 fill-current" />}
                        designation="success"
                      />
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    )
  );
};
