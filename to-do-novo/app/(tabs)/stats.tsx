import React from 'react';
import { View, Button } from 'react-native';
import StatsCard from '@/components/StatsCard';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function StatsScreen() {
  const router = useRouter();
  const { total = 0, completed = 0 } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <StatsCard total={Number(total)} completed={Number(completed)} />
      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  );
} 