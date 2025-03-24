import axios from "axios";
import { GeniusAPIResponse, GeniusSong } from "../types"; // 🔹 Importamos los tipos

const GENIUS_API_KEY = "j6qUSXSrNz9y5p6xHtGiW5thihCf9Z7TnuZgewrVPcNFa8axRtJR70aI_80uD2i6"; // 🔴 Reemplázalo con tu clave real
const BASE_URL = "https://api.genius.com";

/**
 * Busca una canción en Genius y obtiene la URL de la letra.
 */
export async function searchLyrics(songTitle: string, artistName: string): Promise<GeniusSong | null> {
  try {
    const response = await axios.get<GeniusAPIResponse>(`${BASE_URL}/search`, {
      headers: { Authorization: `Bearer ${GENIUS_API_KEY}` },
      params: { q: `${songTitle} ${artistName}` },
    });

    // Verificamos si hay resultados
    if (!response.data.response.hits.length) return null;

    // Extraemos la información de la primera coincidencia
    const songData = response.data.response.hits[0].result;

    return {
      title: songData.full_title,
      artist: songData.primary_artist.name,
      lyricsUrl: songData.url,
    };
  } catch (error) {
    console.error("Error al buscar la letra en Genius:", error);
    return null;
  }
}
