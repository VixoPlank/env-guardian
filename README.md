# 🛡️ env-guardian

Un poderoso validador de archivos `.env` que ayuda a mantener tu configuración sincronizada y libre de errores.

## 📦 ¿Qué es env-guardian?

**env-guardian** es un conjunto de herramientas (CLI + Web App) que valida y gestiona archivos `.env` basándose en `.env.example`, ayudando a evitar errores comunes en producción:

- ✅ **Variables faltantes** - Detecta variables requeridas que no están definidas
- ✅ **Variables extras** - Identifica variables no documentadas en `.env.example`
- ✅ **Variables vacías** - Encuentra variables sin valor asignado
- ✅ **Tipos inválidos** - Valida tipos (string, number, boolean, url, email, json)
- ✅ **Configuración desincronizada** - Mantiene `.env` y `.env.example` alineados

## 🚀 Inicio Rápido

### CLI (Línea de Comandos)

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/env-guardian.git
cd env-guardian/cli

# Instalar dependencias
npm install

# Compilar
npm run build

# Ejecutar comandos
node dist/index.js validate
node dist/index.js init

# O en modo desarrollo
npm run dev -- validate
```

### Aplicación Web

```bash
# Desde la raíz del proyecto
cd app
npm install
npm run dev
```

Abre `http://localhost:5173` en tu navegador.

## 📚 Documentación

### Documentación Principal

- **[📖 CLI Documentation](./cli/README.md)** - Guía completa del CLI con todos los comandos, opciones y ejemplos
- **[🌐 App Documentation](./app/README.md)** - Guía de la aplicación web con todas las funcionalidades y componentes

### Guías de Desarrollo

- **[🚀 Quick Start](./QUICK_START.md)** - Guía rápida para empezar a desarrollar
- **[📁 Project Structure](./PROJECT_STRUCTURE.md)** - Estructura completa del proyecto y arquitectura
- **[🎯 Getting Started](./GETTING_STARTED.md)** - Guía detallada paso a paso para nuevos desarrolladores

## 🎯 Características Principales

### Validación de Tipos

Soporta validación de tipos mediante anotaciones en comentarios:

```bash
# .env.example
# @type number
PORT=3000

# @type url
API_URL=https://api.example.com

# @type email
ADMIN_EMAIL=admin@example.com

# @type boolean
DEBUG=true
```

### Variables Opcionales

Marca variables como opcionales:

```bash
# @optional
OPTIONAL_FEATURE=
```

### Modo Estricto

No permite variables que no estén definidas en `.env.example`:

```bash
cd cli
node dist/index.js validate --strict
```

## 🛠️ Estructura del Proyecto

Este es un **monorepo** que contiene dos herramientas complementarias:

### 🖥️ CLI (`cli/`)

Herramienta de línea de comandos para validación rápida y automatización:

- ✅ Validación desde terminal
- ✅ Integración con CI/CD pipelines
- ✅ Comandos: `validate`, `init`, `check`, `examples`
- ✅ Salida formateada y códigos de salida para scripts

**Ideal para:** Automatización, CI/CD, workflows de desarrollo

### 🌐 App Web (`app/`)

Aplicación web con interfaz gráfica para gestión visual:

- ✅ Comparación visual de archivos `.env`
- ✅ Generación de clones con valores vacíos
- ✅ Drag & drop para fácil uso
- ✅ Interfaz moderna y minimalista
- ✅ Visualización detallada de diferencias

**Ideal para:** Desarrollo interactivo, comparación visual, generación rápida de `.env.example`

Ver [Project Structure](./PROJECT_STRUCTURE.md) para más detalles.

## 🚀 Desarrollo

### Requisitos

- Node.js >= 18
- npm o pnpm

### Configuración Inicial

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/env-guardian.git
cd env-guardian

# Instalar CLI
cd cli
npm install

# Instalar App (en otra terminal)
cd app
npm install
```

### Ejecutar en Desarrollo

```bash
# CLI
cd cli
npm run dev

# App Web
cd app
npm run dev
```

## 📋 Casos de Uso

### Validar antes de deployar

```bash
cd cli
node dist/index.js validate --strict
```

### Generar .env.example automáticamente

Usa la aplicación web para generar un `.env.example` desde tu `.env` con un clic.

### Comparar configuraciones

Usa la aplicación web para comparar dos archivos `.env` y ver las diferencias visualmente.

### Integración CI/CD

```yaml
# .github/workflows/validate.yml
- run: |
    cd cli
    npm install
    npm run build
- run: node cli/dist/index.js validate --strict
```

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor lee [CONTRIBUTING.md](./cli/CONTRIBUTING.md) para más detalles sobre cómo contribuir.

## 📄 Licencia

MIT

## 🌟 ¿Te gusta el proyecto?

Dale una ⭐ en GitHub si te resulta útil!

## 🔗 Enlaces Útiles

- [Issues](https://github.com/tu-usuario/env-guardian/issues) - Reportar bugs o sugerir features
- [Pull Requests](https://github.com/tu-usuario/env-guardian/pulls) - Contribuir código
- [Changelog](./CHANGELOG.md) - Historial de cambios

---

**¿Necesitas ayuda?** Consulta la [documentación del CLI](./cli/README.md) o la [documentación de la App](./app/README.md) para más detalles.
