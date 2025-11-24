# 🛡️ env-guardian CLI

Una herramienta de línea de comandos poderosa para validar y gestionar archivos `.env` basándose en `.env.example`.

> 📖 **Documentación general:** Ver [README.md](../README.md) para información sobre el proyecto completo.

## 📦 Instalación

Este proyecto se ejecuta desde el código fuente. No es necesario instalar desde npm.

### Configuración

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/env-guardian.git
cd env-guardian/cli

# Instalar dependencias
npm install

# Compilar el proyecto
npm run build
```

### Ejecutar comandos

```bash
# Usando el código compilado
node dist/index.js validate
node dist/index.js init

# O en modo desarrollo (sin compilar)
npm run dev -- validate
npm run dev -- init
```

## 🚀 Características

- ✅ **Detección de variables faltantes** en tu `.env`
- ✅ **Detección de variables extras** que no deberían existir
- ✅ **Detección de variables vacías** (sin valor)
- ✅ **Validación de tipos** (string, number, boolean, url, email, json)
- ✅ **Variables opcionales** con soporte `@optional`
- ✅ **Modo estricto** para validación completa
- ✅ Salida colorida y clara
- ✅ Modo CI/CD friendly con códigos de salida

## 🎯 Comandos

### `validate` - Validar archivo .env

Valida tu archivo `.env` contra `.env.example`:

```bash
node dist/index.js validate
# o en desarrollo:
npm run dev -- validate
```

**Opciones:**

```bash
# Especificar archivos personalizados
node dist/index.js validate --example .env.example --env .env.local

# Modo estricto (falla si hay variables extras)
node dist/index.js validate --strict

# Permitir valores vacíos
node dist/index.js validate --allow-empty

# Desactivar validación de tipos
node dist/index.js validate --no-types
```

**Opciones completas:**

- `-e, --example <file>` - Archivo de ejemplo (default: `.env.example`)
- `-f, --env <file>` - Archivo .env a validar (default: `.env`)
- `-s, --strict` - Modo estricto (no permite variables extras)
- `-a, --allow-empty` - Permite valores vacíos
- `--no-types` - Desactiva la validación de tipos

### `init` - Generar archivo .env

Genera un archivo `.env` desde `.env.example`:

```bash
node dist/index.js init
# o en desarrollo:
npm run dev -- init
```

**Opciones:**

```bash
# Especificar archivos personalizados
node dist/index.js init --example .env.example --output .env.local
```

**Opciones completas:**

- `-e, --example <file>` - Archivo de ejemplo (default: `.env.example`)
- `-o, --output <file>` - Archivo de salida (default: `.env`)

### `check` - Verificación silenciosa

Verifica sin salir con código de error (útil para pre-commit hooks):

```bash
node dist/index.js check
# o en desarrollo:
npm run dev -- check
```

### `examples` - Ver ejemplos

Muestra ejemplos de uso y formato:

```bash
node dist/index.js examples
# o en desarrollo:
npm run dev -- examples
```

## 📋 Formato de .env.example

Puedes agregar comentarios especiales para validación de tipos y opciones:

### Tipos soportados

```bash
# @type string
API_URL=https://api.example.com

# @type number
PORT=3000

# @type boolean
DEBUG=true

# @type email
ADMIN_EMAIL=admin@example.com

# @type url
WEBHOOK_URL=https://example.com/webhook

# @type json
CONFIG={"key": "value"}
```

### Variables opcionales

```bash
# @optional
OPTIONAL_FEATURE=
```

### Comentarios descriptivos

```bash
# Esta es la URL base de la API
API_URL=https://api.example.com

# Puerto del servidor
# @type number
PORT=3000
```

## 🔧 Desarrollo

### Requisitos

- Node.js >= 18
- npm o pnpm

### Configuración

```bash
# Instalar dependencias
cd cli
npm install

# Ejecutar en modo desarrollo
npm run dev

# Compilar
npm run build

# Ejecutar tests
npm test
```

### Scripts disponibles

- `npm run dev` - Ejecuta el CLI en modo desarrollo con tsx
- `npm run build` - Compila TypeScript a JavaScript
- `npm run start` - Ejecuta el CLI compilado
- `npm test` - Ejecuta los tests con Vitest
- `npm run lint` - Ejecuta ESLint

## 📖 Ejemplos de uso

### Ejemplo básico

```bash
# .env.example
# @type string
APP_NAME=my-app
# @type number
PORT=3000
# @type boolean
DEBUG=true
```

```bash
# .env
APP_NAME=my-app
PORT=3000
DEBUG=true
```

```bash
$ node dist/index.js validate
✅ Validación exitosa
```

### Ejemplo con errores

```bash
# .env (faltante PORT)
APP_NAME=my-app
DEBUG=true
```

```bash
$ node dist/index.js validate
❌ Error: Variable requerida 'PORT' no encontrada en .env
```

### Ejemplo con modo estricto

```bash
# .env.example
APP_NAME=my-app

# .env
APP_NAME=my-app
EXTRA_VAR=value
```

```bash
$ node dist/index.js validate --strict
❌ Error: Variable 'EXTRA_VAR' no está definida en .env.example
```

## 🔗 Integración con CI/CD

### GitHub Actions

```yaml
name: Validate .env

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: |
          cd cli
          npm install
          npm run build
      - run: node cli/dist/index.js validate --strict
```

### Pre-commit hook

```bash
#!/bin/sh
cd /ruta/al/proyecto/cli
node dist/index.js check
```

## 📝 Licencia

MIT

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor lee [CONTRIBUTING.md](./CONTRIBUTING.md) para más detalles.
