import React, { Fragment } from "react";
import { NavLink, Route, useParams } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { FolderIcon, ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/solid";

import Editor from "./Editor";
import Tabs from "./Tabs";

import { getAllFiles, getFileContentById } from "./api/indexApi.js";
import { FileExtToIcon } from "./functions";

const File = ({ file, level }) => {
  const { isDir, fileName, children, fileExt, id } = file;

  return (
    <div className={`w-full`} style={{ paddingLeft: `${level * 5}px` }}>
      {isDir ? (
        <div className='flex space-x-2 no-underline p-1'>
          <div className='flex justify-center items-center'>
            <FolderIcon color='#89CFF0' width={14} />
          </div>
          <div className='text-yellow-400'>{fileName}</div>
        </div>
      ) : (
        <NavLink
          to={`/file/${id}`}
          className='flex space-x-2 no-underline p-1'
          activeClassName='bg-gray-700 bg-opacity-40'
        >
          <div className='flex justify-center items-center'>
            <FileExtToIcon fileExt={fileExt} />
          </div>
          <div className='text-gray-400'>{fileName}</div>
        </NavLink>
      )}

      {children && <Folder data={children} level={level + 1} />}
    </div>
  );
};

const Folder = ({ data, level }) => {
  return (
    <Fragment>
      {Object.entries(data).map(([key, file]) => (
        <File key={key} file={file} level={level} />
      ))}
    </Fragment>
  );
};

const FileTree = ({ files }) => {
  return (
    <div className='w-full pl-2 text-xs'>
      <Folder data={files} level={0} />
    </div>
  );
};

const Breadcrumbs = ({ dirPath }) => {
  const { id } = useParams();

  const { data: file, isLoading, isError, error } = useQuery(["fileById", id], () => getFileContentById(id));

  if (isLoading) return null;

  if (isError) {
    throw new Error(error);
  }

  const splittedFolderPath = dirPath.split("/");
  const currentDirectory = splittedFolderPath[splittedFolderPath.length - 1];

  const foo = file.file?.replace(currentDirectory, " ").split(" ");
  const currentFileCrumbs = foo[1].replaceAll("/", " > ");

  return (
    <div className='navbar px-2'>
      {currentDirectory} {currentFileCrumbs}
    </div>
  );
};

const App = () => {
  const { data: files, isLoading, isError, error } = useQuery("files", () => getAllFiles());

  if (isLoading) {
    return null;
  }

  if (isError) {
    throw new Error(error);
  }

  return (
    <div
      className='w-screen h-screen bg-gray-800 grid font-mono text-white overflow-hidden'
      style={{
        gridTemplateColumns: "200px auto",
      }}
    >
      <div
        className='w-full h-screen bg-gray-600 bg-opacity-20 grid'
        style={{
          gridTemplateRows: "50px auto",
        }}
      >
        <span />
        <div className='w-full h-full overflow-hidden overflow-y-scroll'>
          <FileTree files={files} />
        </div>
      </div>
      <div
        className='w-full h-full grid'
        style={{
          gridTemplateRows: "56px auto",
        }}
      >
        <div className='w-full h-full grid grid-rows-2'>
          <div className='px-2 py-1 flex navbar'>
            <Route path='/file/:id'>
              <div className='h-full w-12 flex flex-row px-2'>
                <ArrowLeftIcon width={20} onClick={() => console.log("back...")} />
                <ArrowRightIcon width={20} onClick={() => console.log("forward...")} />
              </div>

              <Breadcrumbs dirPath={"Notes"} />
            </Route>
          </div>
          <Route path='/file/:id'>
            <Tabs />
          </Route>
        </div>

        <Route path='/file/:id'>
          <Editor />
        </Route>
      </div>
    </div>
  );
};

const queryClient = new QueryClient();

const Root = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Root;
