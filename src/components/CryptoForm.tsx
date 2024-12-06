import React, { useState } from "react";

interface CryptoFormProps {
  onAddCrypto: (name: string, quantity: number) => void;
}

const CryptoForm: React.FC<CryptoFormProps> = ({ onAddCrypto }) => {
  const [cryptoName, setCryptoName] = useState("");
  const [quantity, setQuantity] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cryptoName && quantity) {
      onAddCrypto(cryptoName, Number(quantity));
      setCryptoName("");
      setQuantity("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        marginBottom: "1rem",
      }}
    >
      <input
        type="text"
        placeholder="ID de la Cripto"
        value={cryptoName}
        onChange={(e) => setCryptoName(e.target.value)}
        required
        style={{ padding: "0.5rem", width: "150px" }}
      />
      <input
        type="number"
        placeholder="Cantidad"
        value={quantity}
        onChange={(e) =>
          setQuantity(e.target.value === "" ? "" : Number(e.target.value))
        }
        required
        style={{ padding: "0.5rem", width: "100px" }}
      />
      <button
        type="submit"
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Agregar
      </button>
    </form>
  );
};

export default CryptoForm;
