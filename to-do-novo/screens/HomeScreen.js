import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import TaskItem from '../components/TaskItem';
import StatsCard from '../components/StatsCard';

const STORAGE_KEY = '@tasks';

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const loadTasks = async () => {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (data) setTasks(JSON.parse(data));
  };

  const addTask = () => {
    if (!input.trim()) return;
    setTasks(prev => [
      { id: Date.now().toString(), text: input, completed: false },
      ...prev,
    ]);
    setInput('');
    Keyboard.dismiss();
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <StatsCard total={tasks.length} completed={completedCount} />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Nova tarefa..."
          value={input}
          onChangeText={setInput}
          onSubmitEditing={addTask}
        />
        <Button title="Adicionar" onPress={addTask} />
      </View>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TaskItem task={item} onDelete={deleteTask} onToggle={toggleTask} />
        )}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
      <Button title="Ver Estatísticas" onPress={() => navigation.navigate('Stats', { total: tasks.length, completed: completedCount })} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginRight: 8,
    backgroundColor: '#fff',
  },
});

export default HomeScreen; 