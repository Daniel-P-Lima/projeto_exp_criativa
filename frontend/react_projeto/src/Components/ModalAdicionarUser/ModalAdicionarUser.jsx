import { useState } from "react";
import "../../App.css";
function ModalAdicionarUser({ onClose, atualizarUsuarios }) {
    const [formData, setFormData] = useState({
        nome: "",
        idade: "",
        cpf: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:8800/adicionarUsuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Usuário adicionado:", data);
                atualizarUsuarios(); // Recarrega a lista
                onClose(); // Fecha o modal
            })
            .catch((error) => {
                console.error("Erro ao adicionar usuário:", error);
            });
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Adicionar Usuário</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-floating">
                        <input className="form-control" placeholder="nome" id="nome" aria-label="default input example" type="text" name="nome" value={formData.nome} onChange={handleChange} />
                        <label for="nome">Nome</label>
                    </div>
                    <div className="form-floating">
                        <input className="form-control" placeholder="Idade" id="idade" aria-label="default input example" type="number" name="idade" value={formData.idade} onChange={handleChange} />
                        <label for="idade">Idade</label>
                    </div>
                    <div className="form-floating">    
                        <input className="form-control" placeholder="cpf" id="cpf" aria-label="default input example" type="number" name="cpf" value={formData.cpf} onChange={handleChange} />
                        <label for="cpf">CPF</label>
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

export default ModalAdicionarUser;
