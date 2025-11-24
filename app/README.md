# 🛡️ env-guardian Web App

Aplicación web moderna para validar, comparar y gestionar archivos `.env` con una interfaz gráfica intuitiva.

> 📖 **Documentación general:** Ver [README.md](../README.md) para información sobre el proyecto completo.

## 🚀 Características

- ✅ **Comparación de archivos .env** - Compara dos archivos .env y visualiza diferencias
- ✅ **Generación de clones vacíos** - Crea archivos `.env.example` desde `.env` con valores vacíos
- ✅ **Drag & Drop** - Arrastra y suelta archivos fácilmente
- ✅ **Interfaz moderna** - Diseño minimalista con fondo oscuro
- ✅ **Visualización detallada** - Resultados organizados por categorías
- ✅ **Descarga y copia** - Descarga o copia resultados al portapapeles

## 📦 Instalación

### Requisitos

- Node.js >= 18
- npm o pnpm

### Configuración

```bash
# Instalar dependencias
cd app
npm install

# Ejecutar en modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de la build
npm run preview
```

## 🎯 Uso

### Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Producción

```bash
npm run build
npm run preview
```

## 🎨 Funcionalidades

### 1. Comparar Archivos .env

Compara dos archivos `.env` y visualiza:

- **Variables solo en Archivo 1** - Variables únicas del primer archivo
- **Variables solo en Archivo 2** - Variables únicas del segundo archivo
- **Valores diferentes** - Variables que existen en ambos pero con valores distintos
- **Valores iguales** - Variables idénticas en ambos archivos

**Cómo usar:**

1. Sube dos archivos `.env` usando drag & drop o click
2. Haz clic en "Comparar Archivos"
3. Revisa los resultados organizados por categorías

### 2. Crear Clon con Valores Vacíos

Genera un archivo `.env.example` desde tu `.env` preservando:

- Estructura original
- Comentarios
- Metadatos de tipos (`@type`)
- Variables opcionales (`@optional`)

**Cómo usar:**

1. Sube un archivo `.env`
2. Haz clic en "Generar Clon Vacío"
3. Revisa el resultado generado
4. Descarga o copia el contenido

## 🛠️ Tecnologías

- **React 19** - Framework UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS 4** - Estilos
- **Wouter** - Routing ligero
- **Lucide React** - Iconos
- **Shadcn/ui** - Componentes UI

## 📁 Estructura del Proyecto

```
app/
├── src/
│   ├── components/        # Componentes reutilizables
│   │   ├── ui/          # Componentes UI base
│   │   ├── FileUploadZone.tsx
│   │   ├── ComparisonResults.tsx
│   │   └── ...
│   ├── hooks/           # Hooks personalizados
│   │   ├── useFileUpload.ts
│   │   ├── useDragAndDrop.ts
│   │   └── ...
│   ├── pages/           # Páginas
│   │   ├── Home.tsx     # Landing page
│   │   └── Test.tsx    # Página principal de herramientas
│   ├── utils/           # Utilidades
│   │   ├── envParser.ts # Parser de archivos .env
│   │   └── fileUtils.ts # Utilidades de archivos
│   └── style/           # Estilos globales
└── public/              # Archivos estáticos
```

## 🎨 Componentes Principales

### FileUploadZone

Componente reutilizable para subir archivos con drag & drop:

```tsx
<FileUploadZone
  id="file1"
  label="Archivo .env #1"
  onFileSelect={handleFileSelect}
  onFileDrop={handleFileDrop}
  inputRef={inputRef}
  fileName={fileName}
/>
```

### ComparisonResults

Muestra los resultados de la comparación:

```tsx
<ComparisonResults result={comparisonResult} />
```

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Compila para producción
- `npm run preview` - Vista previa de la build de producción
- `npm run lint` - Ejecuta ESLint

## 🎯 Hooks Personalizados

### useFileUpload

Maneja el estado y lógica de carga de archivos:

```tsx
const file = useFileUpload();
// file.content, file.fileName, file.inputRef, file.clear()
```

### useDragAndDrop

Maneja la funcionalidad de drag and drop:

```tsx
const { isDragging, dragHandlers } = useDragAndDrop(handleFileDrop);
```

### usePreventDefaultDrag

Previene el comportamiento por defecto del navegador al arrastrar archivos.

## 📝 Formato de Archivos .env

La aplicación soporta el mismo formato que el CLI:

```bash
# @type string
API_URL=https://api.example.com

# @type number
PORT=3000

# @type boolean
DEBUG=true

# @optional
OPTIONAL_VAR=
```

## 🐛 Solución de Problemas

### El drag and drop no funciona

Asegúrate de que estás arrastrando archivos `.env` válidos. La aplicación valida que el archivo tenga extensión `.env` o contenga `.env.` en el nombre.

### Los archivos no se cargan

Verifica que los archivos sean de texto plano y tengan el formato correcto de `.env`.

## 📄 Licencia

MIT

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor lee [CONTRIBUTING.md](../cli/CONTRIBUTING.md) para más detalles.
