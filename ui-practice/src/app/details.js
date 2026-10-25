import { useState } from "react";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
  TextInput,
} from "react-native";

export default function DetailsScreen() {
  const router = useRouter();
  const [note, setNote] = useState("");
  const [responseText, setResponseText] = useState("No preview yet.");

  function handlePreview() {
    setResponseText(`Preview: ${note}`);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
      >
        <View style={styles.tilesRow}>
          <View style={styles.tile}>
            <Image
              source={{ uri: "https://i.pravatar.cc/40" }}
              style={styles.tileImage}
            />
            <Text style={styles.tileText}>Tile 1</Text>
          </View>
          <View style={styles.tile}>
            <Image
              source={{ uri: "https://i.pravatar.cc/40" }}
              style={styles.tileImage}
            />
            <Text style={styles.tileText}>Tile 2</Text>
          </View>
          <View style={styles.tile}>
            <Image
              source={{ uri: "https://i.pravatar.cc/40" }}
              style={styles.tileImage}
            />
            <Text style={styles.tileText}>Tile 3</Text>
          </View>
        </View>

        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder="Type a short note"
          style={styles.noteInput}
        />

        <Pressable style={styles.previewButton} onPress={handlePreview}>
          <Text style={styles.previewButtonText}>Preview response</Text>
        </Pressable>

        <View style={styles.responseArea}>
          <Text style={styles.responseText}>{responseText}</Text>
        </View>

        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go back</Text>
        </Pressable>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  body: {
    flex: 1,
    width: "100%",
  },
  bodyContent: {
    alignItems: "center",
    paddingTop: 40,
  },
  tilesRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  tile: {
    width: 90,
    height: 90,
    backgroundColor: "#ffb703",
    alignItems: "center",
    justifyContent: "center",
  },
  tileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  tileText: {
    fontSize: 10,
    marginTop: 4,
  },
  noteInput: {
    marginTop: 20,
    width: "90%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    minHeight: 44,
  },
  previewButton: {
    marginTop: 12,
    backgroundColor: "#219ebc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  previewButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  responseArea: {
    marginTop: 12,
    width: "90%",
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    padding: 12,
  },
  responseText: {
    fontSize: 14,
    color: "#333",
  },
  backButton: {
    marginTop: 24,
    backgroundColor: "#023047",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});