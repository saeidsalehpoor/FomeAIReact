import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "http://192.168.1.102:3001";

const TaskPage = ({ route }) => {
  const [tasks, setTasks] = useState([]);
  const { assigneeId } = route.params;

  useEffect(() => {
    // Fetch token from AsyncStorage
    const fetchTasks = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          // Fetch tasks using assigneeId with authorization header
          const response = await axios.get(`${API_URL}/tasks/taskPerAssignee/${assigneeId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setTasks(response.data.tasks);
        } else {
          console.error('No token found');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, [assigneeId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks Assigned to Assignee ID: {assigneeId}</Text>
      <View>
        {tasks.map(task => (
          <View key={task.id} style={styles.taskItem}>
            <Text>{task.desc}</Text>
            <Text>Due Date: {task.dueDate}</Text>
            <Text>Creator ID: {task.creatorId}</Text>
            {/* Add more task details as needed */}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  taskItem: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
});

export default TaskPage;
