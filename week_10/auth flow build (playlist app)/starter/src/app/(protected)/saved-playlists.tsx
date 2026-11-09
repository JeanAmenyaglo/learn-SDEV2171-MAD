import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { usePlaylist } from "../../context/PlaylistContext";
import { getPlaylists, type SavedPlaylist } from "../../lib/playlistApi";

export default function SavedPlaylistsScreen() {
  const router = useRouter();
  const { token, logout } = useAuth();
  const { loadPlaylist, startNew } = usePlaylist();

  const [playlists, setPlaylists] = useState<SavedPlaylist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // todo: load the signed in user's saved playlists using the token
  // todo: use an async load function with try, catch, and finally to show loading, error, retry, and empty states
  // todo: check the response status and sign out if the token was rejected
  async function load() {
    setLoading(true);
    setError(null);

    try {
      const data = await getPlaylists(token!);
      setPlaylists(data);
    } catch (err: any) {
      if (err.status === 401) {
        logout();
        return;
      }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  // todo: load the chosen playlist into shared state before navigating to my playlist
  function openPlaylist(playlist: SavedPlaylist) {
    loadPlaylist(playlist);
    router.push("/playlist");
  }

  // todo: clear the current selection and saved details when starting a new playlist
  function handleStartNew() {
    startNew();
    router.push("/available-songs");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Playlists</Text>
      <Button title="Start New Playlist" onPress={handleStartNew} />

      {loading ? (
        <View>
          <ActivityIndicator />
          <Text>Loading playlists...</Text>
        </View>
      ) : error ? (
        <View>
          <Text style={styles.error}>{error}</Text>
          <Button title="Retry" onPress={load} />
        </View>
      ) : (
        <FlatList
          data={playlists}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text>You have no saved playlists yet.</Text>}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.songTitle}>{item.title} ({item.songCount} songs)</Text>
              <Button title="Open" onPress={() => openPlaylist(item)} />
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  title: { fontSize: 20, marginBottom: 12 },
  error: { color: "red", marginBottom: 8 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  songTitle: { fontSize: 16, flex: 1 },
});
