import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useGetEpisodesQuery } from "../service/api";

export function EpisodesScreen() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetEpisodesQuery(page);

  if (isLoading) {
    return (
      <View style={{ padding: 24 }}>
        <ActivityIndicator />
        <Text>First load...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ padding: 24 }}>
        <Text>Error to load episodes</Text>
        <Text>{JSON.stringify(error)}</Text>
        <Button title="Tentar novamente" onPress={refetch} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Episodes</Text>

      {isFetching && (
        <Text style={{ marginVertical: 8 }}>Updating data...</Text>
      )}

      <FlatList
        data={data?.results}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 16,
              marginVertical: 8,
              backgroundColor: "#eee",
              borderRadius: 8,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
            <Text>{item.episode}</Text>
            <Text>{item.air_date}</Text>
          </TouchableOpacity>
        )}
      />

      <View style={{ flexDirection: "row", gap: 12 }}>
        <Button
          title="Previous Page"
          disabled={page === 1}
          onPress={() => setPage((current) => current - 1)}
        />

        <Button
          title="Next Page"
          disabled={!data?.info.next}
          onPress={() => setPage((current) => current + 1)}
        />
      </View>

      <Button title="Refetch" onPress={refetch} />
    </View>
  );
}
