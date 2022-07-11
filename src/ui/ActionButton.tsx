import { ArrowCircleRightIcon, RefreshIcon } from "@heroicons/react/solid";
import { NextPage } from "next";
import { ReactElement } from "react";

type Props = {
  title: string;
  action?: () => void;
  isLoading?: boolean;
  loadingText?: string;
  hasIcon?: ReactElement;
};

export const ActionButton: NextPage<Props> = ({
  title,
  action,
  isLoading,
  loadingText,
  hasIcon,
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
      className="group flex gap-2 items-center px-4 py-2 border border-purple-300 hover:bg-purple-50 hover:shadow-lg 
      transition-all duration-200 rounded-lg"
    >
      <Icon />

      <span className="font-bold">{isLoading ? loadingText : title}</span>
    </button>
  );
};
