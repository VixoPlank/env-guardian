# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [Unreleased]

### Planeado
- Soporte para archivos `.env` encriptados
- Integración con CI/CD (GitHub Actions, GitLab CI)
- Plugin para VSCode
- Soporte para múltiples archivos de entorno
- Auto-completado en el CLI

## [0.1.0] - 2025-01-XX

### Añadido
- ✨ CLI inicial con comando `validate`
- ✨ Comando `init` para generar `.env` desde `.env.example`
- ✨ Comando `check` para verificación no bloqueante
- ✨ Detección de variables faltantes
- ✨ Detección de variables extras (modo `--strict`)
- ✨ Detección de variables vacías
- ✨ Validación de tipos:
  - `string`
  - `number`
  - `boolean`
  - `url`
  - `email`
  - `json`
- ✨ Soporte para variables opcionales (`@optional`)
- ✨ Salida colorida y amigable
- ✨ Parser de archivos `.env` con soporte para comentarios
- 📝 Documentación completa
- 🧪 Suite de tests con Vitest
- 📦 Configuración de npm package

### Aplicación Web (en desarrollo)
- 🚧 Estructura inicial con React + Vite
- 🚧 Integración con Tailwind CSS
- 🚧 Componentes UI base

[Unreleased]: https://github.com/tu-usuario/env-guardian/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/tu-usuario/env-guardian/releases/tag/v0.1.0


