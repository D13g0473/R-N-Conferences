import { Link } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import ConferenceCard from '../../components/ConferenceCard';
import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';
import { useConferences } from '../../hooks/useConferences';

export default function HomeScreen() {
  const { conferences, loading } = useConferences();

  if (loading) {
    return (
      <ThemedView style={styles.centered}>
        <ActivityIndicator size="large" />
        <ThemedText>Cargando conferencias...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={conferences}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Link href={`/conference/${item.id}`} asChild>
            <TouchableOpacity>
              <ConferenceCard conference={item} />
            </TouchableOpacity>
          </Link>
        )}
        ListHeaderComponent={() => (
            <ThemedText type='title' style={styles.header}>Conferencias</ThemedText>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
      paddingHorizontal: 16,
      marginTop: 24,
      paddingTop: 16,
      marginBottom: 12,
  }
});