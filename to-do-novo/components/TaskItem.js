import React from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';

const TaskItem = ({ task, onDelete, onToggle }) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => onToggle(task.id)} style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}>
        <Text style={[styles.text, task.completed && styles.completed]}>{task.text}</Text>
      </Pressable>
      <Button title="Excluir" onPress={() => onDelete(task.id)} color="#ff5252" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginVertical: 6,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pressable: {
    padding: 18,
    flex: 1,
  },
  pressed: {
    backgroundColor: '#e0e0e0',
  },
  text: {
    fontSize: 16,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
});

export default TaskItem; 