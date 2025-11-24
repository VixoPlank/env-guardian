import { useEffect } from "react";

/**
 * Hook para prevenir el comportamiento por defecto del navegador
 * cuando se arrastran archivos sobre la página
 */
export function usePreventDefaultDrag(): void {
  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };
    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
    };

    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("drop", handleDrop);
    };
  }, []);
}

