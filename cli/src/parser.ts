import { readFileSync } from "fs";
import { EnvVariable, ParsedEnv, ValidationType } from "./types.js";

/**
 * Parsea un archivo .env y extrae las variables con sus metadatos
 */
export function parseEnvFile(filePath: string): ParsedEnv {
  const content = readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  const variables = new Map<string, EnvVariable>();

  let currentComment = "";
  let currentType: ValidationType | undefined;
  let currentOptional = false;

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Ignorar líneas vacías
    if (!trimmedLine) {
      currentComment = "";
      currentType = undefined;
      currentOptional = false;
      continue;
    }

    // Procesar comentarios
    if (trimmedLine.startsWith("#")) {
      const comment = trimmedLine.substring(1).trim();

      // Detectar tipo: # @type string
      const typeMatch = comment.match(
        /@type\s+(string|number|boolean|url|email|json)/i
      );
      if (typeMatch) {
        currentType = typeMatch[1].toLowerCase() as ValidationType;
      }

      // Detectar opcional: # @optional
      if (comment.match(/@optional/i)) {
        currentOptional = true;
      }

      // Guardar comentario regular
      if (!typeMatch && !comment.match(/@optional/i)) {
        currentComment = comment;
      }

      continue;
    }

    // Parsear variable: KEY=value
    const match = trimmedLine.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (match) {
      const [, key, rawValue] = match;

      // Remover comillas si existen
      let value = rawValue.trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      variables.set(key, {
        key,
        value,
        type: currentType,
        optional: currentOptional,
        comment: currentComment || undefined,
      });

      // Reset para la siguiente variable
      currentComment = "";
      currentType = undefined;
      currentOptional = false;
    }
  }

  return { variables };
}

/**
 * Extrae solo las claves de un archivo .env (más simple)
 */
export function extractEnvKeys(filePath: string): Set<string> {
  const parsed = parseEnvFile(filePath);
  return new Set(parsed.variables.keys());
}
