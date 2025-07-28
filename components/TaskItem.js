import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, runOnJS } from 'react-native-reanimated';

const SWIPE_THRESHOLD = -80;

const TaskItem = ({ task, onDelete, onToggle }) => {
  const translateX = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const onGestureEvent = Animated.event([
    { nativeEvent: { translationX: translateX } },
  ], { useNativeDriver: true });

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.translationX < SWIPE_THRESHOLD) {
      runOnJS(onDelete)(task.id);
      translateX.value = withSpring(0);
    } else {
      translateX.value = withSpring(0);
    }
  };

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent} onEnded={onHandlerStateChange}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <Pressable onPress={() => onToggle(task.id)} style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}>
          <Text style={[styles.text, task.completed && styles.completed]}>{task.text}</Text>
        </Pressable>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginVertical: 6,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
  },
  pressable: {
    padding: 18,
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