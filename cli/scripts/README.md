# 🛠️ Scripts de desarrollo

Esta carpeta contiene scripts útiles para el desarrollo del CLI.

## 📋 Scripts disponibles

### 1. `dev-menu.sh` (Recomendado)

**Menú interactivo completo** para desarrollo.

```bash
# Linux/Mac/Git Bash (Windows)
./scripts/dev-menu.sh
```

#### Características:

- **🔍 Validar archivos .env** - Compara tu .env con .env.example:
  - Elige archivos de `examples/` o tus propios archivos
  - Crea archivos temporales para probar
  - Configura modo estricto, validación de tipos, etc.
  - ✨ Auto-compila automáticamente

- **📝 Generar archivo .env** - Crea un .env desde .env.example:
  - Selecciona cualquier ejemplo
  - Genera plantilla lista para completar
  - ✨ Auto-compila automáticamente

- **🎯 Probar todos los ejemplos** - Valida todos los archivos de ejemplo:
  - Ve cómo funciona la herramienta
  - Prueba diferentes configuraciones
  - ✨ Auto-compila automáticamente

- **🧹 Limpiar** - Elimina archivos temporales generados

### 2. `test-cli.sh`

**Script de prueba rápida** - Útil para desarrollo y contribuciones al proyecto.

```bash
# Linux/Mac/Git Bash (Windows)
./scripts/test-cli.sh
```

#### Qué hace:

1. Compila el proyecto
2. Crea archivos de prueba temporales
3. Ejecuta comandos básicos (versión, ayuda, validate, init)
4. Limpia archivos temporales

## 🚀 Uso rápido

### Primera vez (Linux/Mac)

```bash
cd cli

# Dar permisos de ejecución
chmod +x scripts/dev-menu.sh
chmod +x scripts/test-cli.sh

# Ejecutar menú interactivo
./scripts/dev-menu.sh
```

### Primera vez (Windows con Git Bash)

```bash
cd cli

# Ejecutar menú interactivo
./scripts/dev-menu.sh
```

## 💡 Casos de uso

### Uso diario (validar archivos .env)

Usa `dev-menu.sh` para:
- ✅ Validar tu .env contra .env.example
- ✅ Generar nuevos archivos .env
- ✅ Probar con ejemplos incluidos
- ✅ Comparar diferentes configuraciones

### Desarrollo/Contribuciones al proyecto

Si estás desarrollando o contribuyendo al CLI:
- Usa `npm test` directamente para tests
- Usa `npm run build` para compilar
- O usa `test-cli.sh` para pruebas rápidas

## 📝 Notas

- Los scripts automáticamente cambian al directorio correcto (`cli/`)
- Pueden ejecutarse desde cualquier ubicación
- Los archivos temporales se limpian automáticamente
- Los ejemplos se leen de la carpeta `examples/`

## 🐛 Troubleshooting

### Permiso denegado (Linux/Mac)

```bash
chmod +x scripts/*.sh
```

### Script no se ejecuta (Windows)

Usa Git Bash en Windows. Si no lo tienes instalado:
- Descarga [Git for Windows](https://git-scm.com/download/win)
- Incluye Git Bash automáticamente

### No encuentra archivos de ejemplo

Asegúrate de estar en la carpeta `cli/`:

```bash
cd cli
./scripts/dev-menu.sh
```

## 🎨 Personalización

Puedes modificar los scripts para:
- Agregar más opciones al menú
- Cambiar comandos por defecto
- Agregar validaciones personalizadas
- Integrar con otras herramientas

## 📚 Recursos

- [Bash Scripting Guide](https://tldp.org/LDP/abs/html/)
- [Git Bash for Windows](https://git-scm.com/download/win)

