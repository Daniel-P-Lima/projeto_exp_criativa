import "../../App.css";
import DataList from "../DataList/DataList";
import ModalEditarUser from "../ModalEditarUser/ModalEditarUser";
import ModalAdicionarUser from "../ModalAdicionarUser/ModalAdicionarUser";

import { useEffect, useState } from "react";

function ModalUser() {
  const [usuarios, setUsuarios] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [itemClicked, setItemClicked] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);


  const fetchData = () => {
    fetch("http://localhost:8800/")
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch((err) => console.error("Erro ao buscar usuários:", err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  function clicked(item) {
    console.log("Clicou no item", item.idUsuarios);
    setModalIsOpen(true);
    setItemClicked(item);
  }

  function closeModal() {
    setModalIsOpen(false);
    setItemClicked(null);
  }

  return (
    <div>
      <DataList clicked={clicked} data={usuarios} onAdd={() => setAddModalOpen(true)}/>

      {modalIsOpen && itemClicked && (
        <div className="modal">
          <div className="modal-content">
            <h1>Detalhes do Usuário</h1>
            <div className="row">
            <div className="col">
                <button
                  className="btn btn-primary botaoEditarUsuario"
                  onClick={() => setEditModalOpen(true)}
                >
                  <i className="material-icons">edit</i>
                </button>      
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p>
                  <strong>Nome:</strong> {itemClicked.nome}
                </p>
              </div>
              <div className="col">
                <p className="idade">
                  <strong>Idade:</strong> {itemClicked.idade}
                </p>
              </div>
              <div className="col">
                <p>
                  <strong>CPF:</strong> {itemClicked.cpf}
                </p>
              </div>
              
            </div>
            <button className="btn btn-primary" onClick={closeModal}>
              Fechar
            </button>
          </div>
        </div>
      )}

      {editModalOpen && itemClicked && (
        <ModalEditarUser
          user={itemClicked}
          onClose={() => {
            setEditModalOpen(false);
            setModalIsOpen(false);
          }}
          atualizarUsuarios={fetchData}
        />
      )}

      {addModalOpen && (
        <ModalAdicionarUser
          onClose={() => setAddModalOpen(false)}
          atualizarUsuarios={fetchData}
        />
      )}

    </div>
  );
}

export default ModalUser;
