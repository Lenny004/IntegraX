# IntegraX 🧮

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Python](https://img.shields.io/badge/python-3.7+-yellow.svg)
![Flask](https://img.shields.io/badge/flask-2.3.3-red.svg)

> **IntegraX** es una aplicación web interactiva diseñada para facilitar el aprendizaje y la práctica de métodos numéricos. Permite encontrar raíces de ecuaciones mediante diferentes métodos iterativos, mostrando paso a paso el proceso de convergencia.

<img width="2560" height="1432" alt="Captura1" src="https://github.com/user-attachments/assets/87e1aa07-4d7c-4430-919e-16c83f9f5bb9" />


## 📋 Tabla de Contenidos

- [Características](#-características)
- [Vista previa](#-vista-previa)
- [Métodos implementados](#-métodos-implementados)
- [Tecnologías](#-tecnologías)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Ejemplos](#-ejemplos)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [API](#-api)
- [Criterios de Error](#-criterios-de-error)
- [Contribuir](#-contribuir)
- [Roadmap](#-roadmap)
- [Licencia](#-licencia)
- [Autor](#-autor)

## ✨ Características

- **🎯 Tres métodos numéricos principales:**
  - Método de Bisección
  - Método de Regla Falsa (Falsa Posición)
  - Método de la Secante

- **📊 Visualización detallada:**
  - Tabla interactiva con todas las iteraciones
  - Información de convergencia en tiempo real
  - Precisión configurable (hasta 6 decimales)
  - Muestra valores de f(x) en cada iteración

- **🌟 Interfaz moderna:**
  - Diseño responsivo y minimalista
  - Modo claro/oscuro (tema día/noche)
  - Parámetros configurables por método
  - Validación de entrada en tiempo real
  - Mensajes de error descriptivos

- **🔧 Flexibilidad matemática:**
  - Soporte para ecuaciones dinámicas
  - Funciones trigonométricas: `sin`, `cos`, `tan`
  - Funciones logarítmicas: `ln`, `log`
  - Funciones especiales: `sqrt`, `exp`, `abs`
  - Constantes: `pi`, `e`
  - Evaluación segura de expresiones

- **⚡ Arquitectura modular:**
  - Backend Python/Flask con estructura organizada
  - Frontend JavaScript con AJAX asíncrono
  - Separación clara de responsabilidades
  - Código reutilizable y extensible

## 👀 Vista previa

### Interfaz Principal (Modo Claro)
```
┌─────────────────────────────────────────────┐
│              🌞 IntegraX 🌙                 │
├─────────────────────────────────────────────┤
│ Ecuación: x^3 + 2*x^2 + 10*x - 20          │
│ Método: [Método de Bisección ▼]            │
│                                             │
│ Valor inicial x0: [0]  x1: [2]             │
│ Criterio de error: [|xi+1 - xi| ▼]         │
│ Tolerancia: [0.000001]                      │
│                                             │
│          [🔄 Procesar]                      │
├─────────────────────────────────────────────┤
│ n │ i │  x0   │  xi   │ f(x0) │ f(xi) │... │
│ 1 │ 0 │ 0.00  │ 2.00  │-20.00 │ 14.00 │... │
│ 2 │ 1 │ 0.00  │ 1.00  │-20.00 │ -7.00 │... │
│...│...│  ...  │  ...  │  ...  │  ...  │... │
│15 │14 │1.3688 │1.3688 │-0.001 │ 0.000 │✓   │
├─────────────────────────────────────────────┤
│ ✅ Convergencia alcanzada                   │
│ 🎯 Raíz aproximada: x ≈ 1.368808           │
└─────────────────────────────────────────────┘
```

### Modo Oscuro
- Paleta de colores optimizada para trabajo nocturno
- Menor fatiga visual
- Transición suave entre modos

<img width="2560" height="1438" alt="Captura2" src="https://github.com/user-attachments/assets/c445157a-807e-410d-bee2-0785fe5d9d7f" />


## 🧮 Métodos implementados

### 1. Método de Bisección
- **Principio:** División sucesiva del intervalo por la mitad
- **Requerimientos:** f(a)·f(b) < 0 (cambio de signo)
- **Convergencia:** Garantizada pero lenta
- **Orden de convergencia:** Lineal
- **Uso recomendado:** Cuando se necesita garantía de convergencia

### 2. Método de Regla Falsa (Falsa Posición)
- **Principio:** Interpolación lineal entre puntos del intervalo
- **Requerimientos:** f(a)·f(b) < 0 (cambio de signo)
- **Convergencia:** Más rápida que bisección
- **Orden de convergencia:** Superlineal
- **Uso recomendado:** Balance entre velocidad y confiabilidad

### 3. Método de la Secante
- **Principio:** Aproximación de la derivada por diferencias finitas
- **Requerimientos:** Dos valores iniciales (no necesita cambio de signo)
- **Convergencia:** Muy rápida si converge
- **Orden de convergencia:** ≈ 1.618 (número áureo)
- **Uso recomendado:** Cuando no se puede calcular la derivada

## 🛠 Tecnologías

### Backend
- **Flask 2.3.3** - Framework web ligero
- **Python 3.7+** - Lenguaje de programación
- **Math** - Biblioteca estándar para operaciones matemáticas

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos y responsivos
- **JavaScript (ES6+)** - Lógica de interfaz
- **Fetch API** - Comunicación asíncrona con el backend

### Arquitectura
- **Patrón MVC** - Separación de modelo, vista y controlador
- **REST API** - Comunicación cliente-servidor
- **Arquitectura modular** - Código organizado y mantenible

## 🚀 Instalación

### Requisitos previos
- Python 3.7 o superior
- pip (gestor de paquetes de Python)
- Navegador web moderno (Chrome, Firefox, Safari, Edge)

### Pasos de instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Lenny004/IntegraX.git
   cd IntegraX
   ```

2. **Crear entorno virtual (recomendado):**
   ```bash
   python -m venv venv
   
   # Activar en Windows
   venv\Scripts\activate
   
   # Activar en Linux/Mac
   source venv/bin/activate
   ```

3. **Instalar dependencias:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Ejecutar la aplicación:**
   ```bash
   python app.py
   ```

5. **Abrir en el navegador:**
   ```
   http://localhost:5000
   ```

### Instalación rápida (una línea)
```bash
git clone https://github.com/Lenny004/IntegraX.git && cd integrax && pip install -r requirements.txt && python app.py
```

## 📖 Uso

### Interfaz Web

1. **📝 Ingresa tu ecuación:**
   ```
   Ejemplos válidos:
   • x^2 - 4                    (ecuación cuadrática)
   • sin(x) - 0.5              (función trigonométrica)
   • x^3 + 2*x^2 + 10*x - 20   (ecuación cúbica)
   • ln(x) - 1                 (función logarítmica)
   • exp(x) - 5                (función exponencial)
   ```

2. **⚙️ Selecciona el método numérico:**
   - Método de Bisección
   - Método de Regla Falsa
   - Método de la Secante

3. **🔧 Configura los parámetros:**
   - **x0, x1:** Valores iniciales del intervalo
   - **Criterio de error:** Tipo de validación
   - **Tolerancia:** Precisión deseada (default: 1e-6)

4. **▶️ Presiona "Procesar":**
   - Observa las iteraciones en tiempo real
   - Analiza la convergencia del método
   - Revisa los valores de error en cada paso

### Desde Python (Uso programático)

```python
from utils import metodo_biseccion, metodo_regla_falsa, metodo_secante

# Resolver x^2 - 4 = 0
ecuacion = "x^2 - 4"
resultados = metodo_biseccion(
    ecuacion=ecuacion,
    a=0,
    b=3,
    tolerancia=1e-6,
    max_iter=100,
    criterio=1
)

# Imprimir resultados
for iteracion in resultados:
    print(f"Iteración {iteracion['n']}: xi+1 = {iteracion['xi+1']}")
```

## 💡 Ejemplos

### Ejemplo 1: Ecuación cuadrática simple
```
Ecuación: x^2 - 4
Método: Bisección
Parámetros: x0 = 0, x1 = 3
Criterio: |xi+1 - xi|
Tolerancia: 0.000001

Resultado: x ≈ 2.000000
Iteraciones: 20
Convergencia: ✅ Exitosa
```

### Ejemplo 2: Función transcendental
```
Ecuación: sin(x) - 0.5
Método: Secante
Parámetros: x0 = 0, x1 = 1
Criterio: |f(xi+1)|
Tolerancia: 0.000001

Resultado: x ≈ 0.523599 (π/6 radianes ≈ 30°)
Iteraciones: 5
Convergencia: ✅ Exitosa
```

### Ejemplo 3: Ecuación cúbica
```
Ecuación: x^3 + 2*x^2 + 10*x - 20
Método: Regla Falsa
Parámetros: x0 = 0, x1 = 2
Criterio: |xi+1 - xi| / |xi+1|
Tolerancia: 0.000001

Resultado: x ≈ 1.368808
Iteraciones: 12
Convergencia: ✅ Exitosa
```

### Ejemplo 4: Función exponencial
```
Ecuación: exp(x) - 5
Método: Bisección
Parámetros: x0 = 0, x1 = 3
Criterio: |xi+1 - xi|
Tolerancia: 0.000001

Resultado: x ≈ 1.609438 (ln(5))
Iteraciones: 21
Convergencia: ✅ Exitosa
```

## 📁 Estructura del proyecto

```
IntegraX/
├── 📄 app.py                      # Servidor Flask principal
│
├── 📂 utils/                      # Módulo de métodos numéricos
│   ├── __init__.py               # Inicialización del paquete
│   ├── evaluador.py              # Funciones de evaluación matemática
│   ├── biseccion.py              # Método de bisección
│   ├── regla_falsa.py            # Método de regla falsa
│   └── secante.py                # Método de la secante
│
├── 📂 static/                     # Archivos estáticos
│   ├── 📂 css/
│   │   ├── styles.css            # Estilos principales
│   │   └── fonts.css             # Tipografías personalizadas
│   ├── 📂 fonts/
│   ├── 📂 js/
│   │   └── controller.js         # Lógica del frontend
│   └── 📂 imgs/
│       ├── logo.css              # Logo
│       └── fondo.png             # Imagen de fondo
│
├── 📂 templates/                 # Plantillas HTML
│   └── index.html                # Interfaz principal
│
├── 📋 requirements.txt            # Dependencias de Python
├── 📖 README.md                  # Documentación (este archivo)
├── 📜 LICENSE                    # Licencia MIT
└── 🚫 .gitignore                 # Archivos ignorados por Git
```

### Descripción de módulos

#### `utils/evaluador.py`
```python
evaluar_funcion(ecuacion, x)      # Evalúa f(x) en un punto
calcular_error(xi, xi_prev, crit) # Calcula error según criterio
validar_intervalo(ec, a, b)       # Valida cambio de signo
formato6(num)                     # Valida que sean 6 decimales
```

#### `utils/biseccion.py`
```python
metodo_biseccion(ecuacion, a, b, tolerancia, max_iter, criterio)
# Retorna: lista de diccionarios con iteraciones
```

#### `utils/regla_falsa.py`
```python
metodo_regla_falsa(ecuacion, a, b, tolerancia, max_iter, criterio)
# Retorna: lista de diccionarios con iteraciones
```

#### `utils/secante.py`
```python
metodo_secante(ecuacion, x0, x1, tolerancia, max_iter, criterio)
# Retorna: lista de diccionarios con iteraciones
```

## 🔌 API

### Endpoint principal

**POST** `/api/calcular`

**Request:**
```json
{
  "ecuacion": "x^2 - 4",
  "metodo": "biseccion",
  "x0": 0,
  "x1": 3,
  "criterio": 1,
  "tolerancia": 0.000001,
  "max_iter": 100
}
```

**Response (exitosa):**
```json
{
  "success": true,
  "metodo": "biseccion",
  "ecuacion": "x^2 - 4",
  "resultados": [
    {
      "n": 1,
      "i": 0,
      "x0": 0.0,
      "xi": 3.0,
      "xi+1": 1.5,
      "f(x0)": -4.0,
      "f(xi)": 5.0,
      "f(xi+1)": -1.75,
      "error": "-"
    },
    {
      "n": 2,
      "i": 1,
      "x0": 1.5,
      "xi": 3.0,
      "xi+1": 2.25,
      "f(x0)": -1.75,
      "f(xi)": 5.0,
      "f(xi+1)": 1.0625,
      "error": 0.75
    }
    // ... más iteraciones
  ]
}
```

**Response (error):**
```json
{
  "error": "La función debe cambiar de signo en el intervalo"
}
```

### Funciones matemáticas soportadas

| Función | Sintaxis | Ejemplo | Descripción |
|---------|----------|---------|-------------|
| Potencia | `^` o `**` | `x^2`, `x**3` | Exponenciación |
| Seno | `sin(x)` | `sin(x) - 0.5` | Seno trigonométrico |
| Coseno | `cos(x)` | `cos(x) + 1` | Coseno trigonométrico |
| Tangente | `tan(x)` | `tan(x) - 1` | Tangente trigonométrica |
| Logaritmo natural | `ln(x)` | `ln(x) - 2` | Logaritmo base e |
| Logaritmo base 10 | `log(x)` | `log(x) + 1` | Logaritmo base 10 |
| Raíz cuadrada | `sqrt(x)` | `sqrt(x) - 3` | Raíz cuadrada |
| Exponencial | `exp(x)` | `exp(x) - 5` | e elevado a x |
| Valor absoluto | `abs(x)` | `abs(x) - 2` | Valor absoluto |
| Pi | `pi` | `sin(pi*x)` | Constante π |
| Euler | `e` | `e^x - 5` | Constante e |

## 🎯 Criterios de Error

IntegraX soporta tres criterios diferentes para evaluar la convergencia:

### 1. Error absoluto: `|xi+1 - xi|`
- Mide la diferencia absoluta entre iteraciones consecutivas
- **Ventaja:** Simple e intuitivo
- **Desventaja:** No considera la magnitud de la raíz
- **Uso recomendado:** Raíces cercanas a 1

### 2. Error relativo: `|xi+1 - xi| / |xi+1|`
- Normaliza el error respecto al valor actual
- **Ventaja:** Independiente de la escala
- **Desventaja:** Puede fallar si xi+1 ≈ 0
- **Uso recomendado:** Raíces muy grandes o muy pequeñas

### 3. Residuo: `|f(xi+1)|`
- Evalúa qué tan cerca está de ser raíz verdadera
- **Ventaja:** Mide directamente si f(x) ≈ 0
- **Desventaja:** Puede ser engañoso en funciones con pendiente suave
- **Uso recomendado:** Verificación de convergencia real

## 🤝 Contribuir

Las contribuciones son bienvenidas y apreciadas. Para contribuir:

### Proceso de contribución

1. **Fork** el proyecto
2. **Crea** tu rama de características
   ```bash
   git checkout -b feature/NuevaCaracteristica
   ```
3. **Commit** tus cambios
   ```bash
   git commit -m 'Agrega nueva característica increíble'
   ```
4. **Push** a la rama
   ```bash
   git push origin feature/NuevaCaracteristica
   ```
5. **Abre** un Pull Request

### Guía de estilo

- **Python:** Seguir PEP 8
- **JavaScript:** Usar ES6+ con const/let
- **CSS:** Metodología BEM para nombres de clases
- **Commits:** Mensajes descriptivos en español

### Reportar bugs

Si encuentras un bug, por favor abre un issue con:
- Descripción detallada del problema
- Pasos para reproducirlo
- Comportamiento esperado vs observado
- Screenshots si es posible
- Información del sistema (OS, navegador, Python version)

## 🚀 Roadmap

### Versión 1.1 (En progreso)
- [ ] Exportación de resultados a PDF
- [ ] Modo oscuro automático (según hora)

### Versión 1.2 (Planeado)
- [ ] Método de Newton-Raphson
- [ ] Método de Punto Fijo
- [ ] Comparación entre métodos

## 📊 Estadísticas del Proyecto

- **Líneas de código:** ~2,000
- **Archivos Python:** 5
- **Métodos implementados:** 3
- **Funciones matemáticas soportadas:** 10+
- **Tiempo de desarrollo:** 3 semanas
- **Tests:** En progreso

## 📄 Licencia

Distribuido bajo la Licencia MIT. Ver `LICENSE` para más información.

```
MIT License

Copyright (c) 2025 Lenny Adrián Elías Sánchez

Permission is hereby granted, free of charge, to any person obtaining a copy...
```

## 👨‍💻 Autor

**Lenny Adrián Elías Sánchez**
- 📧 Email: lennyx75@gmail.com
- 🐱 GitHub: [@Lenny Sánchez](https://github.com/Lenny004)

## 🙏 Agradecimientos

- A mi profesor de Métodos Numéricos por la inspiración y su forma única de enseñar.
- A la comunidad de Python y Flask por sus excelentes herramientas.

## 📚 Referencias

- [Documentación oficial de Flask](https://flask.palletsprojects.com/)
- [Documentación de Python Math](https://docs.python.org/3/library/math.html)

---

### 🎓 Proyecto Académico
*Desarrollado como parte del curso de Métodos Numéricos*  
*Universidad Francisco Gavidia de El Salvador • 2025*

---

<div align="center">

**⭐ Si este proyecto te ayudó, considera darle una estrella ⭐**

[![GitHub stars](https://img.shields.io/github/stars/Lenny004/IntegraX?style=social)](https://github.com/Lenny004/IntegraX)
[![GitHub forks](https://github.com/Lenny004/IntegraX/fork)](https://github.com/Lenny004/IntegraX)

**[⬆ Volver arriba](#integrax-)**

</div>
