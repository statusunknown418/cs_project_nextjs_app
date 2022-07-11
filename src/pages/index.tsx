import { TrashIcon } from "@heroicons/react/solid";
import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import { ActionButton } from "../ui/ActionButton";
import { LogsModal } from "../ui/LogsModal";
import { Tag } from "../ui/Tag";
import { TheaterRepresentation } from "../ui/TheaterRepresentation";
import { useSimulatedPromise } from "../utils/useSimulatedPromise";

export type TApiResponse = {
  status: "success" | "error";
  data: {
    log: string[];
    simulation: boolean[][];
  };
};

/*
 * Developer Note: The errors and loading times have been clearly simulated here.
 * Production apps should NOT have a simulated promise like this. Check my other repos to
 * see how to do this in production.
 */
const Home: NextPage = () => {
  const { data, error } = useSWR<TApiResponse>({
    url: "/api/",
  });

  const [isSimulationCompleted, setIsSimulationCompleted] = useState(false);

  const {
    simulatePromise,
    isPending,
    reRenderCount,
    value: message,
    error: errorMessage,
  } = useSimulatedPromise({
    delay: 1000,
    extraCallback: () => setIsSimulationCompleted(true),
  });

  const clearSimulation = () => setIsSimulationCompleted(false);

  useEffect(() => {
    /*
     * Check if the action has been triggered
     */
    if (reRenderCount === 0) {
      return;
    }

    if (error || data?.status === "error") {
      toast.error("Unexpected error 😭");

      return;
    }

    if (message.length === 0) {
      return;
    }

    toast.success(message);
  }, [message, error, reRenderCount, errorMessage, data?.status]);

  console.log({ data });

  return (
    <>
      <Head>
        <title>Theater simulator</title>
        <meta name="description" content="Created using next.js + Django" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid grid-rows-2 px-4">
        <div className="flex flex-col h-full gap-5 justify-center items-center place-self-center">
          <h2 className="text-[3rem] lg:text-[5rem] md:text-[5rem] font-extrabold text-center">
            Randomized <span className="text-purple-400">Simulator</span> App
          </h2>

          <section className="text-gray-700 flex gap-2 md:gap-4 items-center">
            <p className="sm:text-lg md:text-xl">This app uses</p>

            <Tag title="Next.js" href="https://next.org" colorScheme="purple" />

            <Tag title="Django" href="https://next.org" colorScheme="green" />
          </section>

          <section className="flex gap-2 items-center justify-between">
            <ActionButton
              title="Start simulation"
              loadingText="Simulating ..."
              action={simulatePromise}
              isLoading={isPending}
            />

            <ActionButton
              title="Reset"
              loadingText="Resetting ..."
              action={clearSimulation}
              hasIcon={<TrashIcon className="w-4 h-4 fill-current text-purple-600" />}
            />
          </section>

          <p className="text-sm text-neutral-500 italic">
            The simulation results will appear below this line!
          </p>

          <div className="w-full h-px bg-neutral-300 rounded-full" />
        </div>

        <div className="flex flex-col items-center justify-center place-self-center -mt-10">
          <AnimatePresence exitBeforeEnter>
            {data && isSimulationCompleted && message.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center gap-6"
              >
                <TheaterRepresentation data={data.data} />
                <LogsModal data={data.data} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Home;
