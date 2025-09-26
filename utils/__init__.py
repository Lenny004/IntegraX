# utils/__init__.py
"""
Módulo de utilidades para métodos numéricos
"""

from .evaluador import evaluar_funcion, calcular_error, validar_intervalo
from .biseccion import metodo_biseccion
from .regla_falsa import metodo_regla_falsa
from .secante import metodo_secante

__all__ = [
    'evaluar_funcion',
    'calcular_error',
    'validar_intervalo',
    'metodo_biseccion',
    'metodo_regla_falsa',
    'metodo_secante'
]