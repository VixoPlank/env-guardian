import { describe, it, expect } from 'vitest';
import { parseEnvFile } from '../parser';
import { writeFileSync, unlinkSync } from 'fs';
import { join } from 'path';

const TEST_FILE = join(process.cwd(), '.env.test.tmp');

describe('Parser', () => {
  it('debería parsear variables simples', () => {
    const content = `KEY1=value1
KEY2=value2`;
    
    writeFileSync(TEST_FILE, content);
    const result = parseEnvFile(TEST_FILE);
    unlinkSync(TEST_FILE);

    expect(result.variables.size).toBe(2);
    expect(result.variables.get('KEY1')?.value).toBe('value1');
    expect(result.variables.get('KEY2')?.value).toBe('value2');
  });

  it('debería detectar tipos en comentarios', () => {
    const content = `# @type number
PORT=3000`;
    
    writeFileSync(TEST_FILE, content);
    const result = parseEnvFile(TEST_FILE);
    unlinkSync(TEST_FILE);

    expect(result.variables.get('PORT')?.type).toBe('number');
  });

  it('debería detectar variables opcionales', () => {
    const content = `# @optional
OPTIONAL_VAR=`;
    
    writeFileSync(TEST_FILE, content);
    const result = parseEnvFile(TEST_FILE);
    unlinkSync(TEST_FILE);

    expect(result.variables.get('OPTIONAL_VAR')?.optional).toBe(true);
  });

  it('debería ignorar comentarios normales', () => {
    const content = `# Este es un comentario
KEY=value`;
    
    writeFileSync(TEST_FILE, content);
    const result = parseEnvFile(TEST_FILE);
    unlinkSync(TEST_FILE);

    expect(result.variables.get('KEY')?.comment).toBe('Este es un comentario');
  });

  it('debería manejar comillas', () => {
    const content = `KEY1="value with spaces"
KEY2='single quotes'`;
    
    writeFileSync(TEST_FILE, content);
    const result = parseEnvFile(TEST_FILE);
    unlinkSync(TEST_FILE);

    expect(result.variables.get('KEY1')?.value).toBe('value with spaces');
    expect(result.variables.get('KEY2')?.value).toBe('single quotes');
  });
});


