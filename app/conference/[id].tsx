import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack, Link } from 'expo-router';
import { useConferences, Conference } from '../../hooks/useConferences';
import { ThemedView } from '../../components/themed-view';
import { ThemedText } from '../../components/themed-text';
import { Ionicons } from '@expo/vector-icons';

export default function ConferenceDetailScreen() {
  const { id } = useLocalSearchParams();
  const { getConferenceById } = useConferences();
  const [conference, setConference] = useState<Conference | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const conferenceId = parseInt(Array.isArray(id) ? id[0] : id, 10);
      getConferenceById(conferenceId)
        .then(data => {
          setConference(data);
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading || !conference) {
    return (
      <ThemedView style={styles.centered}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: conference.title }} />
      <Image source={{ uri: conference.image }} style={styles.image} />
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>{conference.title}</ThemedText>
        
        <View style={styles.detailRow}>
            <Ionicons name="person-outline" size={18} color={styles.icon.color} />
            <ThemedText style={styles.detailTitle}>Disertante: </ThemedText>
            <ThemedText style={styles.detailText}>{conference.speaker}</ThemedText>
        </View>
        <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={18} color={styles.icon.color} />
            <ThemedText style={styles.detailTitle}>Horario: </ThemedText>
            <ThemedText style={styles.detailText}>{conference.start_time} - {conference.end_time}</ThemedText>
        </View>
        <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={18} color={styles.icon.color} />
            <ThemedText style={styles.detailTitle}>Lugar: </ThemedText>
            <ThemedText style={styles.detailText}>{conference.venue_name}</ThemedText>
        </View>

        <ThemedText style={styles.description}>{conference.description}</ThemedText>
        
        <Link href={{ pathname: '/map', params: { selectedId: conference.id } }} asChild>
          <TouchableOpacity style={styles.mapButton}>
            <Ionicons name="map-outline" size={20} color={'#fff'} />
            <ThemedText style={styles.mapButtonText}>Ver en el Mapa</ThemedText>
          </TouchableOpacity>
        </Link>

      </View>
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
  image: {
    width: '100%',
    height: 220,
  },
  content: {
    padding: 20,
  },
  title: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailTitle: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  detailText: {
    fontSize: 16,
  },
  icon: {
    color: 'gray',
    width: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 20,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    marginTop: 10,
  },
  mapButtonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});