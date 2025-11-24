import { Upload } from "lucide-react";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import { readFileAsText } from "../utils/fileUtils";

interface FileUploadZoneProps {
  id: string;
  label: string;
  accept?: string;
  onFileSelect: (file: File) => void;
  onFileDrop: (content: string, fileName: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  fileName?: string;
}

export function FileUploadZone({
  id,
  label,
  accept = ".env,.env.*",
  onFileSelect,
  onFileDrop,
  inputRef,
  fileName,
}: FileUploadZoneProps) {
  const handleFileDrop = async (file: File) => {
    try {
      const content = await readFileAsText(file);
      onFileDrop(content, file.name);
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const { isDragging, dragHandlers } = useDragAndDrop(handleFileDrop);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
          id={id}
        />
        <label
          htmlFor={id}
          {...dragHandlers}
          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
            isDragging
              ? "border-cyan-400 bg-cyan-500/20"
              : "border-gray-700 bg-gray-900/50 hover:bg-gray-900/70 hover:border-cyan-500/50"
          }`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-10 h-10 mb-3 text-cyan-400" />
            <p className="mb-2 text-sm text-gray-300">
              <span className="font-semibold">Click para subir</span> o arrastra
              el archivo
            </p>
            <p className="text-xs text-gray-400">.env, .env.example, etc.</p>
          </div>
        </label>
      </div>
      {fileName && (
        <div className="flex items-center gap-2 text-sm text-gray-300 bg-gray-900/50 p-3 rounded-lg">
          <span className="truncate">{fileName}</span>
        </div>
      )}
    </div>
  );
}

