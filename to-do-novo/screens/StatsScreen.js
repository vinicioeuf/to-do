import React from 'react';
import { View, Button } from 'react-native';
import StatsCard from '../components/StatsCard';

const StatsScreen = ({ route, navigation }) => {
  const { total, completed } = route.params;
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <StatsCard total={total} completed={completed} />
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default StatsScreen; 