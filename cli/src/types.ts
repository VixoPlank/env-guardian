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

export interface ValidationError {
  type: 'missing' | 'extra' | 'empty' | 'type_mismatch';
  key: string;
  message: string;
  expectedType?: ValidationType;
  actualValue?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

export interface ValidatorOptions {
  strict?: boolean;
  allowEmpty?: boolean;
  validateTypes?: boolean;
}


