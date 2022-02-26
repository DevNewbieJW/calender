import React, { useCallback, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";

import { useHistory, useRouteMatch, NavLink } from "react-router-dom";
import { useQuery } from "react-query";
import { XIcon } from "@heroicons/react/outline";

import { getFileById } from "./api/indexApi";
import { useCtrlKey } from "./hooks/useKey";

const TabName = ({ tabName }) => {
  const subString = "/file/";
  const tabId = tabName.substring(subString.length, tabName.length);

  const { data: file, isLoading, isError, error } = useQuery(["tabName", tabId], () => getFileById(tabId));

  if (isLoading) return <div className='w-full h-full px-2 overflow-hidden overflow-ellipsis'>Loading...</div>;

  if (isError) {
    throw new Error(error);
  }

  return <span className='px-2 overflow-hidden overflow-ellipsis'>{file.fileName}</span>;
};

const Tabs = ({ folderPath }) => {
  const history = useHistory();
  const [tabs, setTabs] = useLocalStorageState("open-tabs", []);

  const onCloseTab = useCallback(
    (tab) => {
      const isActiveTab = history.location.pathname.startsWith(tab);
      const index = tabs.indexOf(tab);
      const isLast = index === tabs.length - 1;
      const nextTab = (isLast ? tabs[index - 1] : tabs[index + 1]) || "/";

      setTabs(tabs.filter((t) => t !== tab));
      localStorage.removeItem(tab);

      if (isActiveTab) {
        history.push(nextTab);
      }
    },
    [history, setTabs, tabs]
  );

  const matchUrl = useRouteMatch("/file/:fileId")?.url;
  useEffect(() => {
    if (matchUrl) {
      setTabs((tabs) => {
        if (tabs.includes(matchUrl)) {
          return tabs;
        }
        return [...tabs, matchUrl];
      });
    }
  }, [matchUrl]);

  const handleClosingTab = (event, tab) => {
    event.preventDefault();
    event.stopPropagation();
    onCloseTab(tab);
  };

  useCtrlKey("KeyW", () => onCloseTab(matchUrl));

  return (
    <div className='flex items-center overflow-y-hidden h-6 overflow-x-scroll'>
      {Object.entries(tabs).map(([key, tab]) => (
        <NavLink
          key={key}
          to={tab}
          className='px-2 py-1 h-6 text-sm flex flex-nowrap bg-gray-600 bg-opacity-20 overflow-hidden overflow-ellipsis'
          activeClassName='bg-black bg-opacity-40'
        >
          <TabName tabName={tab} />
          <XIcon width={15} onClick={(event) => handleClosingTab(event, tab)} />
        </NavLink>
      ))}
    </div>
  );
};

export default Tabs;
