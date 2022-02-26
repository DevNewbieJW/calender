import React from "react";
import { VscMarkdown, VscTerminalBash } from "react-icons/vsc";
import { FaPython } from "react-icons/fa";
import { BsFileEarmarkImage } from "react-icons/bs";
import { DocumentIcon } from "@heroicons/react/solid";

export const FileExtToIcon = ({ fileExt }) => {
  switch (fileExt) {
    case ".md":
      return <VscMarkdown size={14} />;
    case ".py":
      return <FaPython size={14} />;
    case ".sh":
      return <VscTerminalBash size={14} />;
    case ".png":
      return <BsFileEarmarkImage className='text-green-600' size={14} />;
    default:
      return <DocumentIcon className='text-gray-400' width={14} />;
  }
};
