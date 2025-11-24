import { describe, it, expect } from 'vitest';
import { validateEnv } from '../validator';
import { EnvVariable } from '../types';

describe('Validator', () => {
  it('debería detectar variables faltantes', () => {
    const example = new Map<string, EnvVariable>([
      ['KEY1', { key: 'KEY1', value: 'value1' }],
      ['KEY2', { key: 'KEY2', value: 'value2' }],
    ]);

    const current = new Map<string, EnvVariable>([
      ['KEY1', { key: 'KEY1', value: 'value1' }],
    ]);

    const result = validateEnv(example, current);

    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].type).toBe('missing');
    expect(result.errors[0].key).toBe('KEY2');
  });

  it('debería detectar variables vacías', () => {
    const example = new Map<string, EnvVariable>([
      ['KEY1', { key: 'KEY1', value: 'value1' }],
    ]);

    const current = new Map<string, EnvVariable>([
      ['KEY1', { key: 'KEY1', value: '' }],
    ]);

    const result = validateEnv(example, current);

    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].type).toBe('empty');
  });

  it('debería detectar variables extras en modo estricto', () => {
    const example = new Map<string, EnvVariable>([
      ['KEY1', { key: 'KEY1', value: 'value1' }],
    ]);

    const current = new Map<string, EnvVariable>([
      ['KEY1', { key: 'KEY1', value: 'value1' }],
      ['KEY2', { key: 'KEY2', value: 'value2' }],
    ]);

    const result = validateEnv(example, current, { strict: true });

    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].type).toBe('extra');
  });

  it('debería validar tipos correctamente', () => {
    const example = new Map<string, EnvVariable>([
      ['PORT', { key: 'PORT', value: '3000', type: 'number' }],
      ['DEBUG', { key: 'DEBUG', value: 'true', type: 'boolean' }],
      ['URL', { key: 'URL', value: 'https://example.com', type: 'url' }],
    ]);

    const current = new Map<string, EnvVariable>([
      ['PORT', { key: 'PORT', value: 'not-a-number' }],
      ['DEBUG', { key: 'DEBUG', value: 'yes' }],
      ['URL', { key: 'URL', value: 'not-a-url' }],
    ]);

    const result = validateEnv(example, current, { validateTypes: true });

    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(3);
    expect(result.errors.every(e => e.type === 'type_mismatch')).toBe(true);
  });

  it('debería permitir variables opcionales faltantes como warnings', () => {
    const example = new Map<string, EnvVariable>([
      ['REQUIRED', { key: 'REQUIRED', value: 'value' }],
      ['OPTIONAL', { key: 'OPTIONAL', value: '', optional: true }],
    ]);

    const current = new Map<string, EnvVariable>([
      ['REQUIRED', { key: 'REQUIRED', value: 'value' }],
    ]);

    const result = validateEnv(example, current);

    expect(result.valid).toBe(true);
    expect(result.warnings).toHaveLength(1);
    expect(result.warnings[0].key).toBe('OPTIONAL');
  });

  it('debería pasar cuando todo está correcto', () => {
    const example = new Map<string, EnvVariable>([
      ['KEY1', { key: 'KEY1', value: 'value1' }],
    ]);

    const current = new Map<string, EnvVariable>([
      ['KEY1', { key: 'KEY1', value: 'actual-value' }],
    ]);

    const result = validateEnv(example, current);

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});


