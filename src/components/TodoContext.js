import React, { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks((prev) => [...prev, ...storedTasks]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (name) => {
    const newTask = {
      id: uuidv4(),
      name,
      subtasks: [],
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const updateTask = (taskId, updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            name: updatedTask.name,
            subtasks: task.subtasks,
          };
        }
        return task;
      })
    );
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const toggleTaskStatus = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const addSubtask = (taskId, subtaskName) => {
    if (subtaskName.trim() === "") return;

    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          subtasks: [
            ...task.subtasks,
            { id: uuidv4(), name: subtaskName, completed: false },
          ],
        };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const deleteSubtask = (taskId, subtaskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const updatedSubtasks = task.subtasks.filter(
          (subtask) => subtask.id !== subtaskId
        );

        return { ...task, subtasks: updatedSubtasks };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const toggleSubTaskStatus = (taskId, subtaskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const updatedSubtasks = task.subtasks.map((subtask) => {
            if (subtask.id === subtaskId) {
              return {
                ...subtask,
                completed: !subtask.completed,
              };
            }
            return subtask;
          });

          return {
            ...task,
            subtasks: updatedSubtasks,
          };
        }
        return task;
      })
    );
  };

  return (
    <TodoContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        addSubtask,
        deleteSubtask,
        toggleSubTaskStatus,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
