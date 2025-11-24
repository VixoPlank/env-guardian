#!/bin/bash

# Script de desarrollo interactivo para env-guardian CLI

# Cambiar al directorio cli
cd "$(dirname "$0")/.." || exit 1

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color
BOLD='\033[1m'

# Función para mostrar el header
show_header() {
    clear
    echo -e "${CYAN}${BOLD}"
    echo "╔════════════════════════════════════════════════════════╗"
    echo "║        🛡️  env-guardian CLI - Dev Menu               ║"
    echo "╚════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

# Función para pausar
pause() {
    echo ""
    read -p "Presiona Enter para continuar..."
}

# Función para compilar
compile_project() {
    echo -e "${YELLOW}📦 Compilando el proyecto...${NC}"
    npm run build
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Compilación exitosa${NC}"
    else
        echo -e "${RED}❌ Error en la compilación${NC}"
    fi
    pause
}

# Función para ejecutar tests
run_tests() {
    echo -e "${YELLOW}🧪 Ejecutando tests...${NC}"
    npm test
    pause
}

# Función para listar archivos de ejemplo
list_examples() {
    echo -e "${BLUE}📚 Archivos de ejemplo disponibles:${NC}"
    echo ""
    if [ -d "examples" ]; then
        ls -1 examples/*.example 2>/dev/null | nl -w2 -s'. '
        echo ""
    else
        echo -e "${RED}No se encontró la carpeta examples/${NC}"
    fi
}

# Función para validar con archivos de ejemplo
validate_with_examples() {
    show_header
    echo -e "${CYAN}🔍 Validar archivos .env${NC}"
    echo ""
    
    # Listar archivos
    list_examples
    
    # Verificar si hay ejemplos
    if [ ! -d "examples" ] || [ -z "$(ls -A examples/*.example 2>/dev/null)" ]; then
        echo -e "${RED}No hay archivos de ejemplo disponibles${NC}"
        pause
        return
    fi
    
    # Seleccionar archivo .env.example
    echo -e "${YELLOW}Selecciona el archivo .env.example:${NC}"
    read -p "Número (o Enter para usar examples/full.env.example): " example_num
    
    if [ -z "$example_num" ]; then
        example_file="examples/full.env.example"
    else
        example_file=$(ls -1 examples/*.example 2>/dev/null | sed -n "${example_num}p")
        if [ -z "$example_file" ]; then
            echo -e "${RED}Opción inválida${NC}"
            pause
            return
        fi
    fi
    
    echo ""
    echo -e "${YELLOW}Selecciona el archivo .env a validar:${NC}"
    echo "1. Usar el mismo archivo (auto-validación)"
    echo "2. Crear un archivo temporal"
    echo "3. Seleccionar otro archivo de examples/"
    read -p "Opción: " env_option
    
    case $env_option in
        1)
            env_file="$example_file"
            ;;
        2)
            echo ""
            echo -e "${YELLOW}Creando archivo temporal...${NC}"
            env_file=".env.temp"
            # Copiar el ejemplo y dejar algunos valores vacíos
            grep -v "^#" "$example_file" | grep "=" > "$env_file"
            echo -e "${GREEN}Archivo temporal creado: $env_file${NC}"
            ;;
        3)
            echo ""
            list_examples
            read -p "Número: " env_num
            env_file=$(ls -1 examples/*.example 2>/dev/null | sed -n "${env_num}p")
            if [ -z "$env_file" ]; then
                echo -e "${RED}Opción inválida${NC}"
                pause
                return
            fi
            ;;
        *)
            echo -e "${RED}Opción inválida${NC}"
            pause
            return
            ;;
    esac
    
    # Preguntar por opciones adicionales
    echo ""
    echo -e "${YELLOW}Opciones de validación:${NC}"
    read -p "¿Modo estricto? (s/N): " strict
    read -p "¿Permitir valores vacíos? (s/N): " allow_empty
    read -p "¿Validar tipos? (S/n): " validate_types
    
    # Construir comando
    cmd="node dist/index.js validate --example \"$example_file\" --env \"$env_file\""
    
    [[ "$strict" =~ ^[Ss]$ ]] && cmd="$cmd --strict"
    [[ "$allow_empty" =~ ^[Ss]$ ]] && cmd="$cmd --allow-empty"
    [[ "$validate_types" =~ ^[Nn]$ ]] && cmd="$cmd --no-types"
    
    echo ""
    echo -e "${BLUE}Ejecutando: $cmd${NC}"
    echo ""
    
    eval $cmd
    
    # Limpiar archivo temporal si se creó
    if [ "$env_file" = ".env.temp" ]; then
        rm -f "$env_file"
    fi
    
    pause
}

# Función para generar .env
generate_env() {
    show_header
    echo -e "${CYAN}📝 Generar archivo .env${NC}"
    echo ""
    
    list_examples
    
    if [ ! -d "examples" ] || [ -z "$(ls -A examples/*.example 2>/dev/null)" ]; then
        echo -e "${RED}No hay archivos de ejemplo disponibles${NC}"
        pause
        return
    fi
    
    read -p "Selecciona el archivo base (Enter para full.env.example): " num
    
    if [ -z "$num" ]; then
        example_file="examples/full.env.example"
    else
        example_file=$(ls -1 examples/*.example 2>/dev/null | sed -n "${num}p")
        if [ -z "$example_file" ]; then
            echo -e "${RED}Opción inválida${NC}"
            pause
            return
        fi
    fi
    
    read -p "Nombre del archivo de salida (.env.generated): " output
    output=${output:-.env.generated}
    
    echo ""
    node dist/index.js init --example "$example_file" --output "$output" --force
    
    if [ $? -eq 0 ]; then
        echo ""
        echo -e "${GREEN}✅ Archivo generado: $output${NC}"
        read -p "¿Ver el archivo? (s/N): " view
        if [[ "$view" =~ ^[Ss]$ ]]; then
            echo ""
            cat "$output"
        fi
    fi
    
    pause
}

# Función para ver ejemplos de uso
show_examples() {
    show_header
    echo -e "${CYAN}📚 Ejemplos de uso${NC}"
    echo ""
    node dist/index.js examples
    pause
}

# Función para probar todos los ejemplos
test_all_examples() {
    show_header
    echo -e "${CYAN}🧪 Probando todos los ejemplos${NC}"
    echo ""
    
    if [ ! -d "examples" ] || [ -z "$(ls -A examples/*.example 2>/dev/null)" ]; then
        echo -e "${RED}No hay archivos de ejemplo disponibles${NC}"
        pause
        return
    fi
    
    success=0
    failed=0
    
    for file in examples/*.example; do
        echo -e "${BLUE}Testing: $file${NC}"
        node dist/index.js validate --example "$file" --env "$file" > /dev/null 2>&1
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}  ✓ Pasó${NC}"
            ((success++))
        else
            echo -e "${RED}  ✗ Falló${NC}"
            ((failed++))
        fi
        echo ""
    done
    
    echo -e "${BOLD}Resumen:${NC}"
    echo -e "${GREEN}  Exitosos: $success${NC}"
    echo -e "${RED}  Fallidos: $failed${NC}"
    
    pause
}

# Función para limpiar archivos temporales
clean_temp() {
    echo -e "${YELLOW}🧹 Limpiando archivos temporales...${NC}"
    rm -f .env.temp .env.generated .env.test.* .env.*.test
    echo -e "${GREEN}✅ Limpieza completada${NC}"
    pause
}

# Función para compilar automáticamente si es necesario
auto_compile() {
    if [ ! -d "dist" ] || [ -z "$(ls -A dist 2>/dev/null)" ]; then
        echo -e "${YELLOW}⚠️  No se encontró compilación. Compilando...${NC}"
        npm run build > /dev/null 2>&1
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ Compilado${NC}"
            echo ""
        else
            echo -e "${RED}❌ Error al compilar. Ejecuta manualmente la opción 1${NC}"
            pause
            return 1
        fi
    fi
    return 0
}

# Función para el menú principal
show_menu() {
    show_header
    echo -e "${BOLD}🎯 ¿Qué quieres hacer?${NC}"
    echo ""
    echo "  1. 🔍 Validar archivos .env"
    echo "  2. 📝 Generar archivo .env desde ejemplo"
    echo "  3. 🎯 Probar con todos los ejemplos"
    echo "  4. 🧹 Limpiar archivos temporales"
    echo "  0. 🚪 Salir"
    echo ""
    read -p "Selecciona una opción: " option
    echo ""
}

# Loop principal
while true; do
    show_menu
    
    case $option in
        1)
            auto_compile && validate_with_examples
            ;;
        2)
            auto_compile && generate_env
            ;;
        3)
            auto_compile && test_all_examples
            ;;
        4)
            clean_temp
            ;;
        0)
            echo -e "${GREEN}👋 ¡Hasta luego!${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}❌ Opción inválida${NC}"
            pause
            ;;
    esac
done

