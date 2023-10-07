import { useState } from "react";
import "./App.css";
import { v4 } from "uuid";


function App() {
  const [todolist, setTodoList] = useState([ //array of objects
    {
      id: v4(),
      text: "Complete the task",
    },
    {
      id: v4(),
      text: "Do projects",
    },
    {
      id: v4(),
      text: "Upskill",
    },
    {
      id: v4(),
      text: "Travel",
    },
  ]);
  //newTask -> latest vlaue of input
  const [newTask, setNewTask] = useState("");
  const [editing, setEditing] = useState(null); //editing -> null  or task object (editing)
  function addTask() {
    if (newTask === "") {
      alert("Please entry the task");
    }
    else {
      setTodoList([{
        id: v4(),
        text: newTask
      }, ...todolist]);
      setNewTask("");
    }
  }
  function updateTask() {
    if (newTask === "") {
      alert("Please enter the task");
    }
    else {
      const newArr = todolist.map((item) => {
        if (item.id === editing.id) {
          return {
            id: item.id,
            text: newTask,
          };
        }
        return item;
      });
      setTodoList(newArr);
      setNewTask("");
      setEditing(null);
    }

  }
  function deleteTask(taskToBeDeleted) {
    const newTaskList = todolist.filter((item) => {
      if (item.id !== taskToBeDeleted) {
        return true;
      }
      return false;
    });
    setTodoList(newTaskList);
  }
  function editTask(item) {
    setEditing(item);
    setNewTask(item.text);
  }

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }
  console.log("editing", editing);
  return (
    <div className="App">
      <div className="card">
      <h1>THINGS TO BE DONE</h1>
      <div style={{ display: "flex", flexWrap: "nowrap", width:"105%"}}>
        <input value={newTask}
          onChange={handleInputChange} />
        <button onClick={editing ? updateTask : addTask}> {editing ? "Edit Task" : "Add Task"} </button>
      </div>
      <div >
        {todolist.length === 0 ? (
          <p>No task is assigned currently</p>
        ) : (
          <div className="todo"   >
            {todolist.map((item) => {
              return (
                <div className="task"  style={{ display: "flex", flexWrap: "nowrap", width:"105%", margin:"5px"}} >
                  <p>{item.text}</p>
                  <div style={{display: "flex", margin:"5px"}} >
                    <button onClick={() => editTask(item)} > Edit</button>
                    <button onClick={() => deleteTask(item.id)} > Delete</button>
                  </div>
                </div>);
            })}
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default App;
