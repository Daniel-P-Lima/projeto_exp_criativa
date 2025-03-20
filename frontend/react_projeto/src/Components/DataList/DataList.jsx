import React, { useEffect, useState } from "react";

const DataList = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
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
          <li key={item.id} className="li-list">
            {item.name}<br />
            {item.phone}<br />
            {item.email}<br />
            <button className="btn btn-primary" onClick={() => props.clicked(item)}>
              Mais detalhes
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataList;