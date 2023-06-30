# -*- coding: utf-8 -*-
"""
Created on Tue Jun 27 08:03:23 2023

@author: User
"""
# 01 - Contrução de calculadora

n1 = 4
n2 = 20


def adicionar(n1, n2):
    return n1 + n2


def subtrair(n1, n2):
    return n1 - n2


def multip(n1, n2):
    return n1 * n2


def divid(n1, n2):
    if n2 != 0:
        return n1 / n2
    else:
        return "Infinito"


soma = adicionar(n1, n2)
print("A soma é:", soma)

diferença = subtrair(n1, n2)
print("A diferença é:", diferença)

multiplicar = multip(n1, n2)
print("A multiplicação é", multiplicar)

divisao = divid(n1, n2)
print("A divisão é", divisao)


def calcular(n1, n2, operacao):
    if operacao == 'adicionar':
        return adicionar(n1, n2)
    elif operacao == 'subtrair':
        return subtrair(n1, n2)
    elif operacao == 'multiplicar':
        return multip(n1, n2)
    elif operacao == 'dividir':
        return divid(n1, n2)
    else:
        return "Operação não subortada"

operacoes = ['adicionar', 'subtrair', 'multiplicar', 'dividir']

    #loop

for x in operacoes:
    resultado = calcular(n1, n2, x)
    print(f"O resultado da operação {x} é: {resultado}")
