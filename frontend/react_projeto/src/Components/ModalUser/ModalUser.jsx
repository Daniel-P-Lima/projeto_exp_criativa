import "../../App.css";
import DataList from "../DataList/DataList";
import ModalEditarUser from "../ModalEditarUser/ModalEditarUser";
import ModalAdicionarUser from "../ModalAdicionarUser/ModalAdicionarUser";
import ModalErro from "../ModalErro/ModalErro";

import { useEffect, useState } from "react";

function ModalUser() {
  const [usuarios, setUsuarios] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [itemClicked, setItemClicked] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [erro, setErro] = useState(null);

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

  const handleDelete = (idUsuarios) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      
      fetch(`http://localhost:8800/deletarUsuario/${idUsuarios}`, {
        
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Usuário excluído:", data);
          fetchData();
        })
        .catch((error) => {
          console.error("Erro ao excluir usuário:", error);
        });
    }
  };
  
  return (
    <div>
      <DataList clicked={clicked} data={usuarios} onAdd={() => setAddModalOpen(true)} onDelete={handleDelete}/>

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
          setErro={setErro}
        />
      )}

      {erro && (
        <ModalErro
          mensagem={erro}
          onClose={() => setErro(null)}
        />
      )}

    </div>
  );
}

export default ModalUser;
