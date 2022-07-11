import { UserIcon, XIcon } from "@heroicons/react/solid";
import { NextPage } from "next";
import { TApiResponse } from "../pages";

type Props = Pick<TApiResponse, "data">;

export const TheaterRepresentation: NextPage<Props> = ({ data: { simulation } }) => {
  if (!simulation) {
    return null;
  }

  const rows = simulation.length;

  const columns = simulation[0] && simulation[0].length;

  const parseSimulation = (simulation: boolean[][]) => {
    const parsedSimulation = simulation.map((row) => {
      const parsedRow = row.map((cell) => {
        return cell ? "🟢" : "🟠";
      });
      return parsedRow.join("");
    });
    return parsedSimulation.join("\n");
  };

  return (
    simulation && (
      <div
        className="w-full max-w-md flex flex-col gap-4 transform overflow-hidden rounded-2xl 
      bg-white p-6 text-left shadow-xl transition-all border"
      >
        <section className="flex gap-4 items-center justify-between">
          <h3 className="font-semibold tracking-wide">Legend:</h3>

          <div className="flex gap-2">
            <p className="flex items-center gap-2 text-sm">
              <UserIcon className="w-4 h-4 fill-current text-purple-700" />
              <span>Available</span>
            </p>

            <p className="flex items-center gap-2 text-sm">
              <XIcon className="w-4 h-4 fill-current text-red-700" />
              <span>Taken</span>
            </p>
          </div>
        </section>

        <div className="h-px bg-neutral-300 w-full rounded-full" />

        {simulation.map((rows, idx) => (
          <span key={idx} className="flex items-center gap-4">
            {rows.map((cell, idx) => (
              <span key={idx}>
                {cell ? (
                  <XIcon className="w-3 h-3 sm:w-6 sm:h-6 fill-current text-red-700" />
                ) : (
                  <UserIcon className="w-3 h-3 sm:w-6 sm:h-6 fill-current text-purple-700" />
                )}
              </span>
            ))}
          </span>
        ))}
      </div>
    )
  );
};
