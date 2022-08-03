import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";

const Editor = ({ placeholder, setEditor,prevContent }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const config = {
    readonly: false,
    placeholder: placeholder || "Start Writing",
  };


  useEffect(() => {
    setEditor(editor);
    if(prevContent)setContent(prevContent);
  }, [editor,prevContent]);

  return useMemo(
    () => (
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1}
        onBlur={(newContent) => setContent(newContent)}
        onChange={(newContent) => {}}
      />
    ),
    [prevContent,content]
  );
};

export default Editor;
