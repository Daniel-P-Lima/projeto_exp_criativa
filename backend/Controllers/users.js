/*
    Consulta no banco de dados
*/

import {db} from "../db.js";

export const getUsers = (_, res) => {
    const query = "SELECT * FROM usuarios"
    db.query(query, (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json(data);
    });
}

export const editUser = (req, res) => {
    const { idUsuarios, nome, idade, cpf } = req.body;
    const sql = "UPDATE usuarios SET nome = ?, idade = ?, cpf = ? WHERE idUsuarios = ?";
  
    db.query(sql, [nome, idade, cpf, idUsuarios], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      console.log();
      return res.json({ message: results});
    });
  };

  export const adicionarUser = (req, res) => {
    const { nome, idade, cpf } = req.body;
    
    const checkSql = "SELECT * FROM usuarios WHERE cpf = ?";
    db.query(checkSql, [cpf], (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao verificar CPF" });
      }
  
      if (results.length > 0) {
        return res.status(400).json({ error: "CPF já cadastrado!" });
      }
      const insertSql = "INSERT INTO usuarios (nome, idade, cpf) VALUES (?, ?, ?)";
      db.query(insertSql, [nome, idade, cpf], (err, results) => {
        if (err) {
          return res.status(500).send(err);
        }
  
        return res.json({ message: "Usuário adicionado com sucesso!" });
      });
    });
  };
  

export const deletarUser = (req, res) => {
  const id = req.params.id; // <-- ID deve vir da URL

  console.log("Recebido ID:", id); // DEBUG

  const sql = "DELETE FROM usuarios WHERE idUsuarios = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro ao excluir usuário:", err);
      return res.status(500).json({ error: "Erro ao excluir" });
    }

    return res.json({ message: "Usuário excluído com sucesso!" });
  });
};
  

