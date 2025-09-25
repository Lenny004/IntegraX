from flask import Flask, render_template, request, jsonify
import sys
import os

# Agregar el directorio utils al path
sys.path.append(os.path.join(os.path.dirname(__file__), 'utils'))

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

# Esta es la función principal que ejecuta el servidor
if __name__ == "__main__":
    app.run(debug=True)