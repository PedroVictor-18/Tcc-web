import React, { useState } from 'react';
import { Chart } from "react-google-charts";

function App() {
  const [options, setOptions] = useState({
    title: 'Gráfico de Interações'
  });
  const [optionsBar, setOptionsBar] = useState({
    title: 'Gráfico das Cidades'
  });
  const [data, setData] = useState([
    ['Interações', 'Quantidade'],
    ['Aceitos', 100],
    ['Em espera', 80],
    ['Concluídos', 50],
  ]);
  const [dataBar, setDataBar] = useState([
    ['Cidades', 'Empresas', 'Clientes'],
    ['Guaratinguetá, Guaratinguetá', 1, 1],
  ])
  return (
    <div className="App">
      <header className="App-header">
        <div style={{display: "flex"}}>
          <Chart
            width={'500px'}
            height={'300px'}
            chartType="PieChart"
            data={data}
            options={options}
          />
          <Chart
            width={'500px'}
            height={'300px'}
            chartType="BarChart"
            data={dataBar}
            options={optionsBar}
          />
        </div>
      </header>
    </div>
  );
}

export default App;