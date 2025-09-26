from .evaluador import evaluar_funcion, calcular_error, validar_intervalo, formato6


def metodo_secante(ecuacion, x0, x1, tolerancia, max_iter, criterio):
    """
    Implementa el método de la secante para encontrar raíces de ecuaciones

    Args:
        ecuacion (str): La ecuación a resolver
        x0, x1 (float): Valores iniciales (no necesita cambio de signo)
        tolerancia (float): Tolerancia para el criterio de parada
        max_iter (int): Número máximo de iteraciones
        criterio (int): Criterio de error (1, 2, o 3)
    Returns:
        list: Lista de diccionarios con los resultados de cada iteración
    Raises:
        ValueError: Si hay división por cero o errores de cálculo
    """

    resultados = []

    # Valores iniciales (igual que en tu código funcional)
    x_prev = x0  # x0
    x_current = x1  # xi

    for n in range(max_iter):
        i = n + 2  # i = n + 2 (como en tu código: i = n + 1, pero n empieza en 1)

        # Evaluar función en los puntos actuales
        fx_prev = evaluar_funcion(ecuacion, x_prev)  # f(x0)
        fx_current = evaluar_funcion(ecuacion, x_current)  # f(xi)

        # Verificar que no haya división por cero
        if abs(fx_current - fx_prev) < 1e-14:
            raise ValueError(f"División por cero en método de secante en iteración {n + 1}: "
                             f"f({x_current}) - f({x_prev}) ≈ 0")

        # Calcular xi+1 usando la fórmula de la secante (igual que tu código funcional)
        x_next = x_current - ((x_current - x_prev) / (fx_current - fx_prev)) * fx_current
        fx_next = evaluar_funcion(ecuacion, x_next)

        # Calcular error según el criterio
        if criterio == 1:
            error = abs(x_next - x_current)
        elif criterio == 2:
            if abs(x_next) < 1e-12:
                error = float('inf')
            else:
                error = abs(x_next - x_current) / abs(x_next)
        else:  # criterio == 3
            error = abs(fx_next)

        # Guardar resultado de la iteración (estructura igual a tu código original)
        resultado = {
            'n': n + 1,
            'i': i,
            'x0': formato6(x_prev),
            'xi': formato6(x_current),
            'xi+1': formato6(x_next),
            'f(x0)': formato6(fx_prev),
            'f(xi)': formato6(fx_current),
            'f(xi+1)': formato6(fx_next),
            'error': formato6(error)
        }

        resultados.append(resultado)

        # Verificar criterio de parada
        if error < tolerancia:
            break

        # Verificar si el resultado es válido
        if abs(x_next) > 1e10:
            raise ValueError("El método diverge: valores muy grandes detectados")

        # Actualizar valores para siguiente iteración (igual que tu código funcional)
        x_prev = x_current  # x0 = xi
        x_current = x_next  # xi = xi+1

    return resultados