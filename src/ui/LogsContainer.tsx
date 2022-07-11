import { Variants } from "framer-motion";
import { NextPage } from "next";

type Props = {
  simulation: boolean[][];
};

export const LogsContainer: NextPage<Props> = ({ simulation }) => {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  return (
    simulation && (
      <section className="h-full w-full flex flex-col items-center justify-center">
        {JSON.stringify(simulation)}
      </section>
    )
  );
};
