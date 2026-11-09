import { useState } from "react";
import { useRouter } from "expo-router";
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { usePlaylist } from "../../context/PlaylistContext";
import { useSongs } from "../../hooks/useSongs";
import { getMe } from "../../lib/authApi";

// todo: show the signed in user and connect logout to the shared sign out action
export default function AvailableSongsScreen() {
  const router = useRouter();
  const { user, token, logout } = useAuth();
  const { selectedSongs, addSong } = usePlaylist();
  const { songs, loading, error, retry } = useSongs();

  const [sessionStatus, setSessionStatus] = useState<string | null>(null);

  // todo: add a check session button that sends the current token to /auth/me and displays the confirmed user
  // todo: check the response status before reading the body and sign out if the token was rejected
  async function checkSession() {
    const response = await getMe(token!);

    if (response.status === 401) {
      setSessionStatus(null);
      logout();
      return;
    }

    const data = await response.json();
    setSessionStatus(`Confirmed: ${data.user.name} (${data.user.email})`);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signed in as {user?.name}</Text>
      <Button title="Log out" onPress={logout} />

      <Button title="Check session" onPress={checkSession} />
      {sessionStatus ? <Text>{sessionStatus}</Text> : null}

      {/* todo: add navigation to my playlist and saved playlists */}
      <View style={styles.navRow}>
        <Button title="My Playlist" onPress={() => router.push("/playlist")} />
        <Button title="Saved Playlists" onPress={() => router.push("/saved-playlists")} />
      </View>

      <Text style={styles.subtitle}>Selected: {selectedSongs.length}</Text>

      {/* todo: display the public song catalogue and use playlist context to add songs and mark already selected rows */}
      {loading ? (
        <View>
          <ActivityIndicator />
          <Text>Loading songs...</Text>
        </View>
      ) : error ? (
        <View>
          <Text style={styles.error}>{error}</Text>
          <Button title="Retry" onPress={retry} />
        </View>
      ) : (
        <FlatList
          data={songs}
          extraData={selectedSongs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isAdded = selectedSongs.some((song) => song.id === item.id);
            return (
              <View style={styles.row}>
                <Text style={styles.songTitle}>{item.title} — {item.artist}</Text>
                <Button
                  title={isAdded ? "Added" : "Add"}
                  disabled={isAdded}
                  onPress={() => addSong(item)}
                />
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  title: { fontSize: 20, marginBottom: 8 },
  subtitle: { fontSize: 16, marginVertical: 12 },
  navRow: { flexDirection: "row", gap: 12, marginVertical: 12 },
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
