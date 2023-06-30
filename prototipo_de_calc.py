# -*- coding: utf-8 -*-
"""
Created on Tue Jun 27 09:15:56 2023

@author: User
"""
#calculadora ninja do gepeto

def soma(a, b):
    return a + b

def subtrai(a, b):
    return a - b

def multiplica(a, b):
    return a * b

def divide(a, b):
    if b != 0:
        return a / b
    else:
        return "Erro: Divisão por zero"

num1 = 5    
num2 = 20

resultado_soma = soma(num1, num2)
print(f"Soma: {num1} + {num2} = {resultado_soma}")

resultado_subtracao = subtrai(num1, num2)
print(f"Subtração: {num1} - {num2} = {resultado_subtracao}")

resultado_multiplicacao = multiplica(num1, num2)
print(f"Multiplicação: {num1} * {num2} = {resultado_multiplicacao}")

resultado_divisao = divide(num1, num2)
print(f"Divisão: {num1} / {num2} = {resultado_divisao}")