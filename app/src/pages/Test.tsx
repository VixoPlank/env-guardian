import { useState, useCallback } from "react";
import { Link } from "wouter";
import { Button } from "../components/ui/button";
import { ArrowLeft, GitCompare, Copy, Download } from "lucide-react";
import {
  parseEnvContent,
  compareEnvFiles,
  generateEmptyEnv,
  type ComparisonResult,
} from "../utils/envParser";
import { useFileUpload } from "../hooks/useFileUpload";
import { usePreventDefaultDrag } from "../hooks/usePreventDefaultDrag";
import { FileUploadZone } from "../components/FileUploadZone";
import { ComparisonResults } from "../components/ComparisonResults";
import {
  readFileAsText,
  downloadFile,
  copyToClipboard,
  generateExampleFileName,
} from "../utils/fileUtils";

export default function TestPage() {
  usePreventDefaultDrag();

  // File comparison state
  const file1 = useFileUpload();
  const file2 = useFileUpload();
  const [comparisonResult, setComparisonResult] =
    useState<ComparisonResult | null>(null);

  // Clone state
  const cloneFile = useFileUpload();
  const [emptyEnvContent, setEmptyEnvContent] = useState<string>("");

  const handleFile1Select = useCallback(
    async (file: File) => {
      try {
        const content = await readFileAsText(file);
        file1.setContent(content);
        file1.setName(file.name);
      } catch (error) {
        alert((error as Error).message);
      }
    },
    [file1]
  );

  const handleFile2Select = useCallback(
    async (file: File) => {
      try {
        const content = await readFileAsText(file);
        file2.setContent(content);
        file2.setName(file.name);
      } catch (error) {
        alert((error as Error).message);
      }
    },
    [file2]
  );

  const handleCloneFileSelect = useCallback(
    async (file: File) => {
      try {
        const content = await readFileAsText(file);
        cloneFile.setContent(content);
        cloneFile.setName(file.name);
      } catch (error) {
        alert((error as Error).message);
      }
    },
    [cloneFile]
  );

  const handleCompare = useCallback(() => {
    if (!file1.content || !file2.content) {
      alert("Por favor, sube ambos archivos .env para comparar");
      return;
    }

    try {
      const parsed1 = parseEnvContent(file1.content);
      const parsed2 = parseEnvContent(file2.content);
      const result = compareEnvFiles(parsed1, parsed2);
      setComparisonResult(result);
    } catch (error) {
      alert(`Error al comparar archivos: ${(error as Error).message}`);
    }
  }, [file1.content, file2.content]);

  const handleClearComparison = useCallback(() => {
    file1.clear();
    file2.clear();
    setComparisonResult(null);
  }, [file1, file2]);

  const handleGenerateEmpty = useCallback(() => {
    if (!cloneFile.content) {
      alert("Por favor, sube un archivo .env para generar el clon");
      return;
    }

    try {
      const emptyEnv = generateEmptyEnv(cloneFile.content);
      setEmptyEnvContent(emptyEnv);
    } catch (error) {
      alert(`Error al generar archivo vacío: ${(error as Error).message}`);
    }
  }, [cloneFile.content]);

  const handleDownloadEmpty = useCallback(() => {
    if (!emptyEnvContent || !cloneFile.fileName) return;
    const fileName = generateExampleFileName(cloneFile.fileName);
    downloadFile(emptyEnvContent, fileName);
  }, [emptyEnvContent, cloneFile.fileName]);

  const handleCopyToClipboard = useCallback(async () => {
    if (!emptyEnvContent) return;
    try {
      await copyToClipboard(emptyEnvContent);
      alert("Contenido copiado al portapapeles");
    } catch (error) {
      alert((error as Error).message);
    }
  }, [emptyEnvContent]);

  const handleClearClone = useCallback(() => {
    cloneFile.clear();
    setEmptyEnvContent("");
  }, [cloneFile]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center px-4 py-12">
      <div className="max-w-6xl mx-auto w-full space-y-8">
        <Link href="/">
          <Button
            variant="ghost"
            className="mb-4 text-gray-200 hover:text-white hover:bg-gray-800/40 border border-transparent hover:border-gray-700/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        </Link>

        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white flex items-center justify-center gap-3">
            <GitCompare className="w-10 h-10 text-cyan-400" />
            Herramientas .env
          </h1>
          <p className="text-xl text-gray-300">
            Compara archivos .env o crea un clon con valores vacíos
          </p>
        </div>

        <div className="border-t border-gray-800 my-12"></div>

        {/* Clone Section */}
        <section className="space-y-6">
          <div className="text-center space-y-2 mb-6">
            <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
              <Copy className="w-8 h-8 text-blue-400" />
              Crear Clon con Valores Vacíos
            </h2>
            <p className="text-lg text-gray-300">
              Genera un archivo .env.example desde tu archivo .env
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            <FileUploadZone
              id="cloneFile"
              label="Archivo .env a clonar"
              onFileSelect={handleCloneFileSelect}
              onFileDrop={(content, fileName) => {
                cloneFile.setContent(content);
                cloneFile.setName(fileName);
              }}
              inputRef={cloneFile.inputRef}
              fileName={cloneFile.fileName}
            />

            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleGenerateEmpty}
                disabled={!cloneFile.content}
                className="px-8 bg-blue-600 hover:bg-blue-700 text-white border-0"
              >
                <Copy className="w-5 h-5 mr-2" />
                Generar Clon Vacío
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleClearClone}
                className="px-8 border-gray-500/50 bg-gray-900/30 text-gray-200 hover:text-white hover:bg-gray-800/60 hover:border-gray-400"
              >
                Limpiar
              </Button>
            </div>

            {emptyEnvContent && (
              <div className="space-y-4">
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white">
                      Archivo generado
                    </h3>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCopyToClipboard}
                        className="border-gray-500/50 bg-gray-900/30 text-gray-200 hover:text-white hover:bg-gray-800/60 hover:border-gray-400"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copiar
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleDownloadEmpty}
                        className="bg-green-600 hover:bg-green-700 text-white border-0"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Descargar
                      </Button>
                    </div>
                  </div>
                  <pre className="bg-gray-950 rounded p-4 overflow-x-auto text-sm text-gray-300 font-mono max-h-96 overflow-y-auto">
                    {emptyEnvContent}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </section>

        <div className="border-t border-gray-800 my-12"></div>

        {/* Compare Section */}
        <section className="space-y-6">
          <div className="text-center space-y-2 mb-6">
            <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
              <GitCompare className="w-8 h-8 text-purple-400" />
              Comparar Archivos .env
            </h2>
            <p className="text-lg text-gray-300">
              Sube dos archivos .env para comparar sus diferencias
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <FileUploadZone
              id="file1"
              label="Archivo .env #1"
              onFileSelect={handleFile1Select}
              onFileDrop={(content, fileName) => {
                file1.setContent(content);
                file1.setName(fileName);
              }}
              inputRef={file1.inputRef}
              fileName={file1.fileName}
            />

            <FileUploadZone
              id="file2"
              label="Archivo .env #2"
              onFileSelect={handleFile2Select}
              onFileDrop={(content, fileName) => {
                file2.setContent(content);
                file2.setName(fileName);
              }}
              inputRef={file2.inputRef}
              fileName={file2.fileName}
            />
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              onClick={handleCompare}
              disabled={!file1.content || !file2.content}
              className="px-8 bg-purple-600 hover:bg-purple-700 text-white border-0"
            >
              <GitCompare className="w-5 h-5 mr-2" />
              Comparar Archivos
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleClearComparison}
              className="px-8 border-gray-500/50 bg-gray-900/30 text-gray-200 hover:text-white hover:bg-gray-800/60 hover:border-gray-400"
            >
              Limpiar
            </Button>
          </div>

          {comparisonResult && <ComparisonResults result={comparisonResult} />}
        </section>
      </div>
    </div>
  );
}
