import { useContext } from "react";
import "./App.css";
import { BlockChainContext } from "./context/BlockchainContext";
import { Task } from "./types";
import ethereum from "./assets/ethereum.svg";
import { TodoCard } from "./components";

function App() {
  // @ts-ignore
  const { account, todoList, addTask, editTask, toggleTask } =
    useContext(BlockChainContext);

  return (
    <div className="app">
      <h1>
        Todo List - Powered by
        <a href="https://react.dev" target="_blank">
          <img
            id="eth-img"
            src={ethereum}
            className="logo eth"
            alt="Eth logo"
          />
        </a>
      </h1>
      Your Account: <b>{account}</b>
      <br />
      <button id="add-btn" onClick={() => addTask("New Task")}>
        Add Todo
      </button>
      <div className="app">
        <ul className="todo-list">
          {todoList.map((task: Task) => (
            <TodoCard
              task={task}
              editCallback={(id: number, content: string) =>
                editTask(id, content)
              }
              toggleCallback={(id: number) => toggleTask(id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
