import axios from "axios";

const BASE_URL = "https://68f3b0dafd14a9fcc4298f1a.mockapi.io/api";

/**
 * Obtener todas las comidas desde MockAPI
 * @returns {Promise<Array>} 
 */
export async function getAllComidas() {
	try {
		const res = await axios.get(`${BASE_URL}/comidas`);
		return res.data;
	} catch (error) {
        //Error en caso de que la API falle
		const msg = error?.response?.data || error.message || "Error al obtener comidas";
		throw new Error(msg);
	}
}

export default {
	getAllComidas,
};

