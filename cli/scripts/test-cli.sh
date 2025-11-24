#!/bin/bash

# Script para probar el CLI localmente

# Cambiar al directorio cli (padre del directorio scripts)
cd "$(dirname "$0")/.." || exit 1

echo "🛡️  Probando env-guardian CLI"
echo ""

# Compilar
echo "📦 Compilando..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error al compilar"
    exit 1
fi

echo "✅ Compilación exitosa"
echo ""

# Crear archivos de prueba temporales
echo "📝 Creando archivos de prueba..."

cat > .env.example.test << 'EOF'
# @type string
APP_NAME=test-app

# @type number
PORT=3000

# @type boolean
DEBUG=true

# @optional
OPTIONAL_VAR=
EOF

cat > .env.test << 'EOF'
APP_NAME=my-app
PORT=3000
DEBUG=true
EOF

echo "✅ Archivos de prueba creados"
echo ""

# Probar comandos
echo "🧪 Probando comandos..."
echo ""

echo "1. Versión:"
node dist/index.js --version
echo ""

echo "2. Ayuda:"
node dist/index.js --help
echo ""

echo "3. Validación exitosa:"
node dist/index.js validate --example .env.example.test --env .env.test
echo ""

echo "4. Generación de .env:"
node dist/index.js init --example .env.example.test --output .env.generated.test
echo ""

# Limpiar
echo "🧹 Limpiando archivos de prueba..."
rm -f .env.example.test .env.test .env.generated.test

echo ""
echo "✅ ¡Todas las pruebas completadas!"


