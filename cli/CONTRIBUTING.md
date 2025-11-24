# 🤝 Contribuir a env-guardian

¡Gracias por tu interés en contribuir! Este documento te guiará en el proceso.

## 🚀 Comenzar

1. **Fork el repositorio**
2. **Clona tu fork**
   ```bash
   git clone https://github.com/tu-usuario/env-guardian.git
   cd env-guardian/cli
   ```

3. **Instala las dependencias**
   ```bash
   npm install
   ```

4. **Crea una rama para tu feature**
   ```bash
   git checkout -b feature/mi-nueva-caracteristica
   ```

## 🛠️ Desarrollo

### Estructura del proyecto

```
cli/
├── src/
│   ├── index.ts       # Punto de entrada
│   ├── cli.ts         # Comandos del CLI
│   ├── parser.ts      # Parser de archivos .env
│   ├── validator.ts   # Lógica de validación
│   ├── types.ts       # Tipos TypeScript
│   ├── utils.ts       # Utilidades
│   └── __tests__/     # Tests unitarios
├── examples/          # Archivos de ejemplo
└── package.json
```

### Comandos útiles

```bash
# Ejecutar en modo desarrollo
npm run dev

# Compilar el proyecto
npm run build

# Ejecutar tests
npm test

# Lint
npm run lint
```

### Ejecutar el CLI localmente

```bash
# Opción 1: Usar tsx directamente
npm run dev validate

# Opción 2: Compilar y ejecutar
npm run build
node dist/index.js validate
```

## ✅ Tests

Todos los cambios deben incluir tests. Ejecuta los tests con:

```bash
npm test
```

Para ver cobertura:

```bash
npm test -- --coverage
```

## 📝 Estilo de código

- Usa TypeScript estricto
- Sigue las reglas de ESLint
- Formatea con Prettier (si está configurado)
- Escribe código claro y auto-documentado
- Agrega comentarios donde sea necesario

## 🐛 Reportar bugs

Si encuentras un bug, por favor abre un issue con:

1. Descripción clara del problema
2. Pasos para reproducirlo
3. Comportamiento esperado vs actual
4. Versión de Node.js y sistema operativo

## 💡 Sugerir mejoras

Las sugerencias son bienvenidas! Abre un issue describiendo:

1. El problema que resuelve
2. La solución propuesta
3. Alternativas consideradas

## 📋 Pull Requests

1. Asegúrate de que todos los tests pasen
2. Actualiza la documentación si es necesario
3. Describe claramente los cambios en el PR
4. Referencia cualquier issue relacionado

## 🎯 Áreas donde puedes contribuir

- 🐛 Arreglar bugs
- ✨ Agregar nuevas características
- 📝 Mejorar documentación
- 🧪 Agregar más tests
- 🎨 Mejorar la salida del CLI
- 🌍 Traducciones

## ❓ ¿Preguntas?

Si tienes dudas, abre un issue con la etiqueta `question`.

¡Gracias por contribuir! 🎉


