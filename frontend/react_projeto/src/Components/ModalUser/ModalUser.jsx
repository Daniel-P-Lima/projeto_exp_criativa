import "../../App.css";
import DataList from "../DataList/DataList";
import ModalEditarUser from "../ModalEditarUser/ModalEditarUser";
import { useState } from "react";

function ModalUser() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [itemClicked, setItemClicked] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

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
      <DataList clicked={clicked} />

      {modalIsOpen && itemClicked && (
        <div className="modal">
          <div className="modal-content">
            <h1>Detalhes do Usuário</h1>

            <div className="container-dados-usuario-superior">
              <p>
                <strong>Nome:</strong> {itemClicked.nome}
              </p>
              <p className="idade">
                <strong>Idade:</strong> {itemClicked.idade}
              </p>
              <div className="divBotaoEditarUsuario">
                <button
                  className="btn btn-primary botaoEditarUsuario"
                  onClick={() => setEditModalOpen(true)}
                >
                  <i className="material-icons">edit</i>
                </button>
              </div>
            </div>
            <div className="container-dados-usuario-inferior">
              <p>
                <strong>CPF:</strong> {itemClicked.cpf}
              </p>
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
          onClose={() => setEditModalOpen(false)}
          onSave={(updatedUser) => {
            setItemClicked(updatedUser);
            console.log("Usuário editado:", updatedUser);
            // Aqui você pode fazer uma chamada para a API se quiser salvar
          }}
        />
      )}
    </div>
  );
}

export default ModalUser;
