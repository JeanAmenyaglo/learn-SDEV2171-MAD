import { useState } from "react";
import { useRouter, Link } from "expo-router";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useAuth } from "../../context/AuthContext";

// todo: keep email, password, submission status, and feedback in local state
export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // todo: validate the fields and call the shared sign in action
  // todo: show errors and prevent repeat submissions while the request is running
  async function handleSubmit() {
    if (!email.trim() || !password) {
      setError("Enter your email and password.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await login(email.trim(), password);
      router.replace("/available-songs");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  // todo: link to registration and navigate to available songs after sign in succeeds
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title={submitting ? "Signing in..." : "Sign in"} onPress={handleSubmit} disabled={submitting} />
      <Link href="/register">Need an account? Register</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: "white" },
  title: { fontSize: 24, marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  error: { color: "red", marginBottom: 12 },
});
