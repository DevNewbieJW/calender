import React from "react";
import { useParams } from "react-router";
import { useQuery } from "react-query";

import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import remarkHeadings from "@vcarl/remark-headings";
import { unified } from "unified";

import { getFileContentById } from "./api/indexApi";

const Toc = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery(["fileContentById", id], () => getFileContentById(id));

  if (isLoading) return null;

  if (isError) throw new Error(error);

  const processor = unified().use(remarkParse).use(remarkStringify).use(remarkHeadings);
  const toc = processor.processSync(data.content).data.headings;

  return (
    <div className='w-full h-full pt-6 overflow-y-scroll overflow-hidden'>
      <div className='w-full h-full bg-gray-700 bg-opacity-20 font-mono py-2 space-y-2'>
        {Object.entries(toc).map(([key, headline]) => (
          <div
            key={key}
            className='w-[200px] text-[10px] h-4 flex flex-nowrap overflow-hidden overflow-ellipsis'
            style={{
              paddingLeft: `${headline.depth}em`,
            }}
          >
            {headline.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toc;
