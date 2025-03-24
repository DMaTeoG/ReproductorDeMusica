import { useState } from "react";
import ReactPlayer from "react-player/youtube";
import { searchLyrics } from "../services/lyricsService";

interface MusicPlayerProps {
  currentSong: { id: string; title: string; artist: string } | null;
  nextSong: () => void;
  prevSong: () => void;
}

export default function MusicPlayer({ currentSong, nextSong, prevSong }: MusicPlayerProps) {
  const [lyricsUrl, setLyricsUrl] = useState<string | null>(null);

  // Función para obtener la letra
 // Función para obtener la letra
const handleFetchLyrics = async () => {
  if (!currentSong) return;
  const songData = await searchLyrics(currentSong.title, currentSong.artist);
  setLyricsUrl(songData ? songData.lyricsUrl : null); // 🔹 Extraemos solo lyricsUrl
};
  return (
    <div className="p-4 max-w-lg mx-auto border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-2">Reproductor de Música</h2>

      <div className="mb-4">
        <p className="text-gray-600">Canción actual:</p>
        <h3 className="text-lg font-semibold">{currentSong?.title || "Ninguna"}</h3>
        <p className="text-sm text-gray-500">{currentSong?.artist || "Desconocido"}</p>
      </div>

      {/* Reproductor de YouTube */}
      {currentSong && (
        <div className="mb-4">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${currentSong.id}`}
            playing={true}
            controls={true}
            width="100%"
            height="250px"
          />
        </div>
      )}

      {/* Botones de navegación y letras */}
      <div className="flex gap-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={prevSong}>
          ⏮️ Anterior
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={nextSong}>
          ⏭️ Siguiente
        </button>
        <button className="px-4 py-2 bg-purple-500 text-white rounded" onClick={handleFetchLyrics}>
          🎵 Ver Letra
        </button>
      </div>

      {/* Mostrar enlace a la letra */}
      {lyricsUrl && (
        <div className="mt-4">
          <p className="text-gray-600">Ver letra en Genius:</p>
          <a href={lyricsUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            {lyricsUrl}
          </a>
        </div>
      )}
    </div>
  );
}
