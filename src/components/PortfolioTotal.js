import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const PortfolioTotal = ({ total }) => {
    return (_jsxs("div", { style: { textAlign: "center" }, children: [_jsx("h2", { children: "Valor Total del Portafolio:" }), _jsxs("h3", { style: { color: "green" }, children: ["$", total.toFixed(2)] })] }));
};
export default PortfolioTotal;
