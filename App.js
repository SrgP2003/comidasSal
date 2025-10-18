import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Header from './components/Header';
import FoodSection from './components/FoodSection';

//Estados para consumir la informacion de la API
export default function App() {

  return (
    <ScrollView style={styles.container}>
      <Header />
      <FoodSection title="Desayunos" category="desayuno" />
      <FoodSection title="Almuerzos" category="almuerzo" />
      <FoodSection title="Cenas" category="cena" />

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#fff',
  },
});
