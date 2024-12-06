import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import "./styles.css";
import CryptoForm from "./components/CryptoForm";
import CryptoList from "./components/CryptoList";
import PortfolioTotal from "./components/PortfolioTotal";
import { fetchCryptoDetails, getCryptoIdFromInput } from "./api/cryptoApi";
const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};
const loadFromLocalStorage = (key, defaultValue) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
};
const App = () => {
    const [cryptos, setCryptos] = useState(() => loadFromLocalStorage("cryptos", []));
    const [total, setTotal] = useState(() => loadFromLocalStorage("total", 0));
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);
    useEffect(() => {
        saveToLocalStorage("cryptos", cryptos);
        saveToLocalStorage("total", total);
    }, [cryptos, total]);
    const updatePrices = async () => {
        setUpdating(true);
        try {
            const updatedCryptos = await Promise.all(cryptos.map(async (crypto) => {
                const { price } = await fetchCryptoDetails(crypto.id);
                return { ...crypto, price };
            }));
            setCryptos(updatedCryptos);
            const newTotal = updatedCryptos.reduce((acc, crypto) => acc + crypto.quantity * crypto.price, 0);
            setTotal(newTotal);
        }
        catch (error) {
            console.error("Error al actualizar los precios:", error);
        }
        finally {
            setUpdating(false);
        }
    };
    const addCrypto = async (input, quantity) => {
        setLoading(true);
        try {
            // Buscar el id basado en el input del usuario
            const id = getCryptoIdFromInput(input);
            if (!id) {
                alert(`No se encontró la criptomoneda "${input}".`);
                return;
            }
            // Obtener detalles de la criptomoneda usando su id
            const { id: cryptoId, symbol, image, price, } = await fetchCryptoDetails(id);
            if (!price) {
                alert(`No se pudo encontrar el precio de "${input}". Verifica los datos.`);
                return;
            }
            const newCrypto = { id: cryptoId, symbol, image, quantity, price };
            setCryptos((prev) => [...prev, newCrypto]);
            setTotal((prev) => prev + quantity * price);
        }
        catch (error) {
            alert(error.message);
        }
        finally {
            setLoading(false);
        }
    };
    const removeCrypto = (id) => {
        const cryptoToRemove = cryptos.find((crypto) => crypto.id === id);
        if (!cryptoToRemove)
            return;
        setCryptos((prev) => prev.filter((crypto) => crypto.id !== id));
        setTotal((prev) => prev - cryptoToRemove.quantity * cryptoToRemove.price);
    };
    return (_jsxs("div", { className: "container", children: [_jsx("h1", { children: "Portafolio de Criptomonedas" }), loading && _jsx("p", { children: "Cargando datos..." }), !loading && _jsx(CryptoForm, { onAddCrypto: addCrypto }), updating && _jsx("p", { children: "Actualizando precios..." }), !updating && (_jsxs(_Fragment, { children: [_jsx(CryptoList, { cryptos: cryptos, onRemoveCrypto: removeCrypto }), _jsx("div", { style: { textAlign: "center" }, children: _jsx("button", { onClick: updatePrices, style: {
                                margin: "1rem",
                                padding: "0.5rem 1rem",
                                backgroundColor: "#007BFF",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }, children: "Actualizar Precios" }) })] })), _jsx(PortfolioTotal, { total: total })] }));
};
export default App;
