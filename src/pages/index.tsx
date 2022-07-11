import { TrashIcon } from "@heroicons/react/solid";
import { AnimatePresence } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import { ActionButton } from "../ui/ActionButton";
import { LogsContainer } from "../ui/LogsContainer";
import { Tag } from "../ui/Tag";
import { useSimulatedPromise } from "../utils/useSimulatedPromise";

type TApiResponse = {
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

  const [simulation, setSimulation] = useState(false);

  const {
    simulatePromise,
    isPending,
    reRenderCount,
    value: message,
    error: errorMessage,
  } = useSimulatedPromise({
    delay: 1000,
    extraCallback: () => setSimulation(true),
  });

  useEffect(() => {
    /*
     * Check if the action has been triggered
     */
    if (reRenderCount === 0) {
      return;
    }

    if (error) {
      toast.error(error, {
        position: "bottom-center",
      });
    }

    if (message.length === 0) {
      return;
    }

    toast.success(message, {
      position: "bottom-center",
    });
  }, [message, error, reRenderCount, errorMessage]);

  console.log({ data });

  return (
    <>
      <Head>
        <title>Theater simulator</title>
        <meta name="description" content="Created using next.js + Django" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-screen h-screen grid grid-rows-2 place-items-center p-4">
        <div className="flex flex-col h-full gap-6 justify-center items-center">
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
              action={() => setSimulation(false)}
              hasIcon={<TrashIcon className="w-4 h-4 fill-current text-purple-600" />}
            />
          </section>
        </div>

        {data && simulation && (
          <AnimatePresence exitBeforeEnter>
            {message.length > 0 && <LogsContainer simulation={data.data.simulation} />}
          </AnimatePresence>
        )}
      </div>
    </>
  );
};

export default Home;
