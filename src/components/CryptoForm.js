import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
const CryptoForm = ({ onAddCrypto }) => {
    const [cryptoName, setCryptoName] = useState("");
    const [quantity, setQuantity] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (cryptoName && quantity) {
            onAddCrypto(cryptoName, Number(quantity));
            setCryptoName("");
            setQuantity("");
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            marginBottom: "1rem",
        }, children: [_jsx("input", { type: "text", placeholder: "ID de la Cripto", value: cryptoName, onChange: (e) => setCryptoName(e.target.value), required: true, style: { padding: "0.5rem", width: "150px" } }), _jsx("input", { type: "number", placeholder: "Cantidad", value: quantity, onChange: (e) => setQuantity(e.target.value === "" ? "" : Number(e.target.value)), required: true, style: { padding: "0.5rem", width: "100px" } }), _jsx("button", { type: "submit", style: {
                    padding: "0.5rem 1rem",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                }, children: "Agregar" })] }));
};
export default CryptoForm;
