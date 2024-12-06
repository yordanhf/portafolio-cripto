import axios from "axios";
import cryptoList from "../data/cryptoList.json";

export const getCryptoIdFromInput = (input: string): string | null => {
  const normalizedInput = input.toLowerCase();

  // Buscar en la lista
  const crypto = cryptoList.find(
    (c: { id: string; symbol: string; name: string }) =>
      c.id.toLowerCase() === normalizedInput ||
      c.symbol.toLowerCase() === normalizedInput ||
      c.name.toLowerCase() === normalizedInput
  );

  return crypto?.id ?? null; // Retorna el id si se encuentra, o null si no
};

export const fetchCryptoDetails = async (cryptoName: string) => {
  if (!cryptoName) {
    throw new Error("El id de la criptomoneda no puede estar vacío.");
  }

  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoName.toLowerCase()}`);
    const { id, symbol, image, market_data } = response.data;

    return {
      id,
      symbol,
      image: image.small,
      price: market_data.current_price.usd,
    };
  } catch (error) {
    console.error("Error fetching crypto details:", error);

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error(`No se encontró la criptomoneda "${cryptoName}".`);
      } else if (error.response?.status === 400) {
        throw new Error("Solicitud inválida. Verifica el formato del id.");
      }
    }

    throw new Error("Error desconocido al obtener los datos.");
  }
};
