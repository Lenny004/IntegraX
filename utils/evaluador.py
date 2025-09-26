# utils/evaluador.py
import math


def evaluar_funcion(ecuacion, x):
    """
    Evalúa una función matemática en un punto x

    Args:
        ecuacion (str): La ecuación a evaluar
        x (float): El valor donde evaluar la función
    Returns:
        float: El resultado de f(x)
    Raises:
        ValueError: Si hay error al evaluar la función
    """
    try:
        # Preparar la ecuación para evaluación
        ecuacion_prep = ecuacion.replace('^', '**')
        ecuacion_prep = ecuacion_prep.replace('x', f'({x})')

        # Reemplazar funciones matemáticas comunes
        ecuacion_prep = ecuacion_prep.replace('sin', 'math.sin')
        ecuacion_prep = ecuacion_prep.replace('cos', 'math.cos')
        ecuacion_prep = ecuacion_prep.replace('tan', 'math.tan')
        ecuacion_prep = ecuacion_prep.replace('log', 'math.log')
        ecuacion_prep = ecuacion_prep.replace('ln', 'math.log')
        ecuacion_prep = ecuacion_prep.replace('sqrt', 'math.sqrt')
        ecuacion_prep = ecuacion_prep.replace('exp', 'math.exp')
        ecuacion_prep = ecuacion_prep.replace('abs', 'abs')

        # Agregar soporte para constantes matemáticas
        ecuacion_prep = ecuacion_prep.replace('pi', 'math.pi')
        ecuacion_prep = ecuacion_prep.replace('e', 'math.e')

        return eval(ecuacion_prep)

    except Exception as e:
        raise ValueError(f"Error al evaluar la función f({x}): {str(e)}")


def calcular_error(xi_actual, xi_anterior, criterio):
    """
    Calcula el error según el criterio especificado

    Args:
        xi_actual (float): Valor actual de xi
        xi_anterior (float): Valor anterior de xi
        criterio (int): 1=|xi+1 - xi|, 2=|xi+1 - xi|/|xi+1|, 3=|f(xi+1)|

    Returns:
        float: El error calculado
    """
    if criterio == 1:
        return abs(xi_actual - xi_anterior)
    elif criterio == 2:
        if abs(xi_actual) < 1e-12:
            return float('inf')
        return abs(xi_actual - xi_anterior) / abs(xi_actual)
    # Para criterio 3, el error se calcula en cada método específico
    else:
        return abs(xi_actual - xi_anterior)


def validar_intervalo(ecuacion, a, b):
    """
    Valida que el intervalo sea válido para métodos que requieren cambio de signo

    Args:
        ecuacion (str): La ecuación a evaluar
        a, b (float): Los extremos del intervalo
    Returns:
        tuple: (f(a), f(b))
    Raises:
        ValueError: Si la función no cambia de signo en el intervalo
    """
    f_a = evaluar_funcion(ecuacion, a)
    f_b = evaluar_funcion(ecuacion, b)

    if f_a * f_b > 0:
        raise ValueError(f"La función debe cambiar de signo en el intervalo [{a}, {b}]. "
                         f"f({a}) = {f_a:.6f}, f({b}) = {f_b:.6f}")

    return f_a, f_b

def formato6(num):
    # Manejo de infinito
    if num == float('inf'):
        return "inf"
    if num == float('-inf'):
        return "-inf"
    if num != num:  # NaN
        return "nan"

    # Redondear a 6 decimales primero
    redondeado = round(num, 6)
    entero = int(redondeado)
    decimal = abs(redondeado - entero)

    # Convertir la parte decimal a string con 6 decimales
    dec_mult = round(decimal * 1000000)
    #.zfill(6) rellena el string con 0 a la izquierda hasta una longitud total de 6
    dec_str = str(dec_mult).zfill(6)

    if num < 0 and entero == 0:
        return "-0." + dec_str
    else:
        return str(entero) + "." + dec_str