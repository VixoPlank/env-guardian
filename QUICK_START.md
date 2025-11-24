# 🚀 Guía de inicio rápido

## Para empezar a desarrollar el CLI

### 1. Instalar dependencias

```bash
cd cli
npm install
```

### 2. Ejecutar en modo desarrollo

```bash
# Opción 1: Usar npm run dev con argumentos
npm run dev -- validate --help

# Opción 2: Compilar y ejecutar
npm run build
node dist/index.js validate --help
```

### 3. Probar con ejemplos

```bash
# Validar usando los archivos de ejemplo
npm run dev -- validate --example examples/basic.env.example --env examples/basic.env.example

# Generar un .env desde el ejemplo
npm run dev -- init --example examples/full.env.example --output .env.generated
```

### 4. Ejecutar tests

```bash
npm test

# Con cobertura
npm test -- --coverage

# En modo watch
npm test -- --watch
```

### 5. Scripts de desarrollo

#### 🎯 Menú interactivo (Recomendado)

**Linux/Mac:**

```bash
cd cli
chmod +x scripts/dev-menu.sh
./scripts/dev-menu.sh
```

**Windows (Git Bash):**

```bash
cd cli
./scripts/dev-menu.sh
```

**¿Qué hace?**
- ✅ Valida y compara archivos .env
- ✅ Genera archivos .env desde ejemplos
- ✅ Prueba con todos los ejemplos disponibles
- ✅ Limpia archivos temporales

Todo de forma **interactiva** y con **auto-compilación**.

#### 🚀 Script de prueba rápida

**Linux/Mac:**

```bash
cd cli
chmod +x scripts/test-cli.sh
./scripts/test-cli.sh
```

**Windows (Git Bash):**

```bash
cd cli
./scripts/test-cli.sh
```

## Para desarrollar la App web

### 1. Instalar dependencias

```bash
cd app
pnpm install
# o npm install
```

### 2. Ejecutar en desarrollo

```bash
pnpm dev
# o npm run dev
```

### 3. Abrir en el navegador

```
http://localhost:5173
```

## 📝 Próximos pasos

1. **CLI**: Implementar comandos adicionales

   - `env-guardian diff` - Comparar dos archivos .env
   - `env-guardian sync` - Sincronizar .env con .env.example
   - `env-guardian encrypt` - Encriptar valores sensibles

2. **App**: Crear interfaz web

   - Drag & drop para archivos
   - Visualización de diferencias
   - Exportar reportes

3. **Tests**: Agregar más cobertura

   - Tests de integración
   - Tests E2E para la app

4. **Documentación**: Expandir docs
   - Videos tutoriales
   - Casos de uso comunes
   - FAQ

## 🐛 Problemas comunes

### Error: "Cannot find module"

```bash
# Asegúrate de estar en la carpeta correcta
cd cli  # o cd app

# Reinstala dependencias
rm -rf node_modules
npm install
```

### Error al compilar TypeScript

```bash
# Limpia el build anterior
rm -rf dist

# Compila de nuevo
npm run build
```

### Tests fallan

```bash
# Asegúrate de tener la última versión de las dependencias
npm install

# Ejecuta tests individualmente
npm test -- parser.test.ts
```

## 💡 Tips

- Usa `npm run dev -- <comando>` para ejecutar comandos sin compilar
- Los archivos `.env` de ejemplo están en `cli/examples/`
- Los tests están en `cli/src/__tests__/`
- Revisa el `CHANGELOG.md` para ver los cambios recientes

## 🤝 ¿Necesitas ayuda?

- 📖 Lee el [README completo](./README.md)
- 📋 Revisa [CONTRIBUTING.md](./cli/CONTRIBUTING.md)
- 🐛 Abre un [Issue en GitHub](https://github.com/tu-usuario/env-guardian/issues)
