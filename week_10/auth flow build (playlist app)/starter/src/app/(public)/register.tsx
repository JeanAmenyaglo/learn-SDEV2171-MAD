import { useState } from "react";
import { useRouter, Link } from "expo-router";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useAuth } from "../../context/AuthContext";

// todo: keep name, email, password, submission status, and feedback in local state
export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // todo: validate the required fields and password length before calling the shared sign up action
  // todo: show errors and prevent repeat submissions while the request is running
  async function handleSubmit() {
    if (!name.trim() || !email.trim() || !password) {
      setError("Fill in your name, email, and password.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await register(name.trim(), email.trim(), password);
      router.replace("/available-songs");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  // todo: link to login and navigate to available songs after sign up succeeds
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
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
      <Button title={submitting ? "Creating account..." : "Register"} onPress={handleSubmit} disabled={submitting} />
      <Link href="/login">Already have an account? Sign in</Link>
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
