import React from "react";

function ModalEditarUser({ user, onClose, atualizarUsuarios }) {
  const [formData, setFormData] = React.useState({
    idUsuarios: user.idUsuarios,
    nome: user.nome,
    idade: user.idade,
    cpf: user.cpf,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
        atualizarUsuarios();
        onClose();
      })
      .catch((error) => {
        console.error("Erro ao enviar dados:", error);
      });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Editar Usuário</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              <label>Nome:</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
              />
            </div>
            
            <div className="col">
              <label>Idade:</label>
              <input
                type="number"
                name="idade"
                value={formData.idade}
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <label>CPF:</label>
                <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="botoes">
            <button type="submit" className="btn btn-success">Salvar</button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalEditarUser;
