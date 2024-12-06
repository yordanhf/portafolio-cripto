import React from "react";

interface Crypto {
  id: string;
  symbol: string;
  image: string;
  quantity: number;
  price: number;
}

interface CryptoListProps {
  cryptos: Crypto[];
  onRemoveCrypto: (id: string) => void;
}

const CryptoList: React.FC<CryptoListProps> = ({ cryptos, onRemoveCrypto }) => {
  const sortedCryptos = [...cryptos].sort(
    (a, b) => b.quantity * b.price - a.quantity * a.price
  );

  return (
    <ul style={{ listStyleType: "none", padding: 0 }}>
      {sortedCryptos.map((crypto, index) => (
        <li
          key={crypto.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.5rem",
            borderBottom: "1px solid #ddd",
          }}
        >
          <span>{index + 1}.</span>
          <div style={{ flex: 1, textAlign: "left" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={crypto.image}
                alt={crypto.symbol}
                style={{
                  width: "24px",
                  height: "24px",
                  marginLeft: "0.5rem",
                  marginRight: "1rem",
                }}
              />
              <span style={{ fontWeight: "bold" }}>
                {crypto.symbol.toUpperCase()}
              </span>
              {" (" + crypto.price + ")"}
            </div>
          </div>
          <div style={{ flex: 1, textAlign: "center" }}>
            Cantidad: {crypto.quantity.toFixed(2)}
          </div>
          <div style={{ flex: 1, textAlign: "center" }}>
            Total: ${(crypto.quantity * crypto.price).toFixed(2)}
          </div>
          <button
            onClick={() => onRemoveCrypto(crypto.id)}
            style={{
              backgroundColor: "#ff4d4d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "0.3rem 0.5rem",
              cursor: "pointer",
            }}
          >
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CryptoList;
