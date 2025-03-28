import express from "express";
import { editUser, getUsers, adicionarUser, deletarUser} from "../Controllers/users.js";

const router = express.Router();
router.get("/", getUsers);
router.put("/editarUsuario", editUser);
router.post("/adicionarUsuario", adicionarUser);
router.delete("/deletarUsuario/:id", deletarUser);
export default router;