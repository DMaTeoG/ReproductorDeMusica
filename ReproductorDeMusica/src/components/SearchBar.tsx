import { useState } from "react";
import { searchYouTube } from "../services/youtubeService";

interface SearchBarProps {
  addSong: (song: { id: string; title: string; artist: string }) => void;
}

export default function SearchBar({ addSong }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ id: string; title: string; artist: string }[]>([]);

  const handleSearch = async () => {
    if (!query) return;
    const songs = await searchYouTube(query);
    setResults(songs);
  };

  return (
    <div className="p-4 max-w-lg mx-auto border rounded-lg shadow-lg mb-4">
      <input
        type="text"
        placeholder="Buscar canción..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <button onClick={handleSearch} className="px-4 py-2 bg-blue-500 text-white rounded mt-2">
        🔍 Buscar
      </button>

      <ul className="mt-4">
        {results.map((song) => (
          <li key={song.id} className="border p-2 my-2 rounded flex justify-between items-center">
            <span>{song.title} - {song.artist}</span>
            <button onClick={() => addSong(song)} className="px-2 py-1 bg-green-500 text-white rounded">
              ➕ Agregar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
