from flask import Flask, render_template, request, jsonify
from time import perf_counter
import math
# Importar nuestros módulos separados
from utils import (
    metodo_biseccion,
    metodo_regla_falsa,
    metodo_secante,
    evaluar_funcion,
)

# Crea una instancia de la clase Flask
# que se convertirá en nuestra aplicación WSGI
app = Flask(__name__)

def _safe_float(value):
    """Convierte a float descartando texto vacío y valores no finitos."""
    if value is None:
        return None
    if isinstance(value, str):
        texto = value.strip()
        if not texto:
            return None
        if texto.upper() in {"N/A", "INF", "-INF", "NAN"}:
            return None
        value = texto
    try:
        numero = float(value)
    except (TypeError, ValueError):
        return None
    return numero if math.isfinite(numero) else None


def generar_puntos_funcion(ecuacion, inicio, fin, cantidad=200):
    """Genera pares (x, f(x)) uniformemente distribuidos en [inicio, fin]."""
    if cantidad < 2:
        cantidad = 2

    # Usamos valores de respaldo cuando el intervalo propuesto no es finito.
    if not math.isfinite(inicio):
        inicio = -1.0
    if not math.isfinite(fin):
        fin = 1.0

    if inicio > fin:
        inicio, fin = fin, inicio

    # Acotamos el rango para evitar evaluar números enormes.
    inicio = max(inicio, -1e3)
    fin = min(fin, 1e3)

    # Si el intervalo colapsa extendemos ligeramente para obtener al menos dos muestras distintas.
    if inicio == fin:
        margen = 1.0 if abs(inicio) < 1 else abs(inicio) * 0.5
        inicio -= margen
        fin += margen

    rango = fin - inicio
    # Cuando el ancho es casi cero añadimos un delta para evitar divisiones problemáticas.
    if rango <= 1e-9:
        inicio -= 1.0
        fin += 1.0
        rango = fin - inicio

    paso = rango / (cantidad - 1)
    puntos = []

    # Recorremos el intervalo generando cada punto y validamos f(x) antes de guardarlo.
    for indice in range(cantidad):
        x_valor = inicio + paso * indice
        try:
            y_valor = evaluar_funcion(ecuacion, x_valor)
        except ValueError:
            y_valor = None
        if y_valor is not None and not math.isfinite(y_valor):
            y_valor = None
        puntos.append({'x': x_valor, 'y': y_valor})

    return puntos

# El decorador @app.route() le dice a Flask qué URL debe
# llamar a la función que le sigue
@app.route("/")
def home():
    # La función busca automáticamente 'index.html'
    # dentro de la carpeta 'templates'
    return render_template('index.html')

@app.route("/examples")
def examples():
    return render_template('examples.html')

@app.route("/compare")
def compare():
    return render_template('compare.html')

@app.route('/calcular', methods=['POST'])
def calcular_metodo():
    try:
        data = request.get_json()

        ecuacion = data.get('ecuacion', '').strip()
        metodo = data.get('metodo', '')
        a = float(data.get('a', 0))
        b = float(data.get('b', 1))
        criterio = int(data.get('criterio', 1))
        tolerancia = float(data.get('tolerancia', 1e-6))
        max_iter = int(data.get('max_iter', 100))

        # Validaciones
        if not ecuacion:
            return jsonify({'error': 'Debe ingresar una ecuación'}), 400

        if not metodo:
            return jsonify({'error': 'Debe seleccionar un método'}), 400

        #Crear variable para medición de tiempo
        inicio = perf_counter()

        # Ejecutar el método correspondiente
        match metodo:
            case 1:
                resultados = metodo_biseccion(ecuacion, a, b, tolerancia, max_iter, criterio)
            case 2:
                resultados = metodo_regla_falsa(ecuacion, a, b, tolerancia, max_iter, criterio)
            case 3:
                resultados = metodo_secante(ecuacion, a, b, tolerancia, max_iter, criterio)
            case _:
                return jsonify({'error': 'Método no reconocido'}), 400
        duracion = perf_counter() - inicio

        # La columna que contiene la mejor aproximación cambia según el método seleccionado.
        if metodo in (1, 2):
            aproximacion_clave = 'xi'
        else:
            aproximacion_clave = 'xi+1'

        aproximaciones = []

        # Guardamos únicamente las aproximaciones numéricas válidas para definir el dominio de la gráfica.
        for registro in resultados:
            aproximacion = _safe_float(registro.get(aproximacion_clave))

            if aproximacion is not None:
                aproximaciones.append(aproximacion)

        # Construimos el intervalo combinando los valores iniciales con las aproximaciones calculadas.
        valores_intervalo = [a, b] + aproximaciones
        valores_validos = [valor for valor in valores_intervalo if valor is not None]

        # Si hay datos válidos usamos sus extremos; de lo contrario recurrimos a los valores iniciales.
        if valores_validos:
            minimo = min(valores_validos)
            maximo = max(valores_validos)
        else:
            minimo = min(a, b)
            maximo = max(a, b)

        # Limitamos el rango a valores razonables para evitar que la gráfica se descontrole.
        minimo = max(minimo, -1e3)
        maximo = min(maximo, 1e3)

        # Para dominios degenerados extendemos el intervalo mínimamente para obtener dos puntos distintos.
        if minimo >= maximo:
            incremento = 1.0 if abs(minimo) < 1 else abs(minimo) * 0.01
            minimo -= incremento
            maximo += incremento

        # Con el dominio final generamos los puntos de f(x) para la gráfica.
        puntos_funcion = generar_puntos_funcion(ecuacion, minimo, maximo)

        return jsonify({
            'success': True,
            'resultados': resultados,
            'metodo': metodo,
            'ecuacion': ecuacion,
            'time': duracion,
            'puntos_funcion': puntos_funcion,
        })

    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': f'Error interno: {str(e)}'}), 500


# Esta es la función principal que ejecuta el servidor
if __name__ == "__main__":
    app.run(debug=True)