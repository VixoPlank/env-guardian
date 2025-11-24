/**
 * Procesa un archivo y devuelve su contenido como texto
 */
export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      resolve(content);
    };
    reader.onerror = () => {
      reject(new Error("Error al leer el archivo"));
    };
    reader.readAsText(file);
  });
}

/**
 * Descarga un archivo con el contenido especificado
 */
export function downloadFile(content: string, fileName: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Copia texto al portapapeles
 */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    throw new Error("Error al copiar al portapapeles");
  }
}

/**
 * Genera un nombre de archivo para el .env.example
 */
export function generateExampleFileName(originalName: string): string {
  const extension = originalName.includes(".")
    ? originalName.split(".").pop()
    : "env";
  const baseName = originalName.replace(/\.[^/.]+$/, "") || "env";
  return `${baseName}.example.${extension}`;
}

