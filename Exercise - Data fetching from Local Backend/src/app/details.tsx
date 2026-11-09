import { ActivityIndicator, Button, FlatList, Text, View } from "react-native";
import { useEffect, useState } from "react";

import { API_URL } from "../lib/apiBaseUrl";

export default function DetailsScreen() {

  const [steps, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  const loadSteps = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/study-steps`);

      if (!response.ok) {
        throw new Error("Failed to load study steps");
      }

      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSteps();
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator />
        <Text>Loading study steps...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
        <Button title="Retry" onPress={loadSteps} />
      </View>
    );
  }

  return (
    <FlatList
      data={steps}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Text>{item.label}</Text>}
    />
  );
}
