import sqlite3
import datetime
import requests



# conn = sqlite3.connect('calculadora_das_trevas.db')
# cursor = conn.cursor()

# cursor.execute('''CREATE TABLE IF NOT EXISTS Operacoes (id INTEGER PRIMARY KEY AUTOINCREMENT,
#     operacao TEXT,
#     resultado TEXT,
#     data_hora TEXT)''')

# conn.commit()


def registrar_operacao(operacao, resultado):
    conn = sqlite3.connect('calculadora_das_trevas.db')
    cursor = conn.cursor()

    data_hora = datetime.datetime.now()
    cursor.execute('''INSERT INTO Operacoes (operacao, resultado, data_hora) VALUES (?, ?, ?)''', 
                   (operacao, resultado, str(data_hora)))
    conn.commit()

    cursor.close()
    conn.close()


def consultar_operacoes():
    
    conn = sqlite3.connect('calculadora_das_trevas.db')
    cursor = conn.cursor()
    
    cursor.execute("select * from operacoes order by data_hora desc limit 10")
    rows = cursor.fetchall()
   
    cursor.close()
    conn.close()
    
    return rows


def enviar_dados_calculo(expressao_matematica, resultado):
    url = 'http://192.168.100.40:5003/api/calculo'
    dados = {'numerosDigitados': expressao_matematica}
    response = requests.get(url, params=dados)
    print(response.text)
    
        
# consultar_operacoes()

# conn.close()
   