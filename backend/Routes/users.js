import express from "express";
import { editUser, getUsers } from "../Controllers/users.js";

const router = express.Router();
router.get("/", getUsers);
router.put("/editarUsuario", editUser);
export default router;