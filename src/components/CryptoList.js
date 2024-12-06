import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
const CryptoList = ({ cryptos, onRemoveCrypto }) => {
    const sortedCryptos = [...cryptos].sort((a, b) => b.quantity * b.price - a.quantity * a.price);
    return (_jsx("ul", { style: { listStyleType: "none", padding: 0 }, children: sortedCryptos.map((crypto, index) => (_jsxs("li", { style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.5rem",
                borderBottom: "1px solid #ddd",
            }, children: [_jsxs("span", { children: [index + 1, "."] }), _jsx("div", { style: { flex: 1, textAlign: "left" }, children: _jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [_jsx("img", { src: crypto.image, alt: crypto.symbol, style: {
                                    width: "24px",
                                    height: "24px",
                                    marginLeft: "0.5rem",
                                    marginRight: "1rem",
                                } }), _jsx("span", { style: { fontWeight: "bold" }, children: crypto.symbol.toUpperCase() }), " (" + crypto.price + ")"] }) }), _jsxs("div", { style: { flex: 1, textAlign: "center" }, children: ["Cantidad: ", crypto.quantity.toFixed(2)] }), _jsxs("div", { style: { flex: 1, textAlign: "center" }, children: ["Total: $", (crypto.quantity * crypto.price).toFixed(2)] }), _jsx("button", { onClick: () => onRemoveCrypto(crypto.id), style: {
                        backgroundColor: "#ff4d4d",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        padding: "0.3rem 0.5rem",
                        cursor: "pointer",
                    }, children: "Eliminar" })] }, crypto.id))) }));
};
export default CryptoList;
