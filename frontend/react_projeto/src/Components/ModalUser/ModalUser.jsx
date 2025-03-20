import "../../App.css"; 
import DataList from "../DataList/DataList";
import { useState } from "react";

function ModalUser() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [itemClicked, setItemClicked] = useState(null);

  function clicked(item) {
    console.log("Clicou no item", item.id);
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
            <p><strong>Nome:</strong> {itemClicked.name}</p>
            <p><strong>Email:</strong> {itemClicked.email}</p>
            <p><strong>Telefone:</strong> {itemClicked.phone}</p>
            <button className="btn btn-primary"onClick={closeModal}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModalUser;