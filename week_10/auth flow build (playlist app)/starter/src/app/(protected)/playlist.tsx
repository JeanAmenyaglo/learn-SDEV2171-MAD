import { useRouter } from "expo-router";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { usePlaylist } from "../../context/PlaylistContext";

// todo: read the selected songs and saved summary from playlist context
export default function PlaylistScreen() {
  const router = useRouter();
  const { selectedSongs, removeSong, savedDetails, startNew } = usePlaylist();

  // todo: connect the start new playlist action and return to available songs
  function handleStartNew() {
    startNew();
    router.push("/available-songs");
  }

  return (
    <View style={styles.container}>
      {/* todo: display the saved title, goal, and song count above the list */}
      {savedDetails ? (
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>{savedDetails.title}</Text>
          {savedDetails.goal ? <Text>{savedDetails.goal}</Text> : null}
          <Text>{savedDetails.songCount} song(s)</Text>
        </View>
      ) : null}

      <Text style={styles.count}>Selected songs: {selectedSongs.length}</Text>

      {/* todo: show each selected song and remove it through the shared remove action */}
      <FlatList
        data={selectedSongs}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No songs selected yet.</Text>}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.songTitle}>{item.title} — {item.artist}</Text>
            <Button title="Remove" onPress={() => removeSong(item.id)} />
          </View>
        )}
      />

      {/* todo: add navigation to available songs, playlist details, and saved playlists */}
      <View style={styles.navRow}>
        <Button title="Available Songs" onPress={() => router.push("/available-songs")} />
        <Button title="Save Details" onPress={() => router.push("/playlist-details")} />
        <Button title="Saved Playlists" onPress={() => router.push("/saved-playlists")} />
      </View>

      <Button title="Start New Playlist" onPress={handleStartNew} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  summary: { marginBottom: 12, padding: 12, backgroundColor: "#f3f3f3", borderRadius: 8 },
  summaryTitle: { fontSize: 18, fontWeight: "bold" },
  count: { fontSize: 16, marginBottom: 12 },
  navRow: { flexDirection: "row", gap: 8, marginVertical: 12, flexWrap: "wrap" },
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
