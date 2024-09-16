import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider as PaperProvider } from 'react-native-paper';
import Task from './components/Task';
import { styles } from './components/styles';

// Main App component
export default function App() {
  const [task, setTask] = useState(''); // State to manage the current task input
  const [tasks, setTasks] = useState([]); // State to manage the list of tasks

  // Load tasks from AsyncStorage when the component mounts
  useEffect(() => {
    loadTasks();
  }, []);

  // Function to load tasks from AsyncStorage
  const loadTasks = async () => {
    try { // Retrieve tasks from AsyncStorage
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks)); // Update state with retrieved tasks
      }
    } catch (error) { // Log error if retrieval fails
      console.error('Failed to load tasks.', error);
    }
  };

  // Function to save tasks to AsyncStorage
  const saveTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks)); // Save tasks to AsyncStorage
    } catch (error) {
      console.error('Failed to save tasks.', error); // Log error if saving fails
    }
  };

   // Function to add a new task
  const addTask = () => {
    if (task.length > 0) {
      // Create new task object
      const newTask = { id: Date.now(), text: task, completed: false }; 
      // Add new task to the list
      const updatedTasks = [...tasks, newTask];
      // Update state with new list of tasks
      setTasks(updatedTasks);
      // Save updated list to AsyncStorage
      saveTasks(updatedTasks);
      // Clear the input field after adding a task
      setTask('');
    }
  };
  // Function to delete a task
  const deleteTask = (id) => {
    // Remove task from the list by filtering
    const updatedTasks = tasks.filter(task => task.id !== id);
    // Update state with new list of tasks
    setTasks(updatedTasks);
    // Save updated list to AsyncStorage
    saveTasks(updatedTasks);
  };
  // Function to toggle task completion
  const toggleTaskCompleted = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        // Toggle the completed status of the task
        return { ...task, completed: !task.completed };
      }
      // Return the task unchanged if it's not the target
      return task;
    });
    // Update state with new list of tasks
    setTasks(updatedTasks);
    // Save updated list to AsyncStorage
    saveTasks(updatedTasks);
  };

  return (
    // PaperProvider for using react-native-paper components
    <PaperProvider>
      {/* Main container view */}
      <View style={styles.container}>
        {/* Set status bar color */}
        <StatusBar style="light" backgroundColor="#313338" />
        <Text style={styles.title}>TaskMaster</Text>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          placeholderTextColor="#888"
          // Update state with input value
          onChangeText={setTask}
          // Bind input value to state
          value={task}
        />
        <TouchableOpacity  onPress={addTask} style={styles.button}>
          <Text style={styles.textButton} >Add Task</Text>
          </TouchableOpacity>
        <FlatList
          // List of tasks to render
          data={tasks}
          renderItem={({ item }) => (
            // Render each task using Task component
            <Task
              task={item}
              deleteTask={deleteTask}
              toggleTaskCompleted={toggleTaskCompleted}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </PaperProvider>
  );
}