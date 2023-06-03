import React, { useContext, useState } from "react";
import { TodoContext } from "./TodoContext";

const Todos = () => {
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    addSubtask,
    deleteSubtask,
    toggleSubTaskStatus,
  } = useContext(TodoContext);

  const [taskName, setTaskName] = useState("");
  const [subtaskName, setSubtaskName] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [openSubTaskInput, setOpenSubTaskInput] = useState({});

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleAddTask = () => {
    if (taskName.trim() === "") return;
    if (taskName.length > 0) {
      addTask(taskName);
    }
    setTaskName("");
  };

  const handleUpdateTask = (taskId, newName) => {
    if (newName.trim() === "") return;

    updateTask(taskId, { name: newName });
    setTaskName("");
    setEditingTaskId(null);
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
  };

  const handleToggleTaskStatus = (taskId) => {
    toggleTaskStatus(taskId);
  };

  const handleEditTask = (taskId) => {
    setEditingTaskId(taskId);
    const task = tasks.find((task) => task.id === taskId);
    setTaskName(task.name);
  };

  const isEditingTask = (taskId) => {
    return editingTaskId === taskId;
  };

  const handleAddSubtask = (taskId) => {
    if (subtaskName.trim() === "") return;

    addSubtask(taskId, subtaskName);
    setSubtaskName("");
  };

  const handleDeleteSubtask = (taskId, subtaskId) => {
    deleteSubtask(taskId, subtaskId);
  };

  const handleToggleSubtaskStatus = (taskId, subtaskId) => {
    toggleSubTaskStatus(taskId, subtaskId);
  };
  const handleOpenSubInputtask = (taskId) => {
    setOpenSubTaskInput((prevState) => ({
      ...prevState,
      [taskId]: !prevState[taskId],
    }));
  };

  return (
    <div className="todos-wrapper">
      <div className="task-input-wrapper">
        <input
          className="task-input"
          type="text"
          placeholder="Enter task name"
          value={taskName}
          onChange={handleTaskNameChange}
        />
        <button onClick={handleAddTask} className="add-todo-btn">
          <i className="fas fa-plus-square"></i>
        </button>
      </div>
      <div className="todos-item-wrapper">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className="todo-item-wrapper">
              {isEditingTask(task.id) ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                    alignContent: "center",
                    height: "60px",
                  }}
                >
                  <input
                    type="text"
                    value={taskName}
                    className="edit-input"
                    onChange={(event) => handleTaskNameChange(event)}
                  />
                  <button
                    onClick={() => handleUpdateTask(task.id, taskName)}
                    className="save-btn"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="todo-item-buttons-wrapper">
                  <span
                    className={
                      task.completed
                        ? "strike todo-task-name"
                        : "todo-task-name"
                    }
                  >
                    {task.name}
                  </span>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => handleEditTask(task.id)}
                      className="edit-btn"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      style={{ marginLeft: "5px" }}
                      onClick={() => handleDeleteTask(task.id)}
                      className="trash-btn"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                    <button
                      style={{ marginLeft: "5px", marginRight: "5px" }}
                      onClick={() => handleToggleTaskStatus(task.id)}
                      className="complete-btn"
                    >
                      <i className="fas fa-check"></i>
                    </button>
                    <button
                      onClick={() => handleOpenSubInputtask(task.id)}
                      className="add-todo-btn"
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "left",
                  padding: "15px",
                  height: "auto",
                  marginTop: "10px",
                  marginLeft: "10px",
                }}
              >
                {openSubTaskInput[task.id] && (
                  <div
                    style={{
                      display: "flex",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Enter subtask name"
                      className="edit-input"
                      value={subtaskName}
                      onChange={(e) => setSubtaskName(e.target.value)}
                    />
                    <button
                      onClick={() => handleAddSubtask(task.id)}
                      className="add-todo-btn"
                    >
                      <i className="fas fa-plus-square"></i>
                    </button>
                  </div>
                )}
                {openSubTaskInput[task.id] &&
                  task?.subtasks?.length > 0 &&
                  task.subtasks.map((subtask) => (
                    <div
                      key={subtask.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        height: "60px",
                        textAlign: "center",
                        marginTop: "10px",
                        padding: "10px",
                        width: "98%",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        className={
                          subtask.completed
                            ? "strike todo-task-name"
                            : "todo-task-name"
                        }
                      >
                        {subtask.name}
                      </span>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button
                          onClick={() =>
                            handleDeleteSubtask(task.id, subtask.id)
                          }
                          className="trash-btn"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                        <button
                          onClick={() =>
                            handleToggleSubtaskStatus(task.id, subtask.id)
                          }
                          className="complete-btn"
                        >
                          <i className="fas fa-check"></i>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <div className="not-found-wrapper">
            <span className="not-found">No Task Found!!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Todos;
