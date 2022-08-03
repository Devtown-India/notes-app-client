import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";

const Editor = ({ placeholder, setEditor }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = {
    readonly: false,
    placeholder: placeholder || "Start Writing",
  };

  useEffect(() => {
    setEditor(editor);
  }, [editor]);

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
    []
  );
};

export default Editor;
