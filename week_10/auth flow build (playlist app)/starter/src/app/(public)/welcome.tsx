import { useRouter } from "expo-router";
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from "react-native";
import { useSongs } from "../../hooks/useSongs";

// todo: show the welcome screen with buttons for login and registration
export default function WelcomeScreen() {
  const router = useRouter();
  // todo: load and display the public song catalogue with the shared song hook
  const { songs, loading, error, retry } = useSongs();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Playlist Builder</Text>

      <View style={styles.authButtons}>
        <Button title="Sign in" onPress={() => router.push("/login")} />
        <Button title="Register" onPress={() => router.push("/register")} />
      </View>

      <Text style={styles.subtitle}>Browse the catalogue:</Text>

      {/* todo: show loading, error, retry, and empty states for the catalogue */}
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
      ) : songs.length === 0 ? (
        <Text>No songs available yet.</Text>
      ) : (
        <FlatList
          data={songs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Text style={styles.song}>{item.title} — {item.artist}</Text>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  title: { fontSize: 24, marginBottom: 16 },
  subtitle: { fontSize: 18, marginVertical: 12 },
  authButtons: { flexDirection: "row", gap: 12, marginBottom: 16 },
  error: { color: "red", marginBottom: 8 },
  song: { fontSize: 16, paddingVertical: 6 },
});
