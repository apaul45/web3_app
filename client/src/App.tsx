import { useContext } from "react";
import "./App.css";
import { BlockChainContext } from "./context/BlockchainContext";
import { Task } from "./types";

function App() {
  // @ts-ignore
  const { account, todoList, addTask } = useContext(BlockChainContext);

  return (
    <div className="App">
      <h1>{account}</h1>
      <ol>
        {todoList.map((task: Task) => (
          <li>{task.content}</li>
        ))}
      </ol>
    </div>
  );
}

export default App;
