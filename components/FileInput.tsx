import React, { useCallback, useState } from "react";

export default function FileInput({ identifier, setFile, children, accept }) {
  const onFileChange = useCallback((event) => {
    setFile(event.target.files[0]);
  }, []);

  const onDrop = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    const { files } = event.dataTransfer;
    if (files.length) {
      setFile(files[0]);
    }
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  return (
    <>
      <label htmlFor={identifier} onDrop={onDrop} onDragOver={onDragOver}>
        {children}
      </label>
      <input
        accept={accept}
        hidden={true}
        onChange={onFileChange}
        id={identifier}
        type="file"
      />
    </>
  );
}
