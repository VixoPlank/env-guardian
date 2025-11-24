import { Command } from 'commander';
import chalk from 'chalk';
import { existsSync, writeFileSync } from 'fs';
import { parseEnvFile } from './parser.js';
import { validateEnv } from './validator.js';
import { checkFileExists, printValidationResult, printExamples } from './utils.js';

const program = new Command();

program
  .name('env-guardian')
  .description('🛡️  Valida tu archivo .env basándose en .env.example')
  .version('0.1.0');

/**
 * Comando: validate
 * Valida el archivo .env contra .env.example
 */
program
  .command('validate')
  .description('Valida tu archivo .env')
  .option('-e, --example <file>', 'Archivo de ejemplo', '.env.example')
  .option('-f, --env <file>', 'Archivo .env a validar', '.env')
  .option('-s, --strict', 'Modo estricto (no permite variables extras)', false)
  .option('-a, --allow-empty', 'Permite valores vacíos', false)
  .option('--no-types', 'Desactiva la validación de tipos', false)
  .action((options) => {
    console.log(chalk.bold.cyan('\n🛡️  env-guardian\n'));

    // Verificar que los archivos existen
    if (!checkFileExists(options.example)) {
      console.error(chalk.red(`✗ Error: No se encontró el archivo '${options.example}'`));
      process.exit(1);
    }

    if (!checkFileExists(options.env)) {
      console.error(chalk.red(`✗ Error: No se encontró el archivo '${options.env}'`));
      console.log(chalk.gray(`\nPuedes crear uno con: ${chalk.cyan('env-guardian init')}\n`));
      process.exit(1);
    }

    try {
      // Parsear archivos
      console.log(chalk.gray(`Leyendo ${options.example}...`));
      const exampleEnv = parseEnvFile(options.example);
      
      console.log(chalk.gray(`Leyendo ${options.env}...`));
      const currentEnv = parseEnvFile(options.env);

      // Validar
      console.log(chalk.gray('Validando...\n'));
      const result = validateEnv(exampleEnv.variables, currentEnv.variables, {
        strict: options.strict,
        allowEmpty: options.allowEmpty,
        validateTypes: options.types !== false,
      });

      // Imprimir resultado
      printValidationResult(result);

      // Exit code
      process.exit(result.valid ? 0 : 1);
    } catch (error) {
      console.error(chalk.red('✗ Error al procesar los archivos:'));
      console.error(chalk.red((error as Error).message));
      process.exit(1);
    }
  });

/**
 * Comando: init
 * Genera un archivo .env desde .env.example
 */
program
  .command('init')
  .description('Genera un archivo .env desde .env.example')
  .option('-e, --example <file>', 'Archivo de ejemplo', '.env.example')
  .option('-o, --output <file>', 'Archivo de salida', '.env')
  .option('-f, --force', 'Sobrescribir si existe', false)
  .action((options) => {
    console.log(chalk.bold.cyan('\n🛡️  env-guardian - init\n'));

    // Verificar que .env.example existe
    if (!checkFileExists(options.example)) {
      console.error(chalk.red(`✗ Error: No se encontró el archivo '${options.example}'`));
      process.exit(1);
    }

    // Verificar si .env ya existe
    if (existsSync(options.output) && !options.force) {
      console.error(chalk.red(`✗ Error: El archivo '${options.output}' ya existe`));
      console.log(chalk.gray(`Usa ${chalk.cyan('--force')} para sobrescribirlo.\n`));
      process.exit(1);
    }

    try {
      // Parsear .env.example
      const exampleEnv = parseEnvFile(options.example);
      
      // Generar contenido del nuevo .env
      let content = '# Generado por env-guardian\n';
      content += `# Basado en: ${options.example}\n\n`;

      for (const [key, variable] of exampleEnv.variables) {
        // Agregar comentario si existe
        if (variable.comment) {
          content += `# ${variable.comment}\n`;
        }
        
        // Agregar tipo si existe
        if (variable.type) {
          content += `# @type ${variable.type}\n`;
        }
        
        // Agregar opcional si aplica
        if (variable.optional) {
          content += `# @optional\n`;
        }
        
        // Agregar la variable (vacía para que el usuario la llene)
        content += `${key}=\n\n`;
      }

      // Escribir archivo
      writeFileSync(options.output, content);
      
      console.log(chalk.green(`✓ Archivo '${options.output}' creado exitosamente`));
      console.log(chalk.gray(`\n${exampleEnv.variables.size} variable(s) encontrada(s).`));
      console.log(chalk.yellow('\n⚠ Recuerda completar los valores de las variables.\n'));
    } catch (error) {
      console.error(chalk.red('✗ Error al generar el archivo:'));
      console.error(chalk.red((error as Error).message));
      process.exit(1);
    }
  });

/**
 * Comando: check
 * Solo verifica sin salir con error (útil para pre-commit hooks)
 */
program
  .command('check')
  .description('Verifica sin salir con código de error')
  .option('-e, --example <file>', 'Archivo de ejemplo', '.env.example')
  .option('-f, --env <file>', 'Archivo .env a validar', '.env')
  .option('-s, --strict', 'Modo estricto', false)
  .action((options) => {
    if (!checkFileExists(options.example) || !checkFileExists(options.env)) {
      console.log(chalk.yellow('⚠ Archivos no encontrados, saltando verificación'));
      return;
    }

    try {
      const exampleEnv = parseEnvFile(options.example);
      const currentEnv = parseEnvFile(options.env);
      const result = validateEnv(exampleEnv.variables, currentEnv.variables, {
        strict: options.strict,
      });

      printValidationResult(result);
    } catch (error) {
      console.error(chalk.yellow('⚠ Error al verificar:'), (error as Error).message);
    }
  });

/**
 * Comando: examples
 * Muestra ejemplos de uso
 */
program
  .command('examples')
  .description('Muestra ejemplos de uso')
  .action(() => {
    printExamples();
  });

export function runCLI() {
  program.parse();
}


