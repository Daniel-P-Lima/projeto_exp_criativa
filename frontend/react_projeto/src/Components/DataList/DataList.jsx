const DataList = (props) => {
  return (
    <div>
      <div className="header">
        <h1 className="title">Listando Usuários</h1>
        <button type="button" className="btn btn-success" onClick={props.onAdd}>Adicionar Usuário</button>
      </div>

      <ul className="list">
        {props.data.map((item) => (
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
