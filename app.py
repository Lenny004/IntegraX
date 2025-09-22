from flask import Flask

# Crea una instancia de la clase Flask
# que se convertirá en nuestra aplicación WSGI
app = Flask(__name__)

# El decorador @app.route() le dice a Flask qué URL debe
# llamar a la función que le sigue
@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

# Esta es la función principal que ejecuta el servidor
# Solo se ejecuta si el script se corre directamente
if __name__ == "__main__":
    app.run(debug=True)