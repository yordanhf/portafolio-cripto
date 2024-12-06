import React from "react";

interface PortfolioTotalProps {
  total: number;
}

const PortfolioTotal: React.FC<PortfolioTotalProps> = ({ total }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Valor Total del Portafolio:</h2>
      <h3 style={{ color: "green" }}>${total.toFixed(2)}</h3>
    </div>
  );
};

export default PortfolioTotal;
