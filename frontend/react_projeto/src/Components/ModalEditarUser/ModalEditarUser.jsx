import React from "react";

export default function ModalEditarUser({ user, onClose, onSave }) {
  const [formData, setFormData] = React.useState({ ...user });
  const [showConfirm, setShowConfirm] = React.useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleOpenConfirm(e) {
    e.preventDefault();
    setShowConfirm(true);
  }

  function handleConfirmYes() {
    onSave(formData);
    handleSubmit();
    setShowConfirm(false);
    onClose();
  }

  function handleConfirmNo() {
    setShowConfirm(false);
  }

  function handleSubmit(e) {
    fetch("http://localhost:8800/editarUsuario", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Resposta do servidor:", data);
        onClose();
      })
      .catch((error) => {
        console.error("Erro ao enviar dados:", error);
      });
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h1>Editar Usuário</h1>
        <form onSubmit={handleOpenConfirm}>
          <div className="form-group">
            <label>Nome:</label>
            <input
              className="form-control"
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Nome"
            />
          </div>
          <div className="form-group">
            <label>Idade:</label>
            <input
              className="form-control"
              type="number"
              name="idade"
              value={formData.idade}
              onChange={handleChange}
              placeholder="Idade"
            />
          </div>
          <div className="form-group">
            <label>CPF</label>
            <input
              className="form-control"
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              placeholder="CPF"
            />
          </div>
          <div className="container-botoes">
            <button className="btn btn-primary" type="submit">
              Salvar
            </button>
            <button className="btn btn-danger" onClick={onClose} type="button">
              Cancelar
            </button>
          </div>
        </form>
        {showConfirm && (
          <div className="confirm-modal">
            <div className="confirm-modal-content">
              <h2>Confirma a Edição?</h2>
              <div className="container-botoes">
                <button className="btn btn-success" onClick={handleConfirmYes}>
                  Sim
                </button>
                <button className="btn btn-danger" onClick={handleConfirmNo}>
                  Não
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
