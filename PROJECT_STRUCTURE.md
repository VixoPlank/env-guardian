# 📁 Estructura del Proyecto env-guardian

```
env-guardian/
│
├── .github/
│   └── workflows/
│       ├── ci.yml              # CI para tests automáticos
│       └── publish.yml         # Publicación automática a npm
│
├── .vscode/
│   ├── extensions.json         # Extensiones recomendadas
│   └── settings.json.example   # Configuración de editor
│
├── app/                        # 🎨 Aplicación Web (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   └── ui/
│   │   │       └── button.tsx
│   │   ├── lib/
│   │   │   └── utils.ts
│   │   ├── style/
│   │   │   └── globals.css
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── components.json
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── README.md
│
├── cli/                        # 🛠️ CLI Tool (Node.js + TypeScript)
│   ├── src/
│   │   ├── __tests__/          # 🧪 Tests unitarios
│   │   │   ├── parser.test.ts
│   │   │   └── validator.test.ts
│   │   ├── cli.ts              # Comandos del CLI (validate, init, check)
│   │   ├── index.ts            # Punto de entrada
│   │   ├── parser.ts           # Parser de archivos .env
│   │   ├── types.ts            # Tipos TypeScript
│   │   ├── utils.ts            # Utilidades y formateo
│   │   └── validator.ts        # Lógica de validación
│   │
│   ├── examples/               # 📚 Ejemplos de uso
│   │   ├── basic.env.example
│   │   └── full.env.example
│   │
│   ├── scripts/                # 🚀 Scripts de ayuda
│   │   ├── test-cli.sh         # Script de prueba (Linux/Mac)
│   │   └── test-cli.ps1        # Script de prueba (Windows)
│   │
│   ├── dist/                   # 📦 Código compilado (gitignored)
│   ├── node_modules/           # 📦 Dependencias (gitignored)
│   ├── .gitignore
│   ├── .npmignore
│   ├── CONTRIBUTING.md         # Guía de contribución
│   ├── package.json
│   ├── README.md               # Documentación del CLI
│   ├── tsconfig.json
│   └── vitest.config.ts
│
├── .gitignore                  # Archivos ignorados por git
├── CHANGELOG.md                # Historial de cambios
├── LICENSE                     # Licencia MIT
├── PROJECT_STRUCTURE.md        # Este archivo
├── QUICK_START.md              # Guía de inicio rápido
└── README.md                   # Documentación principal del proyecto

```

## 🎯 Componentes principales del CLI

### 1. **parser.ts** - Parser de archivos .env
- Lee y parsea archivos `.env` y `.env.example`
- Extrae comentarios especiales (`@type`, `@optional`)
- Maneja comillas y valores multilinea

### 2. **validator.ts** - Motor de validación
- Detecta variables faltantes
- Detecta variables extras (modo estricto)
- Detecta variables vacías
- Valida tipos (string, number, boolean, url, email, json)

### 3. **cli.ts** - Comandos del CLI
- `validate` - Valida .env contra .env.example
- `init` - Genera .env desde .env.example
- `check` - Verifica sin error (para CI/CD)
- `examples` - Muestra ejemplos de uso

### 4. **types.ts** - Sistema de tipos
- Interfaces para variables de entorno
- Tipos de validación
- Resultados de validación

### 5. **utils.ts** - Utilidades
- Formateo de mensajes con colores
- Verificación de archivos
- Helpers varios

## 📊 Flujo de trabajo

```
Usuario ejecuta comando
        ↓
    cli.ts procesa comando
        ↓
    parser.ts lee archivos
        ↓
    validator.ts valida
        ↓
    utils.ts formatea resultado
        ↓
    Salida en terminal
```

## 🧪 Testing

Los tests están organizados por módulo:
- `parser.test.ts` - Tests del parser
- `validator.test.ts` - Tests del validador

## 📦 Publicación

El paquete se publica a npm como `@env-guardian/cli`:
- Build automático en GitHub Actions
- Tests antes de publicar
- Versionado semántico

## 🎨 Aplicación Web (futuro)

La aplicación web compartirá la lógica de validación del CLI pero con una interfaz visual:
- Drag & drop de archivos
- Editor visual
- Reportes exportables
- Integración con GitHub

## 🔧 Tecnologías usadas

### CLI
- **TypeScript** - Tipado estático
- **Commander** - Framework de CLI
- **Chalk** - Colores en terminal
- **Vitest** - Testing framework
- **dotenv** - Manejo de .env

### App
- **React 19** - Framework UI
- **Vite** - Build tool
- **Tailwind CSS** - Estilos
- **Shadcn/ui** - Componentes UI

## 📈 Roadmap

### Fase 1: CLI básico ✅
- ✅ Validación de variables
- ✅ Detección de tipos
- ✅ Generación de archivos

### Fase 2: CLI avanzado 🚧
- ⏳ Comando `diff` para comparar
- ⏳ Comando `sync` para sincronizar
- ⏳ Encriptación de valores
- ⏳ Templates predefinidos

### Fase 3: Aplicación Web 📋
- 📋 Interfaz gráfica
- 📋 Editor visual
- 📋 Integración con GitHub
- 📋 Reportes y analytics

### Fase 4: Integraciones 🎯
- 🎯 Plugin VSCode
- 🎯 GitHub Action
- 🎯 Pre-commit hooks
- 🎯 Docker integration


