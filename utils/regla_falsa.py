# utils/regla_falsa.py
from .evaluador import evaluar_funcion, calcular_error, validar_intervalo, formato6


def metodo_regla_falsa(ecuacion, a, b, tolerancia, max_iter, criterio):
    """
    Implementa el método de regla falsa para encontrar raíces de ecuaciones

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

    for i in range(max_iter):
        # Evaluar función en los extremos
        f_a = evaluar_funcion(ecuacion, a)
        f_b = evaluar_funcion(ecuacion, b)

        # Verificar que no haya división por cero
        if abs(f_b - f_a) < 1e-15:
            raise ValueError("División por cero en método de regla falsa: f(a) ≈ f(b)")

        # Calcular xi usando la fórmula de regla falsa
        xi = b - (f_b * (b - a)) / (f_b - f_a)
        f_xi = evaluar_funcion(ecuacion, xi)

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
            'a': formato6(a),
            'b': formato6(b),
            'xi': formato6(xi),
            'f(a)': formato6(f_a),
            'f(b)': formato6(f_b),
            'f(xi)': formato6(f_xi),
            'error': formato6(error) if error != "N/A" else "N/A"
        }

        resultados.append(resultado)

        # Verificar criterio de parada
        if error != "N/A" and error < tolerancia and i > 0:
            break

        # Determinar nuevo intervalo
        if f_a * f_xi < 0:
            b = xi  # La raíz está en [a, xi]
        else:
            a = xi  # La raíz está en [xi, b]

        xi_anterior = xi

    return resultados