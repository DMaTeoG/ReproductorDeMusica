import { useState } from "react";
import { DoublyLinkedList } from "../utils/DoublyLinkedList";

export function usePlaylist<T>() {
  const [playlist] = useState(new DoublyLinkedList<T>());
  const [currentSong, setCurrentSong] = useState<T | null>(null);

  const addSong = (song: T) => {
    playlist.add(song);
    if (!currentSong) {
      setCurrentSong(playlist.getCurrent());
    }
  };

  const nextSong = () => {
    playlist.next();
    setCurrentSong(playlist.getCurrent());
  };

  const prevSong = () => {
    playlist.prev();
    setCurrentSong(playlist.getCurrent());
  };

  return { currentSong, addSong, nextSong, prevSong };
}
