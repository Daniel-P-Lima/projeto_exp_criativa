import React, { useState } from "react";

export default function ModalNovoUser() {
    const [formData, setFormData] = useState({ ...user });function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    
      function handleOpenConfirm(e) {
        e.preventDefault();
        
        setShowConfirm(true);
      }
    
      function handleConfirmYes() {
        
        onSave(formData);
        setShowConfirm(false);
        onClose();
      }
    
      function handleConfirmNo() {
        
        setShowConfirm(false);
      }
    
      function handleSubmit(e) {
        e.preventDefault();
    
        fetch("http://localhost:8800/adicionarUser", {
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
    
}