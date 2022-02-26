import React, { useState } from "react";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import { XIcon } from "@heroicons/react/solid";

import { getAllFiles } from "./api/indexApi.js";

const CommandOpenFile = ({ closeFileList }) => {
  const [searchInput, setSearchInput] = useState("");
  const { data = [], isLoading, isError, error } = useQuery("files", () => getAllFiles());
  if (isLoading) return null;

  if (isError) {
    throw new Error(error);
  }

  const allFileData = [];
  const logFiles = (files) => {
    for (let file of files) {
      if (file.isDir) {
        logFiles(file.children);
      }
      if (!file.isDir) {
        allFileData.push({ name: file.fileName, path: file.filePath, extension: file.fileExt, id: file.id });
      }
    }
    return allFileData;
  };

  const allFiles = logFiles(data);

  return (
    <div className='h-2/3 w-1/3 absolute left-[40%] bg-gray-800 text-sm top-8 shadow-lg overflow-y-scroll overflow-hidden'>
      <div className='flex flex-col'>
        <div className='w-full border-b-2 border-opacity-20 flex justify-between flex-row'>
          <input
            name='search-files'
            className='w-3/4 p-2 bg-transparent'
            type='text'
            placeholder='Search for file ...'
            onInput={(event) => setSearchInput(event.target.value)}
            autoFocus
          />
          <div className='flex justify-end items-center px-2 hover:cursor-pointer' onClick={closeFileList}>
            <XIcon color='white' width={14} />
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center p-2'>
        {Object.entries(allFiles)
          .filter(([_, file]) => file.name.startsWith(searchInput))
          .map(([key, file]) => (
            <NavLink
              key={key}
              to={`/file/${file.id}`}
              onClick={closeFileList}
              className='w-full h-auto py-2 font-mono hover:bg-gray-400'
            >
              {file.name}
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default CommandOpenFile;
