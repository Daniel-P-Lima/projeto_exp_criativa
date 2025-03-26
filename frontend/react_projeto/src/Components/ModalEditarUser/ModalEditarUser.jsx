import React from "react";

export default function ModalEditarUser({ user, onClose, onSave }) {
  const [formData, setFormData] = React.useState({ ...user });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(formData);
    onClose();
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h1>Editar Usuário</h1>
        <form onSubmit={handleSubmit}>
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
      </div>
    </div>
  );
}
