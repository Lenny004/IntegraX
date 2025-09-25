from flask import Flask, render_template, request, jsonify

# Crea una instancia de la clase Flask
app = Flask(__name__)

# Importar nuestros módulos separados
from utils import metodo_biseccion#, metodo_regla_falsa, metodo_secante

# Crea una instancia de la clase Flask
# que se convertirá en nuestra aplicación WSGI
app = Flask(__name__)

# El decorador @app.route() le dice a Flask qué URL debe
# llamar a la función que le sigue
@app.route("/")
def home():
    # La función busca automáticamente 'index.html'
    # dentro de la carpeta 'templates'
    return render_template('index.html')

@app.route('/api/calcular', methods=['POST'])
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

        # Ejecutar el método correspondiente
        match metodo:
            case 1:
                resultados = metodo_biseccion(ecuacion, a, b, tolerancia, max_iter, criterio)
            #case 2:
                # resultados = metodo_regla_falsa(ecuacion, a, b, tolerancia, max_iter, criterio)
            #case 3:
                # resultados = metodo_secante(ecuacion, a, b, tolerancia, max_iter, criterio)
            case _:
                return jsonify({'error': 'Método no reconocido'}), 400

        return jsonify({
            'success': True,
            'resultados': resultados,
            'metodo': metodo,
            'ecuacion': ecuacion
        })

    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': f'Error interno: {str(e)}'}), 500


# Esta es la función principal que ejecuta el servidor
if __name__ == "__main__":
    app.run(debug=True)