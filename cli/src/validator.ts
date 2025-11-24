import {
  EnvVariable,
  ValidationError,
  ValidationResult,
  ValidatorOptions,
  ValidationType,
} from './types.js';

/**
 * Valida que un valor cumpla con el tipo especificado
 */
function validateType(value: string, type: ValidationType): boolean {
  if (!value) return false;

  switch (type) {
    case 'string':
      return true; // Cualquier string es válido
    
    case 'number':
      return !isNaN(Number(value));
    
    case 'boolean':
      return value.toLowerCase() === 'true' || value.toLowerCase() === 'false';
    
    case 'url':
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    
    case 'json':
      try {
        JSON.parse(value);
        return true;
      } catch {
        return false;
      }
    
    default:
      return true;
  }
}

/**
 * Valida el archivo .env contra .env.example
 */
export function validateEnv(
  exampleVars: Map<string, EnvVariable>,
  envVars: Map<string, EnvVariable>,
  options: ValidatorOptions = {}
): ValidationResult {
  const {
    strict = false,
    allowEmpty = false,
    validateTypes = true,
  } = options;

  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  // 1. Verificar variables faltantes
  for (const [key, exampleVar] of exampleVars) {
    if (!envVars.has(key)) {
      // Si es opcional, es un warning, no un error
      if (exampleVar.optional) {
        warnings.push({
          type: 'missing',
          key,
          message: `Variable opcional '${key}' no está definida`,
        });
      } else {
        errors.push({
          type: 'missing',
          key,
          message: `Variable requerida '${key}' no encontrada en .env`,
        });
      }
      continue;
    }

    const envVar = envVars.get(key)!;

    // 2. Verificar valores vacíos
    if (!allowEmpty && !envVar.value && !exampleVar.optional) {
      errors.push({
        type: 'empty',
        key,
        message: `Variable '${key}' está vacía`,
      });
    }

    // 3. Verificar tipos si está habilitado
    if (validateTypes && exampleVar.type && envVar.value) {
      if (!validateType(envVar.value, exampleVar.type)) {
        errors.push({
          type: 'type_mismatch',
          key,
          message: `Variable '${key}' tiene un tipo inválido. Se esperaba '${exampleVar.type}'`,
          expectedType: exampleVar.type,
          actualValue: envVar.value,
        });
      }
    }
  }

  // 4. Verificar variables extras (solo en modo estricto)
  if (strict) {
    for (const key of envVars.keys()) {
      if (!exampleVars.has(key)) {
        errors.push({
          type: 'extra',
          key,
          message: `Variable '${key}' no está definida en .env.example`,
        });
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}


