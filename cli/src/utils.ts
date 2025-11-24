import { existsSync } from 'fs';
import chalk from 'chalk';
import { ValidationResult } from './types.js';

/**
 * Verifica que un archivo existe
 */
export function checkFileExists(filePath: string): boolean {
  return existsSync(filePath);
}

/**
 * Imprime el resultado de la validación de forma colorida
 */
export function printValidationResult(result: ValidationResult): void {
  console.log();

  if (result.valid && result.warnings.length === 0) {
    console.log(chalk.green.bold('✓ ¡Todo está perfecto!'));
    console.log(chalk.gray('Tu archivo .env está correctamente configurado.'));
    return;
  }

  // Imprimir errores
  if (result.errors.length > 0) {
    console.log(chalk.red.bold(`✗ ${result.errors.length} error(es) encontrado(s):\n`));
    
    for (const error of result.errors) {
      console.log(chalk.red('  ✗'), formatError(error));
    }
    console.log();
  }

  // Imprimir warnings
  if (result.warnings.length > 0) {
    console.log(chalk.yellow.bold(`⚠ ${result.warnings.length} advertencia(s):\n`));
    
    for (const warning of result.warnings) {
      console.log(chalk.yellow('  ⚠'), formatWarning(warning));
    }
    console.log();
  }

  // Resumen
  if (!result.valid) {
    console.log(chalk.red.bold('✗ Validación fallida'));
    console.log(chalk.gray('Por favor, corrige los errores antes de continuar.\n'));
  } else if (result.warnings.length > 0) {
    console.log(chalk.yellow.bold('⚠ Validación exitosa con advertencias\n'));
  }
}

function formatError(error: ValidationResult['errors'][0]): string {
  switch (error.type) {
    case 'missing':
      return `${chalk.bold(error.key)}: ${error.message}`;
    
    case 'empty':
      return `${chalk.bold(error.key)}: ${error.message}`;
    
    case 'extra':
      return `${chalk.bold(error.key)}: ${error.message}`;
    
    case 'type_mismatch':
      return `${chalk.bold(error.key)}: ${error.message}\n    Valor actual: ${chalk.cyan(error.actualValue || 'N/A')}`;
    
    default:
      return error.message;
  }
}

function formatWarning(warning: ValidationResult['warnings'][0]): string {
  return `${chalk.bold(warning.key)}: ${warning.message}`;
}

/**
 * Genera un mensaje de ayuda con ejemplos
 */
export function printExamples(): void {
  console.log(chalk.bold('\n📚 Ejemplos de uso:\n'));
  console.log('  Validar con archivos por defecto:');
  console.log(chalk.cyan('    $ env-guardian validate\n'));
  console.log('  Validar archivos específicos:');
  console.log(chalk.cyan('    $ env-guardian validate --example .env.example --env .env.local\n'));
  console.log('  Modo estricto (no permite variables extras):');
  console.log(chalk.cyan('    $ env-guardian validate --strict\n'));
  console.log('  Permitir valores vacíos:');
  console.log(chalk.cyan('    $ env-guardian validate --allow-empty\n'));
  console.log('  Sin validación de tipos:');
  console.log(chalk.cyan('    $ env-guardian validate --no-types\n'));
}


