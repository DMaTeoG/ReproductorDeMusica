import { useState, useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import { searchLyrics } from "../services/lyricsService";
import { DoublyLinkedList } from "../utils/DoublyLinkedList";

interface MusicPlayerProps {
  currentSong: { id: string; title: string; artist: string } | null;
  nextSong: () => void;
  prevSong: () => void;
}

export default function MusicPlayer({ currentSong, nextSong, prevSong }: MusicPlayerProps) {
  const [lyricsUrl, setLyricsUrl] = useState<string | null>(null);
  const [loadingLyrics, setLoadingLyrics] = useState<boolean>(false);
  const [playlist, setPlaylist] = useState<DoublyLinkedList<{ id: string; title: string; artist: string }>>(new DoublyLinkedList());

  // Asegurarse de que la canción actual se agrega a la lista cuando cambia
  useEffect(() => {
    if (currentSong && !playlist.getCurrent()) {
      playlist.add(currentSong);  // Usamos la función de la lista doblemente enlazada
      setPlaylist(new DoublyLinkedList()); // Creamos una nueva instancia de DoublyLinkedList para actualizar el estado
    }
  }, [currentSong]);

  const handleFetchLyrics = async () => {
    if (!currentSong) return;

    setLoadingLyrics(true);
    setLyricsUrl(null);

    try {
      const songData = await searchLyrics(currentSong.title, currentSong.artist);
      if (songData && songData.lyrics) {
        setLyricsUrl(songData.lyrics);
      } else {
        console.log("No se encontró la letra.");
      }
    } catch (error) {
      console.error("Error al obtener la letra:", error);
    } finally {
      setLoadingLyrics(false);
    }
  };

  // Función para eliminar una canción de la lista
  const removeSong = (songId: string) => {
    playlist.remove({ id: songId, title: "", artist: "" }); // Utilizamos la función remove de DoublyLinkedList
    setPlaylist(new DoublyLinkedList()); // Actualizamos el estado para desencadenar el re-renderizado
  };

  // Navegar a la siguiente canción
  const next = () => {
    playlist.next();  // Usamos la lógica de la lista doblemente enlazada
    const current = playlist.getCurrent();
    if (current) {
      nextSong();  // Llamamos la función de la canción siguiente
    }
  };

  // Navegar a la canción anterior
  const prev = () => {
    playlist.prev();  // Usamos la lógica de la lista doblemente enlazada
    const current = playlist.getCurrent();
    if (current) {
      prevSong();  // Llamamos la función de la canción anterior
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">🎵 Reproductor de Música</h2>

      <div className="mt-4 text-center">
        <p className="text-gray-600">Canción actual:</p>
        <h3 className="text-xl font-semibold text-gray-900">{currentSong?.title || "Ninguna"}</h3>
        <p className="text-sm text-gray-500">{currentSong?.artist || "Desconocido"}</p>
      </div>

      {currentSong && (
        <div className="mt-4 rounded-lg overflow-hidden">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${currentSong.id}`}
            playing={true}
            controls={true}
            width="100%"
            height="250px"
          />
        </div>
      )}

      <div className="mt-6 flex justify-center gap-4">
        <button
          className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
          onClick={prev}
        >
          ⏮️ Anterior
        </button>
        <button
          className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
          onClick={next}
        >
          ⏭️ Siguiente
        </button>
        <button
          className="px-5 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition"
          onClick={handleFetchLyrics}
          disabled={loadingLyrics}
        >
          🎵 {loadingLyrics ? "Buscando..." : "Ver Letra"}
        </button>
      </div>

      {lyricsUrl && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Letra de la canción:</h3>
          <pre className="mt-2 whitespace-pre-wrap text-gray-700">{lyricsUrl}</pre>
        </div>
      )}

      {/* Mostrar lista de canciones */}
      {playlist.getCurrent() && (
        <div className="mt-6 p-4 bg-gray-200 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">📜 Lista de Canciones:</h3>
          <ul className="mt-2 space-y-2">
            {/* Mostrar canciones de la lista */}
            <li className="p-2 bg-white shadow rounded-lg flex justify-between items-center">
              <span className="text-gray-700">{currentSong?.title} - {currentSong?.artist}</span>
              <button
                onClick={() => removeSong(currentSong?.id!)} // Llamamos a removeSong con el ID de la canción
                className="ml-4 px-3 py-1 text-sm bg-red-600 text-white rounded-full hover:bg-red-700 transition"
              >
                Eliminar
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
