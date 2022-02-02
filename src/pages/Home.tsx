import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {    
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    setTasks((oldState) => [...oldState, newTask ])
  }

  function handleToggleTaskDone(id: number) {
    // example of "deep clone", to avoid shallow copy
    const updatedTasks = tasks.map(task => ({...task}))

    const taskDone = updatedTasks.find(task => task.id === id)

    if (!taskDone) return

    taskDone.done = !taskDone.done
    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    setTasks(oldState => oldState.filter(
      skill => skill.id !== id
    ))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})