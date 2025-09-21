import React, { useRef, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useConferences } from '../../hooks/useConferences';
import { ThemedText } from '../../components/themed-text';

export default function MapScreen() {
  const { conferences, loading } = useConferences();
  const { selectedId } = useLocalSearchParams();
  const mapRef = useRef<MapView>(null);
  const markerRefs = useRef<{ [key: string]: Marker | null }>({});

  useEffect(() => {
    if (selectedId && conferences.length > 0 && mapRef.current) {
      const conference = conferences.find(b => b.id.toString() === selectedId);
      if (conference) {
        // Usamos un timeout para darle tiempo al mapa a renderizar los marcadores
        setTimeout(() => {
          mapRef.current?.animateToRegion({
            latitude: conference.latitude,
            longitude: conference.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }, 1000); // Animar durante 1 segundo

          // Mostrar el callout del marcador seleccionado
          const marker = markerRefs.current[conference.id];
          marker?.showCallout();
        }, 500); // Esperar 500ms
      }
    }
  }, [selectedId, conferences]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <ThemedText>Cargando mapa...</ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView 
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: -32.481, // Coordenada central aproximada
          longitude: -58.25,
          latitudeDelta: 0.05, // Zoom para ver todas
          longitudeDelta: 0.05,
        }}
      >
        {conferences.map(conference => (
          <Marker
            ref={ref => markerRefs.current[conference.id] = ref}
            key={conference.id}
            coordinate={{
              latitude: conference.latitude,
              longitude: conference.longitude,
            }}
            title={conference.title}
            description={conference.venue_name}
            pinColor={selectedId === conference.id.toString() ? '#007AFF' : 'red'} // Azul para el seleccionado
          />
        ))}
      </MapView>
    </View>
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
  map: {
    width: '100%',
    height: '100%',
  },
});
