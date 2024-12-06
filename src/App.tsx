import React, { useEffect, useState } from "react";
import "./styles.css";
import CryptoForm from "./components/CryptoForm";
import CryptoList from "./components/CryptoList";
import PortfolioTotal from "./components/PortfolioTotal";
import { fetchCryptoDetails, getCryptoIdFromInput } from "./api/cryptoApi";

interface Crypto {
  id: string;
  symbol: string;
  image: string;
  quantity: number;
  price: number;
}

const saveToLocalStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const loadFromLocalStorage = <T,>(key: string, defaultValue: T): T => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

const App: React.FC = () => {
  const [cryptos, setCryptos] = useState<Crypto[]>(() =>
    loadFromLocalStorage<Crypto[]>("cryptos", [])
  );
  const [total, setTotal] = useState(() =>
    loadFromLocalStorage<number>("total", 0)
  );
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    saveToLocalStorage("cryptos", cryptos);
    saveToLocalStorage("total", total);
  }, [cryptos, total]);

  const updatePrices = async () => {
    setUpdating(true);

    try {
      const updatedCryptos = await Promise.all(
        cryptos.map(async (crypto) => {
          const { price } = await fetchCryptoDetails(crypto.id);
          return { ...crypto, price };
        })
      );

      setCryptos(updatedCryptos);

      const newTotal = updatedCryptos.reduce(
        (acc, crypto) => acc + crypto.quantity * crypto.price,
        0
      );
      setTotal(newTotal);
    } catch (error) {
      console.error("Error al actualizar los precios:", error);
    } finally {
      setUpdating(false);
    }
  };

  const addCrypto = async (input: string, quantity: number) => {
    setLoading(true);

    try {
      // Buscar el id basado en el input del usuario
      const id = getCryptoIdFromInput(input);

      if (!id) {
        alert(`No se encontró la criptomoneda "${input}".`);
        return;
      }

      // Obtener detalles de la criptomoneda usando su id
      const {
        id: cryptoId,
        symbol,
        image,
        price,
      } = await fetchCryptoDetails(id);

      if (!price) {
        alert(
          `No se pudo encontrar el precio de "${input}". Verifica los datos.`
        );
        return;
      }

      const newCrypto = { id: cryptoId, symbol, image, quantity, price };
      setCryptos((prev) => [...prev, newCrypto]);

      setTotal((prev) => prev + quantity * price);
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const removeCrypto = (id: string) => {
    const cryptoToRemove = cryptos.find((crypto) => crypto.id === id);
    if (!cryptoToRemove) return;

    setCryptos((prev) => prev.filter((crypto) => crypto.id !== id));

    setTotal((prev) => prev - cryptoToRemove.quantity * cryptoToRemove.price);
  };

  return (
    <div className="container">
      <h1>Portafolio de Criptomonedas</h1>
      {loading && <p>Cargando datos...</p>}
      {!loading && <CryptoForm onAddCrypto={addCrypto} />}

      {updating && <p>Actualizando precios...</p>}
      {!updating && (
        <>
          <CryptoList cryptos={cryptos} onRemoveCrypto={removeCrypto} />
          <div style={{ textAlign: "center" }}>
            <button
              onClick={updatePrices}
              style={{
                margin: "1rem",
                padding: "0.5rem 1rem",
                backgroundColor: "#007BFF",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Actualizar Precios
            </button>
          </div>
        </>
      )}

      <PortfolioTotal total={total} />
    </div>
  );
};

export default App;
