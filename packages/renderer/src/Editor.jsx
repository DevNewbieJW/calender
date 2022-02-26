import React, { useEffect, useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import MonacoEditor from "@monaco-editor/react";
import useLocalStorageState from "use-local-storage-state";

import { getFileContentById, postFileContent } from "./api/indexApi";
import { useParams } from "react-router";

import useKey from "./hooks/useKey";
import CommandOpenFile from "./CommandFileList";

const Editor = () => {
  const monacoRef = useRef();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [languages, setLanguages] = useState([]);
  const [isFileListOpen, setFileListOpen] = useState(false);
  const [editorLanguage, setEditorLanguage] = useLocalStorageState("editorLanguage", "markdown");
  const [editorContent, setEditorContent] = useState("");

  const {
    data = { fileExt: "markdown" },
    isLoading,
    isError,
    error,
  } = useQuery(["fileContentById", id], () => getFileContentById(id));

  const { mutateAsync } = useMutation(postFileContent, {
    onSuccess: () => queryClient.invalidateQueries(["fileContentById", id]),
  });

  const handleSubmitContent = async () => await mutateAsync({ ...data, content: editorContent, id });

  useKey("KeyS", () => handleSubmitContent());
  useKey("Escape", () => setFileListOpen(false));

  const openFileList = () => setFileListOpen(true);
  const closeFileList = () => setFileListOpen(false);

  useEffect(() => {
    for (let language of languages) {
      for (let ext of language.extensions) {
        if (ext === data.fileExt) {
          setEditorLanguage(language.id);
        }
      }
    }
  }, [data.fileExt]);

  if (isLoading) {
    return null;
  }

  if (isError) {
    throw new Error(error);
  }

  const handleEditorWillMount = (monaco) => {
    monaco.editor.defineTheme("RougeNoItalics", {
      base: "vs-dark",
      inherit: false,
      rules: [
        { token: "", foreground: "DB6E8F", background: "1f2937" },
        { token: "invalid", foreground: "bbbbbb" },
        { token: "emphasis", fontStyle: "italic" },
        { token: "strong", fontStyle: "bold" },

        { token: "variable", foreground: "C6878F" },
        { token: "variable.predefined", foreground: "4864AA" },
        { token: "variable.parameter", foreground: "DB6E8F" },
        { token: "constant", foreground: "eabe9a" },
        { token: "comment", foreground: "64727d" },
        { token: "number", foreground: "B5CEA8" },
        { token: "number.hex", foreground: "5BB498" },
        { token: "regexp", foreground: "A3B09A" },
        { token: "annotation", foreground: "cc6666" },
        { token: "type", foreground: "b18bb1" },
        { token: "identifier.js", foreground: "BBBBBB" },
        { token: "type.identifier.js", foreground: "C6878F" },

        { token: "delimiter", foreground: "DCDCDC" },
        { token: "delimiter.parenthesis.js", foreground: "C6878F" },
        { token: "delimiter.html", foreground: "808080" },
        { token: "delimiter.xml", foreground: "808080" },

        { token: "tag", foreground: "569CD6" },
        { token: "tag.id.jade", foreground: "4F76AC" },
        { token: "tag.class.jade", foreground: "4F76AC" },
        { token: "meta.scss", foreground: "A79873" },
        { token: "meta.tag", foreground: "bbbbbb" },
        { token: "metatag", foreground: "b18bb1" },
        { token: "metatag.content.html", foreground: "b18bb1" },
        { token: "metatag.html", foreground: "b18bb1" },
        { token: "metatag.xml", foreground: "b18bb1" },
        { token: "metatag.php", fontStyle: "bold" },
        { token: "meta.export.default.js", foreground: "DB6E8F" },

        { token: "key", foreground: "b18bb1" },
        { token: "string.key.json", foreground: "BBBBBB" },
        { token: "string.value.json", foreground: "CE9178" },

        { token: "attribute.name", foreground: "F7E3AF" },
        { token: "attribute.value", foreground: "808080" },
        { token: "attribute.value.number.css", foreground: "B5CEA8" },
        { token: "attribute.value.unit.css", foreground: "B5CEA8" },
        { token: "attribute.value.hex.css", foreground: "D4D4D4" },

        { token: "string", foreground: "A3B09A" },
        { token: "string.sql", foreground: "FF0000" },
        { token: "string.link.md", foreground: "bbbbbb" },

        { token: "keyword", foreground: "b18bb1" },
        { token: "keyword.flow", foreground: "C586C0" },
        { token: "keyword.json", foreground: "CE9178" },
        { token: "keyword.flow.scss", foreground: "569CD6" },
        // { token: "keyword.md", foreground: "" },

        { token: "operator.scss", foreground: "909090" },
        { token: "operator.sql", foreground: "778899" },
        { token: "operator.swift", foreground: "909090" },
        { token: "predefined.sql", foreground: "FF00FF" },
      ],
      colors: {
        "editor.background": "#1f2937",
        "editor.foreground": "#DB6E8F",
      },
    });

    setLanguages(monaco.languages.getLanguages());
  };

  const selectFolderHandler = () => {
    const folderInput = document.getElementById("folder-input");
    folderInput.click();
  };

  const handleEditorDidMount = (editor, monaco) => {
    monacoRef.current = editor;
    editor.addAction({
      id: "OPEN_FOLDER",
      label: "Open Folder",
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_O],
      run: () => selectFolderHandler(),
    });
    editor.addAction({
      id: "OPEN_FILE",
      label: "Open File",
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_K],
      run: () => openFileList(),
    });
  };

  return (
    <div className='mt-1 pt-2'>
      <MonacoEditor
        language={editorLanguage}
        defaultValue={data.content}
        beforeMount={handleEditorWillMount}
        onMount={handleEditorDidMount}
        onChange={(value) => setEditorContent(value)}
        theme='RougeNoItalics'
        path={id}
        options={{
          minimap: {
            enabled: false,
          },
          fontSize: 16,
        }}
        autoFocus
      />
      {isFileListOpen && <CommandOpenFile closeFileList={closeFileList} />}
    </div>
  );
};

export default Editor;
