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
    console.log("req.body:", req.body);
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
  

