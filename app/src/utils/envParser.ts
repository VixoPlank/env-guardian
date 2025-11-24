export type ValidationType = 'string' | 'number' | 'boolean' | 'url' | 'email' | 'json';

export interface EnvVariable {
  key: string;
  value: string;
  type?: ValidationType;
  optional?: boolean;
  comment?: string;
}

export interface ParsedEnv {
  variables: Map<string, EnvVariable>;
}

/**
 * Parsea el contenido de un archivo .env desde texto
 */
export function parseEnvContent(content: string): ParsedEnv {
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

export interface ComparisonResult {
  onlyInFile1: Array<{ key: string; value: string }>;
  onlyInFile2: Array<{ key: string; value: string }>;
  differentValues: Array<{
    key: string;
    value1: string;
    value2: string;
  }>;
  sameValues: Array<{ key: string; value: string }>;
}

/**
 * Compara dos archivos .env parseados
 */
export function compareEnvFiles(
  file1: ParsedEnv,
  file2: ParsedEnv
): ComparisonResult {
  const onlyInFile1: Array<{ key: string; value: string }> = [];
  const onlyInFile2: Array<{ key: string; value: string }> = [];
  const differentValues: Array<{
    key: string;
    value1: string;
    value2: string;
  }> = [];
  const sameValues: Array<{ key: string; value: string }> = [];

  const allKeys = new Set([
    ...file1.variables.keys(),
    ...file2.variables.keys(),
  ]);

  for (const key of allKeys) {
    const var1 = file1.variables.get(key);
    const var2 = file2.variables.get(key);

    if (!var1 && var2) {
      onlyInFile2.push({ key, value: var2.value });
    } else if (var1 && !var2) {
      onlyInFile1.push({ key, value: var1.value });
    } else if (var1 && var2) {
      if (var1.value !== var2.value) {
        differentValues.push({
          key,
          value1: var1.value,
          value2: var2.value,
        });
      } else {
        sameValues.push({ key, value: var1.value });
      }
    }
  }

  return {
    onlyInFile1,
    onlyInFile2,
    differentValues,
    sameValues,
  };
}

/**
 * Genera un archivo .env con valores vacíos preservando la estructura original
 */
export function generateEmptyEnv(content: string): string {
  const lines = content.split("\n");
  const result: string[] = [];

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Preservar líneas vacías
    if (!trimmedLine) {
      result.push("");
      continue;
    }

    // Preservar comentarios
    if (trimmedLine.startsWith("#")) {
      result.push(line); // Mantener la línea original con espacios
      continue;
    }

    // Parsear variable: KEY=value y generar KEY=
    const match = trimmedLine.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (match) {
      const [, key] = match;
      // Preservar el formato original (espacios antes y después del =)
      const originalFormat = line.match(/^(\s*)([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
      if (originalFormat) {
        const [, leadingSpaces] = originalFormat;
        result.push(`${leadingSpaces}${key}=`);
      } else {
        result.push(`${key}=`);
      }
    } else {
      // Si no es una variable, preservar la línea tal cual
      result.push(line);
    }
  }

  return result.join("\n");
}

