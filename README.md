# IntegraX 🧮

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Python](https://img.shields.io/badge/python-3.7+-yellow.svg)
![Flask](https://img.shields.io/badge/flask-2.3.3-red.svg)

> **IntegraX** es una herramienta interactiva diseñada para facilitar el aprendizaje, la práctica y la resolución de problemas matemáticos que requieren aproximaciones numéricas. Su objetivo principal es ayudar a estudiantes a encontrar raíces cercanas y mostrar las iteraciones necesarias para su resultado.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Vista previa](#-vista-previa)
- [Métodos implementados](#-métodos-implementados)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Ejemplos](#-ejemplos)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [API](#-api)
- [Contribuir](#-contribuir)
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
  - Precisión de 6 decimales para resultados académicos

- **🌟 Interfaz moderna:**
  - Diseño responsivo y atractivo
  - Modo claro/oscuro
  - Parámetros configurables por método
  - Animaciones fluidas

- **🔧 Flexibilidad matemática:**
  - Soporte para ecuaciones dinámicas
  - Funciones trigonométricas, logarítmicas y exponenciales
  - Evaluación segura de expresiones matemáticas

## 👀 Vista previa

### Interfaz Principal
```
┌─────────────────────────────────────┐
│              IntegraX               │
├─────────────────────────────────────┤
│ Ecuación: x^3 + 2*x^2 + 10*x - 20  │
│ Método: [Bisección ▼]              │
│ Parámetros: a=0, b=2               │
│ [Resolver]                          │
├─────────────────────────────────────┤
│ Tabla de iteraciones...             │
│ ✅ Convergencia en 15 iteraciones   │
│ 🎯 Raíz aproximada: 1.368808       │
└─────────────────────────────────────┘
```

## 🧮 Métodos implementados

### 1. Método de Bisección
- **Principio:** División sucesiva del intervalo por la mitad
- **Parámetros:** Límites a, b y criterio de error
- **Convergencia:** Garantizada si f(a)·f(b) < 0

### 2. Método de Regla Falsa
- **Principio:** Interpolación lineal entre puntos del intervalo
- **Parámetros:** Límites a, b
- **Ventaja:** Convergencia más rápida que bisección

### 3. Método de la Secante
- **Principio:** Aproximación de la derivada usando diferencias finitas
- **Parámetros:** Valores iniciales x₀, x₁
- **Característica:** No requiere cálculo de derivadas

## 🚀 Instalación

### Requisitos previos
- Python 3.7 o superior
- Navegador web moderno

### Pasos de instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/integrax.git
   cd integrax
   ```

2. **Instalar dependencias:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Ejecutar la aplicación:**
   ```bash
   python app.py
   ```

4. **Abrir en el navegador:**
   ```
   Abrir index.html en tu navegador web
   El servidor API estará en http://localhost:5000
   ```

## 📖 Uso

### Interfaz Web

1. **📝 Ingresa tu ecuación:**
   ```
   Ejemplos válidos:
   • x^2 - 4
   • sin(x) - 0.5  
   • x^3 + 2*x^2 + 10*x - 20
   • ln(x) - 1
   ```

2. **⚙️ Selecciona el método numérico:**
   - Los parámetros se ajustan automáticamente

3. **🔧 Configura los parámetros:**
   - **Bisección/Regla Falsa:** Límites a y b
   - **Secante:** Valores iniciales x₀ y x₁

4. **▶️ Presiona "Resolver":**
   - Observa las iteraciones paso a paso
   - Analiza la convergencia del método

### Línea de comandos

También puedes ejecutar los métodos individualmente:

```bash
# Método de Bisección
python biseccion_dinamico.py

# Método de Regla Falsa
python regla_falsa_dinamico.py

# Método de la Secante  
python secante_dinamico.py
```

## 💡 Ejemplos

### Ejemplo 1: Ecuación cuadrática
```
Ecuación: x^2 - 4
Método: Bisección
Parámetros: a = 0, b = 3
Resultado: x ≈ 2.000000 (raíz positiva)
```

### Ejemplo 2: Función transcendental
```
Ecuación: sin(x) - 0.5
Método: Secante
Parámetros: x₀ = 0, x₁ = 1
Resultado: x ≈ 0.523599 (π/6 radianes)
```

### Ejemplo 3: Ecuación cúbica
```
Ecuación: x^3 + 2*x^2 + 10*x - 20
Método: Regla Falsa
Parámetros: a = 0, b = 2
Resultado: x ≈ 1.368808
```

## 📁 Estructura del proyecto

```
integrax/
├── 📄 app.py                    # Servidor Flask principal
├── 🌐 index.html               # Interfaz web moderna
├── 🔢 biseccion_dinamico.py    # Método de bisección
├── 🔢 regla_falsa_dinamico.py  # Método de regla falsa
├── 🔢 secante_dinamico.py      # Método de la secante
├── 📋 requirements.txt         # Dependencias de Python
├── 📖 README.md               # Este archivo
└── 📂 resources/              # Recursos adicionales (CSS, imágenes)
    ├── css/
    │   ├── styles.css
    │   └── fonts.css
    └── imgs/
        └── fondo.png
```

## 🔌 API

### Endpoint principal

**POST** `/resolver`

```json
{
  "ecuacion": "x^2 - 4",
  "metodo": "biseccion",
  "a": 0,
  "b": 3,
  "criterio": 1
}
```

**Respuesta exitosa:**
```json
{
  "convergencia": true,
  "iteraciones": 12,
  "raiz": "2.000000",
  "resultados": [...]
}
```

### Funciones matemáticas soportadas

| Función | Sintaxis | Ejemplo |
|---------|----------|---------|
| Potencia | `^` o `**` | `x^2`, `x**3` |
| Seno | `sin(x)` | `sin(x) - 0.5` |
| Coseno | `cos(x)` | `cos(x) + 1` |
| Tangente | `tan(x)` | `tan(x) - 1` |
| Logaritmo natural | `ln(x)` | `ln(x) - 2` |
| Logaritmo base 10 | `log(x)` | `log(x) + 1` |
| Raíz cuadrada | `sqrt(x)` | `sqrt(x) - 3` |
| Exponencial | `exp(x)` | `exp(x) - 5` |

## 🔄 Criterios de Error (Bisección)

1. **Error absoluto:** `|p - p_prev|`
2. **Error relativo:** `|p - p_prev| / |p|`
3. **Residuo:** `|f(p)|`
4. **Ancho del intervalo:** `|b - a| / 2`

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Ideas para contribuir
- [ ] Agregar más métodos numéricos (Newton-Raphson, Punto Fijo)
- [ ] Implementar gráficas de convergencia
- [ ] Mejorar la visualización de resultados
- [ ] Agregar exportación de datos (CSV, PDF)
- [ ] Implementar tests unitarios

## 📄 Licencia

Distribuido bajo la Licencia MIT. Ver `LICENSE` para más información.

## 👨‍💻 Autor

**Lenny Adrián Elías Sánchez**
- 📧 Email: [tu-email@ejemplo.com]
- 💼 LinkedIn: [tu-perfil-linkedin]
- 🐱 GitHub: [@tu-usuario-github]

---

### 🎓 Proyecto Académico
*Desarrollado como parte del curso de Métodos Numéricos*  
*Universidad • 2025*

---

<div align="center">

**⭐ Si este proyecto te ayudó, considera darle una estrella ⭐**

</div>
