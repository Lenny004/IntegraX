# utils/__init__.py
"""
Módulo de utilidades para métodos numéricos
"""

from .evaluador import evaluar_funcion, calcular_error, validar_intervalo
from .biseccion import metodo_biseccion

__all__ = [
    'evaluar_funcion',
    'calcular_error',
    'validar_intervalo',
    'metodo_biseccion'
]