import { FileText } from "lucide-react";

interface FileDisplayProps {
  fileName: string;
}

export function FileDisplay({ fileName }: FileDisplayProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-300 bg-gray-900/50 p-3 rounded-lg">
      <FileText className="w-4 h-4" />
      <span className="truncate">{fileName}</span>
    </div>
  );
}

