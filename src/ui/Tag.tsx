import { clsx } from "clsx";
import { NextPage } from "next";

type Props = {
  title: string;
  href?: string;
  colorScheme: "purple" | "green";
};

export const Tag: NextPage<Props> = ({ title, href, colorScheme }) => {
  return (
    <div
      className={clsx("px-4 py-1 rounded-full font-semibold shadow-md", [
        colorScheme === "purple" && "bg-purple-100 text-purple-600 hover:bg-purple-200",
        colorScheme === "green" && "bg-green-100 text-green-600 hover:bg-green-200",
      ])}
    >
      <a href={href} target="_blank" rel="noreferrer">
        {title}
      </a>
    </div>
  );
};
