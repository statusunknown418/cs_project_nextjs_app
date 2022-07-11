import { ArrowCircleRightIcon, RefreshIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import { NextPage } from "next";
import { ReactElement } from "react";

type Props = {
  title: string;
  action?: () => void;
  isLoading?: boolean;
  loadingText?: string;
  hasIcon?: ReactElement;
  designation?: "primary" | "secondary" | "success";
};

export const ActionButton: NextPage<Props> = ({
  title,
  action,
  isLoading,
  loadingText,
  hasIcon,
  designation = "primary",
}) => {
  const Icon = () => {
    if (isLoading) {
      return <RefreshIcon className="w-4 h-4 fill-current text-purple-600 animate-spin" />;
    }

    if (hasIcon) {
      return hasIcon;
    }

    return <ArrowCircleRightIcon className="w-4 h-4 fill-current text-purple-600" />;
  };

  return (
    <button
      onClick={action}
      className={clsx(
        "group flex gap-2 items-center px-4 py-2 text-sm",
        "transition-all duration-200 rounded-lg focus:outline-none focus:ring-1",
        isLoading && "cursor-wait",
        designation === "primary" &&
          "border border-purple-300 hover:bg-purple-50 hover:shadow-lg font-bold",
        designation === "secondary" &&
          "bg-purple-100 text-purple-900 hover:bg-purple-200 font-semibold",
        designation === "success" && "bg-green-200 text-green-900 hover:bg-green-200"
      )}
    >
      <Icon />

      <span>{isLoading ? loadingText : title}</span>
    </button>
  );
};
