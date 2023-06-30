from flask import Flask, request, jsonify
from flask_cors import CORS
from memoria import sqlite3, registrar_operacao

app = Flask(__name__)
CORS (app)

@app.route('/api/calculo', methods=['GET'])
def calculo():
    
    args = request.args.get('numerosDigitados') 
    
    expressao_matematica = args
    resultado = eval(expressao_matematica)
   
    registrar_operacao(expressao_matematica, resultado)
    print(str(resultado))
    return str(resultado)


if __name__ == '__main__':
    app.run(port=5003, host='192.168.100.40', threaded=True)
