// todo: fetch the public catalogue when the screen opens and when the user retries
// todo: use an async load function with try, catch, and finally to track songs, loading, and errors
// todo: return the list, status, and retry action to both catalogue screens
import { useEffect, useState } from "react";
import { getSongs } from "../lib/songApi";
import type { Song } from "../types/song";

export function useSongs() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await getSongs();
      setSongs(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return { songs, loading, error, retry: load };
}