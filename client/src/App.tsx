import { useContext } from "react";
import "./App.css";
import { BlockChainContext } from "./context/BlockchainContext";
import { Task } from "./types";

function App() {
  // @ts-ignore
  const { account, todoList, addTask } = useContext(BlockChainContext);

  return (
    <div className="app">
      <h1> Todo Tracker </h1>
      Your Account: <b>{account}</b>
      <br />
      <button id="add-btn" onClick={() => addTask("New Task")}>
        Add Todo
      </button>
      <div className="app">
        <ol id="todo-list">
          {todoList.map((task: Task) => (
            <li className="list-element">{task.content}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default App;
