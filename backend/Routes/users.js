import express from "express";
import { editUser, getUsers, adicionarUser} from "../Controllers/users.js";

const router = express.Router();
router.get("/", getUsers);
router.put("/editarUsuario", editUser);
router.post("/adicionarUsuario", adicionarUser);
export default router;