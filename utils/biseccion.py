from .evaluador import evaluar_funcion, calcular_error, validar_intervalo, formato6


def metodo_biseccion(ecuacion, a, b, tolerancia, max_iter, criterio):
    """
    Implementa el método de bisección para encontrar raíces de ecuaciones

    Args:
        ecuacion (str): La ecuación a resolver
        a, b (float): Extremos del intervalo inicial
        tolerancia (float): Tolerancia para el criterio de parada
        max_iter (int): Número máximo de iteraciones
        criterio (int): Criterio de error (1, 2, o 3)
    Returns:
        list: Lista de diccionarios con los resultados de cada iteración
    Raises:
        ValueError: Si el intervalo no es válido o hay errores de cálculo
    """

    # Validar intervalo inicial
    validar_intervalo(ecuacion, a, b)

    resultados = []
    xi_anterior = None

    # Variables para mantener el intervalo actual
    x0, x1 = a, b

    for i in range(max_iter):
        # Calcular punto medio
        xi = (x0 + x1) / 2

        # Evaluar función en los puntos
        f_x0 = evaluar_funcion(ecuacion, x0)  # f(extremo izquierdo)
        f_x1 = evaluar_funcion(ecuacion, x1)  # f(extremo derecho)
        f_xi = evaluar_funcion(ecuacion, xi)  # f(punto medio)

        # Calcular error
        if i > 0:
            if criterio == 3:
                error = abs(f_xi)
            else:
                error = calcular_error(xi, xi_anterior, criterio)
        else:
            error = "N/A"

        # Guardar resultado de la iteración
        resultado = {
            'n': i + 1,
            'a': formato6(x0),
            'b': formato6(x1),
            'xi': formato6(xi),
            'f(a)': formato6(f_x0),
            'f(b)': formato6(f_x1),
            'f(xi)': formato6(f_xi),
            'error': formato6(error) if error != "N/A" else "N/A"
        }

        resultados.append(resultado)

        # Verificar criterio de parada
        if error != "N/A" and error < tolerancia and i > 0:
            break

        # Determinar nuevo intervalo
        if f_x0 * f_xi < 0:
            # La raíz está en [x0, xi]
            x1 = xi  # Actualizamos el extremo derecho
        else:
            # La raíz está en [xi, x1]
            x0 = xi  # Actualizamos el extremo izquierdo

        xi_anterior = xi

    return resultados