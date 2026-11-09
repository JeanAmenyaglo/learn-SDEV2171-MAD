import { useState } from "react";
import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { usePlaylist } from "../../context/PlaylistContext";

// todo: start the local title and goal fields from the current saved details when available
export default function PlaylistDetailsScreen() {
  const router = useRouter();
  const { selectedSongs, savedDetails, save } = usePlaylist();

  const [title, setTitle] = useState(savedDetails?.title ?? "");
  const [goal, setGoal] = useState(savedDetails?.goal ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // todo: require a nonblank title and at least one selected song before saving
  // todo: send the validated details through the shared save action and go back only after it succeeds
  // todo: show save errors and prevent repeat submissions while saving
  async function handleSave() {
    if (!title.trim()) {
      setError("Give your playlist a title.");
      return;
    }

    if (selectedSongs.length === 0) {
      setError("Select at least one song first.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await save(title.trim(), goal.trim());
      router.back();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Playlist Details</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Listening goal (optional)" value={goal} onChangeText={setGoal} />

      <Button title={submitting ? "Saving..." : "Save"} onPress={handleSave} disabled={submitting} />
      {/* todo: allow cancel to leave without committing the local edits */}
      <Button title="Cancel" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  title: { fontSize: 20, marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  error: { color: "red", marginBottom: 12 },
});
