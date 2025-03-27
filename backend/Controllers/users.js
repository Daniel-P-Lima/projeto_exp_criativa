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
    const {nome, idade, cpf } = req.body;
    const sql = "INSERT INTO usuarios (nome, idade, cpf) VALUES (?, ?, ?)";

    db.query(sql, [nome, idade, cpf], (err, results) => {
        if (err) {
          return res.status(500).send(err);
        }
        return res.json({ message: "Usuário adicionado com sucesso!"});
      });
  
}
  

