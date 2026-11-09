import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { PlaylistProvider, usePlaylist } from "../../context/PlaylistContext";

// todo: define the protected screens in the stack and read the saved title from playlist context for the playlist header
function PlaylistStack() {
  const { savedDetails } = usePlaylist();

  return (
    <Stack>
      <Stack.Screen name="available-songs" options={{ title: "Available Songs" }} />
      <Stack.Screen name="playlist" options={{ title: savedDetails?.title ?? "My Playlist" }} />
      <Stack.Screen name="playlist-details" options={{ title: "Playlist Details" }} />
      <Stack.Screen name="saved-playlists" options={{ title: "Saved Playlists" }} />
    </Stack>
  );
}

// todo: read the token and redirect a signed out user to login before rendering the playlist stack
// todo: render the playlist provider around a separate playlist stack component
// todo: let the playlist provider unmount when the session is cleared
export default function ProtectedLayout() {
  const { token } = useAuth();

  if (!token) {
    return <Redirect href="/login" />;
  }

  return (
    <PlaylistProvider>
      <PlaylistStack />
    </PlaylistProvider>
  );
}
