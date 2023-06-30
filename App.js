import React, { useState, useEffect } from 'react';
import api from './api.js';
import './App.css';

function App() {
  const [resultado, setResultado] = useState('');
  const [numerosDigitados, setNumerosDigitados] = useState('');
  const [operacoes, setOperacoes] = useState([]);
  const [ultimaOperacao, setUltimaOperacao] = useState('');

  useEffect(() => {
    consultarOperacoes();
  }, []);

  async function consultarOperacoes() {
    try {
      const response = await api.get('/api/consultar_operacoes');
      const operacoes = response.data;
      setOperacoes(operacoes);
    } catch (error) {
      console.error('Erro ao consultar operações:', error);
    }
  }

  function handleClick(event) {
    const value = event.target.name;
    console.log('Valor do botão clicado:', value);

    if (numerosDigitados === '' && (value === '*' || value === '/' || value === '+' || value === ')')) {
      return;
    }

    const isOperator = ['+', '-', '*', '/'].includes(value);
    const hasNumbers = /[0-9]/.test(numerosDigitados);

    if (isOperator && !hasNumbers) {
      return;
    }

    const lastCharacterIsOperator = ultimoCaractereOperador();
    const nextCharacterIsOperator = proximoCaractereOperador(value);

    if (lastCharacterIsOperator && nextCharacterIsOperator) {
      setNumerosDigitados(numerosDigitados.slice(0, -1) + value);
    } else {
      setNumerosDigitados(numerosDigitados + value);
    }
  }

  function ultimoCaractereOperador() {
    return ['+', '-', '*', '/'].includes(numerosDigitados.slice(-1));
  }

  function proximoCaractereOperador(value) {
    return ['+', '-', '*', '/'].includes(value);
  }

  function apagatudo() {
    setNumerosDigitados('');
    setResultado('');
  }

  function apagarUltimo() {
    setNumerosDigitados(numerosDigitados.slice(0, -1));
  }

  function mostrarOperacoes() {
    const operacoesContainer = document.getElementById('operacoesContainer');

    api.get('/api/operacoes')
      .then(response => {
        const data = response.data;
        operacoesContainer.innerHTML = '';
        data.forEach(operacao => {
          const divOperacao = document.createElement('div');
          divOperacao.textContent = `${operacao.operacao} = ${operacao.resultado}`;
          operacoesContainer.appendChild(divOperacao);
        });
      })
      .catch(error => {
        console.error(error);
        operacoesContainer.textContent = 'Erro ao recuperar as operações.';
      });
  }

  function getCalculo() {
    // Perform calculation based on the numerosDigitados state
    // Update the resultado state with the calculated result
    // Update the ultimaOperacao state with the current operation
  }

  return (
    <div className="App">
      <h1 className="calculator-title">CALCULADORA DAS TREVAS</h1>

      <div className="result-window">{resultado}</div>

      <p>Números Digitados: {numerosDigitados}</p>
      <div>
        <button className="highlight calculator-button" onClick={apagatudo}>C</button>
        <button name="M" onClick={mostrarOperacoes} className="calculator-button">M</button>
        <button name="CE" onClick={apagarUltimo} className="calculator-button">←</button>
        <button name="H" onClick={consultarOperacoes} className="calculator-button">H</button>
      </div>
      <div>
        <button name="7" onClick={handleClick} className="calculator-button">7</button>
        <button name="8" onClick={handleClick} className="calculator-button">8</button>
        <button name="9" onClick={handleClick} className="calculator-button">9</button>
        <button name="/" onClick={handleClick} className="calculator-button">/</button>
        <button name="**.5" onClick={handleClick} className="calculator-button">√</button>
      </div>
      <div>
        <button name="4" onClick={handleClick} className="calculator-button">4</button>
        <button name="5" onClick={handleClick} className="calculator-button">5</button>
        <button name="6" onClick={handleClick} className="calculator-button">6</button>
        <button name="*" onClick={handleClick} className="calculator-button">*</button>
        <button name="**2" onClick={handleClick} className="calculator-button">x²</button>
      </div>
      <div>
        <button name="1" onClick={handleClick} className="calculator-button">1</button>
        <button name="2" onClick={handleClick} className="calculator-button">2</button>
        <button name="3" onClick={handleClick} className="calculator-button">3</button>
        <button name="-" onClick={handleClick} className="calculator-button">-</button>
        <button name="(" onClick={handleClick} className="calculator-button">(</button>
      </div>
      <button name="." onClick={handleClick} className="calculator-button">.</button>
      <button name="0" onClick={handleClick} className="calculator-button">0</button>
      <button name="+" onClick={handleClick} className="calculator-button">+</button>
      <button className="highlight-equal-button" onClick={getCalculo}>=</button>
      <button name=")" onClick={handleClick} className="calculator-button">)</button>
      <div>
        <div id="operacoesContainer">Última Operação: {ultimaOperacao}</div>
        <div>
          <h2>Histórico de Operações</h2>
          {operacoes.map((operacao, index) => (
            <div key={index}>
              <p>Operação: {operacao.operacao}</p>
              <p>Resultado: {operacao.resultado}</p>
              <p>Data e Hora: {operacao.data_hora}</p>
              <hr/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
