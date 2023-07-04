from flask import Flask, request
from flask_cors import CORS
from memoria import  registrar_operacao, consultar_operacoes


app = Flask(__name__)
CORS (app)

@app.route('/calculo', methods=['GET'])
def calculo():
    
    args = request.args.get('numerosDigitados') 
    
    expressao_matematica = args
    resultado = eval(expressao_matematica)
   
    registrar_operacao(expressao_matematica, resultado)
    print(str(resultado))
    return str(resultado).replace('.',',')

# @app.route('/ola_mundo', methods=['GET'])
# def ola_mundo():
#     print('olá mundo')
#     return'ok'
    
@app.route('/consultar_operacoes', methods=['GET'])
def cons_op():
       
    data = consultar_operacoes()
    dict_list = [{"operacao": item[1], "resultado": item[2], "data_hora": item[3]} for item in data]
    return dict_list
    
if __name__ == '__main__':
    app.run(port=5003, host='192.168.100.40', threaded=True)

