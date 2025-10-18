import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import Header from './components/Header';
import { getAllComidas } from './apiComidasSal';

//Estados para consumir la informacion de la API
export default function App() {
  const [comidas, setComidas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let montarInfo = true;
    async function load() {
      try {
        setLoading(true);
        const data = await getAllComidas();
        if (montarInfo) setComidas(data || []);
      } catch (err) {
        if (montarInfo) setError(err.message || String(err));
      } finally {
        if (montarInfo) setLoading(false);
      }
    }
    load();
    return () => {
      montarInfo = false;
    };
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.nombre || item.name || 'Sin nombre'}</Text>
      {item.descripcion ? <Text style={styles.desc}>{item.description}</Text> : null}
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : error ? (
        <Text style={styles.error}>Error: {error}</Text>
      ) : comidas.length === 0 ? (
        <Text>No hay comidas para mostrar.</Text>
      ) : (
        <FlatList
          data={comidas}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 12 }}
        />
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
