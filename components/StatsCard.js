import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatsCard = ({ total, completed }) => (
  <View style={styles.card}>
    <Text style={styles.title}>Estatísticas</Text>
    <Text>Total: {total}</Text>
    <Text>Concluídas: {completed}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
});

export default StatsCard; 