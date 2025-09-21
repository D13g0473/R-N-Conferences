import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { Conference } from '../hooks/useConferences';
import { Ionicons } from '@expo/vector-icons';

interface ConferenceCardProps {
  conference: Conference;
}

export default function ConferenceCard({ conference }: ConferenceCardProps) {
  return (
    <ThemedView style={styles.card}>
      <Image source={{ uri: conference.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <ThemedText type="subtitle">{conference.title}</ThemedText>
        <ThemedText style={styles.speaker}>{conference.speaker}</ThemedText>
        <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={14} color={styles.icon.color} />
            <ThemedText style={styles.detailText}>{conference.start_time} - {conference.end_time}</ThemedText>
        </View>
        <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={14} color={styles.icon.color} />
            <ThemedText style={styles.detailText}>{conference.venue_name}</ThemedText>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    alignSelf: 'center',
  },
  infoContainer: {
    marginLeft: 16,
    justifyContent: 'center',
    flex: 1,
  },
  speaker: {
    fontSize: 15,
    opacity: 0.9,
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  detailText: {
      fontSize: 14,
      opacity: 0.8,
      marginLeft: 6,
  },
  icon: {
      color: 'gray'
  }
});
