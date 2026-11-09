import { createContext, useContext, useState, type ReactNode } from "react";
import type { Song } from "../types/song";
import { savePlaylist, type SavedPlaylist } from "../lib/playlistApi";
import { useAuth } from "./AuthContext";

type SavedDetails = {
  title: string;
  goal: string;
  songCount: number;
};

type PlaylistContextValue = {
  selectedSongs: Song[];
  savedId: string | undefined;
  savedDetails: SavedDetails | null;
  addSong: (song: Song) => void;
  removeSong: (id: string) => void;
  loadPlaylist: (playlist: SavedPlaylist) => void;
  startNew: () => void;
  save: (title: string, goal: string) => Promise<void>;
};

const PlaylistContext = createContext<PlaylistContextValue | undefined>(undefined);

// todo: store selected songs, the current playlist id, and the last saved details in shared state
export function PlaylistProvider({ children }: { children: ReactNode }) {
  const { token, logout } = useAuth();
  const [selectedSongs, setSelectedSongs] = useState<Song[]>([]);
  const [savedId, setSavedId] = useState<string | undefined>(undefined);
  const [savedDetails, setSavedDetails] = useState<SavedDetails | null>(null);

  // todo: add songs without duplicates and remove songs by id
  function addSong(song: Song) {
    setSelectedSongs((current) =>
      current.some((item) => item.id === song.id) ? current : [...current, song],
    );
  }

  function removeSong(id: string) {
    setSelectedSongs((current) => current.filter((song) => song.id !== id));
  }

  // todo: load an existing playlist into shared state or clear it to start a new one
  function loadPlaylist(playlist: SavedPlaylist) {
    setSelectedSongs(playlist.songs);
    setSavedId(playlist.id);
    setSavedDetails({ title: playlist.title, goal: playlist.goal, songCount: playlist.songCount });
  }

  function startNew() {
    setSelectedSongs([]);
    setSavedId(undefined);
    setSavedDetails(null);
  }

  // todo: save the title, goal, and selected song ids using the current token
  // todo: check the response status and sign out if the token was rejected
  // todo: update shared state with the saved response only after a successful save
    async function save(title: string, goal: string) {
    const response = await savePlaylist(
      token!,
      { title, goal, songIds: selectedSongs.map((song) => song.id) },
      savedId,
    );

    if (response.status === 401) {
      logout();
      throw new Error("Your session has expired. Please sign in again.");
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message ?? "Could not save this playlist");
    }

    const playlist: SavedPlaylist = data.playlist;
    setSelectedSongs(playlist.songs);
    setSavedId(playlist.id);
    setSavedDetails({ title: playlist.title, goal: playlist.goal, songCount: playlist.songCount });
  }

  return (
    <PlaylistContext.Provider
      value={{ selectedSongs, savedId, savedDetails, addSong, removeSong, loadPlaylist, startNew, save }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}

// todo: expose the state and actions through a playlist hook
export function usePlaylist() {
  const value = useContext(PlaylistContext);
  if (value === undefined) {
    throw new Error("usePlaylist must be used within a PlaylistProvider");
  }
  return value;
}
