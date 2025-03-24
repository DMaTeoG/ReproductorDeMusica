import { useState } from "react";
import MusicPlayer from "./components/MusicPlayer";
import { searchYouTube } from "./services/youtubeService"; 

interface Song {
  id: string;
  title: string;
  artist: string;
}

export default function App() {
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [query, setQuery] = useState("");

  const currentSong = playlist[currentIndex] || null; // Asegurar que currentSong no sea undefined

  // Función para agregar una canción a la lista
  const addSong = (song: Song) => {
    setPlaylist((prevPlaylist) => [...prevPlaylist, song]);
    if (currentIndex === -1) setCurrentIndex(0);
  };

  // Función para avanzar a la siguiente canción
  const nextSong = () => {
    if (playlist.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    }
  };

  // Función para retroceder a la canción anterior
  const prevSong = () => {
    if (playlist.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
    }
  };

  // Función para buscar canciones en YouTube
  const handleSearch = async () => {
    if (!query) return;
    const results = await searchYouTube(query);
    setSearchResults(results);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mi Reproductor de Música</h1>

      {/* Campo de búsqueda */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Buscar en YouTube..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          🔍 Buscar
        </button>
      </div>

      {/* Resultados de búsqueda */}
      {searchResults.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-bold">Resultados:</h2>
          {searchResults.map((song) => (
            <div key={song.id} className="p-2 border rounded mb-2 flex justify-between">
              <div>
                <p className="font-semibold">{song.title}</p>
                <p className="text-sm text-gray-500">{song.artist || "Desconocido"}</p>
              </div>
              <button
                onClick={() => addSong(song)}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                ➕ Agregar
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Reproductor de Música */}
      <MusicPlayer
        currentSong={currentSong}
        nextSong={nextSong}
        prevSong={prevSong}
        
      />
    </div>
  );
}
