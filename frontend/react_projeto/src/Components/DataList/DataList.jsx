import React, { useEffect, useState } from "react";

const DataList = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8800/")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <div>
      <h1 className="title">Listando Usuários</h1>
      <ul className="list">
        {data.map((item) => (
          <li key={item.idUsuarios} className="li-list">
            <p id="nome">Nome: {item.nome}</p>
            <p id="idade">Idade: {item.idade}</p>
            <p id="cpf">CPF: {item.cpf}</p>
            <button
              className="btn btn-primary"
              onClick={() => props.clicked(item)}
            >
              Mais detalhes
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataList;
