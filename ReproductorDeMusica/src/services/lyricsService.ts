import axios from "axios";

export interface LyricsAPIResponse {
  lyrics: string;
}

export async function searchLyrics(songTitle: string, artistName: string): Promise<LyricsAPIResponse | null> {
  try {
    // 🔹 Eliminar contenido dentro de paréntesis y caracteres extraños
    const formattedTitle = songTitle.replace(/\(.*?\)|\[.*?\]|[^a-zA-Z0-9\s]/g, "").trim();
    const formattedArtist = artistName.replace(/[^a-zA-Z0-9\s]/g, "").trim();

    const url = `https://api.lyrics.ovh/v1/${encodeURIComponent(formattedArtist)}/${encodeURIComponent(formattedTitle)}`;
    console.log("🔍 Buscando en:", url);

    const response = await axios.get<LyricsAPIResponse>(url);
    return response.data;
  } catch (error) {
    console.error("❌ Error al buscar la letra:", error);
    return null;
  }
}
