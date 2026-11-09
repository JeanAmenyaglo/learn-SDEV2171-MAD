import { API_URL, request } from "./api";
import type { Song } from "../types/song";

// todo: define the saved playlist type including its selected songs
export type SavedPlaylist = {
  id: string;
  userId: string;
  title: string;
  goal: string;
  songIds: string[];
  songs: Song[];
  songCount: number;
  createdAt: string;
  updatedAt: string;
};
// todo: fetch the current user’s saved playlists through the protected /playlists route
export async function getPlaylists(token: string) {
  const data = await request("/playlists", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.playlists as SavedPlaylist[];
}
// todo: send a post request when there is no saved id and a put request when editing a saved playlist
// todo: attach the bearer token and send the title, goal, and selected song ids
// todo: return the response so the caller can check the status before reading the saved data
export function savePlaylist(
  token: string,
  details: { title: string; goal: string; songIds: string[] },
  savedId?: string,
) {
  const path = savedId ? `/playlists/${savedId}` : "/playlists";
  const method = savedId ? "PUT" : "POST";

  return fetch(`${API_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(details),
  });
}