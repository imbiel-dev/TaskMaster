import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

// Task component
const Task = ({ task, deleteTask, toggleTaskCompleted }) => {
  return (
    // Container for each task
    <View style={styles.taskContainer}>
      <TouchableOpacity onPress={() => toggleTaskCompleted(task.id)}>
        {/* Task text with conditional styling */}
        <Text style={[styles.taskText, task.completed && styles.taskCompleted]}>
         {/* Display task text */}
          {task.text}
        </Text>
      </TouchableOpacity>
      <IconButton
        icon="delete"
        color="#ff6b6b"
        size={20}
        onPress={() => deleteTask(task.id)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row', // Arrange children in a row
    justifyContent: 'space-between', // Space between task text and delete button
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000',
  },
  taskText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
});

export default Task;
