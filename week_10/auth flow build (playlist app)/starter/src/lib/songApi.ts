// todo: request the public /songs catalogue without a bearer token
import { request } from "./api";
// todo: return the songs array from the response to the song hook
export async function getSongs() {
  const data = await request("/songs");
  return data.songs;
}
