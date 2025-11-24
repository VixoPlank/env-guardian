import { useState, useRef, useCallback } from "react";

interface UseFileUploadReturn {
  content: string;
  fileName: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  setContent: (content: string) => void;
  setName: (name: string) => void;
  handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clear: () => void;
}

export function useFileUpload(): UseFileUploadReturn {
  const [content, setContent] = useState<string>("");
  const [fileName, setName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    setName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setContent(content);
    };
    reader.onerror = () => {
      throw new Error("Error al leer el archivo");
    };
    reader.readAsText(file);
  }, []);

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        processFile(file);
      }
    },
    [processFile]
  );

  const clear = useCallback(() => {
    setContent("");
    setName("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, []);

  return {
    content,
    fileName,
    inputRef,
    setContent,
    setName,
    handleFileSelect,
    clear,
  };
}

