// todo: read the current token from auth context
// todo: send a signed out user to welcome and a signed in user to available songs
import { Redirect } from "expo-router";
import { useAuth } from "../context/AuthContext";

export default function Index() {
  const { token } = useAuth();

  if (token) {
    return <Redirect href="/available-songs" />;
  }

  return <Redirect href="/welcome" />;
}